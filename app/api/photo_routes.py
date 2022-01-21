from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Album, Photo
from app.forms import PhotoForm, EditPhotoForm
from app.aws import (upload_file_to_s3, allowed_file, get_unique_filename)


photo_routes = Blueprint('photos', __name__)

# Add Photo
@photo_routes.route('/', methods=['POST'])
@login_required
def addPhoto():
    form = PhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if "photoURL" not in form.data:
        return {"errors": "photo required"}, 400

    image = form.data["photoURL"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]

    if form.validate_on_submit():
        image = Photo(
            title=form.data['title'],
            content=form.data['description'],
            photoURL=url,
            user_id=current_user.id
        )

        db.session.add(image)
        db.session.commit()
        return image.to_dict()



# Update Photo
@photo_routes.route('/<int:id>', methods=['PUT'])
@login_required
def updatePhoto(id):
    photo = Photo.query.get(id)
    form = EditPhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit:
        photo.title = form.title.data
        photo.description = form.description.data

        db.session.commit()
        return photo.to_dict()


# Delete Photo
@photo_routes.route('/<int:photoId>', methods=['DELETE'])
@login_required
def deleteAlbum(photoId):
    photo = Photo.query.filter_by(id=photoId).first()

    db.session.delete(photo)
    db.session.commit()

    return photo.to_dict()

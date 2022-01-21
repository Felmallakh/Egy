from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Album, Photo
from app.forms import PhotoForm, EditPhotoForm


photo_routes = Blueprint('photos', __name__)


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

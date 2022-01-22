from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Album, Photo
from app.forms import AlbumForm, EditAlbumForm, PhotoForm
from app.aws import (upload_file_to_s3, allowed_file, get_unique_filename)


album_routes = Blueprint('albums', __name__)

# Get One Album
@album_routes.route('/<int:id>')
@login_required
def get_single_album(id):
    album = Album.query.get(id)
    return album.to_dict()


# Add Album
@album_routes.route('/new', methods=['POST'])
@login_required
def addAlbum():
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit:
        albums = Album(
            title=form.title.data,
            description=form.description.data,
            user_id=current_user.id
        )
        db.session.add(albums)
        db.session.commit()

        return albums.to_dict()


# Update Album
@album_routes.route('/<int:id>', methods=['PUT'])
@login_required
def updateAlbum(id):
    album = Album.query.get(id)
    form = EditAlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit:
        album.title = form.title.data
        album.description = form.description.data

        db.session.commit()
        return album.to_dict()




# Delete Album
@album_routes.route('/<int:albumId>', methods=['DELETE'])
@login_required
def deleteAlbum(albumId):
    album = Album.query.filter_by(id=albumId).first()

    db.session.delete(album)
    db.session.commit()

    return album.to_dict()


# Add Photo
@album_routes.route('/<int:albumId>/photos/new', methods=['POST'])
@login_required
def addPhoto(albumId):
    print("😣😣😣")
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
            description=form.data['description'],
            photoURL=url,
            user_id=current_user.id,
            album_id=form.data['album_id']
        )

        db.session.add(image)
        db.session.commit()
        return image.to_dict()

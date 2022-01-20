from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Album
from app.forms import AlbumForm, EditAlbumForm


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


# Delete Album
@album_routes.route('/<int:albumId>', methods=['DELETE'])
@login_required
def deleteAlbum(albumId):
    album = Album.query.filter_by(id=albumId).first()

    db.session.delete(album)
    db.session.commit()

    return album.to_dict()

from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Album
from app.forms import AlbumForm, EditAlbumForm


album_routes = Blueprint('albums', __name__)


# Add Album

@album_routes.route('/new')
@login_required
def addAlbum():
    print("😣😣 FORM")
    form = AlbumForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.name.data:
        albums = Album(
            title=form.title.data,
            description=form.description.data,
            user_id=current_user.id
        )
        db.session.add(albums)
        db.session.commit()

        return albums.to_dict()





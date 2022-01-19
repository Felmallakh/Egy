from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Album, Photo

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# Get Albums
@user_routes.route('/<int:id>/albums')
@login_required
def get_albums(id):
    # albums = Album.query.all()

    albums = Album.query.get(id)

    print("😣😣",albums)
    return albums.to_dict()

# Get photos
@user_routes.route('/<int:id>/photos')
@login_required
def get_photos(id):
    photos = Photo.query.get(int(id))

    return photos.to_dict()


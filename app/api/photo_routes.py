from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Photo, Comment
from app.forms import EditPhotoForm


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
        photoURL = form.photoURL.data

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


# Get Comments
@photo_routes.route('/<int:photoId>/comments')
@login_required
def getComments(photoId):
    comments = Comment.query.filter(photoId == Comment.photo_id)
    return { 'comments' : [comment.to_dict() for comment in comments]}


# Add Comment
@photo_routes.route('/<int:photoId>/comments', methods=['POST'])
@login_required
def addComment(photoId):
    

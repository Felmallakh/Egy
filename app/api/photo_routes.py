from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Photo, Comment
from app.forms import EditPhotoForm, CommentForm, EditCommentForm


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
        photo.photoURL = form.photoURL.data

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
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment (
            content = form.data['content'],
            photo_id = photoId,
            user_id = current_user.id
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()


# Edit Comment
@photo_routes.route('/<int:photoId>/comments/<int:commentId>', methods=['PUT'])
@login_required
def updateComment(photoId, commentId):
    comment = Comment.query.get(commentId)
    form = EditCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit:
        comment.content = form.data['content']
        comment.photo_id = photoId
        comment.user_id = current_user.id

        db.session.commit()
        return comment.to_dict()

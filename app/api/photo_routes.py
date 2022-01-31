from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Photo, Comment
from app.forms import EditPhotoForm, CommentForm


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
    # comments = Comment.query.filter(Comment.photo_id == photoId)
    # comments = Comment.query.filter_by(photo_id=photoId).join(Photo).all()
    # print("🤷‍♀️🤷‍♀️", comments)
    # allcomment = [comment.to_dict() for comment in comments]
    # return jsonify(allcomment)
    comments = Comment.query.all()
    return { 'comments' : [comment.to_dict() for comment in comments]}
    # return [comment.to_dict() for comment in comments]

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

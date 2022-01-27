from flask import Blueprint, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, Comment

comment_routes = Blueprint('comments', __name__)


# Delete Comment
@comment_routes.route('/<int:commentId>', methods=['DELETE'])
@login_required
def deleteComment(commentId):
    # comment = Comment.query.filter_by(id= commentId).first()
    comment = Comment.query.get(commentId)

    db.session.delete(comment)
    db.session.commit()

    return comment.to_dict()


# Get One Comment
@comment_routes.route('/<int:commentId>')
def oneComments(commentId):
    comment = Comment.query.get(commentId)

    return comment.to_dict()

from flask import Blueprint, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, Comment
from app.forms import EditCommentForm

comment_routes = Blueprint('comments', __name__)


# Edit Comment
@comment_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def updateComment(id):
    print("😣😣🎅")
    comments = Comment.query.get(id)
    form = EditCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit:
        comments.content = form.data['content']

        db.session.commit()
        return {'comment': comment.to_dict() for comment in comments}

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

from flask_wtf import FlaskForm
from wtforms import StringField

class CommentForm(FlaskForm):
    content = StringField('content')


class EditCommentForm(FlaskForm):
    content = StringField('content')

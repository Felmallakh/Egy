from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class AlbumForm(FlaskForm):
    title = StringField('title')
    description = StringField('title')


class EditAlbumForm(FlaskForm):
    description = StringField('title')
    title = StringField('title')

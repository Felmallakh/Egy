from flask_wtf import FlaskForm
from wtforms import StringField

class PhotoForm(FlaskForm):
    title = StringField('title')
    description = StringField('description')
    photoURL = StringField('photoURL')


class EditPhotoForm(FlaskForm):
    title = StringField('title')
    description = StringField('description')
    photoURL = StringField('photoURL')

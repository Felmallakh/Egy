from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.html5 import EmailField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

def email_exists(form, field):
    # Checking if email exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Email is incorrect.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('User does not exist.')
    if not user.check_password(password):
        raise ValidationError('Password is incorrect.')


class LoginForm(FlaskForm):
    email = EmailField('email', validators=[DataRequired(), email_exists])
    password = StringField('password', validators=[
                           DataRequired(), password_matches])

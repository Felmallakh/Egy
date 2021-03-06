from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func
import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(50), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_picture = db.Column(db.String)
    created_at = db.Column(db.DateTime(), default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime(), onupdate=func.now(), default=func.now())

    albums = db.relationship(
        "Album", back_populates="user", cascade="all, delete")
    photos = db.relationship(
        "Photo", back_populates="user", cascade="all, delete")
    comments = db.relationship(
        "Comment", back_populates="user", cascade="all, delete")
    favorites = db.relationship(
        "Favorite", back_populates="user", cascade="all, delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_picture' : self.profile_picture
        }


class Album(db.Model):
    __tablename__ = 'albums'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String(250))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime(), onupdate=func.now(), default=func.now())


    user = db.relationship("User", back_populates="albums")
    photos = db.relationship("Photo", back_populates="albums", cascade="all, delete")

    def to_dict(self):
        return {
            'id' : self.id,
            'title' : self.title,
            'description' : self.description,
            'user_id' : self.user_id,
        }

class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String(250))
    photoURL = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'))
    created_at = db.Column(db.DateTime(), default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime(), onupdate=func.now(), default=func.now())


    user = db.relationship("User", back_populates="photos")
    albums = db.relationship("Album", back_populates="photos")
    comments = db.relationship("Comment", back_populates="photos", cascade='all, delete')
    favorites = db.relationship("Favorite", back_populates="photos", cascade='all, delete')
    tags = db.relationship("Tag", back_populates="photos", cascade='all, delete')

    def to_dict(self):
        return {
            'id' : self.id,
            'title' : self.title,
            'description' : self.description,
            'photoURL' : self.photoURL,
            'user_id' : self.user_id,
            'album_id' : self.album_id,
            'comments' :[comment.to_dict() for comment in self.comments],
        }

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(250))


    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    photo_id = db.Column(db.Integer, db.ForeignKey('photos.id'), nullable=False)

    user = db.relationship("User", back_populates="comments")
    photos = db.relationship("Photo", back_populates="comments")

    def to_dict(self):
        return {
            'id' : self.id,
            'content' : self.content,
            'user_id' : self.user_id,
            'photo_id' : self.photo_id,
            'author' : self.user.to_dict()
        }

class Favorite(db.Model):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    photo_id = db.Column(db.Integer, db.ForeignKey('photos.id'), nullable=False)

    user = db.relationship("User", back_populates="favorites")
    photos = db.relationship("Photo", back_populates="favorites")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'photo_id': self.post_id,
        }

class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    keyword = db.Column(db.String(255), nullable=False)

    photo_id = db.Column(db.Integer, db.ForeignKey('photos.id'), nullable=False)
    photos = db.relationship("Photo", back_populates="tags")





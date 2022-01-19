from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Album

album_routes = Blueprint('albums', __name__)

# const res = await fetch(`/ api/albums/users /${userId}`, {






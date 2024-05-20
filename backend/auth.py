from auxiliary import *
from flask_restful import Resource, request
from flask_jwt_extended import create_access_token
from models import *
from config import *
from auxiliary import *

class AuthResource(Resource):
    # Create account.
    def put(self):
        data = request.get_json()
        name = data.get('name')
        password = data.get('password')

        if User.query.filter_by(name=name).first():
            return simple_message_response("User already exists.", status=400)

        user = User(name=name, password=password)
        db.session.add(user)
        db.session.commit()

    # Login
    def post(self):
        data = request.get_json()
        name = data.get('name')
        password = data.get('password')
        user = User.query.filter_by(name=name).first()
        
        if user and user.password == password:
            access_token = create_access_token(identity=user.id)
            return Response(
                response=json.dumps({
                    "message": "Logged in successfully.",
                    "access_token": access_token,
                    "userID": user.id,
                }),
                status=200,
                mimetype="application/json"
            )
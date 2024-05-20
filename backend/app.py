import os
from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from resources import *
from auth import *

BaseDir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] =\
        'sqlite:///' + os.path.join(BaseDir, 'data/manga.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'bad_secret_key'
app.config["JWT_SECRET_KEY"] = 'bad_jwt_secret_key'
app.config['JWT_TOKEN_LOCATION'] = ['headers']
app.config["JWT_HEADER_NAME"] = "Authorization"
app.config['JWT_TOKEN_LOCATION'] = ['headers']
app.config['JWT_HEADER_TYPE'] = 'Bearer'

api = Api(app)
CORS(app)

db.init_app(app)

api.add_resource(AuthResource, '/auth/')
api.add_resource(UserListResource, '/users/')
api.add_resource(UserResource, '/user/<id>')
api.add_resource(GameListResource, '/games/')
api.add_resource(GameResource, '/game/<id>')
api.add_resource(PingResource, '/ping')

jwt = JWTManager(app)

@app.route('/userPassword', methods=['GET'])
@jwt_required()
def getUserCreationDate():
    id = get_jwt_identity()
    user = db.session.scalars(db.select(User).where(User.id == id)).first()
    response = jsonify(user.password)
    return response
    
# App wrapper.
if __name__ == '__main__':
    app.run(debug=True, port=5000)
import os
from flask import Flask
from flask_restful import Api
from resources import *

BaseDir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] =\
        'sqlite:///' + os.path.join(BaseDir, 'manga.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
api = Api(app)

db.init_app(app)

api.add_resource(GameListResource, '/games/')
api.add_resource(GameResource, '/game/<id>')
api.add_resource(PingResource, '/ping')
    
# App wrapper.
if __name__ == '__main__':
    app.run(debug=True, port=5000)
from flask_restful import Resource, request
from models import *
from config import *
from auxiliary import *

class UserResource(Resource):
	def delete(self, id):
		id = int(id)
		result = User.query.filter_by(id=id).first()
		if result is None:
			return abort(404, message="User with ID {} doesn't exist.".format(id))
		
		db.session.delete(result)
		db.session.commit()
		return simple_message_response("User with ID {} has been deleted.".format(id), 200)
	
	def get(self, id):
		id = int(id)
		result = User.query.filter_by(id=id).first()
		if result is None:
			return abort(404, message="User with ID {} doesn't exist.".format(id))
		
		return result.serialize()
	
	def put(self, id):
		id = int(id)
		result = User.query.filter_by(id=id).first()
		if result is None:
			return abort(404, message="User with ID {} doesn't exist.".format(id))
		
		args = userParser.parse_args()
		result.name = args['name']
		result.password = args['password'] # This is a bad idea, but it's just an example.
		result.favourite_game_id = int(args['favourite_game']) if 'favourite_game' in args and args["favourite_game"] != None else None
		db.session.commit()

		return simple_message_response("User with ID {} has been updated.".format(id), 200)

class UserListResource(Resource):
	def post(self):
		args = userParser.parse_args()
		user = User()
		user.name = args['name']
		user.password = args['password'] # This is a bad idea, but it's just an example.
		user.favourite_game_id = int(args['favourite_game']) if 'favourite_game' in args and args["favourite_game"] != None else None
		db.session.add(user)
		db.session.commit()
		return user.serialize()

	def get(self):
		# Get page size from request.
		pageSize = int(request.args["pageSize"]) if "pageSize" in request.args else DEFAULT_PAGE_SIZE
		pageSize = min(MAX_PAGE_SIZE, pageSize)

		# Get page offset from request.
		pageOffset = int(request.args["pageOffset"]) if "pageOffset" in request.args else 0

		# Make the query on the database.
		try:
			users = User.query.limit(pageSize).offset(pageOffset).all()
			return [user.serialize() for user in users]
		except Exception as e:
			return simple_message_error("An error occurred while fetching the users: {}".format(e))

class GameResource(Resource):
	def delete(self, id):
		id = int(id)
		result = Game.query.filter_by(id=id).first()
		if result is None:
			return abort(404, message="Game with ID {} doesn't exist.".format(id))
		
		db.session.delete(result)
		db.session.commit()
		return simple_message_response("Game with ID {} has been deleted.".format(id), 200) 

	def get(self, id):
		id = int(id)
		result = Game.query.filter_by(id=id).first()
		if result is None:
			return abort(404, message="Game with ID {} doesn't exist.".format(id))
		
		return result.serialize()
	
	def put(self, id):
		id = int(id)
		result = Game.query.filter_by(id=id).first()
		if result is None:
			return abort(404, message="Game with ID {} doesn't exist.".format(id))
		
		args = gameParser.parse_args()
		result.title = args['title']
		result.description = args['description']
		result.year = args['release_year']
		db.session.commit()

		return simple_message_response("Game with ID {} has been updated.".format(id), 200) 

# This is the resource that will be used to handle multiple games.
class GameListResource(Resource):
	def post(self):
		args = gameParser.parse_args()
		game = Game()
		game.title = args["title"]
		game.description = args["description"]
		game.year = args["release_year"]
		db.session.add(game)
		db.session.commit()
		return game.serialize()

	# Paged get.
	def get(self):
		# Get page size from request.
		pageSize = int(request.args["pageSize"]) if "pageSize" in request.args else DEFAULT_PAGE_SIZE
		pageSize = min(MAX_PAGE_SIZE, pageSize)

		# Get page offset from request.
		pageOffset = int(request.args["pageOffset"]) if "pageOffset" in request.args else 0

		# Make the query on the database.
		try:
			games = db.session.execute(db.select(Game).limit(pageSize).offset(pageOffset)).fetchall()
			return [game[0].serialize() for game in games]
		except Exception as e:
			return simple_message_error("An error occurred while fetching the games: {}".format(e))
	
# Ping endpoint.
class PingResource(Resource):
	def get(self):
		return simple_message_response("Pong!", 200)
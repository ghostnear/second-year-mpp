from flask_restful import Resource, request
from models import *
from config import *
from auxiliary import *

# This is the resource that will be used to handle one game.
def check_game_exists(id):
	if not data.has(id):
		simple_message_error("Game with ID {} doesn't exist.".format(id))

class GameResource(Resource):
	def delete(self, id):
		id = int(id)
		check_game_exists(id)
		data.remove(id)
		return simple_message_response("Game with ID {} has been deleted.".format(id), 200) 

	def get(self, id):
		id = int(id)
		check_game_exists(id)
		return data.get(id).serialize()
	
	def put(self, id):
		id = int(id)
		check_game_exists(id)
		args = gameParser.parse_args()
		data.update(id, Game(args['title'], args['description'], args['release_year']))
		return simple_message_response("Game with ID {} has been updated.".format(id), 200) 

# This is the resource that will be used to handle multiple games.
class GameListResource(Resource):
	def post(self):
		args = gameParser.parse_args()
		return data.insert(Game(args['title'], args['description'], args['release_year'])).serialize()

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
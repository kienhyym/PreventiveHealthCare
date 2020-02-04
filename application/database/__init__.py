from gatco_sqlalchemy import SQLAlchemy
# import redis
# redisdb = redis.StrictRedis(host='localhost', port=6379, db=3)

db = SQLAlchemy()
def init_database(app):
    db.init_app(app)

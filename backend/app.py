from flask import Flask, request, jsonify
from supabase import create_client  
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash
import psycopg2


db = SQLAlchemy()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql://postgres:itbetterwork!!@db.ickadgsgqqzzjjdoqpdn.supabase.co:5432/postgres'

db.init_app(app)

class User(db.Model):
    __tablename__= 'users'
    id = db.Column(db.Integer, primary_key = True)
    user_name = db.Column(db.String(200), nullable = False)
    email = db.Column(db.String(200), nullable = False, unique = True)
    password = db.Column(db.String(200), nullable = False)
    workouts = db.relationship('Workout', backref = 'user', lazy = True)

class Workout(db.Model):
    __tablename__ = "workouts"
    id = db.Column(db.Integer, primary_key = True)
    ex_date = db.Column(db.Date)
    exercise = db.Column(db.String(150))
    reps = db.Column(db.Integer)
    weight = db.Column(db.Integer)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'))
    exercises = db.relationship('Exercise', backref = 'workout', lazy = True)
   

class Exercise(db.Model):
    __tablename__ = "exercises"
    id = db.Column(db.Integer, primary_key = True)
    muscle_group = db.Column(db.String(200), nullable = False)
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'), nullable = False)
    workout = db.relationship('Workout', backref = 'exercises')

with app.app_context():
    db.create_all()

#@app.route("/testings")

#def testing():
    #return {"testings":["1","2","3"]}

@app.route('/signup', methods=['POST'])
def signup():
    email = request.json.get('email')
    password = request.json.get('password')

    existing_email = User.query.filter_by(email=email).first
    if existing_email:
        return jsonify({'message': 'Username already taken'}), 409
   
    new_user = User(user_name=user_name, email=email, password=password)

    db.session.add(new_user)
    db.session.commit()



if __name__ == "__main__":
 app.run(debug=True)



from flask import Flask, request, jsonify
from supabase import create_client  
from flask_sqlalchemy import SQLAlchemy
#from werkzeug.security import generate_password_hash
import psycopg2
from sqlalchemy.exc import IntegrityError
from sqlalchemy import create_engine


db = SQLAlchemy()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql://postgres:Alfiebby333!@db.hrxmyadcablyhlrfrlmz.supabase.co:5432/postgres'

                                        
db.init_app(app)

class User(db.Model):
    __tablename__= 'users'
    id = db.Column(db.Integer, primary_key = True)
    user_name = db.Column(db.String(200), nullable = False)
    email = db.Column(db.String(200), nullable = False, unique = True)
    password = db.Column(db.String(200), nullable = False)
    workouts = db.relationship('Workout', backref = 'user', lazy = True)
    #exercises = db.relationship('Exercise', backref = 'user', lazy = True)
class Workout(db.Model):
    __tablename__ = "workouts"
    id = db.Column(db.Integer, primary_key = True)
    ex_date = db.Column(db.Date)
    reps = db.Column(db.Integer)
    weight = db.Column(db.Integer)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'))
    exercises = db.relationship('Exercise',backref = 'workout',lazy = True)
    #exercises = db.relationship('Exercise', backref = 'workout', lazy = True)
   

class Exercise(db.Model):
    __tablename__ = "exercises"
    id = db.Column(db.Integer, primary_key = True)
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'), nullable=False)
    exercise_name = db.Column(db.String(100), nullable=False)
    reps = db.Column(db.Integer)
    weight = db.Column(db.Integer)
    muscle_group_id = db.Column(db.Integer, db.ForeignKey('muscle_groups.muscle_group_id'), nullable=False)
    
class MuscleGroup(db.Model):
    __tablename__ = 'muscle_groups'
    muscle_group_id = db.Column(db.Integer, primary_key=True)
    muscle_group_name = db.Column(db.String(50), nullable=False)
    exercises = db.relationship('Exercise', backref='muscle_group', lazy=True)
    
    
    #workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'), nullable = False)
    #workout_exercises= db.relationship('Workout', backref = 'workout_exercises')

with app.app_context():
    db.create_all()

'''@app.route("/testings")

def testing():
    return {"testings":["1","2","3"]}'''

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data['email']
    password = data['password']
    user_name = data['user_name']
    existing_email = User.query.filter_by(email=email).first()
    if existing_email:
        return jsonify({'message': 'Username already taken'}), 409
    if not user_name or not password or not email:
        return jsonify({'message': 'All fields are required'}), 400
    
    new_user = User(user_name=user_name, password=password, email=email)

    try:
        db.session.add(new_user)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'message': 'Username or email already exists'}), 409
    
    return jsonify({'message':"user created succesfully!!"}),201
    #new_user = User(user_name=user_name, password=password, email=email)

    '''try:
        db.session.add(new_user)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'message': 'Username or email already exists'}), 409'''
    


if __name__ == "__main__":
 app.run(debug=True)



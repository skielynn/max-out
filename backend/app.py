from flask import Flask, request, jsonify, JWT, JWt_required, current_identity 
from supabase import create_client  
from flask_sqlalchemy import SQLAlchemy
#from werkzeug.security import generate_password_hash
import psycopg2
from sqlalchemy.exc import IntegrityError
from sqlalchemy import create_engine
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity




db = SQLAlchemy()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql://postgres:Alfiebby333!@db.nykvfakonlmschpmlrpv.supabase.co:5432/postgres'

                                        
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
    exercise_date = db.Column(db.Date)
    exercise_name = db.Column(db.String(200), nullable = False)
    reps = db.Column(db.Integer)
    weight = db.Column(db.Integer)
    muscle_group = db.Column(db.String)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'))
  

with app.app_context():
    db.create_all()


                         #########   SIGN UP   ROUTE  ############
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

    token = create_access_token(identity = new_user.id)
    #return jsonify({'token': token})

    try:
        db.session.add(new_user)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'message': 'Username or email already exists'}), 409
    
    return jsonify({'message':"user created succesfully!!"}),201


                                      ############### LOG IN ROUTE ###################

 
                                    ######### NEW ENTRY ROUTE FOR TABLES ##############
@app.route('/newworkout', methods=['POST'])
def newworkout():
    data = request.get_json()
    exercise_date= data['exercise_date']
    exercise_name = data['exercise_name']
    reps = data['reps']
    weight = data['weight']
    muscle_group = data['muscle_group']
    #user_id = data ["user_id"]
    
    new_workout = Workout(exercise_date= exercise_date, exercise_name= exercise_name, reps=reps, weight = weight, muscle_group = muscle_group)

    try:
        db.session.add(new_workout)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'message': 'Username or email already exists'}), 409
    
    return jsonify({'message':"user created succesfully!!"}),201
    


                                ##################    #GET ROUTE   ###################
@app.route('/userdata/<user_id>', methods=['GET'])
def user_data(user_id):
    user_id = Workout.query.filter_by(user_id= user_id).first()
    if user_id is not None:
        data = {'exercise_date': user_id.exercise_date,
                'exercise_name': user_id.exercise_name,
                'reps': user_id.reps,
                'weight': user_id.weight,
                'muscle_group':user_id.muscle_group}
        return jsonify(data)
    else:
        return jsonify({'error': 'User data not found'}), 404


                        ###################    DELETE ROUTES FOR ENTRIES    ############

@app.route('/deletedata/delete', methods = ['DELETE'])
def delete_data():
    data = request.get_json()
    exercise_name = data.get('exercise_name')
    exercise_date = data.get('exercise_date')

    
    if not exercise_name or not exercise_date:
        return jsonify({'error': 'Exercise name and date are required'}), 400
    
    workout = Workout.query.filter_by(exercise_name=exercise_name, exercise_date=exercise_date).first()
    
    if workout:
        db.session.delete(workout)
        db.session.commit()
        return jsonify({'message': 'Workout deleted successfully'})
    
    return jsonify({'error': 'Workout not found'}), 404
   
                         ######### UPDATE ROUTE ###########


                        ######### PROTECTING ENDPOINT ROUTE #######
                        
@app.route('/protected', methods =['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity() 
    user = User.query.filter_by(id=current_user_id).first()
    return jsonify({
        'id': user.id,
        'user_name': user.user_name,
        'email': user.email,
        'workouts': [w.id for w in user.workouts]
    })

if __name__ == "__main__":
 app.run(debug=True)


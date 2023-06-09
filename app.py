from flask import Flask, request, jsonify, sessions, current_app
from supabase import create_client  
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash, generate_password_hash
import psycopg2
from sqlalchemy.exc import IntegrityError
from sqlalchemy import create_engine
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager

#Alfiebby333!

#Alfiebby333!

db = SQLAlchemy()

app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = '1157510'
app.config["SQLALCHEMY_DATABASE_URI"] =  'postgresql://postgres:Alfiebby333!@db.hbycsclzhreqgvgeerwi.supabase.co:5432/postgres'
jwt = JWTManager(app)


                                  
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
    sets = db.Column(db.String)
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

    #create a new session 
    session = db.session 
    existing_email = session.query(User).filter_by(email=email).first()
    #existing_email = User.query.filter_by(email=email).first()
    if existing_email:
        return jsonify({'message': 'email already taken'}), 409
    if not user_name or not password or not email:
        return jsonify({'message': 'All fields are required'}), 400
    
    ##generates hashed password###
    hashed_password = generate_password_hash(password)
    
    new_user = User(user_name=user_name, password=hashed_password, email=email)

    ### creating access token ###
    token = create_access_token(identity = new_user.id)
    #return jsonify({'token': token})

    try:
        db.session.add(new_user)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'message': 'Username or email already exists'}), 409
    
    return jsonify({'token': token,'message':"user created succesfully!!"}),201


                                      ############### LOG IN ROUTE ###################
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    session = db.session
    user = session.query(User).filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password): 
        return jsonify({'message': 'Invalid email or password'}), 401

   
    token = create_access_token(identity=user.id)
    
    return jsonify({'message': 'Login successful', 'token': token}), 200
                
                  ############# NEW WORKOUUT ##################
@app.route('/newworkout', methods=['POST'])
@jwt_required()
def newworkout():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    data = request.get_json()
    exercise_date= data['exercise_date']
    exercise_name = data['exercise_name']
    reps = data['reps']
    weight = data['weight']
    sets = data['sets']
 
    if not user:
        return jsonify({"message": "USER DOES NOT EXIST"})
    
    new_workout = Workout(exercise_date= exercise_date, exercise_name= exercise_name, reps=reps, weight = weight, sets = sets, user_id= user.id)

    try:
        db.session.add(new_workout)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'message': 'Username or email already exists'}), 409
    
    return jsonify({'message':"workout created succesfully!!"}), 201


 
                     
    

                                ##################    #GET ROUTE   ###################

@app.route('/exercise-logs/<exercise_name>', methods=['GET'])
@jwt_required()
def get_exercise_logs(exercise_name):
    current_user_id = get_jwt_identity()
    session = db.session
    user = session.query(User).get(current_user_id)
    workouts = Workout.query.filter_by(user_id=user.id, exercise_name=exercise_name).all()
    if not workouts:
        return jsonify({'message': 'Exercise not found'}), 404
    exercise_logs = {
        'exercise_name': exercise_name,
            'logs': [{
            'reps': workout.reps,
            'weight': workout.weight,
            'exercise_date': workout.exercise_date,
            'sets': workout.sets
        } for workout in workouts]
    }
    return jsonify(exercise_logs)



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
@app.route('/update/<int:workout_id>', methods=(['PUT']))
def update(workout_id):
    data = request.get_json()
    workout = Workout.query.get(workout_id)
    if not workout:
        return jsonify({'error': 'workout not found'}), 404
    if 'exercise_date' in data:
        workout.exercise_date = data ['exercise_date']
    if 'exercise_name' in data:
        workout.exercise_name = data ['exercise_name']
    if 'reps' in data:
        workout.reps = data ['reps']
    if 'weight' in data:
        workout.weight = data ['weight']
    if 'muscle_group' in data:
        workout.muscle_group = data ['muscle_group']

        db.session.commit()

        return jsonify({'message': 'workout updated successfully'}), 200
    
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


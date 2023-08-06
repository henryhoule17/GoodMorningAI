import sys
from flask import Flask, request, jsonify, Response
import os
import jwt
import datetime
from flask_cors import CORS
from dotenv import load_dotenv
from logic import processTestMessage
from pymongo.mongo_client import MongoClient

load_dotenv()
uri = os.getenv('MONGO_URI')
jwt_key = os.getenv('JWT_KEY')

app = Flask(__name__)

client = MongoClient(uri)
CORS(app, origins='http://localhost:5173')

user_database = client['GoodMorningAIDatabase']['User Data']



@app.route('/', methods=['POST', 'GET', 'OPTIONS'])
def handle_root():
    return jsonify({'message': 'Hello World!'}), 200

#################### TEST MESSAGE ####################
@app.route('/test-message/', methods=['POST', 'GET'])
def handle_test_message():
    data = request.get_json()
    # print("Data: ", data)
    token = data['token']

    user = verify_token(token)
    if not user:
        print("User not found")
        return jsonify({'error': "User Not Found"}), 401
    
    phone = data['phone']
    if not 'phone' in user['info']:
        user_database.update_one({'email': user['email']}, {'$set': {'info.phone': phone}})

    # print("User: ", user)

    messageType = data['messageType']
    topic = data['topic']

    message = processTestMessage(user, topic, messageType)

    return jsonify({'message': message}), 200

#################### AUTHENTICATION ####################
@app.route('/auth/', methods=['POST', 'GET'])
def auth_check():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user_doc = user_database.find_one({'email': email})

    if user_doc:
        if user_doc['password'] == password:
            token = jwt.encode({
                'user_id': email,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
            }, jwt_key, algorithm='HS256')
            print(type(token))
            print(type("hello"))

            refresh_token = jwt.encode({
                'user_id': email,
                'type': 'refresh',
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30),
            }, jwt_key, algorithm='HS256')

            return jsonify({
                'token': token, 
                'expiresIn': 3600 * 24,
                'tokenType': 'Bearer',
                'authUserState': user_doc['info'],
                'refresh_token': refresh_token,
                'refreshTokenExpiresIn': 3600 * 24 * 30,
            }), 200
        else:
            return jsonify({'error': 'Incorrect password'}), 401
    else:
        return jsonify({'error': 'User not found'}), 404

#################### SIGN UP ####################
@app.route('/signup/', methods=['POST', 'GET'])
def sign_up_user():
    data = request.get_json()    
    uInfo = {
        'email': data.get('email'),
        'password': data.get('password'),
        'info': {
            'fname': data.get('firstName'),
            'lname': data.get('lastName'),
            'email': data.get('email'),
            'phone': '',
            'messageSettings': '',
            'timeZone': '',
        },
    }

    existing_user = user_database.find_one({'email': uInfo['email']})
    if existing_user:
        return jsonify({'status': 'preexisting'}), 200
    
    response = user_database.insert_one(uInfo)

    return jsonify({'response': str(response.inserted_id), 'status': 'success'}), 200
    
#################### VERIFY TOKEN ####################
def verify_token(token):
    try:
        # print("VT Token: ", token)
        decoded = jwt.decode(token, jwt_key, algorithms=['HS256'])
        user_id = decoded.get('user_id')
        user = user_database.find_one({'email': user_id})
        if not user:
            return None
        else:
            return user
    except Exception as e:
        print("Verification Error: ", e)
        return None

if __name__ == "__main__":
    app.run(port=5000, debug=True)
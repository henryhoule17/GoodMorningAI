from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from logic import getMotivationalQuote, getPositiveMessage, getNewsHeadlines, getFunFact, getMeanQuote

app = Flask(__name__)
CORS(app)#, origins='http://localhost:5173')

userInfo = {
    'phone': "",
    'topic': ""
}

load_dotenv()

@app.route('/test-message', methods=['POST', 'GET'])
def handle_test_message():
    data = request.get_json()

    userInfo['phone'] = data.get('phoneNumber')
    userInfo['topic'] = data.get('topicName')

    # now you can do whatever you need to do with phone_number and topic_name
    if userInfo['topic'] == 'MQ':
        message = getMotivationalQuote()
    elif userInfo['topic'] == 'SP':
        message = getPositiveMessage()
    elif userInfo['topic'] == 'NH':
        message = getNewsHeadlines()
    elif userInfo['topic'] == 'FF':
        message = getFunFact()
    else:
        message = getMeanQuote()

    # return a success message
    return jsonify({'message': message}), 200

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == "__main__":
     app.run(port=5000)
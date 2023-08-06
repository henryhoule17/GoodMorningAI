import openai
import random
import os

MODEL = "gpt-3.5-turbo"

def getMotivationalQuote():
    chat_completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", 
        messages=[
            {
                "role": "user", 
                "content": "Hello world"
            }
        ])
    print(chat_completion)
    return "You are doing great!"

def getPositiveMessage():
    return "You are awesome!"

def getFunFact():
    return "Did you know that the earth is round?"

def getMeanQuote():
    return "You are a failure!"

def processTestMessage(user, topic, messageType):
    if messageType == 'MQ':
        message = getMotivationalQuote()
    elif messageType == 'SP':
        message = getPositiveMessage()
    elif messageType == 'FF':
        message = getFunFact()
    elif messageType == 'MD':
       message = getMeanQuote()
    else:
        message = 'Invalid message type'
    return message
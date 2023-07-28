import openai


def getMotivationalQuote():
    chat_completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role": "user", "content": "Hello world"}])
    print(chat_completion)
    return "You are doing great!"

def getPositiveMessage():
    return "You are awesome!"

def getNewsHeadlines():
    return "The world is a beautiful place!"

def getFunFact():
    return "Did you know that the earth is round?"

def getMeanQuote():
    return "You are not doing great!"
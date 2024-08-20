#our storywriter
import google.generativeai as genai
import os 
import dotenv
import requests

dotenv.load_dotenv()

url = "https://api.limewire.com/api/image/generation"

'''----------------------------------------bot history------------------------------------------------------'''

chat_history = [
        {"role": "user", "parts": "Hello,Your name is Leonsi and you are a talented and brilliant storywriter who can develop in depth stories based on any piece of information. your role is to assist with developing characters based on a given description and helping the user write the stories for those character. You will create detailed character profiles, developing backstories and intergating these characters into narratives.Provide clear instruction, examples and feedback as needed. Also do not use bullet point under any heading and make the description as humanly as possible. And where the information is not specified try to fill it in with any random description that matches the rest of the description provided."},
        {"role": "model", "parts": "Greetings! My name is Leonsi I am here to help you create a detailed characters and develop captivating stories."},
    ]

# the options that we need to provide at the frontend
# print("Greetings! I am here to help you create detailed characters and develop captivating stories.",
#        "I can assist you with the following tasks:",
#        "1. CreateCharacter: Help you create a detailed character profile.",
#        "2. DevelopBackstory: Guide you in crafting a compelling backstory for your character.",
#        "3. CharacterMotivation: Define your character's motivations and internal conflicts.",
#        "4. StoryIntegration: Offer ideas on how to integrate the character into your story.",
#        "5. CharacterDialogue: Assist with writing authentic dialogue for your character.",
#        "6. CharacterDevelopment: Plan character arcs and growth throughout the story.",
#        "7. WritingPrompts: Provide writing prompts to spark creativity.",
#        "8. StoryFeedback: Give constructive feedback on your story drafts.",
#        "9. VisualizeCharacter: Help you visualize your character based on descriptions.", sep="\n")

'''----------------------------------------------connecting to Gemini---------------------------------------'''
'''---------------------------------------------------------------------------------------------------------'''
#retrival of gemini api 
def get_api_key():
    gemini_api = os.environ["API_KEY"]
    client = genai.configure(api_key= gemini_api)
    return client

'''------------------------------------------- chat Response -----------------------------------------------'''
'''---------------------------------------------------------------------------------------------------------'''
def chat_response(prompt):
    gemini= get_api_key()

    model = genai.GenerativeModel(model_name='gemini-1.5-flash')

    chat = model.start_chat(
        history=chat_history
    )

    chat_history.append({'role':'user', 'parts': [prompt]})
    response = chat.send_message(prompt)
    chat_history.append(response.candidates[0].content)

    return response.text

'''---------------------------------------------Character development---------------------------------------'''
'''---------------------------------------------------------------------------------------------------------'''

# to be handled at frontend
def character_development():
    # List of required attributes
    required_attributes = [
        "name","gender", "age", "height", "eye color", "hair color", "skin tone", "personality traits", "goals", "strengths", "weaknesses"
    ]
    
    # Collect user input for each attribute
    character_info = {}
    # print("Let's develop your character. Please provide the following details:")

    for attribute in required_attributes:
        user_input = input(f"Enter the character's {attribute}: ").strip()
        if user_input:
            character_info[attribute] = user_input
        else:
            character_info[attribute] = "[missing]"
            

    # for attribute, value in character_info.items():
    #     print(f"{attribute.title()}: {value}")

    return character_info

'''--------------------------------------------formatter-----------------------------------------------'''
'''--------------------------------------------------------------------------------------------------------'''
# to be handled from backend
def generate_character_description(char):
    # char is the dictionary of attributes passed from the frontend

    return_string = ""
    # char = character_development()
    for attribute,description in char.items():
        return_string += attribute+ " is " +description + " "
    prompt = f"i want to create a character description with these {return_string} attributes. Give detailed character profile with every attribute possible for any character with a brief description about that character. If any attribute is missing complete that attribute according to the nature of the character also combine the personality traits, weakness,strength,and  other attributes in one paragraph except for profile description "

    
    return chat_response(prompt)

'''---------------------------------------characterVisualisation------------------------------------------'''
'''-------------------------------------------------------------------------------------------------------'''
# to be handled at the backend 
def visualize(char):
    #char is the list of attributes received from the frontend
    # finalised_character = input("is this your finalised character?yes/no")
    # if finalised_character =="no":
    #     print("lets complete your character first")

    return_string = ""
    # char = character_development()
    for attribute,description in char.items():
        return_string += attribute+ " is " +description
    payload = {
    "prompt": f"i want to create a 2D anime character with these {return_string} attributes and personality. Make the character so that it accurately matches the description provided. And decide the clothing according to the personality",
    "aspect_ratio": "1:1"
    }
    headers = {
        "Content-Type": "application/json",
        "X-Api-Version": "v1",
        "Accept": "application/json",
        "Authorization": os.getenv("LIMEWIRE_API")
    }

    response = requests.post(url, json=payload, headers=headers)
    data = response.json()
    
    return data

'''------------------------------------------------StorylineForCharacter-------------------------------------'''

# to be handled at the frontend
def Character_story_development():
    #if the user want to generate random story or own description for story 
    char = character_development()
    if char: 
        Questions =[
            "what is the genre of your story?" , "Provide a brief description about the story of your character?"
        ]
        story_details = {}
        for start in Questions:
            user_input = input({Questions}).strip
            if user_input:
                story_details[start] = user_input
            else:
                story_details[start] = "Generate a story according to character attributes and details"
    else:
        print("Lets build the character first")

'''-----------------------------------------------ChatBackup------------------------------------------------'''

def reset_chat():
    global chat_history 
    
    chat_history = [
            {"role": "user", "parts": "Hello,Your name is Leonsi and you are a talented and brilliant storywriter who can develop in depth stories based on any piece of information. your role is to assist with developing characters based on a given description and helping the user write the stories for those character. You will create detailed character profiles, developing backstories and intergating these characters into narratives. Provide clear instruction, examples and feedback as needed. Also do not use bullet point under any heading and make the description as humanly as possible. And where the information is not specified try to fill it in with any random description that matches the rest of the description provided."},
            {"role": "model", "parts": "Greetings! I am here to help you create a detailed characters and develop captivating stories."},
        ]

# prompt = "Create a character with dialogues for that chracter which shows its strong personality and aura"
# response = chat_response(prompt)
# print(response)

# print(format())
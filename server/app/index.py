from flask import Flask, render_template, redirect, url_for, request, jsonify, session
from service import authentication
from service.Leonsi import chat_response, reset_chat, generate_character_description, visualize
from google.cloud import firestore
import markdown

#----------------------------------------------Flask config-------------------------------------------------------------
app = Flask(__name__)
app.secret_key = "64472475857858757857832109767876"
count = 0
db = firestore.Client()
# doc_ref = ""
#----------------------------------------------Flask config ends-------------------------------------------------------------

@app.route('/')
def home_page():
    return "this is an api for accessing the leonsi bot"

#------------------------------------------------MainChatbot-----------------------------------------------------------
@app.route('/api/get')
def chat_page():
    if "user" not in session:
        return redirect('/login')
    
    return render_template('chat.html')

@app.route('/api/get-response', methods=['GET', 'POST'])
def get_chat_response():
    if request.method == 'POST':
        try:
            data = request.json
            prompt = data.get("prompt")

            if not prompt:
                return jsonify({'error': 'Prompt is required'}), 400

            global count
            if (count == 20):
                reset_chat_history()

            response = chat_response(prompt)
            count += 1
            data = {
                'user'+str(count): prompt,
                'model'+str(count): response,
            }

            # doc_ref.set(data)

            return jsonify({'response': response}), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500
        
    if request.method == 'GET':
        return jsonify({'message': 'Send a POST request with a prompt to get response'})

@app.route("/api/visualize-character", methods=['GET', 'POST'])
def visualize_character():
    if request.method == 'POST':
        try:
            data = request.json
            character_name = data.get("character")

            print(character_name)
            if not character_name:
                return jsonify({'error': 'Character name is required'}), 400

            image_details = visualize(character_name)
            return jsonify({'response': image_details}), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500
        
    if request.method == 'GET':
        return jsonify({'message': 'Send a POST request with a character name to generate a image'})
    
@app.route('/api/generate-character-description', methods=['GET', 'POST'])
def get_character_description():
    if request.method == 'POST':
        try:
            data = request.json
            character_name = data.get("character")

            print(character_name)
            if not character_name:
                return jsonify({'error': 'Character name is required'}), 400

            description = generate_character_description(character_name)
            return jsonify({'response': format_markdown(description)}), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # Handle GET requests, if needed
    if request.method == 'GET':
        return jsonify({'message': 'Send a POST request with a character name to generate a description'})
#------------------------------------------------MainChatbotends-----------------------------------------------------------

@app.route("/api/signup", methods=['GET', 'POST'])
def sign_up():
    # implement the sign up 
    if "user" in session: 
        return jsonify({'response': 'Already logged in'}), 200
    
    if request.method == "POST":
        # get the data from the form
        data = request.json
        email = data.get("email")
        password = data.get("password")

        try:
            authentication.sign_up(email, password)
            return jsonify({'response': 'Sign in successful'}), 200
        except Exception as e:
            return jsonify({'error': 'Failed to sign up'}), 400
        
@app.route("/api/login", methods=['GET', 'POST'])
def login_page():
    if "user" in session: 
        return jsonify({'response': 'Already logged in'}), 200
    
    if request.method == "POST":
        # get the username and password from the form
        data = request.json
        email = data.get("email")
        password = data.get("password")

        try: 
            user = authentication.log_in(email, password)
            session['user'] = email 
            # global doc_ref
            # doc_ref = db.collection('users').document(authentication.get_user_details())
            return jsonify({'response': 'Login successful'}), 200

        except Exception as e:
            print(e) 
            return jsonify({'response':"Incorrect Email or Password"})
    
@app.route('/api/logout')
def logout():
    if 'user' in session:
        session.pop('user')
    
    return redirect('/login')

@app.route('/api/user-details')
def user_details():
    if "user" in session:
        return jsonify({'response':authentication.get_user_details()})
    
@app.route('/api/forgot-password', methods=["POST", "GET"])
def forgot_password():
    if request.method == "POST":
        data = request.json
        email = data.get("email")

        try:
            authentication.reset_password(email)
            return jsonify({'response':"Password Reset Email Sent"})
        except:
            return jsonify({'response':"Failed to Reset Password"}), 400
        
@app.route('/api/reset-chat')
def reset_chat_history():
    global count
    count = 0
    reset_chat()


def format_markdown(markdown_text):
    # Convert Markdown to HTML
    html = markdown.markdown(markdown_text, extensions=['fenced_code'])
    return html

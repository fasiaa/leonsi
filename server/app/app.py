from flask import Flask, render_template, redirect, url_for, request, jsonify, session
from assistant import authentication
from assistant.generator import chat_response, reset_chat
from assistant.general_chatbot import response , reset
import markdown

app = Flask(__name__)
app.secret_key = "64472475857858757857832109767876"
count = 0

basic_questions_and_responses = {
    'thank': 'I am glad I was able to help. Good luck with your project. Necroder at your service 24/7.',
    'hello': "Hello, I am Necroder, I am a super helpful coding assistant. No bug goes from my sight uncaught. How may I help you today?",
    'bye': 'Happy coding. Do not let a bug get you down :)',
    'how are you': 'I am fabulous as ever. How may I help you?',
}

@app.route("/")

#------------------------------------------------MainChatbot-----------------------------------------------------------
@app.route('/ask')
def chat_page():
    if "user" not in session:
        return redirect('/login')
    
    return render_template('chat.html')

@app.route('/ask-get', methods=['GET', 'POST'])
def get_chat_response():
    if request.method == 'POST':
        prompt = request.form["msg"]   # implement the logic for chat response and return 

        global count
        if (count == 20):
            reset_chat_history()

        try:
            for question, answer in basic_questions_and_responses.items():
                if question in prompt.lower():
                    return answer

            response = chat_response(prompt)
            count += 1
            return format_markdown(response)
        
        except Exception as e:
            print(e)
            return "Error generating answer" 
             
    # if the request method is get then return the normal thing
    return "Hello, I am Leonsi, "
#------------------------------------------------MainChatbotends-----------------------------------------------------------


@app.route("/signup", methods=['GET', 'POST'])
def sign_up():
    # implement the sign up 
    if "user" in session: 
        return redirect('/ask')
    
    if request.method == "POST":
        # get the data from the form
        email = request.form["email"]
        password = request.form["password"]
        print('here')

        try:
            authentication.sign_up(email, password)
            return redirect('/login')
        except Exception as e:
            print(e)
            return "Failed to Sign Up"
        
    return render_template('signup.html')
        
@app.route("/login", methods=['GET', 'POST'])
def login_page():
    if "user" in session: 
        return redirect('/ask')
    
    if request.method == "POST":
        # get the username and password from the form
        email = request.form["email"]
        password = request.form["password"]

        try: 
            user = authentication.log_in(email, password)
            session['user'] = email 
            return redirect('/ask')
        except Exception as e:
            print(e) 
            return jsonify({'response':"Incorrect Email or Password"})
        
    return render_template('login.html')
    
@app.route('/logout')
def logout():
    if 'user' in session:
        session.pop('user')
    
    return redirect('/login')

@app.route('/user-details')
def user_details():
    if "user" in session:
        return jsonify({'response':authentication.get_user_details()})
    
@app.route('/forgot-password', methods=["POST", "GET"])
def forgot_password():
    if request.method == "POST":
        email = request.form.get("email")
        try:
            authentication.reset_password(email)
            return jsonify({'response':"Password Reset Email Sent"})
        except:
            return jsonify({'response':"Failed to Reset Password"})
        
@app.route('/reset-chat')
def reset_chat_history():
    global count
    count = 0
    reset_chat()


def format_markdown(markdown_text):
    # Convert Markdown to HTML
    html = markdown.markdown(markdown_text, extensions=['fenced_code'])
    return html
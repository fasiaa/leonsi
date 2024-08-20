from flask import Flask, render_template, redirect, url_for, request, jsonify, session
from service import authentication
from service.Leonsi import chat_response, reset_chat
from google.cloud import firestore
import markdown

app = Flask(__name__)
app.secret_key = "64472475857858757857832109767876"
count = 0
db = firestore.Client()
doc_ref = None

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
        prompt = request.form["msg"]

        global count
        if (count == 20):
            reset_chat_history()

        try:
            response = chat_response(prompt)
            count += 1

            data = {
                'user'+count: prompt,
                'model'+count: response,
            }

            doc_ref.set(data)
            return format_markdown(response)
        
        except Exception as e:
            print(e)
            return "Error generating answer" 
             
    # if the request method is get then return the normal thing
    return "Hello, I am Leonsi, an assistant to help you with your storyline generation"
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
            global doc_ref
            doc_ref = db.collection('users').document(authentication.get_user_details())

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
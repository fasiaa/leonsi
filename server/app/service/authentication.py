#firebase authentication
import pyrebase
import os
import dotenv

dotenv.load_dotenv()

config = {
    "apiKey":os.getenv("GOOGLE_API_KEY") , 
    "authDomain":os.getenv("GOOGLE_AUTH_DOMAIN"),
    "projectId":os.getenv("GOOGLE_PROJECT_ID") ,
    "storageBucket":os.getenv("GOOGLE_STORAGE_BUCKET") ,
    "messagingSenderId":os.getenv("GOOGLE_MESSAGING_SENDER_ID"),
    "appId":os.getenv("GOOGLE_APP_ID"),
    "measurementId":os.getenv("GOOGLE_MEASUREMENT_ID"),
    "databaseURL": "",
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

def log_in(email, password):
    user = auth.sign_in_with_email_and_password(email, password)

def sign_up(email, password):
    user = auth.create_user_with_email_and_password(email, password)
    auth.send_email_verification(user['idToken'])

def get_user_details():
    user = auth.get_account_info(user['idToken'])

def reset_password(email):
    auth.send_password_reset_email(email)
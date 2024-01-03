import bcrypt
from flask import Flask
import jwt
from db import DB

app = Flask(__name__)
app.secret_key = 'keyboardchickenflappybirdugaliskuma'


class Auth:

    @staticmethod
    def hash_password(password):
        salt = bcrypt.gensalt()  # Generate a salt
        hashed_password = bcrypt.hashpw(
            password.encode(), salt)  # Hash the password
        return hashed_password.decode()  # Return the hashed password as a string

    @staticmethod
    def register_user(username, password, email):
        conn = None
        try:
            conn = DB.create_connection()
            cur = conn.cursor()

            hashed_password = Auth.hash_password(
                password)  # Hash the password using bcrypt

            cur.execute("SELECT * FROM users WHERE username = %s", (username,))
            existing_user = cur.fetchone()

            if existing_user:
                return False, 'Username already exists'

            cur.execute("INSERT INTO users (username, password, email) VALUES (%s, %s, %s)",
                        (username, hashed_password, email))
            conn.commit()

            return True, 'User registered successfully'
        except Exception as e:
            return False, f'Error during registration: {e}'
        finally:
            if cur:
                cur.close()
            if conn:
                conn.close()

    @staticmethod
    def login(email:str, password:str):
        conn = None
        try:
            conn = DB.create_connection()
            cur = conn.cursor()

            cur.execute("SELECT * FROM users WHERE email = %s", (email,))
            user = cur.fetchone()

            if user:
                # Fetch the hashed password from the database
                hashed_password = user[2]
                # Verify the entered password with the stored hashed password
                if bcrypt.checkpw(password.encode(), hashed_password.encode()):
                    # Generate JWT token
                    token = jwt.encode(
                        {'email': email}, app.secret_key, algorithm='HS256')
                    print(user)

                    # Return a dictionary with success message, authToken, and username
                    return {
                        'message': 'Logged in successfully',
                        'authToken': token,
                        'email': email,
                        'username': user[1]
                    }
                    
                else:
                    # Return a dictionary for error case (invalid credentials)
                    return {'error': 'Invalid credentials'}
            else:
                # Return a dictionary for error case (invalid credentials)
                return {'error': 'Invalid credentials'}
        except Exception as e:
            # Return a dictionary for error case (other exceptions)
            return {'error': f'Error during login: {e}'}
        finally:
            if cur:
                cur.close()
            if conn:
                conn.close()

    @staticmethod
    def get_user_profile(email: str):
        conn = None
        try:
            conn = DB.create_connection()
            cur = conn.cursor()

            cur.execute("SELECT * FROM users WHERE email = %s", (email))
            user_profile = cur.fetchone()

            if user_profile:
                profile_info = {
                    'username': user_profile[1],
                    'email': user_profile[3],
                }

                return True, profile_info  # Return profile info for success
            else:
                return False, 'User profile not found'
        except Exception as e:
            return False, f'Error retrieving user profile: {e}'
        finally:
            if cur:
                cur.close()
            if conn:
                conn.close()

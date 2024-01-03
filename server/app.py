from functools import wraps
from flask import Flask, jsonify, request
import jwt
from auth import Auth
from db import DB
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
auth = Auth()


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token or not token.startswith('Bearer '):
            return jsonify({'error': 'Unauthorized'}), 401

        try:
            # Extract token part after 'Bearer '
            token = token.split('Bearer ')[1]
            decoded_token = jwt.decode(
                token, app.secret_key, algorithms=['HS256'])
            return jsonify({'decoded_token': decoded_token}), 200
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401

    return decorated


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")

    success, message = auth.register_user(username=username, password=password, email=email)

    if success:
        return jsonify({'message': message}), 201
    else:
        return jsonify({'error': message}), 400


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    response = auth.login(email=email, password=password)

    if "authToken" in response:
        # Returning the entire response dictionary
        return jsonify(response), 200
    else:
        return jsonify({"message": "Invalid Credentials"}), 401


@app.route('/medicines/new-submissions', methods=['POST']) 
def new_submission():
    data = request.json;
    print(data);
    


if __name__ == '__main__':
    DB.create_tables()
    app.run(debug=True, port=8080)

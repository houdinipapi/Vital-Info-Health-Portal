from flask import Flask, abort, jsonify, request, redirect
from auth import Auth
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
AUTH = Auth()


@app.route('/', methods=["GET"], strict_slashes=False)
def root():
    """Return a dummy JSON payload"""
    return jsonify({"message": "Welcome"})


@app.route('/register', methods=['POST'], strict_slashes=False)
def register():
    """Register new user"""
    email, password, username = request.json.get(
        'email'), request.json.get('password'), request.json.get('username')
    try:
        AUTH.register_user(email, password, username)
        return jsonify({"email": email, "message": "user created"})
    except ValueError:
        return jsonify({"message": "email already registered"}), 400


@app.route('/login', methods=['POST'], strict_slashes=False)
def login():
    """Login user"""
    email, password = request.json.get('email'), request.json.get('password')
    if AUTH.valid_login(email, password):
        response = jsonify({"email": email, "message": "logged in"})
        response.set_cookie("session_id", AUTH.create_session(email))
        
        return jsonify({"authToken": AUTH.create_session(email), "username": email })
    abort(401)


@app.route('/logout', methods=['DELETE'], strict_slashes=False)
def logout():
    """Log out user"""
    session_id = request.cookies.get("session_id")
    user = AUTH.get_user_from_session_id(session_id)
    if user is not None:
        AUTH.destroy_session(user.id)
        return redirect('/')
    abort(403)


@app.route('/profile', methods=['GET'], strict_slashes=False)
def profile():
    """Get user profile"""
    session_id = request.cookies.get('session_id')

    if session_id:
        user = AUTH.get_user_from_session_id(session_id)
        if user is not None:
            return jsonify({"email": user.email})

    abort(403)



@app.route('/forgot_password', methods=['POST'], strict_slashes=False)
def forgot_password():
    """Get password reset token"""
    email = request.json.get("email")
    reset_token = None
    try:
        reset_token = AUTH.get_reset_password_token(email)
    except ValueError:
        abort(403)
    return jsonify({"email": email, "reset_token": reset_token})


@app.route('/reset_password', methods=['PUT'], strict_slashes=False)
def reset_password():
    """Update password"""
    email = request.json.get("email")
    reset_token = request.json.get("reset_token")
    new_password = request.json.get("new_password")
    is_password_changed = False
    
    try:
        AUTH.update_password(reset_token, new_password)
        is_password_changed = True
    except ValueError:
        is_password_changed = False
    if not is_password_changed:
        abort(403)
    return jsonify({"email": email, "message": "Password updated"})


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8080, debug=True)

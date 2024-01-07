from functools import wraps
from flask import Flask, jsonify, request
from flask_cors import CORS

import jwt
from auth import Auth
from patient import Patients
from db import DB

app = Flask(__name__)
CORS(app)
auth = Auth()
patients = Patients()



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

    success, message = auth.register_user(
        username=username, password=password, email=email)

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


@app.route('/patients/<int:patient_id>', methods=['GET'])
def get_patient(patient_id):
    patient = patients.get_patient(patient_id)
    if patient:
        return jsonify({'patient': patient}), 200
    else:
        return jsonify({'error': 'Patient not found'}), 404


@app.route('/patients/new', methods=['POST'])
def add_patient():
    data = request.json

    # Perform further validation on received data if required
    if not data or 'data' not in data:
        return jsonify({'error': 'Invalid data format'}), 400

    patient_id = patients.add_patient(data['data'])
    if patient_id:
        return jsonify({'patient_id': patient_id}), 201
    else:
        return jsonify({'error': 'Failed to add patient'}), 500


@app.route('/patients/<int:patient_id>', methods=['DELETE'])
def remove_patient(patient_id):
    success = patients.remove_patient(patient_id)
    if success:
        return jsonify({'message': 'Patient removed successfully'}), 200
    else:
        return jsonify({'error': 'Failed to remove patient'}), 500


@app.route('/patients/<int:patient_id>', methods=['PUT'])
def update_patient(patient_id):
    # Assuming 'data' contains the updated patient information
    data = request.json.get('data')

    if not data:
        return jsonify({'error': 'No data provided to update'}), 400

    success = patients.update_patient_data(patient_id, data)
    if success:
        updated_patient = patients.get_patient(patient_id)
        if updated_patient:
            return jsonify({'message': 'Patient data updated successfully', 'patient': updated_patient}), 200
        else:
            return jsonify({'error': 'Failed to retrieve updated patient information'}), 500
    else:
        return jsonify({'error': 'Failed to update patient data'}), 500
    

@app.route('/patients/all', methods=['GET'])
def get_all_patients():
    all_patients = patients.get_all_patients()
    if all_patients is not None:
        return jsonify({'patients': all_patients}), 200
    else:
        return jsonify({'error': 'Failed to retrieve patients'}), 500

if __name__ == '__main__':
    DB.create_tables()
    app.run(debug=True, port=5000)

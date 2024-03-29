from functools import wraps
from flask import Flask, jsonify, request
from flask_cors import CORS

import jwt
from auth import Auth
from patient import Patients
from diagnosis import Diagnosis
from db import DB

app = Flask(__name__)
CORS(app)
auth = Auth()
patients = Patients()
diagnosis = Diagnosis()


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


@app.route('/patients/del/<int:patient_id>', methods=['DELETE'])
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


# New endpoints for Diagnosis
@app.route('/diagnosis/new', methods=['POST'])
def create_diagnosis():
    data = request.json
    patient_id = data.get('patient_id')
    
    if not patient_id:
        return jsonify({'error': 'Patient ID is required'}), 400

    diagnosis_data = data.get('data')
    if not diagnosis_data:
        return jsonify({'error': 'Diagnosis data is required'}), 400

    diagnosis_id = diagnosis.create_diagnosis(patient_id, diagnosis_data)

    if diagnosis_id:
        return jsonify({'diagnosis_id': diagnosis_id}), 201
    else:
        return jsonify({'error': 'Failed to create diagnosis'}), 500


@app.route('/diagnosis/<int:patient_id>', methods=['GET'])
def get_diagnosis(patient_id):
    patient_diagnosis = diagnosis.get_diagnosis(patient_id)
    if patient_diagnosis:
        return jsonify({'diagnosis': patient_diagnosis}), 200
    else:
        return jsonify({'error': 'Diagnosis not found for the patient'}), 201


@app.route('/diagnosis/del/<int:patient_id>', methods=['DELETE'])
def remove_diagnosis(patient_id):
    success = diagnosis.remove_diagnosis(patient_id)
    if success:
        return jsonify({'message': 'Diagnosis removed successfully'}), 200
    else:
        return jsonify({'error': 'Failed to remove diagnosis'}), 500


@app.route('/diagnosis/edit/<int:diagnosis_id>', methods=['PUT'])
def update_diagnosis(diagnosis_id):
    data = request.json.get('data')

    if not data:
        return jsonify({'error': 'No data provided to update diagnosis'}), 400

    success = diagnosis.update_diagnosis(diagnosis_id, data)
    if success:
        updated_diagnosis = diagnosis.get_diagnosis(diagnosis_id)
        if updated_diagnosis:
            return jsonify({'message': 'Diagnosis data updated successfully', 'diagnosis': updated_diagnosis}), 200
        else:
            return jsonify({'error': 'Failed to retrieve updated diagnosis information'}), 500
    else:
        return jsonify({'error': 'Failed to update diagnosis data'}), 500


@app.route('/diagnosis/all', methods=['GET'])
def all_diagnosis():
    all_diagnosis = diagnosis.all_diagnosis();
    
    if all_diagnosis:
        return jsonify({'all_diagnosis': all_diagnosis}), 200
    else:
        return jsonify({'error': 'Diagnosis data is unavailable'}), 201


if __name__ == '__main__':
    DB.create_tables()
    app.run(debug=True, port=5000)

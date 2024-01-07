import json
from db import DB


class Patients:

    @staticmethod
    def get_all_patients():
        conn = None
        try:
            conn = DB.create_connection()
            cur = conn.cursor()

            cur.execute("SELECT * FROM patients")
            patients_data = cur.fetchall()

            labeled_patients = []
            for patient in patients_data:
                patient_id, data, date_of_registration = patient

                labeled_patient = {
                    'id': patient_id,
                    'data': {
                        'firstName': data.get('firstName'),
                        'lastName': data.get('lastName'),
                        'dateOfBirth': data.get('dateOfBirth'),
                        'age': data.get('age'),
                        'email': data.get('email'),
                        'phone': data.get('phone'),
                        'address': data.get('address'),
                        'county': data.get('county'),
                        'bloodGroup': data.get('bloodGroup'),
                        'height': data.get('height'),
                        'weight': data.get('weight'),
                        'dateOfRegistration': data.get('dateOfRegistration'),
                        'timeOfRegistration': data.get('timeOfRegistration')
                    },
                    'dateOfRegistration': date_of_registration.strftime("%a, %d %b %Y %H:%M:%S GMT")
                }
                labeled_patients.append(labeled_patient)

            return labeled_patients
        except Exception as e:
            # Handle exceptions or log errors
            return []
        finally:
            if cur:
                cur.close()
            if conn:
                conn.close()
                
    @staticmethod
    def get_patient(patient_id):
        conn = None
        try:
            conn = DB.create_connection()
            cur = conn.cursor()

            cur.execute("SELECT * FROM patients WHERE id = %s", (patient_id,))
            patient = cur.fetchone()

            if patient:
                # Assuming the patient tuple contains 'id' and 'data' columns
                labeled_patient = {
                        'id': patient[0],  # Labeling ID
                        'data': {
                            'firstName': patient[1].get('firstName'),
                            'lastName': patient[1].get('lastName'),
                            'dateOfBirth': patient[1].get('dateOfBirth'),
                            'age': patient[1].get('age'),
                            'email': patient[1].get('email'),
                            'phone': patient[1].get('phone'),
                            'address': patient[1].get('address'),
                            'county': patient[1].get('county'),
                            'bloodGroup': patient[1].get('bloodGroup'),
                            'height': patient[1].get('height'),
                            'weight': patient[1].get('weight'),
                            'dateOfRegistration': patient[1].get('dateOfRegistration'),
                            'timeOfRegistration': patient[1].get('timeOfRegistration')
                        },
                        'dateOfRegistration': patient[2].strftime("%a, %d %b %Y %H:%M:%S GMT")  # Labeling date
                }
                return labeled_patient  # Return labeled patient details
            else:
                return None  # Return None if patient is not found
        except Exception as e:
            # Log the exception or handle it as needed
            return None
        finally:
            if cur:
                cur.close()
            if conn:
                conn.close()
                
        conn = None
        try:
            conn = DB.create_connection()
            cur = conn.cursor()

            cur.execute("SELECT * FROM patients WHERE id = %s", (patient_id,))
            patient = cur.fetchone()

            return patient  # Return patient details
        except Exception as e:
            # Log the exception or handle it as needed
            return None
        finally:
            if cur:
                cur.close()
            if conn:
                conn.close()

    @staticmethod
    def add_patient(data):
        conn = None
        try:
            conn = DB.create_connection()
            cur = conn.cursor()

            # Perform JSONB checks here before insertion
            required_keys = [
                "firstName", "lastName", "dateOfBirth", "age", "email",
                "phone", "address", "county", "bloodGroup", "height",
                "weight", "dateOfRegistration", "timeOfRegistration"
            ]
            if not all(key in data and isinstance(data[key], str) for key in required_keys):
                return None  # If data does not meet required structure, return None

            cur.execute("INSERT INTO patients (data) VALUES (%s) RETURNING id",
                        (json.dumps(data),))
            patient_id = cur.fetchone()[0]
            conn.commit()

            return patient_id  # Return the ID of the newly added patient
        except Exception as e:
            # Log the exception or handle it as needed
            return None
        finally:
            if cur:
                cur.close()
            if conn:
                conn.close()
                
                
    @staticmethod
    def remove_patient(patient_id):
        conn = None
        try:
            conn = DB.create_connection()
            cur = conn.cursor()

            cur.execute("DELETE FROM patients WHERE id = %s", (patient_id,))
            conn.commit()

            return True  # Return True if deletion is successful
        except Exception as e:
            # Log the exception or handle it as needed
            return False
        finally:
            if cur:
                cur.close()
            if conn:
                conn.close()

    @staticmethod
    def update_patient_data(patient_id, data):
        conn = None
        try:
            conn = DB.create_connection()
            cur = conn.cursor()

            update_query = cur.execute(
                "UPDATE patients SET data = %s WHERE id = %s")

            cur.execute(update_query, (data, patient_id))
            conn.commit()

            return True  # Return True if update is successful
        except Exception as e:
            # Log the exception or handle it as needed
            return False
        finally:
            if cur:
                cur.close()
            if conn:
                conn.close()

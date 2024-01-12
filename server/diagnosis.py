import json
from db import DB


class Diagnosis:
    @staticmethod
    def create_diagnosis(patient_id, diagnosis_data):
        conn = None
        try:
            conn = DB.create_connection()
            cur = conn.cursor()

            # Perform JSONB checks here before insertion
            required_keys = ["diagnosis_type", "diagnosis_description"]
            if not all(key in diagnosis_data and isinstance(diagnosis_data[key], str) for key in required_keys):
                return None  # If data does not meet required structure, return None

            cur.execute("INSERT INTO diagnosis (patient_id, data) VALUES (%s, %s) RETURNING id",
                        (patient_id, json.dumps(diagnosis_data)))
            diagnosis_id = cur.fetchone()[0]
            conn.commit()

            return diagnosis_id  # Return the ID of the newly added diagnosis
        except Exception as e:
            # Log the exception or handle it as needed
            return None
        finally:
            if cur:
                cur.close()
            if conn:
                conn.close()

    @staticmethod
    def get_diagnosis(patient_id):
        conn = None
        try:
            conn = DB.create_connection()
            cur = conn.cursor()

            cur.execute(
                "SELECT * FROM diagnosis WHERE patient_id = %s", (patient_id,))
            diagnosis_data = cur.fetchall()

            if not diagnosis_data:
                return "Patient has no diagnosis"
                
            labeled_diagnosis = []
            for diagnosis in diagnosis_data:
                diagnosis_id, patient_id, data, date = diagnosis

                labeled_diagnosis_entry = {
                    'id': diagnosis_id,
                    'patient_id': patient_id,
                    'data': {
                        'diagnosis_type': data.get('diagnosis_type'),
                        'diagnosis_description': data.get('diagnosis_description'),
                    },
                    'date': date.strftime("%a, %d %b %Y %H:%M:%S GMT")
                }
                labeled_diagnosis.append(labeled_diagnosis_entry)

            return labeled_diagnosis
        except Exception as e:
            # Log the exception or handle it as needed
            return None
        finally:
            if cur:
                cur.close()
            if conn:
                conn.close()

    @staticmethod
    def remove_diagnosis(diagnosis_id):
        conn = None
        try:
            conn = DB.create_connection()
            cur = conn.cursor()

            cur.execute("DELETE FROM diagnosis WHERE id = %s", (diagnosis_id,))
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
    def update_diagnosis(diagnosis_id, data):
        conn = None
        try:
            conn = DB.create_connection()
            cur = conn.cursor()

            # Perform JSONB checks here before updating
            required_keys = ["diagnosis_type", "diagnosis_description", "date"]
            if not all(key in data and isinstance(data[key], str) for key in required_keys):
                return False  # If data does not meet required structure, return False

            update_query = cur.mogrify(
                "UPDATE diagnosis SET data = %s WHERE id = %s",
                (json.dumps(data), diagnosis_id)
            )
            cur.execute(update_query)
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
    @staticmethod
    def all_diagnosis():
        conn = None
        try:
            conn = DB.create_connection()
            cur = conn.cursor()

            cur.execute("SELECT * FROM diagnosis")
            diagnosis_data = cur.fetchall()

            labeled_diagnosis = []
            for diagnosis in diagnosis_data:
                diagnosis_id, patient_id, data, date = diagnosis

                labeled_diagnosis_entry = {
                    'id': diagnosis_id,
                    'patient_id': patient_id,
                    'data': {
                        'diagnosis_type': data.get('diagnosis_type'),
                        'diagnosis_description': data.get('diagnosis_description'),
                    },
                    'date': date.strftime("%a, %d %b %Y %H:%M:%S GMT")
                }
                labeled_diagnosis.append(labeled_diagnosis_entry)

            return labeled_diagnosis
        except Exception as e:
            # Log the exception or handle it as needed
            return None
        finally:
            if cur:
                cur.close()
            if conn:
                conn.close()

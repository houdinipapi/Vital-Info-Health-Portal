# Vital Info Health Portal

 ## Medical API

This API provides a RESTful interface for managing patients and their diagnoses in a medical clinic. It includes endpoints for user registration, login, CRUD operations on patients, and CRUD operations on diagnoses. The API is built using Flask and implements JWT-based authentication to protect sensitive data.

## Prerequisites

Before running the API, you will need to install the following dependencies:

- Python 3.8 or higher
- Flask
- Flask-JWT-Extended
- Flask-Cors
- PyJWT

You can install these dependencies using pip:

```bash
pip install flask flask-jwt-extended flask-cors pyjwt
```

## Database Setup

The API uses a SQLite database to store patient and diagnosis data. The database schema is defined in the `db.py` file. To create the database tables, run the following command:

```bash
python db.py create_tables
```

## Running the API

To run the API, simply run the following command:

```bash
python app.py
```

The API will start running on port 5000.

## API Endpoints

The API provides the following endpoints:

### User Registration

```
POST /register
```

This endpoint allows users to register for an account. The request body should include the following JSON data:

```json
{
  "username": "string",
  "password": "string",
  "email": "string"
}
```

### User Login

```
POST /login
```

This endpoint allows users to log in to their account. The request body should include the following JSON data:

```json
{
  "email": "string",
  "password": "string"
}
```

### Get Patient

```
GET /patients/<int:patient_id>
```

This endpoint retrieves a patient's information based on their patient ID.

### Add Patient

```
POST /patients/new
```

This endpoint adds a new patient to the database. The request body should include the following JSON data:

```json
{
  "data": {
    "name": "string",
    "age": "int",
    "gender": "string",
    "address": "string",
    "phone": "string"
  }
}
```

### Remove Patient

```
DELETE /patients/del/<int:patient_id>
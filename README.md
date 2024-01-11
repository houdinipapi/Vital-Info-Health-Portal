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
```

 # User Authentication System with Cookies

This repository contains a simple user authentication system built with Node.js and Express. The system allows users to register and log in, and stores their authentication tokens in cookies.

## Prerequisites

To run this application, you will need the following:

* Node.js and npm installed
* A Postgres database

## Installation

1. Clone this repository to your local machine.
2. Run `npm install` to install the necessary dependencies.
3. Create a `.env` file in the root directory of the project and add the following environment variables:

```
Postgres_URI=Postgres://localhost:27017/user-auth
```

4. Start the Postgres database.
5. Run `npm start` to start the application.

## Usage

### Registration

To register a new user, send a POST request to the `/register` endpoint with the following JSON payload:

```json
{
  "username": "username",
  "email": "email@example.com",
  "password": "password"
}
```

If the registration is successful, the server will respond with a 200 status code and a JSON payload containing the user's ID and authentication token.

### Login

To log in a user, send a POST request to the `/login` endpoint with the following JSON payload:

```json
{
  "email": "email@example.com",
  "password": "password"
}
```

If the login is successful, the server will respond with a 200 status code and a JSON payload containing the user's ID and authentication token.

## Cookies

The authentication tokens are stored in cookies. When a user registers or logs in, the server sets a cookie named `authToken` with the user's authentication token. This cookie expires after 5 minutes.

The `username` and `email` are also stored in cookies named `username` and `email` respectively. These cookies also expire after 5 minutes.

## Security

This authentication system uses cookies to store authentication tokens. Cookies are vulnerable to a number of security attacks, such as cross-site scripting (XSS) and cross-site request forgery (CSRF). To mitigate these risks, it is important to implement additional security measures, such as:

* Using HTTPS to encrypt all traffic between the client and the server
* Setting the `SameSite` attribute
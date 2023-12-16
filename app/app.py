from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Set up a specific path for the SQLite database file.
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/a.db'
db = SQLAlchemy(app)

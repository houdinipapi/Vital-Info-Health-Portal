import psycopg2

DB_HOST = 'localhost'
DB_NAME = 'db'
DB_USER = 'postgres'
DB_PASSWORD = 'Pianist463'


class DB:
    @staticmethod
    def create_connection():
        conn = psycopg2.connect(
            host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASSWORD)
        return conn

    @staticmethod
    def create_tables():
        conn = DB.create_connection()
        cur = conn.cursor()

        cur.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL
            )
        ''')

        cur.execute('''
            CREATE TABLE IF NOT EXISTS patients (
                id SERIAL PRIMARY KEY,
                data JSONB CHECK (
                    jsonb_typeof(data) = 'object' AND
                    data <> 'null' AND
                    jsonb_typeof(data->'firstName') = 'string' AND
                    jsonb_typeof(data->'lastName') = 'string' AND
                    jsonb_typeof(data->'dateOfBirth') = 'string' AND
                    jsonb_typeof(data->'age') = 'string' AND
                    jsonb_typeof(data->'email') = 'string' AND
                    jsonb_typeof(data->'phone') = 'string' AND
                    jsonb_typeof(data->'address') = 'string' AND
                    jsonb_typeof(data->'county') = 'string' AND
                    jsonb_typeof(data->'bloodGroup') = 'string' AND
                    jsonb_typeof(data->'height') = 'string' AND
                    jsonb_typeof(data->'weight') = 'string' AND
                    jsonb_typeof(data->'dateOfRegistration') = 'string'
                ),
                date_of_registration TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        ''')

        cur.execute('''
            CREATE TABLE IF NOT EXISTS diagnosis (
            id SERIAL PRIMARY KEY,
            patient_id INTEGER,
            data JSONB CHECK (
                jsonb_typeof(data) = 'object' AND
                data <> 'null' AND
                jsonb_typeof(data->'diagnosis_type') = 'string' AND
                jsonb_typeof(data->'diagnosis_description') = 'string'
                ),
                date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        ''')

        conn.commit()
        cur.close()
        conn.close()


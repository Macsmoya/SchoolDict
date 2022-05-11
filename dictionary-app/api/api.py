from functools import total_ordering
import time
from flask import Flask
from flask_cors import CORS
import json 
import mariadb

#SET "PATH=C:\Program Files\MariaDB 10.6\bin;%PATH%"        



app = Flask(__name__)
CORS(app)

def get_cursor():
    # Connect to MariaDB Platform
    try:
        conn = mariadb.connect(
            user="root",
            password="Password123!",
            host="127.0.0.1",
            port=3306,
            database="dictdb"

        )
        cur = conn.cursor()
    except mariadb.Error as e:
        print(f"Error connecting to MariaDB Platform: {e}")
        sys.exit(1)
    return cur
@app.route('/api/create-user')
def create_user():
    cur = get_cursor()
    cur.execute("INSERT INTO dictdb.users VALUES ('max');")
    return "user"

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api/get-users')
def get_db():
    print("Req")
    cur = get_cursor()
    cur.execute("select * from users")
    # serialize results into JSON
    row_headers=[x[0] for x in cur.description]
    rv = cur.fetchall()
    json_data=[]
    for result in rv:
            json_data.append(dict(zip(row_headers,result)))
    cur.close()
    return json.dumps(json_data)

#TODO Fix ports #1


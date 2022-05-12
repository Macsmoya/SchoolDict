from functools import total_ordering
import time
from flask import Flask,render_template,request,redirect,url_for,flash
from flask_cors import CORS
import json 
import mariadb
import sqlite3 as sql

#SET "PATH=C:\Program Files\MariaDB 10.6\bin;%PATH%"        



app = Flask(__name__)
CORS(app)

def add_user(user):
    try:
        con = sql.connect("dict.db")
        cur = con.cursor()
        cur.execute("INSERT INTO users (UID, UNAME, EMAIL, PASSWORD, TEACHER) VALUES (NULL, ?, ?, ?, ?)",
                    (user['name'],   
                    user['email'], 
                    user['password'], 
                    user['teacher']) )
        con.commit()
    except:
        con().rollback()

    finally:
        con.close()

    return cur.lastrowid

def get_users():
    users = []
    try:
        con = sql.connect("dict.db")
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM users")
        rows = cur.fetchall()

        # convert row objects to dictionary
        for i in rows:
            user = {}
            user["user_id"] = i["user_id"]
            user["name"] = i["name"]
            user["email"] = i["email"]
            user["phone"] = i["phone"]
            user["address"] = i["address"]
            user["country"] = i["country"]
            users.append(user)

    except:
        users = []

    return users

@app.route("/")
@app.route("/index")
def index():
    con = sql.connect("dict.db")
    cur = con.cursor()
    cur.execute("SELECT * FROM users")
    data = cur.fetchall()
    return  " " + str(data)


@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}



#TODO Fix ports #1


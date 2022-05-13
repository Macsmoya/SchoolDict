from functools import total_ordering
import time
from flask import Flask,render_template,request,redirect,url_for,flash, jsonify
from flask_cors import CORS
import json 
import mariadb
import sqlite3 as sql

#SET "PATH=C:\Program Files\MariaDB 10.6\bin;%PATH%"        



app = Flask(__name__)
CORS(app)

def add_user(user):
    try:
        print('here')
        return 
        con = sql.connect("dict.db")
        cur = con.cursor()
        cur.execute("INSERT INTO users (UID, UNAME, EMAIL, PASSWORD, TEACHER) VALUES (NULL, ?, ?, ?, ?)",
                    ('max',   
                     'max@max', 
                     'pas', 
                     1) )
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
        cur = con.cursor()
        cur.execute("SELECT * FROM users")
        rows = cur.fetchall()

        # convert row objects to dictionary
        for i in rows:
            user = {}
            user["UID"] = i["UID"]
            user["UNAME"] = i["UNAME"]
            user["PASSWORD"] = i["email"]
            user["EMAIL"] = i["phone"]
            user["TEACHER"] = i["address"]

    except:
        users = []
    return jsonify(rows)

@app.route("/")
@app.route("/index")
def index():
    con = sql.connect("dict.db")
    cur = con.cursor()
    cur.execute("SELECT * FROM users")
    data = cur.fetchall()
    return  " " + str(data)

@app.route('/api/get-users')
def get_user_page():
    return get_users()

@app.route('/api/add-user')
def insert_user():
    uname = "X"
    email = "y"
    password = "z"
    teacher = 1
    try:
        conn = sql.connect("dict.db")
        cur = conn.cursor()
        cur.execute("INSERT INTO users (UID, UNAME, EMAIL, PASSWORD, TEACHER) VALUES (NULL, ?, ?, ?, ?)", (
            uname,   
            email,
            password,
            teacher
            ))
        conn.commit()
    except:
        conn().rollback()

    finally:
        conn.close()

    return "200"    



    con = sql.connect('dict.db')
    cur = con.cursor()
    cur.execute('INSERT INTO users (UID, UNAME, EMAIL, PASSWORD, TEACHER) VALUES (NULL, "MAX", "MAX@MAX", "123", true);')
    con.close()
    return "200"

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}



#TODO Fix ports #1


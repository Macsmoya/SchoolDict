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

@app.route("/")
@app.route("/index")
def index():
    con = sql.connect("dict.db")
    cur = con.cursor()
    cur.execute("SELECT * FROM users")
    data = cur.fetchall()
    return  " " + str(data)

#CRUD create for each table ---------------------------------------|
@app.route('/api/create-user/<string:uname>/<string:email>/<string:password>/<int:teacher>')
def create_user(uname: str, email: str, password: str, teacher: int):
    try:
        conn = sql.connect("dict.db")
        cur = conn.cursor()
        cur.execute("INSERT INTO users (uid, uname, email, password, teacher) VALUES (NULL, ?, ?, ?, ?)", (
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

@app.route('/api/create-word/<string:eng>/<string:tereo>/<string:desc>/<int:level>/<int:author>/<int:cat>')
def create_word(eng: str, tereo: str, desc: str, level: int, author: int, cat: int):
    try:
        conn = sql.connect("dict.db")
        cur = conn.cursor()
        cur.execute("INSERT INTO words (wordid, eng, tereo, desc, level, author, cat) VALUES (NULL, ?, ?, ?, ?, ?, ?)", (
            eng,   
            tereo,
            desc,
            level,
            author,
            cat
            ))
        conn.commit()
    except:
        conn().rollback()
    finally:
        conn.close()
    return "200"



#CRUD retreive for each table -------------------------------------|
@app.route('/api/retreive-users')
def retreive_users():
    try:
        con = sql.connect("dict.db")
        cur = con.cursor()
        cur.execute("SELECT * FROM users")
        rows = cur.fetchall()
    except:
        return {}
    return jsonify(rows)

@app.route('/api/retreive-words')
def retreive_words():
    try:
        con = sql.connect("dict.db")
        cur = con.cursor()
        cur.execute("SELECT * FROM words")
        rows = cur.fetchall()
    except:
        return {}
    return jsonify(rows)

@app.route('/api/retreive-categories')
def get_cats():
    try:
        con = sql.connect("dict.db")
        cur = con.cursor()
        cur.execute("SELECT * FROM categories")
        rows = cur.fetchall()
    except:
        return {}
    return jsonify(rows)

#CRUD update for each

#CRUD delete for each

#TODO Fix ports #1


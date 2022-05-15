from functools import total_ordering
import time
from typing import final
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

@app.route('/api/create-category/<string:name>/<string:desc>/<int:author>')
def create_category(name: str, desc: str, author: int):
    try:
        conn = sql.connect("dict.db")
        cur = conn.cursor()
        cur.execute("INSERT INTO categories (catid, name, desc, author) VALUES (NULL, ?, ?, ?)", (
            name,
            desc,
            author
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
        con.commit()
    except:
        return {}
    finally:
        con.close()
    return jsonify(rows)

@app.route('/api/retreive-words')
def retreive_words():
    try:
        con = sql.connect("dict.db")
        cur = con.cursor()
        cur.execute("SELECT * FROM words")
        rows = cur.fetchall()
        con.commit
    except:
        return {}
    finally:
        con.close()
    return jsonify(rows)

@app.route('/api/retreive-categories')
def get_cats():
    try:
        con = sql.connect("dict.db")
        cur = con.cursor()
        cur.execute("SELECT * FROM categories")
        rows = cur.fetchall()
        con.commit()
    except:
        return {}
    finally:
        con.close()
    return jsonify(rows)

@app.route('/api/get-user/<int:uid>')
def get_user_by_id(uid: int):
    try:
        con = sql.connect("dict.db")
        cur = con.cursor()
        cur.execute("SELECT * FROM users where uid = ?", (uid, ))
        con.commit()
    except:
        return {}
    finally:
        con.close()
    return jsonify(cur.fetchall()[0])

@app.route('/api/get-word/<int:id>')
def get_word_by_id(id: int):
    try:
        con = sql.connect("dict.db")
        cur = con.cursor()
        cur.execute("SELECT * FROM words where wordid = ?", (id, ))
        con.commit()
    except:
        return {}
    finally:
        con.close()
    return jsonify(cur.fetchall()[0])

@app.route('/api/get-cat/<int:id>')
def get_cat_by_id(id: int):
    try:
        con = sql.connect("dict.db")
        cur = con.cursor()
        cur.execute("SELECT * FROM categories where catid = ?", (id, ))
        con.commit()
    except:
        return {}
    finally:
        con.close()
    return jsonify(cur.fetchall()[0])

#CRUD update for each

#CRUD delete for each
@app.route('/api/delete-user/<int:id>')
def del_user_by_id(id: int):
    try:
        con = sql.connect("dict.db")
        cur = con.cursor()
        cur.execute("DELETE * FROM categories where uid = ?", (id, ))
        con.close()
    except:
        return {}
    return "200"
#TODO Fix ports #1


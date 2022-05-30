from functools import total_ordering
from typing import final
from flask import Flask,render_template,request,redirect,url_for,flash, jsonify
from flask_cors import CORS
import json 
import sqlite3 as sql
import json
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager




app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY1MzgwNjcxMSwianRpIjoiNzJhNzIyNzAtMWY0Yy00NzU0LTgyOWYtYTc5MjBiOTE3Y2QwIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InRlc3QiLCJuYmYiOjE2NTM4MDY3MTEsImV4cCI6MTY1MzgwNzYxMX0.HuYV9iwKsUU7rTs3nIFEB6fPiI0-MzA5FIgb0JkPJbc"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

jwt = JWTManager(app)




#Authentication endpoints

#Refresh jwts when they are about to expire
@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response


#Generate jwt for user
@app.route('/token', methods=["POST"])
def create_token():
    try:
        email = request.json.get("email", None)
        password = request.json.get("password", None)

        con = sql.connect("dict.db")
        cur = con.cursor()
        cur.execute("SELECT * FROM users where email = ?", (email, ))
        user = cur.fetchall()[0]
        con.commit()

        print(user[0])
        print(email + " " + password)
        
        if email != user[2] or password != user[3]:
            return {"msg": "Wrong email or password"}, 401

        access_token = create_access_token(identity=email)
        response = {"access_token":access_token, "user_id":user[0]}
        return response
    except:
        return {"msg": "Connection failed"}, 401
    finally:
        con.close()


#Log user out
@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


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
        return jsonify(cur.fetchall()[0])
    except:
        return {}
    finally:
        con.close()
    

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

#CRUD update for each TODO, not yet neccasary


#CRUD delete for each
@app.route('/api/delete-user/<int:id>')
def del_user_by_id(id: int):
    try:
        con = sql.connect("dict.db")
        cur = con.cursor()
        cur.execute("DELETE FROM users where uid = ?", (id, ))
        con.commit()
        return "200"
    except:
        return {}
    finally:
        con.close()
    

@app.route('/api/delete-word/<int:id>')
def del_word_by_id(id: int):
    try:
        con = sql.connect("dict.db")
        cur = con.cursor()
        cur.execute("DELETE FROM words where wordid=?", (id, ))
        con.commit()
    except:
        return {}
    finally:
        con.close()
    return "200"


@app.route('/api/delete-cat/<int:id>')
def del_cat_by_id(id: int):
    try:
        con = sql.connect("dict.db")
        cur = con.cursor()
        cur.execute("DELETE FROM categories WHERE catid=?", (id, ))
        con.commit()
    except:
        return "401"
    finally:
        con.close()
    return "200"



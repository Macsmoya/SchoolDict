import sqlite3 as sql

#connect to SQLite
con = sql.connect('dict.db')

#Create a Connection
cur = con.cursor()


#Create users table  in dict.db database
cur.execute("DROP TABLE IF EXISTS users")
users ='''CREATE TABLE "users" (
	"uid"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"uname"	TEXT,
	"email"	TEXT,
    "password" TEXT,
    "teacher" INTEGER
)'''
cur.execute(users)

#Create categories table  in dict.db database
cur.execute("DROP TABLE IF EXISTS categories")
categories ='''CREATE TABLE "categories" (
	"catid"	INTEGER PRIMARY KEY AUTOINCREMENT,
    "name"	TEXT NOT NULL,
	"desc"	TEXT NOT NULL,
	"author" INTEGER NOT NULL,
    FOREIGN KEY (author) REFERENCES users (uid) 
)'''
cur.execute(categories)

#Create words table  in dict.db database
cur.execute("DROP TABLE IF EXISTS words")
words ='''CREATE TABLE "words" (
	"wordid"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"eng"	TEXT NOT NULL,
	"tereo"	TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "author" INTEGER NOT NULL,
    "cat" INTEGER NOT NULL,
    FOREIGN KEY (author) REFERENCES users (uid),
    FOREIGN KEY (cat) REFERENCES categories (catid)
)'''
cur.execute(words)


#commit changes
con.commit()

#close the connection
con.close()
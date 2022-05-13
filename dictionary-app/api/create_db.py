import sqlite3 as sql

#connect to SQLite
con = sql.connect('api/dict.db')

#Create a Connection
cur = con.cursor()


#Create users table  in dict.db database
cur.execute("DROP TABLE IF EXISTS users")
users ='''CREATE TABLE "users" (
	"UID"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"UNAME"	TEXT,
	"EMAIL"	TEXT,
    "PASSWORD" TEXT,
    "TEACHER" INTEGER
)'''
cur.execute(users)

#Create categories table  in dict.db database
cur.execute("DROP TABLE IF EXISTS categories")
categories ='''CREATE TABLE "categories" (
	"CATID"	INTEGER PRIMARY KEY AUTOINCREMENT,
    "NAME"	TEXT NOT NULL,
	"DESC"	TEXT NOT NULL,
	"AUTHOR" INTEGER NOT NULL,
    FOREIGN KEY (AUTHOR) REFERENCES users (UID) 
)'''
cur.execute(categories)

#Create words table  in dict.db database
cur.execute("DROP TABLE IF EXISTS words")
words ='''CREATE TABLE "words" (
	"WORDID"	INTEGER PRIMARY KEY AUTOINCREMENT,
    
	"ENG"	TEXT NOT NULL,
	"TEREO"	TEXT NOT NULL,
    "DESC" TEXT NOT NULL,
    "LEVEL" INTEGER NOT NULL,
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "AUTHOR" INTEGER NOT NULL,
    "CAT" INTEGER NOT NULL,
    FOREIGN KEY (AUTHOR) REFERENCES users (UID),
    FOREIGN KEY (CAT) REFERENCES categories (CATID)
)'''
cur.execute(words)


#commit changes
con.commit()

#close the connection
con.close()
import pandas as pd
import sqlite3 as sql

#connect to SQLite
con = sql.connect('dict.db')

#Create a Connection
cur = con.cursor()

df=pd.read_csv('words.csv', sep=',',header=None)
dfcats=pd.read_csv('categories.csv', sep=',',header=None)

for index, row in df.iterrows():
    cur.execute("INSERT INTO words (wordid, eng, tereo, desc, level, author, cat) VALUES (NULL, ?, ?, ?, ?, ?, ?)", (
            row[1].strip(),
            row[2].strip(),
            row[3].strip(),
            row[4],
            row[5],
            row[6]
            ))
for index, row in dfcats.iterrows():
    cur.execute("INSERT INTO categories (catid, name, desc, author) VALUES (NULL, ?, ?, ?)", (
            row[1],
            row[2],
            row[3]
            ))
cur.execute("INSERT INTO users (uid, uname, email, password, teacher) VALUES (NULL, ?, ?, ?, ?)", (
            "Max",   
            "max@moir.co.nz",
            "password12",
            1
            ))
con.commit()
con.close()
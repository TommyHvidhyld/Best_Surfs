import numpy as np
from flask import Flask, render_template
import os
import psycopg2

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

# reflect an existing database into a new model
engine = create_engine("postgresql+psycopg2://postgres:postgres@localhost:5432/surf_DB")
Base = automap_base()
Base.prepare(autoload_with=engine)
Surf = Base.classes.current_surf
#################################################
# Flask Setup
#################################################
app = Flask(__name__)

# def get_db_connection():
#     conn = psycopg2.connect(host='localhost',
#                             database='surf_DB',
#                             user='postgres',
#                             password='postgres')
#     return conn

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/names<br/>"
        f"/api/v1.0/passengers"
    )

@app.route('/api/v1.0/names')
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(Surf.spot).all()

    session.close()

    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))

    return jsonify(all_names)
# def index():
#     conn = get_db_connection()
#     cur = conn.cursor()
#     cur.execute('SELECT * FROM current_surf;')
#     surf = cur.fetchall()
#     cur.close()
#     conn.close()
#     return render_template('index.html', surf=surf)


if __name__ == '__main__':
    app.run()

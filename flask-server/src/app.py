import flask
import os
import pathlib
import json
import sh
import logging
import models.util

DIR = os.path.dirname(os.path.abspath(__file__))
app = flask.Flask(__name__)

@app.route("/")
def index():

    random_value = "Tralalalal"

    return flask.render_template("index.html", header=random_value)

if __name__ == "__main__":
    app.run('127.0.0.1', port=8080, debug=True)

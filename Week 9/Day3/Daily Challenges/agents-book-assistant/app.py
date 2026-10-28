from flask import Flask, render_template

from config import connect_db
from routes.chat_routes import chat_bp

app = Flask(__name__)  

connect_db()

app.register_blueprint(chat_bp, url_prefix="/api")


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(port=5000, debug=True)
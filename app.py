from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

app = Flask(__name__)
app.config["SECRET_KEY"] = "secret"
app.config["DEBUG_TB_INTERCEPT_REDIRECTS"] = False

debug = DebugToolbarExtension(app)

boggle_game = Boggle()


@app.route("/")
def play_game():

    board = boggle_game.make_board()  # should this be saved to Session? Yes.
    session["board"] = board

    return render_template("board.html", board=board)


@app.route("/check-word/")
def check_word():
    word = request.args["word"]
    board = session["board"]
    response = boggle_game.check_valid_word(board, word)
    # print("*********************")
    # print(response)
    # print("*********************")
    # check the word against your class here...
    return response

from flask import Flask, request, render_template, redirect, flash, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

app = Flask(__name__)
app.config["SECRET_KEY"] = "secrets"
app.config["DEBUG_TB_INTERCEPT_REDIRECTS"] = False

debug = DebugToolbarExtension(app)

boggle_game = Boggle()


@app.route("/")
def play_game():
    """ Initialize game with new board stored in Session """
    board = boggle_game.make_board()
    session["board"] = board
    game_plays = session.get("game_plays", 0)
    high_score = session.get("highscore", 0)
    return render_template(
        "board.html", board=board, game_plays=game_plays, high_score=high_score
    )


@app.route("/check-word/")
def check_word():
    """ check if submitted word is valid """
    word = request.args["word"]
    board = session["board"]
    response = boggle_game.check_valid_word(board, word)
    return response


@app.route("/end-game/")
def end_game():
    """ end game by if new high score and incrementing game plays"""

    score = request.args["score"]

    high_score = session.get("high_score", 0)
    session['high_score'] = max(score, high_score)

    game_plays = session.get("game_plays", 0)
    session['game_plays'] = game_plays + 1
   
    return jsonify(high_score=high_score, game_plays=game_plays)

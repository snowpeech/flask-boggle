from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

class start_game(TestCase):
    """ testing start of game"""
    def test_session(self):
        with app.test_client() as client:
            resp = client.get("/")

            self.assertEqual(resp.status_code, 200)
            self.assertEqual(session['count'], 1)
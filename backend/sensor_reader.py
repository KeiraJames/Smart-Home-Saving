import os
import json
import firebase_admin
from firebase_admin import credentials, db


fb_key_json = os.environ.get("FIREBASE_KEY")
fb_key = json.loads(fb_key_json)

cred = credentials.Certificate(fb_key)


# BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# fb_key = os.path.join(BASE_DIR, "firebase_key.json")

# cred = credentials.Certificate(fb_key) 

firebase_admin.initialize_app(cred, 
{
     "databaseURL": "https://smart-home-savings-default-rtdb.firebaseio.com"
})

def read_sensor():
    """
    Fetches the MOST RECENT temperature and humidity reading from Firebase
    """
    reference = db.reference("readings")
    data = reference.order_by_key().limit_to_last(1).get()

    if not data: # if empty
        return None, None

    last_key = list(data.keys())[0]
    reading = data[last_key]

    return reading.get("temperature"), reading.get("humidity")

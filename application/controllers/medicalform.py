import string
import random
import uuid
import base64, re
import binascii
import aiohttp
import copy
from gatco.response import json, text, html, file
from application.extensions import apimanager
from application.database import db
from application.models.models import *


from application.server import app
#from gatco_apimanager.helpers import to_dict

import time
from math import floor
from application.client import HTTPClient
from application.extensions import auth, jinja
import ujson


@app.route('/medicalform/qr/<id>', methods=['GET'])
async def medicalform_index(request, id):
    print("cuakhau_id")
    return jinja.render('medicalform/index.html', request)

@app.route('/medicalform/form/<lang>', methods=['GET'])
async def medicalform_form(request, lang):
    if lang in ["vi", "cn", "en"]:
        return jinja.render('medicalform/form_' + lang + '.html', request)
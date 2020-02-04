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

from sqlalchemy.sql.expression import except_
import time
from math import floor
from application.client import HTTPClient
from sqlalchemy import or_, and_, desc
from application.extensions import auth
import ujson
import xlrender


@app.route('/exportexcel/test', methods=['GET'])
async def get_token(request):
    filename = "test.xlsx"
    deffile = "sample.json"
    template = "sample.xlsx"
    render = xlrender.xlrender(template, deffile)
    data = {
        "data": []
    }

    headerobj = {
        "chuquan": "HANOI",
        "tendonvi": "ABC",
        #"ngaybaocao": u"..., ngày " + "" + " tháng " + "" + " năm " + str(baocao.nambaocao)
        "ngaybaocao": '....., ngày %d tháng %d năm %d' % (1,2,2020),
        "tungaydenngay": ""
    }
    
    render.put_area("header", ujson.dumps( headerobj))
    render.save(filename)
    # return send_file(filename, mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    #     attachment_filename='ds-cuakhau.xlsx', as_attachment=True)

    return await file(filename, mime_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        filename='ds-cuakhau.xlsx')
    
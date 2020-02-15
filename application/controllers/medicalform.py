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
from gatco_apimanager.views.sqlalchemy.helpers import to_dict
import time
from math import floor
from application.client import HTTPClient
from application.extensions import auth, jinja
import ujson
from expiringdict import ExpiringDict
expcache = ExpiringDict(max_len = 2000, max_age_seconds=30*1)

from application.models.models import ToKhaiYTe,BaoCaoTongHopNghiNgoNhiemBenhNhomA
from . import auth_func

def get_cuakhau_info(cuakhau_id):
    cuakhau_id = int(cuakhau_id)
    obj = expcache.get('cuakhau_' + str(cuakhau_id))
    if obj is None:
        cuakhau = CuaKhau.query.filter(CuaKhau.id == cuakhau_id).first()
        donvi = cuakhau.donvi
        obj = {
            "id": cuakhau_id,
            "tencuakhau": cuakhau.ten,
            "donvi_id": cuakhau.donvi_id,
            "tendonvi": donvi.ten
        }

        expcache['cuakhau_' + str(cuakhau_id)] = obj
    return obj
    
@app.route('/medicalform/qr/<cuakhau_id>', methods=['GET'])
async def medicalform_index(request, cuakhau_id):
    data = get_cuakhau_info(cuakhau_id)
    return jinja.render('medicalform/index.html', request, **data)


@app.route('/medicalform/form/<lang>/<cuakhau_id>', methods=['GET'])
async def medicalform_form(request, lang, cuakhau_id):

    print('lang--------------------------------------------------', lang)
    if lang in ["vi", "cn", "en"]:
        # data = {
        #     "cuakhau_id": cuakhau_id
        # }
        # cuakhau = CuaKhau.query.filter(CuaKhau.id == cuakhau_id).first()
        data = get_cuakhau_info(cuakhau_id)
        data["ngon_ngu"] = lang
        # print(cuakhau)
        # data = {
        #     "cuakhau_id": cuakhau_id,
        #     "tencuakhau":cuakhau.ten,
        #     "donvi_id": cuakhau.donvi_id,
        #     "ngon_ngu": lang
        # }
        return jinja.render('medicalform/form_' + lang + '.html', request, **data)

@app.route('/medicalform/qr/<cuakhau_id>/history')
async def medicalform_index_history(request, cuakhau_id):
    return jinja.render('medicalform/index.html', request)
@app.route('/medicalform/form/<lang>/<cuakhau_id>/history')
async def medicalform_form_history(request, lang, cuakhau_id):
    return jinja.render('medicalform/form_' + lang + '.html', request)


@app.route('/medicalform/search', methods=['POST'])
async def timkiem(request):
    data = request.json
    tokhaiyte = db.session.query(ToKhaiYTe).filter(ToKhaiYTe.cmtnd.ilike('%'+data['hochieu']+'%')).\
        filter(ToKhaiYTe.cuakhau_id == data['cuakhau_id']).\
        order_by(ToKhaiYTe._created_at).first()
   
    if tokhaiyte is not None:
        return json(to_dict(tokhaiyte))
    
    return json({"error_code": "NOT_FOUND"}, status=404)



@app.route('/medicalform/create', methods=["POST"])
def create_tokhaiyte(request):
    data = request.json
    id = generation_id()

    cuakhau_id = data.get("cuakhau_id")
    if cuakhau_id is None:
        return text("Not found", status=404)
    
    cuakhau = get_cuakhau_info(cuakhau_id)
    data["donvi_id"] = cuakhau.get("donvi_id")
    data["tendonvi"] = cuakhau.get("tendonvi")
    data["tencuakhau"] = cuakhau.get("tencuakhau")

    new_tokhaiyte = ToKhaiYTe()
    new_tokhaiyte.id = id

    for key in data:
        if (key != "id") and hasattr(new_tokhaiyte, key):
            setattr(new_tokhaiyte, key, data.get(key))

    db.session.add(new_tokhaiyte)
    db.session.commit()
    result = to_dict(new_tokhaiyte)
    return json(result)



def int_to_base36(num):
    """Converts a positive integer into a base36 string."""
    assert num >= 0
    digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    res = ''
    while not res or num > 0:
        num, i = divmod(num, 36)
        res = digits[i] + res
        
    return res
def generation_id():
    time_gen = floor(time.time()) - 1577811600
    id = int_to_base36(time_gen)
    number_rd = random.randint(1, 1295)
    print('-----',time_gen)
    id += int_to_base36(number_rd)
    return id

def tokhaiyte_gen_id(request=None, Model=None, data=None, **kw):

    data["id"] = generation_id()


apimanager.create_api(ToKhaiYTe,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    #preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func,tokhaiyte_gen_id], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    
    #results_per_page=30,
    collection_name='tokhaiyte')








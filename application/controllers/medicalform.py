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
from application.models.models import ToKhaiYTe,BaoCaoTongHopNghiNgoNhiemBenhNhomA
 
def auth_func(**kw):
    pass
@app.route('/medicalform/qr/<id>', methods=['GET'])
async def medicalform_index(request, id):
    print("cuakhau_id")
    return jinja.render('medicalform/index.html', request)
@app.route('/medicalform/form/<lang>', methods=['GET'])
async def medicalform_form(request, lang):
    if lang in ["vi", "cn", "en"]:
        return jinja.render('medicalform/form_' + lang + '.html', request)


apimanager.create_api(ToKhaiYTe,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    #preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    
    #results_per_page=30,
    collection_name='tokhaiyte')
# apimanager.create_api(BaoCaoTongHopNghiNgoNhiemBenhNhomA,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     #preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    
#     #results_per_page=30,
#     collection_name='baocaotonghopnghingonhiembenh')

apimanager.create_api(BaoCaoNghiNgoNhiemBenh,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    #preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    
    #results_per_page=30,
    collection_name='baocaonghingonhiembenh')


apimanager.create_api(BaoCaoNghiNgoNhiemBenhXetNghiem,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    #preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    
    #results_per_page=30,
    collection_name='baocaonghingonhiembenhxetnghiem')

apimanager.create_api(BaoCaoNghiNgoNhiemBenhQuocGia,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    #preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    
    #results_per_page=30,
    collection_name='baocaonghingonhiembenhquocgia')


apimanager.create_api(BaoCaoNghiNgoNhiemBenhVacxin,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    #preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    
    #results_per_page=30,
    collection_name='baocaonghingonhiembenhvacxin')


apimanager.create_api(BaoCaoNghiNgoNhiemBenhNguoiTiepXuc,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    #preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    
    #results_per_page=30,
    collection_name='baocaonghingonhiembenhnguoitiepxuc')

apimanager.create_api(BaoCaoTongHopNghiNgoNhiemBenhNhomA,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    #preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    
    #results_per_page=30,
    collection_name='baocaotonghopnghingonhiembenhnhomA')


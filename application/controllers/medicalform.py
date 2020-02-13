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
from application.models.models import ToKhaiYTe,BaoCaoTongHopNghiNgoNhiemBenhNhomA
from . import auth_func

    
@app.route('/medicalform/qr/<cuakhau_id>', methods=['GET'])
async def medicalform_index(request, cuakhau_id):
    data = {
        "cuakhau_id": cuakhau_id
    }
    return jinja.render('medicalform/index.html', request, **data)


@app.route('/medicalform/form/<lang>/<cuakhau_id>', methods=['GET'])
async def medicalform_form(request, lang, cuakhau_id):

    print('lang--------------------------------------------------', lang)
    if lang in ["vi", "cn", "en"]:
        data = {
            "cuakhau_id": cuakhau_id
        }
        cuakhau = CuaKhau.query.filter(CuaKhau.id == cuakhau_id).first()
        print(cuakhau)
        data = {
            "cuakhau_id": cuakhau_id,
            "tencuakhau":cuakhau.ten,
            "donvi_id": cuakhau.donvi_id
        }
        return jinja.render('medicalform/form_' + lang + '.html', request, **data)

@app.route('/medicalform/form/<lang>/<cuakhau_id>/<tokhai_id>', methods=['GET'])
async def medicalform_form(request, lang, cuakhau_id,tokhai_id):
    tokhai = ToKhaiYTe.query.filter(ToKhaiYTe.id == tokhai_id).first()
    cuakhau = CuaKhau.query.filter(CuaKhau.id == cuakhau_id).first()
    data = {
        "id": tokhai.id,
        "ngaykekhai": tokhai.ngaykekhai,
        "hoten": tokhai.hoten,
        "gioitinh": tokhai.gioitinh,
        "quoctich": tokhai.quoctich,
        "namsinh":tokhai.namsinh,
        "sohochieu": tokhai.sohochieu,
        "thongtindilai_taubay":tokhai.thongtindilai_taubay,
        "thongtindilai_tauthuyen": tokhai.thongtindilai_tauthuyen,
        "thongtindilai_oto":tokhai.thongtindilai_oto,
        "thongtindilai_khac": tokhai.thongtindilai_khac,
        "thongtindilai_chitiet": tokhai.thongtindilai_chitiet,
        "sohieu_phuongtien": tokhai.sohieu_phuongtien,
        "soghe_phuongtien": tokhai.soghe_phuongtien,
        "ngay_khoihanh": tokhai.ngay_khoihanh,
        "ngay_nhapcanh": tokhai.ngay_nhapcanh,
        "noi_khoihanh": tokhai.noi_khoihanh,
        "noiden": tokhai.noiden,
        "quocgiadiqua":tokhai.quocgiadiqua,
        "diachi_taivietnam": tokhai.diachi_taivietnam,
        "sodienthoai": tokhai.sodienthoai,
        "email": tokhai.email,
        "dauhieubenh_sot": tokhai.dauhieubenh_sot,
        "dauhieubenh_ho": tokhai.dauhieubenh_ho,
        "dauhieubenh_khotho": tokhai.dauhieubenh_khotho,
        "dauhieubenh_dauhong": tokhai.dauhieubenh_dauhong,
        "dauhieubenh_buonnon": tokhai.dauhieubenh_buonnon,
        "dauhieubenh_tieuchay": tokhai.dauhieubenh_tieuchay,
        "dauhieubenh_xuathuyetngoaida": tokhai.dauhieubenh_xuathuyetngoaida,
        "vacxin_dasudung": tokhai.vacxin_dasudung,
        "tiepxuc_dongvat": tokhai.tiepxuc_dongvat,
        "chamsocnguoibenhtruyennhiem": tokhai.chamsocnguoibenhtruyennhiem,
        "cuakhau_id": cuakhau_id,
        "tencuakhau":cuakhau.ten,
        "donvi_id": cuakhau.donvi_id,
        "lang":lang
    }
    return jinja.render('medicalform/form_' + lang + '.html', request, **data)

@app.route('/api/v1/timkiem', methods=['POST'])
async def login(request):
    data = request.json
    tokhaiyte = db.session.query(ToKhaiYTe).filter(ToKhaiYTe.sohochieu == data['hochieu']).all()
    result = []
    for _ in tokhaiyte:
        result.append(to_dict(_))
    return json(result)

@app.route('/medicalform/qr/<cuakhau_id>/<tokhai_id>', methods=['GET'])
async def medicalform_index2(request,cuakhau_id, tokhai_id):
    tokhai = ToKhaiYTe.query.filter(ToKhaiYTe.id == tokhai_id).first()
    cuakhau = CuaKhau.query.filter(CuaKhau.id == cuakhau_id).first()
    data = {
        "id": tokhai.id,
        "tencuakhau": tokhai.tencuakhau,
        "ngaykekhai": tokhai.ngaykekhai,
        "sohochieu": tokhai.sohochieu,
        "ten": tokhai.hoten,
        "cuakhau_id": cuakhau_id,

    }
    return jinja.render('medicalform/index.html', request, **data)


async def create_tokhaiyte(request=None, Model=None, result=None, **kw):
    data = request.json
    if data['id'] is None:
        data['id'] = str(uuid.uuid4())
        result = data

def int_to_base36(num):
    """Converts a positive integer into a base36 string."""
    assert num >= 0
    digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    res = ''
    while not res or num > 0:
        num, i = divmod(num, 36)
        res = digits[i] + res
        
    return res
def generation_id(request=None, Model=None, result=None, **kw):
    time_gen = floor(time.time()) - 1577811600
    order_id = int_to_base36(time_gen)
    number_rd = random.randint(1, 1295)
    print('-----',time_gen)
    order_id += int_to_base36(number_rd)
    # if len(order_id)
    print('xxxxxxxxxxxxxxxxxxxxxx',order_id)
    data = request.json
    if data['id'] is None:
        data['id'] = order_id
        result = data

apimanager.create_api(ToKhaiYTe,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    #preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func,generation_id], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    
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




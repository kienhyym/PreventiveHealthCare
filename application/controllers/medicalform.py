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
            "donvi_id": cuakhau.donvi_id,
            "ngon_ngu": lang
        }
        return jinja.render('medicalform/form_' + lang + '.html', request, **data)

@app.route('/medicalform/qr/<cuakhau_id>/history')
async def medicalform_index_history(request, cuakhau_id):
    return jinja.render('medicalform/index.html', request)
@app.route('/medicalform/form/<lang>/<cuakhau_id>/history')
async def medicalform_form_history(request, lang, cuakhau_id):
    return jinja.render('medicalform/form_' + lang + '.html', request)

# @app.route('/medicalform/form/<lang>/<cuakhau_id>/<tokhai_id>', methods=['GET'])
# async def medicalform_form(request, lang, cuakhau_id,tokhai_id):
#     tokhai = ToKhaiYTe.query.filter(ToKhaiYTe.id == tokhai_id).first()
#     cuakhau = CuaKhau.query.filter(CuaKhau.id == cuakhau_id).first()
#     data = {
#         "id": tokhai.id,
#         "ngaykekhai": tokhai.ngaykekhai,
#         "hoten": tokhai.hoten,
#         "gioitinh": tokhai.gioitinh,
#         "quoctich": tokhai.quoctich,
#         "namsinh":tokhai.namsinh,
#         "cmtnd": tokhai.cmtnd,
#         "thongtindilai_taubay":tokhai.thongtindilai_taubay,
#         "thongtindilai_tauthuyen": tokhai.thongtindilai_tauthuyen,
#         "thongtindilai_oto":tokhai.thongtindilai_oto,
#         "thongtindilai_khac": tokhai.thongtindilai_khac,
#         "thongtindilai_chitiet": tokhai.thongtindilai_chitiet,
#         "sohieu_phuongtien": tokhai.sohieu_phuongtien,
#         "soghe_phuongtien": tokhai.soghe_phuongtien,
#         "ngay_khoihanh": tokhai.ngay_khoihanh,
#         "ngay_nhapcanh": tokhai.ngay_nhapcanh,
#         "noi_khoihanh": tokhai.noi_khoihanh,
#         "noiden": tokhai.noiden,
#         "quocgiadiqua":tokhai.quocgiadiqua,
#         "diachi_taivietnam": tokhai.diachi_taivietnam,
#         "sodienthoai": tokhai.sodienthoai,
#         "email": tokhai.email,
#         "dauhieubenh_sot": tokhai.dauhieubenh_sot,
#         "dauhieubenh_ho": tokhai.dauhieubenh_ho,
#         "dauhieubenh_khotho": tokhai.dauhieubenh_khotho,
#         "dauhieubenh_dauhong": tokhai.dauhieubenh_dauhong,
#         "dauhieubenh_buonnon": tokhai.dauhieubenh_buonnon,
#         "dauhieubenh_tieuchay": tokhai.dauhieubenh_tieuchay,
#         "dauhieubenh_xuathuyetngoaida": tokhai.dauhieubenh_xuathuyetngoaida,
#         "dauhieubenh_phatban": tokhai.dauhieubenh_phatban,

#         "vacxin_dasudung": tokhai.vacxin_dasudung,
#         "tiepxuc_dongvat": tokhai.tiepxuc_dongvat,
#         "chamsocnguoibenhtruyennhiem": tokhai.chamsocnguoibenhtruyennhiem,
#         "cuakhau_id": cuakhau_id,
#         "tencuakhau":cuakhau.ten,
#         "donvi_id": cuakhau.donvi_id,
#         "ngon_ngu":tokhai.ngon_ngu
#     }
#     return jinja.render('medicalform/form_' + lang + '.html', request, **data)

@app.route('/api/v1/timtokhaiyte', methods=['POST'])
async def timkiem(request):
    data = request.json
    tokhaiyte = db.session.query(ToKhaiYTe).filter(ToKhaiYTe.cmtnd == data['hochieu']).all()
    result = []
    for _ in tokhaiyte:
        result.append(to_dict(_))
    return json(result)

# @app.route('/medicalform/qr/<cuakhau_id>/<tokhai_id>', methods=['GET'])
# async def medicalform_index2(request,cuakhau_id, tokhai_id):
#     tokhai = ToKhaiYTe.query.filter(ToKhaiYTe.id == tokhai_id).first()
#     cuakhau = CuaKhau.query.filter(CuaKhau.id == cuakhau_id).first()
#     data = {
#         "id": tokhai.id,
#         "tencuakhau": tokhai.tencuakhau,
#         "ngaykekhai": tokhai.ngaykekhai,
#         "cmtnd": tokhai.cmtnd,
#         "ten": tokhai.hoten,
#         "cuakhau_id": cuakhau_id,

#     }
#     return jinja.render('medicalform/index.html', request, **data)

def get_cuakhau_info(cuakhau_id):
    cuakhau = CuaKhau.query.filter(CuaKhau.id == cuakhau_id).first();
    donvi = cuakhau.donvi
    obj = {
        "id": cuakhau_id,
        "tencuakhau": cuakhau.ten,
        "donvi_id": cuakhau.donvi_id,
        "tendonvi": donvi.ten
    }

    return obj

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




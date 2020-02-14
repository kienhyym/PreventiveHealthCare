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
        "cmtnd": tokhai.cmtnd,
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
        "dauhieubenh_phatban": tokhai.dauhieubenh_phatban,

        "vacxin_dasudung": tokhai.vacxin_dasudung,
        "tiepxuc_dongvat": tokhai.tiepxuc_dongvat,
        "chamsocnguoibenhtruyennhiem": tokhai.chamsocnguoibenhtruyennhiem,
        "cuakhau_id": cuakhau_id,
        "tencuakhau":cuakhau.ten,
        "donvi_id": cuakhau.donvi_id,
        "ngon_ngu":tokhai.ngon_ngu
    }
    return jinja.render('medicalform/form_' + lang + '.html', request, **data)

@app.route('/api/v1/timkiem', methods=['POST'])
async def timkiem(request):
    data = request.json
    tokhaiyte = db.session.query(ToKhaiYTe).filter(ToKhaiYTe.cmtnd == data['hochieu']).all()
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
        "cmtnd": tokhai.cmtnd,
        "ten": tokhai.hoten,
        "cuakhau_id": cuakhau_id,

    }
    return jinja.render('medicalform/index.html', request, **data)


@app.route('/api/v1/create_tokhaiyte', methods=["POST"])
def create_tokhaiyte(request):
    data = request.json
    id = generation_id()
    print("========IDDDDDDDDDDDDĐ===========", id)
    new_tokhaiyte = ToKhaiYTe()
    new_tokhaiyte.id = id
    new_tokhaiyte.ngaykekhai = data["ngaykekhai"]
    new_tokhaiyte.cuakhau_id = data["cuakhau_id"]
    new_tokhaiyte.tencuakhau = data["tencuakhau"]
    new_tokhaiyte.donvi_id = data["donvi_id"]
    new_tokhaiyte.hoten = data["hoten"]
    new_tokhaiyte.namsinh = data["namsinh"]
    new_tokhaiyte.gioitinh = data["gioitinh"]
    new_tokhaiyte.quoctich = data["quoctich"]
    new_tokhaiyte.cmtnd = data["cmtnd"]
    new_tokhaiyte.thongtindilai_taubay = data["thongtindilai_taubay"]
    new_tokhaiyte.thongtindilai_tauthuyen = data["thongtindilai_tauthuyen"]
    new_tokhaiyte.thongtindilai_oto = data["thongtindilai_oto"]
    new_tokhaiyte.thongtindilai_khac = data["thongtindilai_khac"]
    new_tokhaiyte.thongtindilai_chitiet = data["thongtindilai_chitiet"]
    new_tokhaiyte.sohieu_phuongtien = data["sohieu_phuongtien"]
    new_tokhaiyte.soghe_phuongtien = data["soghe_phuongtien"]
    new_tokhaiyte.ngay_khoihanh = data["ngay_khoihanh"]
    new_tokhaiyte.ngay_nhapcanh = data["ngay_nhapcanh"]
    new_tokhaiyte.noi_khoihanh = data["noi_khoihanh"]
    new_tokhaiyte.noiden = data["noiden"]
    new_tokhaiyte.quocgiadiqua = data["quocgiadiqua"]
    new_tokhaiyte.diachi_taivietnam = data["diachi_taivietnam"]
    new_tokhaiyte.sodienthoai = data["sodienthoai"]
    new_tokhaiyte.email = data["email"]
    new_tokhaiyte.dauhieubenh_sot = data["dauhieubenh_sot"]
    new_tokhaiyte.dauhieubenh_ho = data["dauhieubenh_ho"]
    new_tokhaiyte.dauhieubenh_khotho = data["dauhieubenh_khotho"]
    new_tokhaiyte.dauhieubenh_dauhong = data["dauhieubenh_dauhong"]
    new_tokhaiyte.dauhieubenh_buonnon = data["dauhieubenh_buonnon"]
    new_tokhaiyte.dauhieubenh_tieuchay = data["dauhieubenh_tieuchay"]
    new_tokhaiyte.dauhieubenh_xuathuyetngoaida = data["dauhieubenh_xuathuyetngoaida"]
    new_tokhaiyte.dauhieubenh_phatban = data["dauhieubenh_phatban"]
    new_tokhaiyte.vacxin_dasudung = data["vacxin_dasudung"]
    new_tokhaiyte.tiepxuc_dongvat = data["tiepxuc_dongvat"]
    new_tokhaiyte.chamsocnguoibenhtruyennhiem = data["chamsocnguoibenhtruyennhiem"]
    new_tokhaiyte.tiepxuc_dongvat = data["tiepxuc_dongvat"]
    new_tokhaiyte.ngon_ngu = data["ngon_ngu"]
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




import string
import random
import uuid
import base64, re
import binascii
import aiohttp
import copy
import math
from gatco.response import json, text, html, file
from application.extensions import apimanager
from application.database import db
from application.models.models import *
from application.server import app
from gatco_apimanager.views.sqlalchemy.helpers import to_dict
import time
from datetime import datetime, timedelta, date
from math import floor
from application.client import HTTPClient
from application.extensions import auth, jinja
import ujson
from sqlalchemy import or_, and_
from sqlalchemy.orm import aliased, joinedload_all
from .user_api import current_user as currentUser
from .export import exportthongkenghingonhiembenhnhoma
from . import auth_func

chitieu_nghingonhiembenhnhoma = [
				{"name":"sohanhkhachkhaibao", "text": "Số lượt khách khai báo y tế"},
				{"name":"songuoinghingo", "text": "Trường hợp nghi ngờ mắc bệnh truyền nhiễm"},
                {"name":"songuoidangcachlytaptrung", "text": "Số người cách ly tập trung"},
                # {"name":"songuoidangcachlytaptrung_cotrieuchung", "text": "Số người cách ly tập trung, có triệu chứng"},
                {"name":"sochuyenbay", "text": "Số lượng chuyến bay nhập"},
			]


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
    collection_name='baocaotonghopnghingonhiembenhnhoma')

apimanager.create_api(DiaDiemCachLyTapTrung,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # results_per_page=30,
    collection_name='diadiemcachlytaptrung')

apimanager.create_api(TruongHopCachLyTapTrung,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    # results_per_page=30,
    collection_name='truonghopcachlytaptrung')


async def get_baocaotonghopnghingonhiembenhnhoma_donvi(request):
    donvi_id = request.args.get("donvi_id", None)
    ngaybaocao = request.args.get("ngaybaocao", None)

    if (donvi_id is None) or (ngaybaocao is None):
        return text("Tham số không hợp lệ", status=520)
    
    donvi_id = int(donvi_id)
    donvi = db.session.query(DonVi).filter(DonVi.id == donvi_id).first()
    if (donvi is None):
        return text("Tham số không hợp lệ", status=520)

    danhsach_org = db.session.query(CuaKhau).filter(CuaKhau.donvi_id == donvi_id).all()
    
    if danhsach_org is None:
        return text("Không tìm thấy cửa khẩu", status=520)

    listbaocao = db.session.query(BaoCaoTongHopNghiNgoNhiemBenhNhomA).filter(and_(BaoCaoTongHopNghiNgoNhiemBenhNhomA.donvi_id == donvi_id,BaoCaoTongHopNghiNgoNhiemBenhNhomA.ngaybaocao == ngaybaocao)).all()
    if listbaocao is None:
        return text("Chưa có báo cáo của các đơn vị", status=520)

    resp = {
        "ngaybaocao": ngaybaocao,
        "nambaocao": 2020,
        "donvi_id": donvi_id,
        "madonvi": donvi.ma,
        "tendonvi": donvi.ten,

        "cuakhau_data": []
    }

    # for baocao in listbaocao:
    #     if baocao.loaibaocao == 1:
    #         resp["songuoidangcachlytaptrung"] = baocao.songuoidangcachlytaptrung
    #         resp["songuoidangcachlytaptrung_cotrieuchung"] = baocao.songuoidangcachlytaptrung_cotrieuchung
    #         resp["diadiemcachlytaptrung"] = baocao.diadiemcachlytaptrung
    #         resp["songuoihetcachly"] = baocao.songuoihetcachly
    #         break

    for cuakhau in danhsach_org:
        ckobj = {
            "id": cuakhau.id,
            "ngaybaocao": ngaybaocao,
            "loaibaocao": 2,
            "donvi_id": donvi_id,
            "madonvi": donvi.ma,
            "tendonvi": donvi.ten,
            "cuakhau_id": cuakhau.id,
            "tencuakhau": cuakhau.ten,
            "macuakhau": cuakhau.ma,
            "songuoinhapcanh": None,
            "sohanhkhachkhaibao": None,
            "sochuyenbay": None,
            "songuoinghingo": None,

            "songuoidangcachlytaptrung": None,
            "songuoidangcachlytaptrung_cotrieuchung": None,
            "diadiemcachlytaptrung": None,
            "songuoihetcachly": None,
            "songuoicachlytainha": None
        }
        # foundck = False
        for baocao in listbaocao:
            # foundck = True
            if (cuakhau.id == baocao.cuakhau_id):
                ckobj["songuoinhapcanh"] = baocao.songuoinhapcanh
                ckobj["sohanhkhachkhaibao"] = baocao.sohanhkhachkhaibao
                ckobj["sochuyenbay"] = baocao.sochuyenbay
                ckobj["songuoinghingo"] = baocao.songuoinghingo

                ckobj["songuoidangcachlytaptrung"] = baocao.songuoidangcachlytaptrung
                ckobj["songuoidangcachlytaptrung_cotrieuchung"] = baocao.songuoidangcachlytaptrung_cotrieuchung
                ckobj["songuoihetcachly"] = baocao.songuoihetcachly
                ckobj["songuoicachlytainha"] = baocao.songuoicachlytainha

                break

        resp["cuakhau_data"].append(ckobj)

    return json(resp)

async def post_baocaotonghopnghingonhiembenhnhoma_donvi(request):
    data = request.json
    ngaybaocao = data.get("ngaybaocao")
    donvi_id = data.get("donvi_id")
    

    listdata = []
    # listdata.append({
    #     "ngaybaocao": ngaybaocao,
    #     "loaibaocao": 1,
    #     "donvi_id": donvi_id,
    #     "madonvi": data.get("madonvi"),
    #     "tendonvi": data.get("tendonvi"),
    #     "cuakhau_id": None,
    #     "tencuakhau": None,
    #     "macuakhau": None,
    #     # "songuoidangcachlytaptrung": data.get("songuoidangcachlytaptrung"),
    #     # "songuoidangcachlytaptrung_cotrieuchung": data.get("songuoidangcachlytaptrung_cotrieuchung"),
    #     # "diadiemcachlytaptrung": data.get("diadiemcachlytaptrung"),
    #     # "songuoihetcachly": data.get("songuoihetcachly"),
    #     # "songuoicachlytainha": data.get("songuoicachlytainha")
    # })


    for ckobj in data.get("cuakhau_data"):
        if "id" in ckobj:
            del(ckobj["id"])
        listdata.append(ckobj)

    

    for obj in listdata:
        item = None
        if obj["loaibaocao"] ==  1:
            item = BaoCaoTongHopNghiNgoNhiemBenhNhomA.query.filter(BaoCaoTongHopNghiNgoNhiemBenhNhomA.donvi_id == obj["donvi_id"]).\
                filter(BaoCaoTongHopNghiNgoNhiemBenhNhomA.loaibaocao == obj["loaibaocao"]).\
                filter(BaoCaoTongHopNghiNgoNhiemBenhNhomA.ngaybaocao == obj["ngaybaocao"]).first()

        if obj["loaibaocao"] ==  2:
            item = BaoCaoTongHopNghiNgoNhiemBenhNhomA.query.filter(BaoCaoTongHopNghiNgoNhiemBenhNhomA.donvi_id == obj["donvi_id"]).\
                filter(BaoCaoTongHopNghiNgoNhiemBenhNhomA.cuakhau_id == obj["cuakhau_id"]).\
                filter(BaoCaoTongHopNghiNgoNhiemBenhNhomA.loaibaocao == obj["loaibaocao"]).\
                filter(BaoCaoTongHopNghiNgoNhiemBenhNhomA.ngaybaocao == obj["ngaybaocao"]).first()

        insert = False
        if item is None:
            insert = True
            item = BaoCaoTongHopNghiNgoNhiemBenhNhomA()
            item.id = str(uuid.uuid4())

        for key in obj:
            if hasattr(item, key):
                setattr(item, key, obj[key])
        if insert:
            db.session.add(item)

    db.session.commit()
    return json({})

@app.route('/api/v1/baocaotonghopnghingonhiembenhnhoma/donvi', methods=["GET", "POST"])
async def baocaotonghopnghingonhiembenhnhoma_donvi(request):
    if request.method == "GET":
        return await get_baocaotonghopnghingonhiembenhnhoma_donvi(request)
    if request.method == "POST":
        return await post_baocaotonghopnghingonhiembenhnhoma_donvi(request)
    return text("Tham số không hợp lệ", status=520) 
        


#cuakhau
async def get_baocaotonghopnghingonhiembenhnhoma_cuakhau(request):
    donvi_id = request.args.get("donvi_id", None)
    cuakhau_id = request.args.get("cuakhau_id", None)
    ngaybaocao = request.args.get("ngaybaocao", None)

    if (ngaybaocao is None) or (donvi_id is None) or (cuakhau_id is None): 
        return text("Tham số không hợp lệ", status=520)
    
    donvi_id = int(donvi_id)
    cuakhau_id = int(cuakhau_id)
    loaibaocao = 2


    item = BaoCaoTongHopNghiNgoNhiemBenhNhomA.query.filter(BaoCaoTongHopNghiNgoNhiemBenhNhomA.donvi_id == donvi_id).\
                filter(BaoCaoTongHopNghiNgoNhiemBenhNhomA.cuakhau_id == cuakhau_id).\
                filter(BaoCaoTongHopNghiNgoNhiemBenhNhomA.loaibaocao == loaibaocao).\
                filter(BaoCaoTongHopNghiNgoNhiemBenhNhomA.ngaybaocao == ngaybaocao).first()

    if item is not None:
        return json(to_dict(item))

    cuakhau = db.session.query(CuaKhau).filter(CuaKhau.id == cuakhau_id).first()
    if (cuakhau is None):
        return text("Tham số không hợp lệ", status=520)

    donvi = db.session.query(DonVi).filter(DonVi.id == donvi_id).first()
    if (donvi is None):
        return text("Tham số không hợp lệ", status=520)


    ckobj = {
            "id": cuakhau.id,
            "ngaybaocao": ngaybaocao,
            "loaibaocao": 2,
            "donvi_id": donvi_id,
            "madonvi": donvi.ma,
            "tendonvi": donvi.ten,
            "cuakhau_id": cuakhau.id,
            "tencuakhau": cuakhau.ten,
            "macuakhau": cuakhau.ma,
            "songuoinhapcanh": None,
            "sohanhkhachkhaibao": None,
            "sochuyenbay": None,
            "songuoinghingo": None,

            "songuoidangcachlytaptrung": None,
            "songuoidangcachlytaptrung_cotrieuchung": None,
            "diadiemcachlytaptrung": None,
            "songuoihetcachly": None,
            "songuoicachlytainha": None
        }


    return json(ckobj)


async def post_baocaotonghopnghingonhiembenhnhoma_cuakhau(request):
    data = request.json
    ngaybaocao = data.get("ngaybaocao")
    donvi_id = data.get("donvi_id")
    cuakhau_id = data.get("cuakhau_id")
    loaibaocao = 2

    if (ngaybaocao is None) or (donvi_id is None) or (cuakhau_id is None): 
        return text("Tham số không hợp lệ", status=520)

    item = db.session.query(BaoCaoTongHopNghiNgoNhiemBenhNhomA).filter(and_(BaoCaoTongHopNghiNgoNhiemBenhNhomA.donvi_id == donvi_id,\
        BaoCaoTongHopNghiNgoNhiemBenhNhomA.cuakhau_id == cuakhau_id, BaoCaoTongHopNghiNgoNhiemBenhNhomA.loaibaocao == loaibaocao, BaoCaoTongHopNghiNgoNhiemBenhNhomA.ngaybaocao == ngaybaocao)).first()
    
    insert = False
    if item is None:
        insert = True
        item = BaoCaoTongHopNghiNgoNhiemBenhNhomA()
        item.id = str(uuid.uuid4())

    for key in data:

        if (hasattr(item, key)) and (key != "id"):
            setattr(item, key, data[key])

    if insert:
        db.session.add(item)

    db.session.commit()

    return json({})

@app.route('/api/v1/baocaotonghopnghingonhiembenhnhoma/cuakhau', methods=["GET", "POST"])
async def baocaotonghopnghingonhiembenhnhoma_cuakhau(request):
    if request.method == "GET":
        return await get_baocaotonghopnghingonhiembenhnhoma_cuakhau(request)
    if request.method == "POST":
        return await post_baocaotonghopnghingonhiembenhnhoma_cuakhau(request)
    return text("Tham số không hợp lệ", status=520) 


def convert_timestamp_to_string(value, format):
    dtobj_utc = None
    try:
        dtobj_utc = datetime.fromtimestamp(int(value))
    except:
        try:
            dtobj_utc = datetime.strptime(value)
        except:
            return None
    return dtobj_utc.strftime(format)




def get_chitieu_name_tonghopnghingonhiembenhnhoma():
    arr = []
    for item in chitieu_nghingonhiembenhnhoma:
        arr.append(item["name"])
    return arr
    

@app.route('/api/v1/thongketonghopnghingonhiembenhnhoma/donvi')
async def getbaocao_tonghop_nghingobenh(request):        
    # notdict = ['_created_at','_updated_at','_deleted','_deleted_at','_etag', 'id', 'baocao_id', 'cuakhau_id', 'sothutu', 'stt']
    chitieu_arr = get_chitieu_name_tonghopnghingonhiembenhnhoma()
    
    arr_cuakhau = []
    arr_cuarkhau_ten = []
    arr_days = []
    
    donvi_id = request.args.get("donvi_id", "")
    tungay = request.args.get("tungay", None)
    denngay = request.args.get("denngay", None)

    if donvi_id is None or donvi_id == "":
        return text("Tham số không hợp lệ", status=520)
        
    if (tungay is None) or (denngay is None):
        return text("Tham số không hợp lệ", status=520)
    
    listbaocao = db.session.query(BaoCaoTongHopNghiNgoNhiemBenhNhomA).filter(and_(BaoCaoTongHopNghiNgoNhiemBenhNhomA.donvi_id == donvi_id,BaoCaoTongHopNghiNgoNhiemBenhNhomA.ngaybaocao >= tungay,BaoCaoTongHopNghiNgoNhiemBenhNhomA.ngaybaocao <= denngay)).all()
    if listbaocao is None:
        return text("Chưa có báo cáo của các đơn vị", status=520)
    
    danhsach_org = db.session.query(CuaKhau).filter(CuaKhau.donvi_id == donvi_id).all()
    
    if danhsach_org is None:
        return text("Không tìm thấy cửa khẩu", status=520)
    
    
    tungay_date = datetime.strptime(tungay, "%Y-%m-%d") 
    denngay_date = datetime.strptime(denngay, "%Y-%m-%d")

    tungay_timestamp = datetime.timestamp(tungay_date)
    denngay_timestamp = datetime.timestamp(denngay_date)

    length_day = math.ceil((denngay_timestamp - tungay_timestamp)/86400)
    
    if length_day <1:
        length_day = 1
    else:
        length_day = int(length_day) + 2

    for i in range(length_day-1):
        
        item_day = int(i*86400) + int(tungay_timestamp)
        text_day = convert_timestamp_to_string(item_day,'%d/%m/%Y')
        arr_days.append(text_day)


    for item_org in danhsach_org:
        item = {}
        item["ma"] = item_org.ma
        item["ten"] = item_org.ten
        item["id"] = item_org.id
        arr_cuarkhau_ten.append(item_org.ten)
        item["data_value"] = []

        # tungay = 
        for i in range(length_day-1):
            
            item_day = int(i*86400) + int(tungay_timestamp)
            text_day = convert_timestamp_to_string(item_day,'%d/%m/%Y')

            # arr_days.append(text_day)
            objdata = {
                "value_day":item_day,
                "text_day":text_day,
                # "value_hanhkhach":0,
                # "value_chuyenbay":0,
                # "value_nghingo":0,
                # "value_nguoinghingo":0
            }
            for chitieu in chitieu_arr:
                objdata[chitieu] = None
            
            for itembc in listbaocao:
                ngaybaocao_timestamp = datetime.timestamp(itembc.ngaybaocao)
                if ngaybaocao_timestamp == item_day and itembc.cuakhau_id == item_org.id:
                    for chitieu in chitieu_arr:
                        objdata[chitieu] = getattr(itembc, chitieu)
                    
                    
                    break
            item["data_value"].append(objdata)

        arr_cuakhau.append(item)
    respdata = {
        "ten" : arr_cuarkhau_ten, 
        "data": arr_cuakhau, 
        "days": arr_days,
        "donvi_id": donvi_id,
        "chitieu": chitieu_nghingonhiembenhnhoma
    }
    export = request.args.get("export", None)
    
    if export is not None:
        donvi = db.session.query(DonVi).filter(DonVi.id == donvi_id).first()
        if (donvi is None):
            return text("Tham số không hợp lệ", status=520)
        respdata["tendonvi"] = donvi.ten
        respdata["tuyen"] = "cuakhau"
        respdata["filename"] = 'thongkenhoma-' + str(donvi.id) + "-" + str(time.time())+'.xlsx'
        return await exportthongkenghingonhiembenhnhoma(request, respdata)

    return json(respdata)
   

@app.route('/api/v1/thongketonghopnghingonhiembenhnhoma/tw')
async def getbaocao_tonghop_nghingobenh(request):        
    # notdict = ['_created_at','_updated_at','_deleted','_deleted_at','_etag', 'id', 'baocao_id', 'cuakhau_id', 'sothutu', 'stt']
    chitieu_arr = get_chitieu_name_tonghopnghingonhiembenhnhoma()

    arr_donvi = []
    arr_donvi_ten = []
    arr_days = []
    
    donvi_id = request.args.get("donvi_id", "")
    current_donvi_id = request.args.get("current_donvi_id", "")
    tungay = request.args.get("tungay", None)
    denngay = request.args.get("denngay", None)

    if donvi_id is None or donvi_id == "":
        return text("Tham số không hợp lệ", status=520)
        
    if (tungay is None) or (denngay is None):
        return text("Tham số không hợp lệ", status=520)

    donvi = db.session.query(DonVi).filter(DonVi.id == donvi_id).first()
    if donvi is None:
        return text("Tham số không hợp lệ", status=520)

    donvi_ids = []
    if donvi.tuyendonvi == 1:
        donvi_ids = db.session.query(DonVi.id).filter(DonVi.tuyendonvi == 3).all()
    elif donvi.tuyendonvi == 2:
        donvi_ids = db.session.query(DonVi.id).filter(DonVi.tuyendonvi == 3).filter(DonVi.parent_id == int(donvi_id)).all()
    elif donvi.tuyendonvi == 3:
        donvi_ids.append(int(donvi_id))
    else:
        return text("Tham số không hợp lệ", status=520)
    
    
    listbaocao = db.session.query(BaoCaoTongHopNghiNgoNhiemBenhNhomA).filter(and_(BaoCaoTongHopNghiNgoNhiemBenhNhomA.donvi_id.in_(donvi_ids),BaoCaoTongHopNghiNgoNhiemBenhNhomA.ngaybaocao >= tungay,BaoCaoTongHopNghiNgoNhiemBenhNhomA.ngaybaocao <= denngay)).all()
    # listbaocao = db.session.query(BaoCaoTongHopNghiNgoNhiemBenhNhomA).filter(and_(BaoCaoTongHopNghiNgoNhiemBenhNhomA.donvi_id == donvi_id,BaoCaoTongHopNghiNgoNhiemBenhNhomA.ngaybaocao >= tungay)).all()
    if listbaocao is None:
        return text("Chưa có báo cáo của các đơn vị", status=520)
    

    danhsach = db.session.query(DonVi).filter(DonVi.id.in_(donvi_ids)).all()
    
    if danhsach is None:
        return text("Không tìm thấy", status=520)
    
    
    tungay_date = datetime.strptime(tungay, "%Y-%m-%d") 
    denngay_date = datetime.strptime(denngay, "%Y-%m-%d")

    tungay_timestamp = datetime.timestamp(tungay_date)
    denngay_timestamp = datetime.timestamp(denngay_date)

    length_day = math.ceil((denngay_timestamp - tungay_timestamp)/86400)
    
    if length_day <1:
        length_day = 1
    else:
        length_day = int(length_day) + 2

    for i in range(length_day-1):
        
        item_day = int(i*86400) + int(tungay_timestamp)
        text_day = convert_timestamp_to_string(item_day,'%d/%m/%Y')
        arr_days.append(text_day)


    for item_org in danhsach:
        item = {}
        item["ma"] = item_org.ma
        item["ten"] = item_org.ten
        item["id"] = item_org.id
        arr_donvi_ten.append(item_org.ten)
        item["data_value"] = []

        # tungay = 
        for i in range(length_day-1):
            
            item_day = int(i*86400) + int(tungay_timestamp)
            text_day = convert_timestamp_to_string(item_day,'%d/%m/%Y')
            # arr_days.append(text_day)
            objdata = {
                "value_day":item_day,
                "text_day":text_day
            }

            for chitieu in chitieu_arr:
                objdata[chitieu] = None
            
            for itembc in listbaocao:
                ngaybaocao_timestamp = datetime.timestamp(itembc.ngaybaocao)
                if ngaybaocao_timestamp == item_day  and itembc.donvi_id == item_org.id:
                    #print(item["id"], item_day, itembc.sohanhkhachkhaibao)
                    for chitieu in chitieu_arr:
                        val = getattr(itembc, chitieu)
                        if val is not None:
                            if objdata[chitieu] is None:
                                objdata[chitieu] = 0
                            objdata[chitieu] = objdata[chitieu] + val

            item["data_value"].append(objdata)

        arr_donvi.append(item)
    respdata = {
        "ten" : arr_donvi_ten, 
        "data": arr_donvi, 
        "days": arr_days,
        "donvi_id": donvi_id,
        "chitieu": chitieu_nghingonhiembenhnhoma
    }
    export = request.args.get("export", None)
    
    if export is not None:
        user = await currentUser(request)
        donvi = user.donvi
        if (donvi is None):
            return text("Tham số không hợp lệ", status=520)
        respdata["tendonvi"] = donvi.ten
        respdata["tuyen"] = "donvi"
        respdata["filename"] = 'thongkenhomatw-' + str(donvi.id) + "-" + str(time.time())+'.xlsx'
        return await exportthongkenghingonhiembenhnhoma(request, respdata)

    return json(respdata)
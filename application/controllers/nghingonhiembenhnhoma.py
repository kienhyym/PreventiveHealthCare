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

async def get_baocaotonghopnghingonhiembenhnhoma_donvi(request):
    donvi_id = request.args.get("donvi_id", None)
    ngaybaocao = request.args.get("ngaybaocao", None)

    if (donvi_id is None) or (ngaybaocao is None):
        return text("Tham số không hợp lệ", status=520)
    
    donvi_id = int(donvi_id)
    donvi = db.session.query(DonVi).filter(DonVi.id == donvi_id).first()
    if (donvi is None):
        return text("Tham số không hợp lệ", status=520)

    danhsach_cuakhau = db.session.query(CuaKhau).filter(CuaKhau.donvi_id == donvi_id).all()
    
    if danhsach_cuakhau is None:
        return text("Không tìm thấy cửa khẩu", status=520)

    listbaocao = db.session.query(BaoCaoTongHopNghiNgoNhiemBenhNhomA).filter(and_(BaoCaoTongHopNghiNgoNhiemBenhNhomA.donvi_id == donvi_id,BaoCaoTongHopNghiNgoNhiemBenhNhomA.ngaybaocao == ngaybaocao)).all()
    # if listbaocao is None:
    #     return text("Chưa có báo cáo của các đơn vị", status=520)

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

    for cuakhau in danhsach_cuakhau:
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
            "songuoinguoinghingo": None,

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
                ckobj["songuoinguoinghingo"] = baocao.songuoinguoinghingo

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
            "songuoinguoinghingo": None,

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





    

@app.route('/api/v1/thongketonghopnghingonhiembenhnhoma')
async def getbaocao_tonghop_nghingobenh(request):        
    # notdict = ['_created_at','_updated_at','_deleted','_deleted_at','_etag', 'id', 'baocao_id', 'cuakhau_id', 'sothutu', 'stt']
    
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
    # listbaocao = db.session.query(BaoCaoTongHopNghiNgoNhiemBenhNhomA).filter(and_(BaoCaoTongHopNghiNgoNhiemBenhNhomA.donvi_id == donvi_id,BaoCaoTongHopNghiNgoNhiemBenhNhomA.ngaybaocao >= tungay)).all()
    if listbaocao is None:
        return text("Chưa có báo cáo của các đơn vị", status=520)
    
    danhsach_cuakhau = db.session.query(CuaKhau).filter(CuaKhau.donvi_id == donvi_id).all()
    
    if danhsach_cuakhau is None:
        return text("Không tìm thấy cửa khẩu", status=520)
    
    # print("listbaocao", listbaocao)
    # for ds in listbaocao:
    #     danhsach = to_dict(ds)
    #     print("danhsach =======",danhsach)

    
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


    for item_cuakhau in danhsach_cuakhau:
        item = {}
        item["ma"] = item_cuakhau.ma
        item["ten"] = item_cuakhau.ten
        item["id"] = item_cuakhau.id
        arr_cuarkhau_ten.append(item_cuakhau.ten)
        item["data_khaibao"] = []

        # tungay = 
        for i in range(length_day-1):
            
            item_day = int(i*86400) + int(tungay_timestamp)
            text_day = convert_timestamp_to_string(item_day,'%d/%m/%Y')
            # arr_days.append(text_day)
            data_khaibao = {"value_day":item_day,"text_day":text_day,"value_hanhkhach":0,"value_chuyenbay":0,"value_nghingo":0,"value_nguoinghingo":0}
            
            for itembc in listbaocao:
                ngaybaocao_timestamp = datetime.timestamp(itembc.ngaybaocao)
                if ngaybaocao_timestamp == item_day and itembc.cuakhau_id == item_cuakhau.id:

                    data_khaibao["value_hanhkhach"] = itembc.sohanhkhachkhaibao
                    data_khaibao["value_chuyenbay"] = itembc.sochuyenbay
                    data_khaibao["value_nguoinghingo"] = itembc.songuoinguoinghingo
                    # print("danhsachnghingonhiembenh===",itembc.danhsachnghingonhiembenh)
                    # data_khaibao["value_nghingo"] = 0
                    
                    break
            item["data_khaibao"].append(data_khaibao)

        arr_cuakhau.append(item)
    respdata = {
        "ten" : arr_cuarkhau_ten, 
        "data": arr_cuakhau, 
        "days": arr_days,
        "donvi_id": donvi_id
    }
    export = request.args.get("export", None)
    
    if export is not None:
        donvi = db.session.query(DonVi).filter(DonVi.id == donvi_id).first()
        if (donvi is None):
            return text("Tham số không hợp lệ", status=520)
        respdata["tendonvi"] = donvi.ten
        return await exportthongkenghingonhiembenhnhoma(request, respdata)

    return json(respdata)
   
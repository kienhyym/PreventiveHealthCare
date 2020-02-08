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
from datetime import datetime, timedelta, date
from math import floor
from application.client import HTTPClient
from application.extensions import auth, jinja
import ujson
from sqlalchemy.orm import aliased, joinedload_all
from .user_api import current_user as currentUser

# def currentUser(request):
#     uid = auth.current_user(request)
#     if uid is not None:
#         user = db.session.query(User).filter(User.id == uid).first()
#         result = user
#         result.is_authenticated = True
#         return result
#     else:
#         return None



#@jwt_required()
def auth_func(**kw):
    pass


#User management
def set_user_passwd(data=None,**kw):
    if ('password' in data) and ('confirmpassword' in data):
        if(data['password']  == data['confirmpassword']):
            data['password'] = encrypt_password(data['password'])
            del data['confirmpassword']
        else:
            raise ProcessingException(description='Confirm password is not match',code=401)
    else:
        raise ProcessingException(description='Parameters are not correct',code=401)
    
def delete_donvi_parent(data=None,**kw):
    if "parent" in data:
        del data['parent']
        
def reset_user_passwd(instance_id=None, data=None,**kw):
    if (data is not None) and ('password' in data) and ('confirmpassword' in data):
        if (data['password'] is not None):
            if(data['password'] == data['confirmpassword']):
                #user = user_datastore.find_user(id=instance_id)
                #if verify_password(data['password'], user.password):
                data['password'] =encrypt_password(data['password'])
                    #del data['newpassword']
                del data['confirmpassword']
                #else:
                #    raise ProcessingException(description='Password is not correct',code=401)
            else:
                raise ProcessingException(description='Confirm password is not match',code=401)
        else:
            del data['confirmpassword']
            del data['password']
    else:
        raise ProcessingException(description='Parameters are not correct',code=401)


async def apply_donvi_filter(request,search_params):
    current_user = await currentUser(request)
    currdonvi = current_user.donvi
    donvichildids = []
    if(currdonvi is not None):
        if currdonvi.tuyendonvi > 1:
            donvichildids = currdonvi.children_ids()
            search_params["filters"] = ("filters" in search_params) and {"$and":[search_params["filters"], {"donvi_id":{"$in": donvichildids}}]} \
                                        or {"donvi_id":{"$in": donvichildids}}
    
#@jwt_required()
async def entity_pregetmany(request,search_params=None, **kw):
    await apply_donvi_filter(request,search_params)

async def role_pregetmany(request,search_params=None, **kw):
    current_user = await currentUser(request)
    if current_user.has_role("Admin"):
        pass
    elif current_user.has_role("VienAdmin"):
        search_params["filters"] = {"id":{"$in": [2,3,4,5,6]}}
    elif current_user.has_role("DonViAdmin"):
        search_params["filters"] = {"id":{"$in": [4,5,6]}}
    else:
        search_params["filters"] = {"id":{"$in": []}}
        
#@jwt_required()
async def donvi_pregetmany(search_params=None, **kw):
    current_user = await currentUser(request)
    currdonvi = current_user.donvi
    donvichildids = []
    if(currdonvi is not None):
        donvichildids = currdonvi.children_ids()
        
    search_params["filters"] = ("filters" in search_params) and {"$and":[search_params["filters"], {"id":{"$in": donvichildids}}]} \
                                or {"id":{"$in": donvichildids}}

def check_delete_lastkybaocao(instance_id=None, **kw):
    baocao = BaoCao.query.filter(BaoCao.id == instance_id).first()
    if (baocao is not None) and (baocao.tinhtrang == 1):
        lastbaocao = BaoCao.query.filter(BaoCao.nambaocao == baocao.nambaocao).filter(BaoCao.loaikybaocao == baocao.loaikybaocao).filter(BaoCao.cuakhau_id == baocao.cuakhau_id).\
                    filter(BaoCao.donvi_id == baocao.donvi_id).filter(BaoCao.loaibaocao == baocao.loaibaocao).filter(BaoCao.kybaocao > baocao.kybaocao).first()
        if (lastbaocao is not None):
            raise ProcessingException(description='Not Authorized', code=401)

def check_cuakhau_delete(instance_id=None, **kw):
    Bangs = [BangNguoi, BangPhuongTien, BangHangHoa, BangThiThe, BangVSSH]
    for Bang in Bangs:
        bangs = Bang.query.filter(Bang.cuakhau_id == instance_id).all()
        if len(bangs) > 0:
            for obj in bangs:
                db.session.delete(obj)
            db.session.commit()
        
def check_delete_donvi(instance_id=None, **kw):
    donvi = DonVi.query.filter(DonVi.id == instance_id).first()
    if (donvi is not None):
        if len(donvi.children_ids()) > 1:
            raise ProcessingException(description='Don vi nay co don vi con, Khong duoc xoa', code=401)
        
        baocaos = BaoCao.query.filter(BaoCao.donvi_id == instance_id).all()
        if len(baocaos) > 0:
            for baocao in baocaos:
                db.session.delete(baocao)
            db.session.commit()
            
        cuakhaus = CuaKhau.query.filter(CuaKhau.donvi_id == instance_id).all()
        if len(cuakhaus) > 0:
            for ck in cuakhaus:
                check_cuakhau_delete(ck.id)
                db.session.delete(ck)
            db.session.commit()
           
            

apimanager.create_api(User,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, entity_pregetmany], POST=[auth_func, set_user_passwd], PUT_SINGLE=[auth_func, reset_user_passwd]),
    collection_name='user',
    include_columns=['id', 'name', 'email','active', 'roles', 'roles.id', 'roles.name', 'roles.description','donvi_id', 'donvi', 'donvi.id', 'donvi.ten', 'cuakhau_id', 'cuakhau', 'cuakhau.id', 'cuakhau.ten'])

apimanager.create_api(Role,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, role_pregetmany], POST=[auth_func], PUT_SINGLE=[auth_func]),
    collection_name='role')

apimanager.create_api(BaoCao,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func,entity_pregetmany], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func, check_delete_lastkybaocao]),
    collection_name='baocao')

apimanager.create_api(BaoCaoVien,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func,entity_pregetmany], POST=[auth_func], PUT_SINGLE=[auth_func]),
    collection_name='baocaovien')

apimanager.create_api(DonVi,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, donvi_pregetmany], POST=[auth_func, delete_donvi_parent], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func, check_delete_donvi]),
    collection_name='donvi',
    exclude_columns= ["children"])

apimanager.create_api(CuaKhau,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func,entity_pregetmany], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func, check_cuakhau_delete]),
    collection_name='cuakhau')

apimanager.create_api(QuocGia,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='quocgia')

apimanager.create_api(TinhThanh,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='tinhthanh')

apimanager.create_api(QuanHuyen,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='quanhuyen')

apimanager.create_api(FAQ,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='faq')

apimanager.create_api(BaiViet,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    results_per_page=30,
    collection_name='baiviet')





# apimanager.create_api(BaoCaoNghiNgoNhiemBenhXetNghiem,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     results_per_page=30,
#     collection_name='baocaonghingonhiembenhxetnghiem')

@app.route('/api/v1/donvitree')
async def donvitree(request):
    current_user = await currentUser(request)
    if (current_user is not None) and (current_user.donvi is not None):
        model = db.session.query(DonVi).\
            options(joinedload_all("children", "children",
                "children", "children")).\
            filter(DonVi.id == current_user.donvi.id).\
            first()
        obj = model.dump()
        return json(obj)
    
    
    return text("Not found", status=404)


# @app.route('/api/v1/test_getngaybaocao')
# def test_getngaybaocao():
#     for i in range(1, 55):
#         date1, date2 = getngaybaocao(1, i, 2018)
#         print(i, date1, date2)
#     return "OK"

# @app.route('/api/v1/fix_nam')
# def fix_nam():
# #     objs = db.session.query(BaoCao).filter(BaoCao.loaikybaocao == 1).\
# #         filter(BaoCao.nambaocao == 2018).filter(BaoCao.kybaocao == 54).all()
# #     for obj in objs:
# #         db.session.delete(obj)
# #     db.session.commit()
#     
#     
#     objs = db.session.query(BaoCao).filter(BaoCao.loaikybaocao == 1).\
#         filter(BaoCao.nambaocao == 2018).all()
#         
#     for obj in objs:
#         tungay, denngay = getngaybaocao(1, obj.kybaocao, 2018)
#         obj.tungay = tungay
#         obj.denngay = denngay
#     db.session.commit()
#     return "OK"

def getngaybaocao(loaiky, kybaocao, nambaocao):
    datestart = None
    dateend = None
    if loaiky == 1:
        jan1 = date(nambaocao, 1, 1)
        firstmonday = jan1 + timedelta(days=(7-jan1.weekday()) % 7)
        
        countdays = (firstmonday - jan1).days
        
        if(kybaocao > 1):
            if countdays > 0:
                add_startday = ((kybaocao - 2 )  * 7) + 1 + countdays
                add_enddays = (kybaocao - 1) * 7 + countdays
                lastdayprevyear = jan1 - timedelta(days=1)
                datestart = lastdayprevyear + timedelta(days=add_startday)
                dateend = lastdayprevyear + timedelta(days=add_enddays)
                if (datestart.year == nambaocao) and (dateend.year > nambaocao):
                    dateend = date(nambaocao, 12, 31)
            else:
                add_startday = ((kybaocao - 1 )  * 7) + 1
                add_enddays = (kybaocao) * 7
                lastdayprevyear = jan1 - timedelta(days=1)
                datestart = lastdayprevyear + timedelta(days=add_startday)
                dateend = lastdayprevyear + timedelta(days=add_enddays)
                if (datestart.year == nambaocao) and (dateend.year > nambaocao):
                    dateend = date(nambaocao, 12, 31)
        if(kybaocao == 1):
            datestart = jan1
            dateend = jan1 + timedelta(days=(6-jan1.weekday()) % 7)
 
    if loaiky == 2: # thang
        if(kybaocao <= 11):
            datestart = date(nambaocao, kybaocao, 1)
            dateend = date(nambaocao, kybaocao + 1, 1)
            dateend = dateend - timedelta(days=1)
        if(kybaocao == 12):
            datestart = date(nambaocao, 12, 1)
            dateend = date(nambaocao, 12, 31)
        if(kybaocao > 12):
            datestart = date(nambaocao + 1, 1, 1)
            dateend = date(nambaocao + 1, 1, 2)
            
    if loaiky == 3: #6thang
        if(kybaocao == 1):
            datestart = date(nambaocao, 1, 1)
            dateend = date(nambaocao, 6, 30)
        if(kybaocao == 2):
            datestart = date(nambaocao, 7, 1)
            dateend = date(nambaocao, 12, 31)
        if(kybaocao > 2):
            datestart = date(nambaocao + 1, 1, 1)
            dateend = date(nambaocao + 1, 1, 2)
            
    if loaiky == 4: #9 thang
        if(kybaocao == 1):
            datestart = date(nambaocao, 1, 1)
            dateend = date(nambaocao, 9, 30)
        if(kybaocao > 1):
            datestart = date(nambaocao + 1, 1, 1)
            dateend = date(nambaocao + 1, 1, 2)
    
    if loaiky == 5: #nam
        #print kybaocao, nambaocao
        if(kybaocao == 1):
            datestart = date(nambaocao, 1, 1)
            dateend = date(nambaocao, 12, 31)
        if(kybaocao > 1):
            datestart = date(nambaocao + 1, 1, 1)
            dateend = date(nambaocao + 1, 1, 2)
        
        
    return datestart, dateend

def getdulieucuakhau(Bang, cuakhau, sothutu, loaibaocao, bangdata):
    notdict = ['_created_at','_updated_at','_deleted','_deleted_at','_etag', 'id', 'baocao_id', 'cuakhau_id', 'sothutu', 'stt', 'tencuakhau', 'macuakhau']
    
    bang = Bang()
    bang.cuakhau_id = cuakhau.id
    bang.tencuakhau = cuakhau.ten
    bang.macuakhau = cuakhau.ma
    bang.sothutu = sothutu
    
    if (loaibaocao == 1) and (bangdata is not None):
        cuakhaudata = bangdata.first()
        if (cuakhaudata is not None) and (cuakhaudata.cuakhau_id == cuakhau.id):
            for col in cuakhaudata.__table__.c:
                if (col.name not in notdict) and (str(col.type) in ['INTEGER','SMALLINT', 'FLOAT']):
                    setattr(bang,col.name, getattr(cuakhaudata, col.name))
    
    return to_dict(bang)

def getcongdon(baocaos, attrname):
    notdict = ['_created_at','_updated_at','_deleted','_deleted_at','_etag', 'id', 'baocao_id', 'cuakhau_id', 'sothutu', 'stt']
    congdon = {}
    for bc in baocaos:
            #get cong don bang nguoi
            for obj in getattr(bc, attrname).all():
                if obj.tencuakhau not in congdon:
                    congdon[obj.tencuakhau] = {}
                #m = BangNguoi
                for col in obj.__table__.c:
                    if (col.name not in notdict) and (str(col.type) in ['INTEGER','SMALLINT', 'FLOAT']):
                        #print obj.tencuakhau, col.name, getattr(obj, col.name)
                        congdon[obj.tencuakhau][col.name] = (congdon[obj.tencuakhau][col.name] + ((getattr(obj, col.name)) if (getattr(obj, col.name)) is not None else 0)) \
                        if (col.name in congdon[obj.tencuakhau]) and (congdon[obj.tencuakhau][col.name] is not None) else ((getattr(obj, col.name)) if (getattr(obj, col.name)) is not None else 0)
    return congdon

def getdulieututhang(nambaocao, kybaocao, loaikybaocao, donvi, cuakhaus):
    notdict = ['_created_at','_updated_at','_deleted','_deleted_at','_etag', 'id', 'baocao_id', 'cuakhau_id', 'sothutu', 'stt']
    
    data = {
           "bangnguoi": [],
           "bangphuongtien": [],
           "banghanghoa": [],
           "bangthithe": [],
           "bangvssh": [],
    }
    tuky = 0
    denky = 0
    if loaikybaocao == 3:
        tuky = 1 if kybaocao == 1 else 7
        denky = 6 if kybaocao == 1 else 12
    if loaikybaocao == 4:
        tuky = 1 
        denky = 9
    if loaikybaocao == 5:
        tuky = 1 
        denky = 12
    
    cuakhauids = [ck.id for ck in cuakhaus]
    
    baocaos = BaoCao.query.filter(BaoCao.nambaocao == nambaocao).filter(BaoCao.loaikybaocao == 2).filter(BaoCao.kybaocao >= tuky).\
        filter(BaoCao.kybaocao <= denky).filter(BaoCao.donvi_id == donvi.id).filter(BaoCao.loaibaocao == 1).all()
    
    bangattrs = ["bangnguoi", "bangphuongtien", "banghanghoa", "bangthithe", "bangvssh"]
   
    for baocao in baocaos:
        for bangattr in bangattrs:
            for bang in getattr(baocao, bangattr).all():
                if bang.cuakhau_id in cuakhauids:
                    ## for in congdon
                    found = False
                    for obj in data[bangattr]:
                        if ("cuakhau_id" in obj) and (obj["cuakhau_id"] == bang.cuakhau_id):
                            #cong vao obj 
                            for col in bang.__table__.c:
                                if (col.name not in notdict) and (str(col.type) in ['INTEGER','SMALLINT', 'FLOAT']):
                                    if col.name in obj:
                                        obj[col.name] = obj[col.name] + (getattr(bang, col.name) if getattr(bang, col.name) is not None else 0)
                                    else:
                                        obj[col.name] = (getattr(bang, col.name) if getattr(bang, col.name) is not None else 0)
                            found = True
                            break
                    if not found:
                        obj = {"cuakhau_id": bang.cuakhau_id, "tencuakhau": bang.tencuakhau}
                        for col in bang.__table__.c:
                            if (col.name not in notdict) and (str(col.type) in ['INTEGER','SMALLINT', 'FLOAT']):
                                obj[col.name] = (getattr(bang, col.name) if getattr(bang, col.name) is not None else 0)
                        data[bangattr].append(obj)
  
    return data

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

@app.route('/api/v1/baocaotonghopnghingobenh')
async def getbaocao_tonghop_nghingobenh(request):        
    # notdict = ['_created_at','_updated_at','_deleted','_deleted_at','_etag', 'id', 'baocao_id', 'cuakhau_id', 'sothutu', 'stt']
    
    arr_cuakhau = []
    arr_cuarkhau_ten = []
    
    donvi_id = request.args.get("donvi_id", "")
    tungay = request.args.get("tungay", None)
    denngay = request.args.get("denngay", None)

    if donvi_id is None or donvi_id == "":
        return text("Tham số không hợp lệ", status=520)
    if (tungay is None and denngay is None) or (int(tungay)<=0 or int(denngay)<=0):
        return text("Tham số không hợp lệ", status=520)
    
    print("sdf",type(denngay))
    
    listbaocao = db.session.query(BaoCaoTongHopNghiNgoNhiemBenhNhomA).filter(and_(BaoCaoTongHopNghiNgoNhiemBenhNhomA.donvi_id == donvi_id,BaoCaoTongHopNghiNgoNhiemBenhNhomA.ngaybaocao >= tungay,BaoCaoTongHopNghiNgoNhiemBenhNhomA.ngaybaocao <= denngay)).all()
    # listbaocao = db.session.query(BaoCaoTongHopNghiNgoNhiemBenhNhomA).filter(and_(BaoCaoTongHopNghiNgoNhiemBenhNhomA.donvi_id == donvi_id,BaoCaoTongHopNghiNgoNhiemBenhNhomA.ngaybaocao >= tungay)).all()
    if listbaocao is None:
        return text("Chưa có báo cáo của các đơn vị", status=520)
    
    danhsach_cuakhau = db.session.query(CuaKhau).filter(CuaKhau.donvi_id == donvi_id).all()
    
    if danhsach_cuakhau is None:
        return text("Không tìm thấy cửa khẩu", status=520)
    
    for ds in listbaocao:
        danhsach = to_dict(ds)
        print("danhsach =======",danhsach)

    print("test gia tri ngay thang")
    print(tungay)
    print(denngay)
    print((int(denngay) - int(tungay))/86400)
    length_day = math.ceil((int(denngay) - int(tungay))/86400)
    print(length_day)


    if length_day <1:
        length_day = 1
    else:
        length_day = int(length_day) + 2


    for item_cuakhau in danhsach_cuakhau:
        item = {}
        item["ma"] = item_cuakhau.ma
        item["ten"] = item_cuakhau.ten
        item["id"] = item_cuakhau.id
        arr_cuarkhau_ten.append(item_cuakhau.ten)
        item["data_khaibao"] = []
        # tungay = 
        for i in range(length_day-1):
            print(i)
            item_day = int(i*86400) + int(tungay)
            text_day = convert_timestamp_to_string(item_day,'%d/%m/%Y')
            data_khaibao = {"value_day":item_day,"text_day":text_day,"value_hanhkhach":0,"value_chuyenbay":0,"value_nghingo":0,"value_nguoinghingo":0}
            
            for itembc in listbaocao:
                if itembc.ngaybaocao == item_day and itembc.cuakhau_id == item_cuakhau.id:

                    data_khaibao["value_hanhkhach"] = itembc.sohanhkhachkhaibao
                    data_khaibao["value_chuyenbay"] = itembc.sochuyenbay
                    data_khaibao["value_nguoinghingo"] = itembc.songuoinguoinghingo
                    # print("danhsachnghingonhiembenh===",itembc.danhsachnghingonhiembenh)
                    # data_khaibao["value_nghingo"] = 0
                    
                    break
            item["data_khaibao"].append(data_khaibao)
        print("danhsach =======",item["data_khaibao"])
        arr_cuakhau.append(item)

    return json({"ten" : arr_cuarkhau_ten, "data": arr_cuakhau})
   
    

@app.route('/api/v1/getbaocao')
#@jwt_required()
async def getbaocao(request):
    notdict = ['_created_at','_updated_at','_deleted','_deleted_at','_etag', 'id', 'baocao_id', 'cuakhau_id', 'sothutu', 'stt']
    
    id = request.args.get("id", "")
    id = int(id) if id != '' else None
    loaikybaocao = request.args.get("loaikybaocao", None)
    loaikybaocao = int(loaikybaocao) if loaikybaocao is not None else None
    
    print(id, loaikybaocao)

    loaibaocao = None
    
    
    now = datetime.now()
    nowyear = now.year
    nambaocao = None
    kybaocao = None
    baocaoobj = None
    #baocao = None
    donvi = None
    cuakhau = None
    tungay = None
    denngay = None
    cuakhaus = []
    
    candelete = False
    
    congdon = {
        "bangnguoi": {},
        "bangphuongtien": {},
        "banghanghoa": {},
        "bangthithe": {},
        "bangvssh": {},
    }
    congdoncuakhau = {}
    current_user = await currentUser(request)
    if (loaikybaocao is not None) and (current_user is not None) and (current_user.donvi is not None):
        
        if(id is not None):
            baocao = BaoCao.query.filter(BaoCao.id == id).filter(BaoCao.loaikybaocao == loaikybaocao).first()
            if(baocao is not None):
                if(baocao.tinhtrang == 1):
                    lastbaocao = BaoCao.query.filter(BaoCao.nambaocao == baocao.nambaocao).filter(BaoCao.loaikybaocao == baocao.loaikybaocao).filter(BaoCao.cuakhau_id == baocao.cuakhau_id).\
                            filter(BaoCao.donvi_id == baocao.donvi_id).filter(BaoCao.loaibaocao == baocao.loaibaocao).filter(BaoCao.kybaocao > baocao.kybaocao).first()
                    if (lastbaocao is None):
                        candelete = True
                donvi = baocao.donvi
                cuakhau = baocao.cuakhau

                nambaocao = baocao.nambaocao
                kybaocao = baocao.kybaocao
                loaibaocao = baocao.loaibaocao
                baocaoobj = to_dict(baocao)
                baocaoobj["donvi"] = to_dict(baocao.donvi)
                baocaoobj["cuakhau"] = to_dict(baocao.cuakhau)
                baocaoobj["bangnguoi"] = [to_dict(obj) for obj in baocao.bangnguoi.all()]
                baocaoobj["bangphuongtien"] = [to_dict(obj) for obj in baocao.bangphuongtien.all()]
                baocaoobj["banghanghoa"] = [to_dict(obj) for obj in baocao.banghanghoa.all()]
                baocaoobj["bangthithe"] = [to_dict(obj) for obj in baocao.bangthithe.all()]
                baocaoobj["bangvssh"] = [to_dict(obj) for obj in baocao.bangvssh.all()]
                baocaoobj["bangdichbenh"] = [to_dict(obj) for obj in baocao.bangdichbenh.all()]
                baocaoobj["bangtiemchung"] = [to_dict(obj) for obj in baocao.bangtiemchung.all()]
                baocaoobj["bangxetnghiem"] = [to_dict(obj) for obj in baocao.bangxetnghiem.all()]
                baocaoobj["bangkinhphi"] = [to_dict(obj) for obj in baocao.bangkinhphi.all()]
                baocaoobj["bangtrinhdochuyenmon"] = [to_dict(obj) for obj in baocao.bangtrinhdochuyenmon.all()]
                baocaoobj["bangdaotaocanbo"] = [to_dict(obj) for obj in baocao.bangdaotaocanbo.all()]
                baocaoobj["bangtruyenthong"] = [to_dict(obj) for obj in baocao.bangtruyenthong.all()]
                baocaoobj["bangnghiencuukhoahoc"] = [to_dict(obj) for obj in baocao.bangnghiencuukhoahoc.all()]
                baocaoobj["banghoptacquocte"] = [to_dict(obj) for obj in baocao.banghoptacquocte.all()]
            else:
                return text("Not found", status=404)
        else:
            donvi = current_user.donvi
            cuakhau = current_user.cuakhau
            if current_user.has_role("DonViAdmin") or current_user.has_role("DonViUser"):
                loaibaocao = 1
            elif (current_user.has_role("CuaKhauUser")):    
                loaibaocao = 2
        #cuakhaus = [to_dict(cuakhau) for cuakhau in donvi.cuakhau.all()]
        if loaibaocao == 1:
            cuakhaus = donvi.cuakhau.all()
        elif loaibaocao == 2:
            cuakhaus.append(cuakhau)
        
        
        #get cong dong + bao cao // sua lai cau query ko can filter theo don vi
        baocaos = BaoCao.query.filter(BaoCao.donvi_id == donvi.id).filter(BaoCao.loaikybaocao == loaikybaocao).filter(BaoCao.loaibaocao == loaibaocao)
        
        if loaibaocao == 2:
            baocaos = baocaos.filter(BaoCao.cuakhau_id == cuakhau.id)
        
        if(id is None):
            #id is None, tu tinh toan nam bao cao, ky bao cao
            lastbaocao = baocaos.order_by(BaoCao.nambaocao.desc(), BaoCao.kybaocao.desc()).first()
            if lastbaocao is not None:
                lastnambaocao = lastbaocao.nambaocao
                lastkybaocao = lastbaocao.kybaocao
                lastkybaocao = lastkybaocao + 1
                # print lastnambaocao, lastkybaocao
                tungay, denngay = getngaybaocao(loaikybaocao, lastkybaocao, lastnambaocao)
                if tungay.year > lastnambaocao:
                    lastnambaocao = lastnambaocao + 1
                    lastkybaocao = 1
                    tungay, denngay = getngaybaocao(loaikybaocao, lastkybaocao, lastnambaocao)
                nambaocao = lastnambaocao
                kybaocao = lastkybaocao
            else:
                if loaikybaocao < 5:
                    nambaocao = nowyear 
                else:
                    nambaocao = 2017
                kybaocao = 1
                tungay, denngay = getngaybaocao(loaikybaocao, kybaocao, nambaocao)
                
        baocaos = baocaos.filter(BaoCao.nambaocao == nambaocao).filter(BaoCao.kybaocao < kybaocao).order_by(BaoCao.nambaocao.desc(), BaoCao.kybaocao.desc()).all()
        
        congdon["bangnguoi"] = getcongdon(baocaos, 'bangnguoi')     
        congdon["bangphuongtien"] = getcongdon(baocaos, 'bangphuongtien') 
        congdon["banghanghoa"] = getcongdon(baocaos, 'banghanghoa')  
        congdon["bangthithe"] = getcongdon(baocaos, 'bangthithe')   
        congdon["bangvssh"] = getcongdon(baocaos, 'bangvssh')     
            #end tinh toan cong dong bao caos  
        #Tao moi baocao
        if(id is None):
            #tinh nam baocao, ky bao cao moi
            
            #tao bao cao moi
            baocao = BaoCao()
            baocao.nambaocao = nambaocao
            baocao.kybaocao = kybaocao
            baocao.loaikybaocao = loaikybaocao
            baocao.loaibaocao = loaibaocao
            baocao.ngaybaocao = now
            baocao.tungay = tungay
            baocao.denngay = denngay
            baocao.donvi_id = donvi.id
            if(loaibaocao == 2):
                baocao.cuakhau_id = cuakhau.id
                
            baocaoobj = to_dict(baocao)
            baocaoobj["donvi"] = to_dict(donvi)
            if(loaibaocao == 2):
                baocaoobj["cuakhau"] = to_dict(cuakhau)
            
            baocaoobj["bangnguoi"] = []
            baocaoobj["bangphuongtien"] = []
            baocaoobj["banghanghoa"] = []
            baocaoobj["bangthithe"] = []
            baocaoobj["bangvssh"] = []
            baocaoobj["bangdichbenh"] = []
            
            baocaoobj["bangtiemchung"] = []
            baocaoobj["bangxetnghiem"] = []
            baocaoobj["bangkinhphi"] = []
            
            baocaoobj["bangtrinhdochuyenmon"] = []
            baocaoobj["bangdaotaocanbo"] = []
            baocaoobj["bangtruyenthong"] = []
            baocaoobj["bangnghiencuukhoahoc"] = []
            baocaoobj["banghoptacquocte"] = []
            #Bang Nguoi
            
            #get du lieu cong dong tu thang
            
            if (loaikybaocao >= 3) and (loaibaocao == 1):
                tuthangdata = getdulieututhang(nambaocao, kybaocao, loaikybaocao, donvi, cuakhaus)
                baocaoobj["bangnguoi"] = tuthangdata["bangnguoi"]
                baocaoobj["bangphuongtien"] = tuthangdata["bangphuongtien"]
                baocaoobj["banghanghoa"] = tuthangdata["banghanghoa"]
                baocaoobj["bangthithe"] = tuthangdata["bangthithe"]
                baocaoobj["bangvssh"] = tuthangdata["bangvssh"]
                
                for idx, cuakhau in enumerate(cuakhaus):
                    baocaoobj["bangdichbenh"].append(getdulieucuakhau(BangDichBenh, cuakhau, idx + 1, loaibaocao, None))
                
            #get du lieu cong don tu bao cao cua khau:
            if (loaikybaocao < 3):
                for idx, cuakhau in enumerate(cuakhaus):
                    baocaock = None
                    if(loaibaocao == 1):
                        baocaock = BaoCao.query.filter(BaoCao.loaibaocao == 2).filter(BaoCao.donvi_id == donvi.id).\
                            filter(BaoCao.loaikybaocao == loaikybaocao).filter(BaoCao.kybaocao == kybaocao).\
                            filter(BaoCao.nambaocao == nambaocao).filter(BaoCao.cuakhau_id == cuakhau.id).first()
                    
                    baocaoobj["bangnguoi"].append(getdulieucuakhau(BangNguoi, cuakhau, idx + 1, loaibaocao, baocaock.bangnguoi if baocaock is not None else None))
                    baocaoobj["bangphuongtien"].append(getdulieucuakhau(BangPhuongTien, cuakhau, idx + 1, loaibaocao, baocaock.bangphuongtien if baocaock is not None else None))
                    
                    if loaikybaocao > 1:
                        baocaoobj["banghanghoa"].append(getdulieucuakhau(BangHangHoa, cuakhau, idx + 1, loaibaocao, baocaock.banghanghoa if baocaock is not None else None))
                        baocaoobj["bangthithe"].append(getdulieucuakhau(BangThiThe, cuakhau, idx + 1, loaibaocao, baocaock.bangthithe if baocaock is not None else None))
                        baocaoobj["bangvssh"].append(getdulieucuakhau(BangVSSH, cuakhau, idx + 1, loaibaocao, baocaock.bangvssh if baocaock is not None else None))
                        
                    #if (loaikybaocao > 2) and (loaibaocao == 1):
                        
                
                
            #get ky bao cao
        if baocaoobj is not None:
            return json({
                "baocao": baocaoobj,
                "congdon": congdon,
                "congdoncuakhau":congdoncuakhau,
                "cuakhau": [to_dict(cuakhau) for cuakhau in cuakhaus],
                "candelete":candelete
            })
    return text("Not found", status=404)


@app.route('/api/v1/getbaocaovien')
#@jwt_required()
async def getbaocaovien(request):
    notdict = ['_created_at','_updated_at','_deleted','_deleted_at','_etag', 'id', 'baocao_id', 'cuakhau_id', 'sothutu', 'stt']
    
    id = request.args.get("id", "")
    id = int(id) if id != '' else None
    
    now = datetime.now()
    nowyear = now.year
    nambaocao = None
    kybaocao = None
    baocaoobj = None
    #baocao = None
    donvi = None
    tungay = None
    denngay = None
    current_user = await currentUser(request)
    
    if (current_user is not None) and (current_user.donvi is not None):
        if(id is not None):
            baocao = BaoCaoVien.query.filter(BaoCaoVien.id == id).first()
            if(baocao is not None):
                donvi = baocao.donvi
                nambaocao = baocao.nambaocao
                kybaocao = baocao.kybaocao
                
                baocaoobj = to_dict(baocao)
                
                baocaoobj["donvi"] = to_dict(baocao.donvi)
                baocaoobj["bangviensukien"] = [to_dict(obj) for obj in baocao.bangviensukien.all()]
                baocaoobj["bangviencanbo"] = [to_dict(obj) for obj in baocao.bangviencanbo.all()]
                baocaoobj["bangvienhoatdongchung"] = [to_dict(obj) for obj in baocao.bangvienhoatdongchung.all()]
                
            else:
                return text("Not found", status=404)
            
        elif(id is None):
            
            donvi = current_user.donvi
            #id is None, tu tinh toan nam bao cao, ky bao cao
            lastbaocao = BaoCaoVien.query.filter(BaoCaoVien.donvi_id == donvi.id).order_by(BaoCaoVien.nambaocao.desc(), BaoCaoVien.kybaocao.desc()).first()
            
            if lastbaocao is not None:
                lastnambaocao = lastbaocao.nambaocao
                lastkybaocao = lastbaocao.kybaocao
                lastkybaocao = lastkybaocao + 1
                tungay, denngay = getngaybaocao(3, lastkybaocao, lastnambaocao)
                if tungay.year > lastnambaocao:
                    lastnambaocao = lastnambaocao + 1
                    lastkybaocao = 1
                    tungay, denngay = getngaybaocao(3, lastkybaocao, lastnambaocao)
                nambaocao = lastnambaocao
                kybaocao = lastkybaocao
            else:
                nambaocao = nowyear  
                kybaocao = 1
                tungay, denngay = getngaybaocao(3, kybaocao, nambaocao)
                
            #tao bao cao moi
            baocao = BaoCaoVien()
            baocao.nambaocao = nambaocao
            baocao.kybaocao = kybaocao
            baocao.ngaybaocao = now
            baocao.tungay = tungay
            baocao.denngay = denngay
            baocao.donvi_id = donvi.id
            
            baocaoobj = to_dict(baocao)
            baocaoobj["donvi"] = to_dict(donvi)
            baocaoobj["bangviensukien"] = []
            baocaoobj["bangviencanbo"] = []
            baocaoobj["bangvienhoatdongchung"] = []
            #Bang Nguoi
        if baocaoobj is not None:
            return json({
                "baocao": baocaoobj,
            })
    
    return text("Not found", status=404)


def getbaocaoconthieu(kybaocao, loaiky, nambaocao):
    
    datenow = datetime.now()
    today = date(datenow.year, datenow.month, datenow.day)
    thismonth = datenow.month
    if nambaocao is None:
        nambaocao = datenow.year

    
    if (nambaocao is not None) and (nambaocao < datenow.year):
        today = date(nambaocao, 12, 31)
        thismonth = 12
    #today = datetime.date.today()
    if (loaiky == 1):
        #print kybaocao
        firstday = date(nambaocao, 1, 1)
        
        diff = today - firstday
        numbaocao = int(diff.days/7)
        if(kybaocao < numbaocao):
            return list(range(kybaocao + 1, numbaocao + 1))
        else:
            return []
    if (loaiky == 2):
        
        if kybaocao < thismonth:
            return list(range(kybaocao + 1, thismonth + 1))
        else:
            return []
    if (loaiky == 3):
        if(today > date(nambaocao, 6, 1)) and kybaocao < 1:
            return [1]
        else:
            return []
    if (loaiky == 4):
        if(today > date(nambaocao, 9, 1)) and kybaocao < 1:
            return [1]
        else:
            return []  
    if (loaiky == 5): 
        if (kybaocao is None):
            return [1]
        else:
            return []
        #numday = datenow.
    

@app.route('/api/v1/thongkeguibaocao')
async def thongkeguibaocao(request):
    #donvi ID - recursive donvi
    #nambaocao = 2017
    nambaocao = request.args.get("nambaocao", None)
    if nambaocao is None:
        now = datetime.now()
        nambaocao = now.year
    else:
        nambaocao = int(nambaocao)
    
    thongketype = request.args.get("type", "")
    current_user = await currentUser(request)
    if (current_user is not None) and (current_user.donvi is not None):
        #model = db.session.query(DonVi).\
        #    options(joinedload_all("children", "children",
        #        "children", "children")).\
        #    filter(DonVi.id == current_user.donvi.id).\
        #    first()
            
        #model = db.session.query(DonVi).filter(DonVi.id == current_user.donvi.id).first()
        #donvichildids = model.children_ids()
        childrens = current_user.donvi.childrens()
        
        thongke = {}
        donvichildids = []
        for child in childrens:
            if child.tuyendonvi == 3:
                donvichildids.append(child.id)
                thongke[str(child.id)] = {
                                                "donvi_id": child.id,
                                                "ten": child.ten,
                                                "email": child.email,
                                                "sodienthoai": child.sodienthoai,
                                                "tuan": 0,
                                                "thang": 0,
                                                "6thang": 0,
                                                "9thang": 0,
                                                "nam": 0
                                                }
        
        #donvichildids = [child.id for child in childrens]
        
        
        baocaos = BaoCao.query.filter(BaoCao.donvi_id.in_(donvichildids)).filter(BaoCao.nambaocao == nambaocao)
        
        baocaodvs = baocaos.filter(BaoCao.loaibaocao == 1).all()
        #baocaocks = baocaos.filter(BaoCao.loaibaocao == 2).all()
        
        for baocao in baocaodvs:
            if str(baocao.donvi_id) not in thongke:
                thongke[str(baocao.donvi_id)] = {
                                            "donvi_id": baocao.donvi.id,
                                            "ten": baocao.donvi.ten,
                                            "tuan": 0,
                                            "thang": 0,
                                            "6thang": 0,
                                            "9thang": 0,
                                            "nam": 0
                                            }
            if baocao.loaikybaocao == 1:
                thongke[str(baocao.donvi_id)]["tuan"] = baocao.kybaocao if (thongke[str(baocao.donvi_id)]["tuan"] < baocao.kybaocao) else thongke[str(baocao.donvi_id)]["tuan"]
            if baocao.loaikybaocao == 2:
                thongke[str(baocao.donvi_id)]["thang"] = baocao.kybaocao if thongke[str(baocao.donvi_id)]["thang"] < baocao.kybaocao else thongke[str(baocao.donvi_id)]["thang"]
            if baocao.loaikybaocao == 3:
                thongke[str(baocao.donvi_id)]["6thang"] = baocao.kybaocao if thongke[str(baocao.donvi_id)]["6thang"] < baocao.kybaocao else thongke[str(baocao.donvi_id)]["6thang"]   
            if baocao.loaikybaocao == 4:
                thongke[str(baocao.donvi_id)]["9thang"] = baocao.kybaocao if thongke[str(baocao.donvi_id)]["9thang"] < baocao.kybaocao else thongke[str(baocao.donvi_id)]["9thang"]
            if baocao.loaikybaocao == 5:
                thongke[str(baocao.donvi_id)]["nam"] = baocao.kybaocao if thongke[str(baocao.donvi_id)]["nam"] < baocao.kybaocao else thongke[str(baocao.donvi_id)]["nam"]
            
                
        thongkedata = {}
        for tkdonvi in thongke.values():
            #print tkdonvi["ten"], tkdonvi["tuan"], tkdonvi["thang"], tkdonvi["6thang"], tkdonvi["9thang"]
            tkdonvi["thieu_tuan"] = getbaocaoconthieu(tkdonvi["tuan"], 1, nambaocao)
            tkdonvi["thieu_thang"] = getbaocaoconthieu(tkdonvi["thang"], 2, nambaocao)
            tkdonvi["thieu_6thang"] = getbaocaoconthieu(tkdonvi["6thang"], 3, nambaocao)
            tkdonvi["thieu_9thang"] = getbaocaoconthieu(tkdonvi["9thang"], 4, nambaocao)
            tkdonvi["thieu_nam"] = getbaocaoconthieu(tkdonvi["nam"], 5, nambaocao)
            #print "thieu ",tkdonvi["ten"], tkdonvi["thieu_tuan"], tkdonvi["thieu_thang"], tkdonvi["thieu_6thang"], tkdonvi["thieu_9thang"]
            
            
            if(len(tkdonvi["thieu_tuan"]) == 0) and (len(tkdonvi["thieu_thang"]) == 0) and (len(tkdonvi["thieu_6thang"]) == 0) and (len(tkdonvi["thieu_9thang"]) == 0) and (len(tkdonvi["thieu_nam"]) == 0):
                pass
            else:
                thongkedata[str(tkdonvi["donvi_id"])] = tkdonvi
        
        
        
        
        return  json(thongkedata)
    else:
        return text("Not found", status=404)
    
@app.route('/api/v1/thongkeguibaocaocuakhau')
async def thongkeguibaocaocuakhau(request):
    #donvi ID - recursive donvi
    #nambaocao = 2017
    nambaocao = request.args.get("nambaocao", None)
    if nambaocao is None:
        now = datetime.now()
        nambaocao = now.year
    else:
        nambaocao = int(nambaocao)
    
    thongketype = request.args.get("type", "")
    if (current_user is not None) and (current_user.donvi is not None):
        #model = db.session.query(DonVi).\
        #    options(joinedload_all("children", "children",
        #        "children", "children")).\
        #    filter(DonVi.id == current_user.donvi.id).\
        #    first()
            
        #model = db.session.query(DonVi).filter(DonVi.id == current_user.donvi.id).first()
        #donvichildids = model.children_ids()
        #childrens = current_user.donvi.cuakhau()
        childrens = CuaKhau.query.filter(CuaKhau.donvi_id == current_user.donvi_id).all()
        
        thongke = {}
        donvichildids = []
        for child in childrens:
            donvichildids.append(child.id)
            thongke[str(child.id)] = {
                                            "cuakhau_id": child.id,
                                            "ten": child.ten,
                                            "tuan": 0,
                                            "thang": 0
                                            }
        
        #donvichildids = [child.id for child in childrens]
        
        
        baocaos = BaoCao.query.filter(BaoCao.cuakhau_id.in_(donvichildids)).filter(BaoCao.nambaocao == nambaocao)
        
        baocaodvs = baocaos.filter(BaoCao.loaibaocao == 2).all()
        #baocaocks = baocaos.filter(BaoCao.loaibaocao == 2).all()
        
        for baocao in baocaodvs:
            if str(baocao.cuakhau_id) not in thongke:
                thongke[str(baocao.cuakhau_id)] = {
                                            "cuakhau_id": baocao.cuakhau.id,
                                            "ten": baocao.cuakhau.ten,
                                            "tuan": 0,
                                            "thang": 0
                                            }
            if baocao.loaikybaocao == 1:
                thongke[str(baocao.cuakhau_id)]["tuan"] = baocao.kybaocao if thongke[str(baocao.cuakhau_id)]["tuan"] < baocao.kybaocao else thongke[str(baocao.cuakhau_id)]["tuan"]
            if baocao.loaikybaocao == 2:
                thongke[str(baocao.cuakhau_id)]["thang"] = baocao.kybaocao if thongke[str(baocao.cuakhau_id)]["thang"] < baocao.kybaocao else thongke[str(baocao.cuakhau_id)]["thang"]
            
        thongkedata = {}
        for tkdonvi in thongke.values():
            tkdonvi["thieu_tuan"] = getbaocaoconthieu(tkdonvi["tuan"], 1, nambaocao)
            tkdonvi["thieu_thang"] = getbaocaoconthieu(tkdonvi["thang"], 2, nambaocao)
            
            if(len(tkdonvi["thieu_tuan"]) == 0) and (len(tkdonvi["thieu_thang"]) == 0):
                pass
            else:
                thongkedata[str(tkdonvi["cuakhau_id"])] = tkdonvi
                
        return  json(thongkedata)
    else:
        return text("Not found", status=404)

@app.route('/api/v1/timkiembaocao')
async def timkiembaocao(request):
    
    def prepare_arg(arg):
        ret = None
        if((arg is not None) and (arg != '')):
            ret = int(arg)
        return ret
    
    currdonvi = None
    current_user = await currentUser(request)
    if current_user is not None:
        currdonvi =  current_user.donvi
    else:
        return json({}, status=404)
    
    nam = prepare_arg(request.args.get("nam", None))
    thang = prepare_arg(request.args.get("thang", None))
    donvi_id = prepare_arg(request.args.get("donvi_id", None))
    cuakhau_id = prepare_arg(request.args.get("cuakhau_id", None))
    loaibaocao = prepare_arg(request.args.get("loaibaocao", None))
    loaiky = prepare_arg(request.args.get("loaiky", None))
    tinhtrang = prepare_arg(request.args.get("tinhtrang", None))
    #
    if nam is None:
        return json({}, status=404)
    
    curdonvichildids = currdonvi.children_ids()
    if(donvi_id is None) or (donvi_id not in curdonvichildids):
        donvi_id = currdonvi.id
    
    
    donvichildids = []
    if (donvi_id != currdonvi.id):
        donvi = DonVi.query.filter(DonVi.id == donvi_id).first()
        donvichildids = donvi.children_ids()
    else:
        donvichildids = curdonvichildids
    
    baocaos = BaoCao.query.filter(BaoCao.nambaocao == nam).filter(BaoCao.loaibaocao == loaibaocao).\
    filter(BaoCao.donvi_id.in_(donvichildids))
    
    if (loaibaocao == 2) and (cuakhau_id is not None):
        baocaos = baocaos.filter(BaoCao.cuakhau_id == cuakhau_id)
    
    if loaiky is not None:
        baocaos = baocaos.filter(BaoCao.loaikybaocao == loaiky)
    if tinhtrang is not None:
        baocaos = baocaos.filter(BaoCao.tinhtrang == tinhtrang)
    if thang is not None:
        tungay = date(nam, thang, 1)
        denngay = date(nam, thang, 1)
        if(thang <= 11):
            tungay = date(nam, thang, 1)
            denngay = date(nam, thang + 1, 1)
            denngay = denngay - timedelta(days=1)
        if(thang == 12):
            tungay = date(nam, 12, 1)
            denngay = date(nam, 12, 31)
        baocaos = baocaos.filter(BaoCao.tungay >= tungay).filter(BaoCao.tungay <= denngay)
    
    baocaos = baocaos.all()
    
    baocaoobjs = [{"id": baocao.id,"nambaocao": baocao.nambaocao,"ma":baocao.ma, "donvi": baocao.donvi.ten, "ky": baocao.kybaocao, "loaiky": baocao.loaikybaocao,
                    "cuakhau": baocao.cuakhau.ten if baocao.cuakhau is not None else "", "ngaygui": str(baocao.ngaybaocao), "tinhtrang": baocao.tinhtrang} for baocao in baocaos]
        
    return json(baocaoobjs)
    
def tinhthongketheobang(baocao, tenbang, resp, cuakhaulist):
    notdict = ['_created_at','_updated_at','_deleted','_deleted_at','_etag', 'id', 'baocao_id', 'cuakhau_id', 'sothutu', 'stt']
    
    for obj in (getattr(baocao, tenbang)).all():
            #if resp["bangnguoi"]["donvi"] is None:
            #    resp["bangnguoi"]["donvi"] = {"ten": baocao.donvi.ten}
            if(obj.cuakhau_id in cuakhaulist):
                found = False
                for ck in resp:
                    if (ck["cuakhau_id"] == obj.cuakhau_id) and (ck["bang"] == tenbang):
                        found = True
                        #condon:
                        for col in obj.__table__.c:
                            if (col.name not in notdict) and (str(col.type) in ['INTEGER','SMALLINT', 'FLOAT']):
                                ckval = getattr(obj, col.name) if getattr(obj, col.name) is not None else 0
                                ck[col.name] = (ck[col.name] + ckval) \
                                if (col.name in ck) and (ck[col.name] is not None) else ckval
                        break;
                
                if not found :
                    ck = to_dict(obj)
                    for col in obj.__table__.c:
                        if col.name in ["tencuakhau", "cuakhau_id"]:
                            pass
                        elif (col.name in notdict) or (str(col.type) not in ['INTEGER','SMALLINT', 'FLOAT']):
                            del ck[col.name]
                    ck["donvi_id"] = baocao.donvi.id
                    ck["donvi_ten"] = baocao.donvi.ten
                    ck["bang"] = tenbang
                    resp.append(ck)
                
                for k, v in ck.items():
                    #if key is not in [""]
                    if v ==0:
                        ck[k] = None
                    

@app.route('/api/v1/thongketheodonvi')
async def thongketheodonvi(request):
    notdict = ['_created_at','_updated_at','_deleted','_deleted_at','_etag', 'id', 'baocao_id', 'cuakhau_id', 'sothutu', 'stt']
    
    notdict2 = ['cuakhau_id', 'tencuakhau', 'bang', 'donvi_id','donvi_ten']
    
    #p_tunam = request.args.get("tunam", None)
    #p_dennam = request.args.get("tunam", None)
    
    #p_tunam = request.args.get("tunam", None)
    #pass
    query = request.args.get("query", None)
    export = request.args.get("export", False)
    if export is not export:
        export = True
    data = json.loads(query)

    donvilist = data["donvi"]
    cuakhaulist = data["cuakhau"]
    #loctheo = data['loctheo']
    tutuan = data["tutuan"]
    dentuan = data["dentuan"]
    tuthang = data["tuthang"]
    denthang = data["denthang"]
    tu6thang = data["tu6thang"]
    den6thang = data["den6thang"]
    tunam = data["tunam"]
    dennam = data["dennam"]
    loaikybaocao = data["loaikybaocao"]
    loaibaocao = data["loaibaocao"]
    
    solieucuakhau = data["solieucuakhau"]
    
    #
    '''donvilist = [2,3]
    cuakhaulist = [1,2,3]
    loctheo = "TuanThang"
    tutuan = 1
    dentuan = 5
    tuthang = 1
    denthang = 3
    tunam = 2017
    dennam = 2017
    loaikybaocao = 1
    loaibaocao = [1,2,3,4,5]'''
    #
    datestart = None
    dateend = None
    #if(loctheo == "TuanThang"): 
    if(loaikybaocao == 1):
        adddays = (tutuan - 1 )  * 7
        adddays2 = (dentuan - 1 )  * 7
        
        firstday = date(tunam, 1, 1)
        firstday2 = date(dennam, 1, 1)
        datestart = firstday + timedelta(days=adddays)
        dateend = firstday2 + timedelta(days=adddays2)
        
        #print(datestart, dateend)
        
    elif(loaikybaocao == 2):
        datestart = date(tunam, tuthang, 1)
        dateend = date(dennam, denthang, 1)
    elif(loaikybaocao == 3):
        datestart = date(tunam, (tu6thang - 1) * 6 + 1, 1)
        dateend = date(dennam, (den6thang - 1) *6 + 1, 1)
    elif(loaikybaocao > 3):
        datestart = date(tunam, 1, 1)
        dateend = date(dennam, 1, 1)
    
    
    
    baocaos = BaoCao.query.filter(BaoCao.loaikybaocao == loaikybaocao).filter(BaoCao.donvi_id.in_(donvilist)).\
        filter(BaoCao.tungay >= datestart).filter(BaoCao.denngay <= dateend).filter(BaoCao.loaibaocao == 1).all()
    
    resp = []
    for baocao in baocaos:
        #print(baocao, baocao.id, baocao.ma, baocao.loaibaocao)
        tinhthongketheobang(baocao, "bangnguoi", resp, cuakhaulist)
        tinhthongketheobang(baocao, "bangphuongtien", resp, cuakhaulist)
        tinhthongketheobang(baocao, "banghanghoa", resp, cuakhaulist)
        tinhthongketheobang(baocao, "bangthithe", resp, cuakhaulist)
        tinhthongketheobang(baocao, "bangvssh", resp, cuakhaulist)
        
    resp = sorted(resp, key = lambda x: (x["bang"], x["donvi_id"], x["cuakhau_id"]))
    
    groups = groupby(resp, key=lambda d: (d['bang'], d['donvi_id']))
    
    respgrp = {}
    
    
    #print groups
    for keys, group in groups:
        if keys[0] not in respgrp:
            respgrp[keys[0]] = {}
        if keys[1] not in respgrp[keys[0]]:  
            respgrp[keys[0]][keys[1]] = {"cuakhau": []}
        for content in group:
            respgrp[keys[0]][keys[1]]["cuakhau"].append(content)
            for k, v in content.items():
                #print '\t', str(k)
                if(k not in notdict2):
                    respgrp[keys[0]][keys[1]][k] = (respgrp[keys[0]][keys[1]][k] + (v if v is not None else 0)) \
                                if (k in respgrp[keys[0]][keys[1]]) and (respgrp[keys[0]][keys[1]][k] is not None) else (v if v is not None else 0)
                    if respgrp[keys[0]][keys[1]][k] == 0:
                        respgrp[keys[0]][keys[1]][k] = None
                elif k == 'donvi_ten':
                    if k not in respgrp[keys[0]][keys[1]]:
                        respgrp[keys[0]][keys[1]][k] = v
            
    
    respdata = {
                "param": {
                         "tungay": datestart.isoformat(),
                         "denngay": dateend.isoformat(),
                         "loaikybaocao": loaikybaocao,
                         "tutuan": tutuan,
                         "dentuan": dentuan,
                         "tuthang": tuthang,
                         "denthang": denthang,
                         "tu6thang": tu6thang,
                         "den6thang": den6thang,
                         "tunam": tunam,
                         "dennam": dennam,
                         "solieucuakhau": solieucuakhau
                         },
                "data": respgrp
                }
    
    if export:
        rand = ''.join(random.choice(string.lowercase) for i in range(5))
        filename = rand + "abc.xlsx"
        exportthongketheodonvi(respdata, filename)
        #return "export to file " + filename
        return send_file(filename, mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                attachment_filename='thongke-' + filename, as_attachment=True)
    else:
        return json(respdata)
                                
@app.route('/api/v1/donvitree_thongke')
async def donvitree_thongke(request):
    mode = request.args.get("mode", None)
    if mode is None:
        return text("Not found", status=501)
    current_user = await currentUser(request)
    if (current_user is not None) and (current_user.donvi is not None):
        
        
        
        
        resp = []
        donvichildids = current_user.donvi.children_ids()
        donviList = DonVi.query.filter(DonVi.id.in_(donvichildids))
        
        if mode == "donvi":
            if current_user.has_role("DonViUser") or current_user.has_role("DonViAdmin"):
                donvi = current_user.donvi
                obj = to_dict(donvi)
                obj["type"] = "donvi"
                obj["color"] =  "#990000"
                obj["state"]={"checked": False}
                obj["nodes"] = []
                cklist = donvi.cuakhau.all()
                for ck in cklist:
                    ckobj = to_dict(ck)
                    ckobj["type"] = "cuakhau"
                    ckobj["color"] =  "#009900"
                    ckobj["state"]={"checked": False}
                    obj["nodes"].append(ckobj)
                    
                resp.append(obj)
                return json(resp)
            
            donviqt = donviList.filter(DonVi.loaidonvi == 10).all()
            donvitt = donviList.filter(DonVi.loaidonvi == 20).all()
            objqt = {"ten": u"TT KDYT Quốc tế", "nodes":[]}
            objtt = {"ten": u"TT YTDP tỉnh, thành", "nodes":[]}
            
            for donvi in donviqt:
                obj = to_dict(donvi)
                obj["type"] = "donvi"
                obj["color"] =  "#990000"
                obj["state"]={"checked": False}
                obj["nodes"] = []
                cklist = donvi.cuakhau.all()
                for ck in cklist:
                    ckobj = to_dict(ck)
                    ckobj["type"] = "cuakhau"
                    ckobj["color"] =  "#009900"
                    ckobj["state"]={"checked": False}
                    obj["nodes"].append(ckobj)
                objqt["nodes"].append(obj)
            
            for donvi in donvitt:
                obj = to_dict(donvi)
                obj["type"] = "donvi"
                obj["nodes"] = []
                obj["color"] =  "#990000"
                obj["state"]={"checked": False}
                cklist = donvi.cuakhau.all()
                for ck in cklist:
                    ckobj = to_dict(ck)
                    ckobj["type"] = "cuakhau"
                    ckobj["color"] =  "#009900"
                    ckobj["state"]={"checked": False}
                    obj["nodes"].append(ckobj)
                objtt["nodes"].append(obj)
        
            resp.append(objqt)
            resp.append(objtt)
            
            return json(resp)
        if mode == "cuakhau":
            cuakhaus = CuaKhau.query.filter(CuaKhau.donvi_id.in_(donvichildids))
            cuakhaudb = cuakhaus.filter(or_((CuaKhau.duongboquocte == True), (CuaKhau.duongbochinh == True), (CuaKhau.duongbophu == True))).all()
            cuakhauds = cuakhaus.filter(CuaKhau.duongsat == True).all()
            cuakhaudhk = cuakhaus.filter(CuaKhau.duonghangkhong == True).all()
            cuakhaudt = cuakhaus.filter(or_((CuaKhau.duongthuyloai1 == True), (CuaKhau.duongthuyloai2 == True))).all()
            
            objdb = {"ten": u"Đường bộ", "nodes":[]}
            objds = {"ten": u"Đường sắt", "nodes":[]}
            objhk = {"ten": u"Đường hàng không", "nodes":[]}
            objdt = {"ten": u"Đường thuỷ", "nodes":[]}
            
            for ck in cuakhaudb:
                ckobj = to_dict(ck)
                ckobj["type"] = "cuakhau"
                ckobj["color"] =  "#009900"
                ckobj["state"]={"checked": False}
                ckobj["donvi_id"] = ck.donvi_id
                ckobj["donvi_ten"] = ck.donvi.ten
                
                objdb["nodes"].append(ckobj)
            
            for ck in cuakhauds:
                ckobj = to_dict(ck)
                ckobj["type"] = "cuakhau"
                ckobj["color"] =  "#009900"
                ckobj["state"]={"checked": False}
                ckobj["donvi_id"] = ck.donvi_id
                ckobj["donvi_ten"] = ck.donvi.ten
                
                objds["nodes"].append(ckobj)
            
            for ck in cuakhaudhk:
                ckobj = to_dict(ck)
                ckobj["type"] = "cuakhau"
                ckobj["color"] =  "#009900"
                ckobj["state"]={"checked": False}
                ckobj["donvi_id"] = ck.donvi_id
                ckobj["donvi_ten"] = ck.donvi.ten
                
                objhk["nodes"].append(ckobj)
            
            for ck in cuakhaudt:
                ckobj = to_dict(ck)
                ckobj["type"] = "cuakhau"
                ckobj["color"] =  "#009900"
                ckobj["state"]={"checked": False}
                ckobj["donvi_id"] = ck.donvi_id
                ckobj["donvi_ten"] = ck.donvi.ten
                
                objdt["nodes"].append(ckobj)
            
            resp.append(objdb)
            resp.append(objds)
            resp.append(objhk)
            resp.append(objdt)
            
            return json(resp)
    
    return text("Not found", status=501)


@app.route('/api/v1/reset_all_password')
async def reset_all_password(request):
    users = User.query.all()
    for u in users:
        u.password = encrypt_password("123456")
        print(u.id)
    db.session.commit()
    return json({})
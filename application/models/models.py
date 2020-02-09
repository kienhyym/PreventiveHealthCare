from application.database import db
from application.database.model import CommonModel, CommonAdjacencyModel
from sqlalchemy import (func, String,SmallInteger, Integer, BigInteger, Boolean, DECIMAL, Float, Text, ForeignKey, UniqueConstraint, Index, DateTime)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship, backref
from sqlalchemy.orm.collections import attribute_mapped_collection
import uuid
from math import floor
import time

def default_uuid():
    return str(uuid.uuid4())

roles_users = db.Table('roles_users',
                       db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
                       db.Column('role_id', db.Integer(), db.ForeignKey('role.id')))
class User(CommonModel):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    
    first_name = db.Column(db.String(120))
    last_name = db.Column(db.String(120))
    
    active = db.Column(db.Boolean(), default=False)
    confirmed_at = db.Column(db.DateTime())
    roles = db.relationship('Role', secondary=roles_users)
    last_login_at = db.Column(db.DateTime())
    current_login_at = db.Column(db.DateTime())
    last_login_ip = db.Column(db.String(255))
    current_login_ip = db.Column(db.String(255))
    login_count = db.Column(db.Integer)
    birthday = db.Column(db.DateTime())
    gender = db.Column(db.String(255))
    phone = db.Column(db.String(31))
    donvi_id = db.Column(db.Integer,db.ForeignKey('donvi.id'), nullable=True)
    donvi = db.relationship('DonVi', viewonly=True)
    cuakhau_id = db.Column(db.Integer,db.ForeignKey('cuakhau.id'), nullable=True)
    cuakhau = db.relationship('CuaKhau',viewonly=True)
    
    def __repr__(self):
        return '<models.User[email=%s]>' % self.email
    def __is_admin__(self):
        return True
class Role(CommonModel):
    __tablename__ = 'role'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))
    
class Permission(CommonModel):
    __tablename__ = 'permission'
    id = db.Column(db.Integer, primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'), nullable=True)
    role = db.relationship('Role', backref=db.backref('permission',
                                                         lazy='dynamic'))
    model = db.Column(db.String,index=True)
    canread = db.Column(db.Boolean,index=True, default=False)
    cancreate = db.Column(db.Boolean,index=True, default=False)
    canupdate = db.Column(db.Boolean,index=True, default=False)
    candelete = db.Column(db.Boolean,index=True, default=False)
    cancreateown = db.Column(db.Boolean,index=True, default=False)
    canupdateown = db.Column(db.Boolean,index=True, default=False)
    candeleteown = db.Column(db.Boolean,index=True, default=False)
    __table_args__ = (UniqueConstraint('role_id', 'model', name='uq_permission_rolename_modelname'),)
    
    
#user_datastore = SQLAlchemyUserDatastore(db, User, Role, Permission)
class QuocGia(CommonModel):
    __tablename__ = 'quocgia'
    id = db.Column(db.Integer, primary_key=True)
    ma = db.Column(db.String(255), unique=True)
    ten = db.Column(db.String(255), nullable=False)
    
class TinhThanh(CommonModel):
    __tablename__ = 'tinhthanh'
    id = db.Column(db.Integer, primary_key=True)
    ma = db.Column(db.String(255), unique=True)
    ten = db.Column(db.String(255), nullable=False)
    quocgia_id = db.Column(db.Integer, db.ForeignKey('quocgia.id'), nullable=True)
    quocgia = db.relationship('QuocGia',viewonly=True)
class QuanHuyen(CommonModel):
    __tablename__ = 'quanhuyen'
    id = db.Column(db.Integer, primary_key=True)
    ma = db.Column(db.String(255), unique=True)
    ten = db.Column(db.String(255), nullable=False)
    tinhthanh_id = db.Column(db.Integer, db.ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = db.relationship('TinhThanh',viewonly=True)
class DonVi(CommonAdjacencyModel):
    __tablename__ = 'donvi'
    #_parent_attr_ = 'captren_id'
    id = db.Column(db.Integer, primary_key=True)
    ma = db.Column(db.String(255), nullable=True)
    ten = db.Column(db.String(255), nullable=False)
    sodienthoai = db.Column(db.String(63))
    diachi = db.Column(db.String(255))
    email = db.Column(db.String(255))
    ghichu = db.Column(db.String(255))
    vungmien = db.Column(db.SmallInteger) #
    tinhthanh_id = db.Column(db.Integer, db.ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = db.relationship('TinhThanh', viewonly=True)
    
    tuyendonvi = db.Column(db.SmallInteger, nullable=False) # la trung tam, hay truong hoc ...
    coquanchuquan = db.Column(db.String(255))
    parent_id = db.Column(db.Integer, db.ForeignKey('donvi.id'), nullable=True)
    loaidonvi = db.Column(db.SmallInteger) #1: kdyt quocte, 2: kdyt tinhthanh
    giamdoc = db.Column(db.String)
    sdtgiamdoc = db.Column(db.String)
    emailgiamdoc = db.Column(db.String)
    phogiamdoc = db.Column(db.String)
    sdtphogiamdoc = db.Column(db.String)
    emailphogiamdoc = db.Column(db.String)
    
    children = relationship("DonVi",
        # cascade deletions
        cascade="all, delete-orphan",
        # many to one + adjacency list - remote_side
        # is required to reference the 'id'
        # column in the join condition.
        backref=backref("parent", remote_side=id, viewonly=True),
        # children will be represented as a dictionary
        # on the "id" attribute.
        collection_class=attribute_mapped_collection('id'),
    )
    
    def __todict__(self):
        return {"id":self.id, "ma": self.ma,"ten": self.ten, "parent_id": self.parent_id, "tuyendonvi":self.tuyendonvi}
    
#app model here
    
class Benh(CommonModel):
    __tablename__ = 'benh'
    id = db.Column(db.Integer, primary_key=True)
    ma = db.Column(db.String(255), unique=True)
    ten = db.Column(db.String(255), nullable=False)
class CuaKhau(CommonModel):
    __tablename__ = 'cuakhau'
    id = db.Column(db.Integer, primary_key=True)
    ma = db.Column(db.String(255), unique=True)
    ten = db.Column(db.String(255), nullable=False)
    #loaicuakhau = db.Column(db.SmallInteger) #
    kiemdichyte = db.Column(db.Boolean, default=True)
    phongcachly = db.Column(db.Boolean, default=True)
    nguoilienlac = db.Column(db.String(255), nullable=True)
    sodienthoai = db.Column(db.String, nullable=True)
    diachi = db.Column(db.String, nullable=True)
    email = db.Column(db.String, nullable=True)
    donvi_id = db.Column(db.Integer,db.ForeignKey('donvi.id'), nullable=True)
    donvi = db.relationship('DonVi', backref=db.backref('cuakhau',lazy='dynamic'),viewonly=True)
    tinhthanh_id = db.Column(db.Integer,db.ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = db.relationship('TinhThanh',viewonly=True)
    thutu = db.Column(db.Integer, nullable=True)
    #loaicuakhau
    duongboquocte = db.Column(db.Boolean, default=False)
    duongbochinh = db.Column(db.Boolean, default=False)
    duongbophu = db.Column(db.Boolean, default=False)
    duongsat = db.Column(db.Boolean, default=False)
    duonghangkhong = db.Column(db.Boolean, default=False)
    duongthuyloai1 = db.Column(db.Boolean, default=False)
    duongthuyloai2 = db.Column(db.Boolean, default=False)
    
    quocgia_tiepgiap = db.Column(db.String, nullable=True)
    cuakhau_tiepgiap = db.Column(db.String, nullable=True)
    
class BaoCao(CommonModel):
    __tablename__ = 'baocao'
    id = db.Column(db.Integer, primary_key=True)
    ma = db.Column(db.String(255))
    ngaybaocao = db.Column(db.DateTime(),default=func.now())
    loaikybaocao = db.Column(db.Integer, nullable=False)
    loaibaocao = db.Column(db.SmallInteger()) #1 - don vi, 2 cua khau
    kybaocao = db.Column(db.SmallInteger, nullable=False)
    nambaocao = db.Column(db.Integer, nullable=False)
    tungay = db.Column(db.Date())
    denngay = db.Column(db.Date())
    donvi_id = db.Column(db.Integer,db.ForeignKey('donvi.id'), nullable=True)
    donvi = db.relationship('DonVi',viewonly=True)
    cuakhau_id = db.Column(db.Integer,db.ForeignKey('cuakhau.id'), nullable=True)
    cuakhau = db.relationship('CuaKhau',viewonly=True)
    nhanxetnguoi = db.Column(db.String())
    nhanxetphuongtien = db.Column(db.String())
    nhanxethanghoa = db.Column(db.String())
    nhanxetthithe = db.Column(db.String())
    nhanxetvssh = db.Column(db.String())
    
    nhanxet = db.Column(db.String())
    kiennghi = db.Column(db.String())
    hoatdongkhac = db.Column(db.String())
    nhanlucts = db.Column(db.Integer())
    nhanlucbienche = db.Column(db.Integer())
    nhanluchopdong = db.Column(db.Integer())
    tinhtrang = db.Column(db.SmallInteger, nullable=False, default=1)
    #__table_args__ = (UniqueConstraint( 'loaikybaocao', 'loaibaocao', 'kybaocao', 'nambaocao', 'donvi_id', 'cuakhau_id',name='uq_baocao_donvi_id_cuakhau_id_loaibaocao_loaikybaocao_kybaocao_nambaocao'),
    #                Index('baocao_uq_idx', 'loaikybaocao', 'loaibaocao', 'kybaocao', 'nambaocao', 'donvi_id', 'cuakhau_id', unique=True)
    #                  )
    
    #__table_args__ = (
    #                Index('baocao_uq_idx', 'loaikybaocao', 'loaibaocao', 'kybaocao', 'nambaocao', 'donvi_id', 'cuakhau_id', unique=True),
    #                Index('baocao_uq_idx2', 'loaikybaocao', 'loaibaocao', 'kybaocao', 'nambaocao', 'donvi_id', unique=True, postgresql_where=('cuakhau_id' is None))
    #                  )
Index('baocao_uq_idx', BaoCao.loaikybaocao, BaoCao.loaibaocao, BaoCao.kybaocao, BaoCao.nambaocao, BaoCao.donvi_id, BaoCao.cuakhau_id, unique=True)
Index('baocao_uq_idx2', BaoCao.loaikybaocao, BaoCao.loaibaocao, BaoCao.kybaocao, BaoCao.nambaocao, BaoCao.donvi_id, unique=True, postgresql_where=(BaoCao.cuakhau_id.is_(None)))
class BangNguoi(CommonModel):
    __tablename__ = 'bangnguoi'
    id = db.Column(db.Integer, primary_key=True)
    baocao_id = db.Column(db.Integer,db.ForeignKey('baocao.id'), nullable=True)
    baocao = db.relationship('BaoCao', backref=db.backref('bangnguoi',lazy='dynamic'))
    cuakhau_id = db.Column(db.Integer,db.ForeignKey('cuakhau.id'), nullable=True)
    tencuakhau = db.Column(db.String())
    macuakhau = db.Column(db.String(25))
    sothutu = db.Column(db.SmallInteger())
    ng_nc_sl1 = db.Column(db.Integer())
    ng_nc_sl2 = db.Column(db.Integer())
    ng_nc_ts1 = db.Column(db.Integer())
    ng_nc_ts2 = db.Column(db.Integer())
    ng_nc_ghichu = db.Column(db.String())
    ng_xc_sl1 = db.Column(db.Integer())
    ng_xc_sl2 = db.Column(db.Integer())
    ng_xc_ts1 = db.Column(db.Integer())
    ng_xc_ts2 = db.Column(db.Integer())
    ng_xc_ghichu = db.Column(db.String())
    ng_qc_sl1 = db.Column(db.Integer())
    ng_qc_sl2 = db.Column(db.Integer())
    ng_qc_ts1 = db.Column(db.Integer())
    ng_qc_ts2 = db.Column(db.Integer())
    ng_qc_ghichu = db.Column(db.String())
class BangPhuongTien(CommonModel):
    __tablename__ = 'bangphuongtien'
    id = db.Column(db.Integer, primary_key=True)
    baocao_id = db.Column(db.Integer,db.ForeignKey('baocao.id'), nullable=True)
    baocao = db.relationship('BaoCao', backref=db.backref('bangphuongtien',lazy='dynamic'))
    cuakhau_id = db.Column(db.Integer,db.ForeignKey('cuakhau.id'), nullable=True)
    tencuakhau = db.Column(db.String())
    macuakhau = db.Column(db.String(25))
    sothutu = db.Column(db.SmallInteger())
    pt_nc_hk_sl = db.Column(db.Integer())    
    pt_nc_hk_skt = db.Column(db.Integer())    
    pt_nc_hk_sxl = db.Column(db.Integer())    
    pt_nc_db_sl = db.Column(db.Integer())    
    pt_nc_db_skt = db.Column(db.Integer())    
    pt_nc_db_sxl = db.Column(db.Integer())    
    pt_nc_dt_sl = db.Column(db.Integer())    
    pt_nc_dt_skt = db.Column(db.Integer())    
    pt_nc_dt_sxl = db.Column(db.Integer())    
    pt_nc_ghichu = db.Column(db.String())     
    pt_xc_ghichu = db.Column(db.String())     
    pt_qc_ghichu = db.Column(db.String())     
    pt_nc_ds_sl = db.Column(db.Integer())    
    pt_nc_ds_skt = db.Column(db.Integer())    
    pt_nc_ds_sxl = db.Column(db.Integer())    
    #pt_nc_ds_ghichu    
    pt_xc_hk_sl = db.Column(db.Integer())    
    pt_xc_hk_skt = db.Column(db.Integer())    
    pt_xc_hk_sxl = db.Column(db.Integer())    
    pt_xc_db_sl = db.Column(db.Integer())    
    pt_xc_db_skt = db.Column(db.Integer())    
    pt_xc_db_sxl = db.Column(db.Integer())    
    pt_xc_dt_sl = db.Column(db.Integer())    
    pt_xc_dt_skt = db.Column(db.Integer())    
    pt_xc_dt_sxl = db.Column(db.Integer())    
    pt_xc_ds_sl = db.Column(db.Integer())    
    pt_xc_ds_skt = db.Column(db.Integer())    
    pt_xc_ds_sxl = db.Column(db.Integer())    
    pt_qc_hk_sl = db.Column(db.Integer())    
    pt_qc_hk_skt = db.Column(db.Integer())    
    pt_qc_hk_sxl = db.Column(db.Integer())    
    pt_qc_db_sl = db.Column(db.Integer())    
    pt_qc_db_skt = db.Column(db.Integer())    
    pt_qc_db_sxl = db.Column(db.Integer())    
    pt_qc_dt_sl = db.Column(db.Integer())    
    pt_qc_dt_skt = db.Column(db.Integer())    
    pt_qc_dt_sxl = db.Column(db.Integer())    
    pt_qc_ds_sl = db.Column(db.Integer())    
    pt_qc_ds_skt = db.Column(db.Integer())    
    pt_qc_ds_sxl = db.Column(db.Integer())    
class BangHangHoa(CommonModel):
    __tablename__ = 'banghanghoa'
    id = db.Column(db.Integer, primary_key=True)
    baocao_id = db.Column(db.Integer,db.ForeignKey('baocao.id'), nullable=True)
    baocao = db.relationship('BaoCao', backref=db.backref('banghanghoa',lazy='dynamic'))
    cuakhau_id = db.Column(db.Integer,db.ForeignKey('cuakhau.id'), nullable=True)
    tencuakhau = db.Column(db.String())
    macuakhau = db.Column(db.String(25))
    sothutu = db.Column(db.SmallInteger())
    
    hh_nc_bpbk_sl = db.Column(db.Integer())
    hh_nc_bpbk_skt = db.Column(db.Integer())    
    hh_nc_bpbk_sxl = db.Column(db.Integer())    
    hh_nc_hhk_tl = db.Column(db.Float()) 
    hh_nc_hhk_skt = db.Column(db.Integer())    
    hh_nc_hhk_sxl = db.Column(db.Integer())    
    hh_nc_ghichu = db.Column(db.String())    
    hh_xc_bpbk_sl = db.Column(db.Integer())    
    hh_xc_bpbk_skt = db.Column(db.Integer())    
    hh_xc_bpbk_sxl = db.Column(db.Integer())    
    hh_xc_hhk_tl = db.Column(db.Float())        
    hh_xc_hhk_skt = db.Column(db.Integer())    
    hh_xc_hhk_sxl = db.Column(db.Integer())    
    hh_xc_ghichu = db.Column(db.String())    
    hh_qc_bpbk_sl = db.Column(db.Integer())    
    hh_qc_bpbk_skt = db.Column(db.Integer())    
    hh_qc_bpbk_sxl = db.Column(db.Integer())    
    hh_qc_hhk_tl = db.Column(db.Float())    
    hh_qc_hhk_skt = db.Column(db.Integer())    
    hh_qc_hhk_sxl = db.Column(db.Integer())    
    hh_qc_ghichu = db.Column(db.String())    
class BangThiThe(CommonModel):
    __tablename__ = 'bangthithe'
    id = db.Column(db.Integer, primary_key=True)
    baocao_id = db.Column(db.Integer,db.ForeignKey('baocao.id'), nullable=True)
    baocao = db.relationship('BaoCao', backref=db.backref('bangthithe',lazy='dynamic'))
    cuakhau_id = db.Column(db.Integer,db.ForeignKey('cuakhau.id'), nullable=True)
    tencuakhau = db.Column(db.String())
    macuakhau = db.Column(db.String(25))
    sothutu = db.Column(db.SmallInteger())
    tt_nc_tt_sl = db.Column(db.Integer())    
    tt_nc_tt_skt = db.Column(db.Integer())    
    tt_nc_tt_sxl = db.Column(db.Integer())    
    tt_nc_hc_sl = db.Column(db.Integer())    
    tt_nc_hc_skt = db.Column(db.Integer())    
    tt_nc_hc_sxl = db.Column(db.Integer())    
    tt_nc_tc_sl = db.Column(db.Integer())    
    tt_nc_tc_skt = db.Column(db.Integer())    
    tt_nc_tc_sxl = db.Column(db.Integer())    
    tt_xc_tt_sl = db.Column(db.Integer())    
    tt_xc_tt_skt = db.Column(db.Integer())    
    tt_xc_tt_sxl = db.Column(db.Integer())    
    tt_xc_hc_sl = db.Column(db.Integer())    
    tt_xc_hc_skt = db.Column(db.Integer())    
    tt_xc_hc_sxl = db.Column(db.Integer())    
    tt_xc_tc_sl = db.Column(db.Integer())    
    tt_xc_tc_skt = db.Column(db.Integer())    
    tt_xc_tc_sxl = db.Column(db.Integer())    
    tt_qc_tt_sl = db.Column(db.Integer())    
    tt_qc_tt_skt = db.Column(db.Integer())    
    tt_qc_tt_sxl = db.Column(db.Integer())    
    tt_qc_hc_sl = db.Column(db.Integer())    
    tt_qc_hc_skt = db.Column(db.Integer())    
    tt_qc_hc_sxl = db.Column(db.Integer())    
    tt_qc_tc_sl = db.Column(db.Integer())    
    tt_qc_tc_skt = db.Column(db.Integer())    
    tt_qc_tc_sxl = db.Column(db.Integer())    
    tt_nc_ghichu = db.Column(db.String())    
    tt_xc_ghichu = db.Column(db.String())    
    tt_qc_ghichu = db.Column(db.String())    
class BangVSSH(CommonModel):
    __tablename__ = 'bangvssh'
    id = db.Column(db.Integer, primary_key=True)
    baocao_id = db.Column(db.Integer,db.ForeignKey('baocao.id'), nullable=True)
    baocao = db.relationship('BaoCao', backref=db.backref('bangvssh',lazy='dynamic'))
    cuakhau_id = db.Column(db.Integer,db.ForeignKey('cuakhau.id'), nullable=True)
    tencuakhau = db.Column(db.String())
    macuakhau = db.Column(db.String(25))
    sothutu = db.Column(db.SmallInteger())
    vssh_nc_vs_sl = db.Column(db.Integer())    
    vssh_nc_vs_skt = db.Column(db.Integer())    
    vssh_nc_vs_sxl = db.Column(db.Integer())    
    vssh_nc_sh_sl = db.Column(db.Integer())    
    vssh_nc_sh_skt = db.Column(db.Integer())    
    vssh_nc_sh_sxl = db.Column(db.Integer())    
    vssh_nc_mo_sl = db.Column(db.Integer())    
    vssh_nc_mo_skt = db.Column(db.Integer())    
    vssh_nc_mo_sxl = db.Column(db.Integer())    
    vssh_xc_vs_sl = db.Column(db.Integer())    
    vssh_xc_vs_skt = db.Column(db.Integer())    
    vssh_xc_vs_sxl = db.Column(db.Integer())    
    vssh_xc_sh_sl = db.Column(db.Integer())    
    vssh_xc_sh_skt = db.Column(db.Integer())    
    vssh_xc_sh_sxl = db.Column(db.Integer())    
    vssh_xc_mo_sl = db.Column(db.Integer())    
    vssh_xc_mo_skt = db.Column(db.Integer())    
    vssh_xc_mo_sxl = db.Column(db.Integer())    
    vssh_qc_vs_sl = db.Column(db.Integer())    
    vssh_qc_vs_skt = db.Column(db.Integer())    
    vssh_qc_vs_sxl = db.Column(db.Integer())    
    vssh_qc_sh_sl = db.Column(db.Integer())    
    vssh_qc_sh_skt = db.Column(db.Integer())    
    vssh_qc_sh_sxl = db.Column(db.Integer())    
    vssh_qc_mo_sl = db.Column(db.Integer())    
    vssh_qc_mo_skt = db.Column(db.Integer())    
    vssh_qc_mo_sxl = db.Column(db.Integer())    
    vssh_nc_ghichu = db.Column(db.String())    
    vssh_xc_ghichu = db.Column(db.String())    
    vssh_qc_ghichu = db.Column(db.String())    
class BangDichBenh(CommonModel):
    __tablename__ = 'bangdichbenh'
    id = db.Column(db.Integer, primary_key=True)
    baocao_id = db.Column(db.Integer,db.ForeignKey('baocao.id'), nullable=True)
    baocao = db.relationship('BaoCao', backref=db.backref('bangdichbenh',lazy='dynamic'))
    cuakhau_id = db.Column(db.Integer,db.ForeignKey('cuakhau.id'), nullable=True)
    tencuakhau = db.Column(db.String())
    macuakhau = db.Column(db.String(25))
    sothutu = db.Column(db.SmallInteger())
    db_csbc = db.Column(db.Integer())    
    db_dvdtc = db.Column(db.Integer())    
    db_dvkd = db.Column(db.Integer())    
    db_mdc = db.Column(db.Integer())    
    db_mdm = db.Column(db.Integer())    
    db_sldtc = db.Column(db.Integer())    
    db_slgs = db.Column(db.Integer())    
    db_sxdtc = db.Column(db.Integer())    
    db_sxkd = db.Column(db.Integer())    
    
    
    #bosung:
    db_mdc_slgs = db.Column(db.Integer())
    db_mdc_slxl = db.Column(db.Integer())
    db_csbc_slgs = db.Column(db.Integer())
    db_csbc_slxl = db.Column(db.Integer())
    db_mdm_slgs = db.Column(db.Integer())
    db_mdm_slxl = db.Column(db.Integer())
    
    db_csdv_slgs = db.Column(db.Integer()) 
    db_csdv_sld = db.Column(db.Integer())    
    db_cssx_slgs = db.Column(db.Integer()) 
    db_cssx_sld = db.Column(db.Integer())  
    
class BangTiemChung(CommonModel):
    __tablename__ = 'bangtiemchung'
    id = db.Column(db.Integer, primary_key=True)
    baocao_id = db.Column(db.Integer,db.ForeignKey('baocao.id'), nullable=True)
    baocao = db.relationship('BaoCao', backref=db.backref('bangtiemchung',lazy='dynamic'))
    sothutu = db.Column(db.SmallInteger())
    
    tenbenh = db.Column(db.String()) 
    tenvacxin = db.Column(db.String())
    soluong = db.Column(db.Integer())
    ghichu = db.Column(db.String())
    
class BangXetNghiem(CommonModel):
    __tablename__ = 'bangxetnghiem'
    id = db.Column(db.Integer, primary_key=True)
    baocao_id = db.Column(db.Integer,db.ForeignKey('baocao.id'), nullable=True)
    baocao = db.relationship('BaoCao', backref=db.backref('bangxetnghiem',lazy='dynamic'))
    sothutu = db.Column(db.SmallInteger())
    
    loaixetnghiem = db.Column(db.String()) 
    soluongmau = db.Column(db.Integer())
    dattieuchuan = db.Column(db.Integer())
    ghichu = db.Column(db.String())
    
class BangKinhPhi(CommonModel):
    __tablename__ = 'bangkinhphi'
    id = db.Column(db.Integer, primary_key=True)
    baocao_id = db.Column(db.Integer,db.ForeignKey('baocao.id'), nullable=True)
    baocao = db.relationship('BaoCao', backref=db.backref('bangkinhphi',lazy='dynamic'))
    sothutu = db.Column(db.SmallInteger())
    
    nguonkinhphi = db.Column(db.String()) 
    kinhphi = db.Column(db.Float())
class BangTrinhDoChuyenMon(CommonModel):
    __tablename__ = 'bangtrinhdochuyenmon'
    id = db.Column(db.Integer, primary_key=True)
    baocao_id = db.Column(db.Integer,db.ForeignKey('baocao.id'), nullable=True)
    baocao = db.relationship('BaoCao', backref=db.backref('bangtrinhdochuyenmon',lazy='dynamic'))
    sothutu = db.Column(db.SmallInteger())
    
    tenbophan = db.Column(db.String()) 
    y_tiensy = db.Column(db.Integer())
    y_thacsy = db.Column(db.Integer())
    y_cunhan = db.Column(db.Integer())
    y_ysy = db.Column(db.Integer())
    y_dieuduong = db.Column(db.Integer())
    y_kythuatvien = db.Column(db.Integer())
    y_khac = db.Column(db.Integer())
    
    duoc_daihoc = db.Column(db.Integer())
    duoc_trunghoc = db.Column(db.Integer())
    duoc_duocta = db.Column(db.Integer())
    
    nganhkhac_daihoc = db.Column(db.Integer())
    nganhkhac_trunghoc = db.Column(db.Integer())
    nganhkhac_khac = db.Column(db.Integer())
    
class BangDaoTaoCanBo(CommonModel):
    __tablename__ = 'bangdaotaocanbo'
    id = db.Column(db.Integer, primary_key=True)
    baocao_id = db.Column(db.Integer,db.ForeignKey('baocao.id'), nullable=True)
    baocao = db.relationship('BaoCao', backref=db.backref('bangdaotaocanbo',lazy='dynamic'))
    sothutu = db.Column(db.SmallInteger())
    
    hinhthucdaotao = db.Column(db.String())
    soluong = db.Column(db.Integer())
    vesinhdichte = db.Column(db.Integer())
    ytecongdong = db.Column(db.Integer())
    xetnghiem = db.Column(db.Integer())
    ngoaingu = db.Column(db.Integer())
    khac = db.Column(db.Integer())
    
class BangTruyenThong(CommonModel):
    __tablename__ = 'bangtruyenthong'
    id = db.Column(db.Integer, primary_key=True)
    baocao_id = db.Column(db.Integer,db.ForeignKey('baocao.id'), nullable=True)
    baocao = db.relationship('BaoCao', backref=db.backref('bangtruyenthong',lazy='dynamic'))
    sothutu = db.Column(db.SmallInteger())
    
    hinhthuc = db.Column(db.String())
    noidung = db.Column(db.String())
    doituong = db.Column(db.String())
    ketqua = db.Column(db.Integer())
    
class BangNghienCuuKhoaHoc(CommonModel):
    __tablename__ = 'bangnghiencuukhoahoc'
    id = db.Column(db.Integer, primary_key=True)
    baocao_id = db.Column(db.Integer,db.ForeignKey('baocao.id'), nullable=True)
    baocao = db.relationship('BaoCao', backref=db.backref('bangnghiencuukhoahoc',lazy='dynamic'))
    sothutu = db.Column(db.SmallInteger())
    
    tendetai = db.Column(db.String())
    thoigianthuchien = db.Column(db.String())
    detaicap = db.Column(db.String())
    linhvucnghiencuu = db.Column(db.String())
    
class BangHopTacQuocTe(CommonModel):
    __tablename__ = 'banghoptacquocte'
    id = db.Column(db.Integer, primary_key=True)
    baocao_id = db.Column(db.Integer,db.ForeignKey('baocao.id'), nullable=True)
    baocao = db.relationship('BaoCao', backref=db.backref('banghoptacquocte',lazy='dynamic'))
    sothutu = db.Column(db.SmallInteger())
    
    quocgia = db.Column(db.String())
    noidung = db.Column(db.String())
    
class BaoCaoVien(CommonModel):
    __tablename__ = 'baocaovien'
    id = db.Column(db.Integer, primary_key=True)
    ma = db.Column(db.String(255), unique=True)
    ngaybaocao = db.Column(db.DateTime(),default=func.now())
    kybaocao = db.Column(db.SmallInteger, nullable=False)
    nambaocao = db.Column(db.Integer, nullable=False)
    tungay = db.Column(db.Date())
    denngay = db.Column(db.Date())
    donvi_id = db.Column(db.Integer,db.ForeignKey('donvi.id'), nullable=True)
    donvi = db.relationship('DonVi',viewonly=True)
    
    danhgia = db.Column(db.String())
    kiennghivien = db.Column(db.String())
    kiennghidonvi = db.Column(db.String())
    tinhtrang = db.Column(db.SmallInteger, nullable=False, default=1)
    __table_args__ = (UniqueConstraint('donvi_id', 'ma', name='uq_baocaovien_donvi_id_ma'),)
class BangVienCanBo(CommonModel):
    __tablename__ = 'bangviencanbo'
    id = db.Column(db.Integer, primary_key=True)
    baocao_id = db.Column(db.Integer,db.ForeignKey('baocaovien.id'), nullable=True)
    baocao = db.relationship('BaoCaoVien', backref=db.backref('bangviencanbo',lazy='dynamic'))
    sothutu = db.Column(db.SmallInteger())
    
    trinhdochuyenmon = db.Column(db.String())
    soluongchuyentrach = db.Column(db.Integer())
    soluongkiemnhiem = db.Column(db.Integer())
    
class BangVienSuKien(CommonModel):
    __tablename__ = 'bangviensukien'
    id = db.Column(db.Integer, primary_key=True)
    baocao_id = db.Column(db.Integer,db.ForeignKey('baocaovien.id'), nullable=True)
    baocao = db.relationship('BaoCaoVien', backref=db.backref('bangviensukien',lazy='dynamic'))
    sothutu = db.Column(db.SmallInteger())
    
    tensukien = db.Column(db.String())
    diadiem = db.Column(db.String())
    bienphap = db.Column(db.String())
    ketqua = db.Column(db.String())
    
class BangVienHoatDongChung(CommonModel):
    __tablename__ = 'bangvienhoatdongchung'
    id = db.Column(db.Integer, primary_key=True)
    baocao_id = db.Column(db.Integer,db.ForeignKey('baocaovien.id'), nullable=True)
    baocao = db.relationship('BaoCaoVien', backref=db.backref('bangvienhoatdongchung',lazy='dynamic'))
    
    noidung = db.Column(db.String())
    sothutu = db.Column(db.SmallInteger())
    tenhoatdong = db.Column(db.String())
    soluong = db.Column(db.Integer())
    
class FAQ(CommonModel):
    __tablename__ = 'faq'
    id = db.Column(db.Integer, primary_key=True)
    tieude = db.Column(db.String())
    noidung = db.Column(db.String())
    
class BaiViet(CommonModel):
    __tablename__ = 'baiviet'
    id = db.Column(db.Integer, primary_key=True)
    ngaytao = db.Column(db.DateTime(),default=func.now())
    tieude = db.Column(db.String())
    gioithieu = db.Column(db.String())
    noidung = db.Column(db.Text())
    phamvi = db.Column(db.String(20))


# class BaoCaoTongHopNghiNgoNhiemBenh(CommonModel):
#     __tablename__ = 'baocaotonghopnghingonhiembenh'
#     id = db.Column(db.Integer, primary_key=True)
#     ma = db.Column(db.String(255))
#     ngaybaocao = db.Column(db.DateTime(),default=func.now())
#     noibaocao = db.Column(db.String(255))
    
#     nambaocao = db.Column(db.Integer, nullable=False)
#     donvi_id = db.Column(db.Integer,db.ForeignKey('donvi.id'), nullable=True)
#     donvi = db.relationship('DonVi',viewonly=True)
    
#     dulieu_khaibao = db.Column(JSONB())
#     dulieu_chuyenbay = db.Column(JSONB())
    
#     tinhtrang = db.Column(db.SmallInteger, nullable=False, default=1)


class BaoCaoNghiNgoNhiemBenh(CommonModel):
    __tablename__ = 'baocaonghingonhiembenh'
    id = db.Column(db.Integer, primary_key=True)
    ma = db.Column(db.String(255))
    matokhaiyte = db.Column(db.String(), index=True)

    ngaybaocao = db.Column(db.DateTime(),default=func.now(), index=True)
    noibaocao = db.Column(db.String(255))
    
    nambaocao = db.Column(db.Integer, nullable=False)
    donvi_id = db.Column(db.Integer,db.ForeignKey('donvi.id'), nullable=True, index=True)
    tendonvi = db.Column(db.String())
    madonvi = db.Column(db.String())
    donvi = db.relationship('DonVi',viewonly=True)

    cuakhau_id = db.Column(db.Integer, index=True, nullable=True)
    tencuakhau = db.Column(db.String())
    macuakhau = db.Column(db.String())
    
    #dulieu
    hoten = db.Column(db.String(), index=True)
    gioitinh = db.Column(db.String(20))
    namsinh = db.Column(db.Integer())
    
    quoctich = db.Column(db.String())
    cmtnd = db.Column(db.String(), index=True)
    cuakhau_nhapquacanh = db.Column(db.String())
    gio_nhapquacanh = db.Column(db.Integer())
    ngay_nhapquacanh = db.Column(db.DateTime())
    
    phuongtien = db.Column(db.String())
    sohieu_phuongtien = db.Column(db.String())
    noio = db.Column(db.String())
    diachi_lienlac = db.Column(db.String())
    email = db.Column(db.String())
    dienthoai = db.Column(db.String(63))
    benh_nghingo = db.Column(db.String())
    tiensu_dichte = db.Column(db.String())
    tiensu_ngaykhoiphat = db.Column(db.DateTime())
    tiensu_trieuchunglamsang = db.Column(db.String())
    tiensu_chandoan = db.Column(db.String())
    tiensu_xutri = db.Column(db.String())
    noitiepnhan_xutri = db.Column(db.String())
    nhanxet_danhgia = db.Column(db.String())

    dauhieubenh_sot = db.Column(db.SmallInteger)
    dauhieubenh_ho = db.Column(db.SmallInteger)
    dauhieubenh_khotho = db.Column(db.SmallInteger)
    dauhieubenh_dauhong = db.Column(db.SmallInteger)

    dauhieubenh_buonnon = db.Column(db.SmallInteger)
    dauhieubenh_tieuchay = db.Column(db.SmallInteger)
    dauhieubenh_xuathuyetngoaida = db.Column(db.SmallInteger)
    dauhieubenh_phatban = db.Column(db.SmallInteger)

    ngaygio_phathien = db.Column(db.String())
    huongxuly = db.Column(db.String())
    
    tinhtrang = db.Column(db.SmallInteger, nullable=False, default=1)
    
    
class BaoCaoNghiNgoNhiemBenhQuocGia(CommonModel):
    __tablename__ = 'baocaonghingonhiembenhquocgia'
    id = db.Column(db.Integer, primary_key=True)
    baocao_id = db.Column(db.Integer,db.ForeignKey('baocaonghingonhiembenh.id'), nullable=True)
    baocao = db.relationship('BaoCaoNghiNgoNhiemBenh', backref=db.backref('baocaonghingonhiembenhquocgia',lazy='dynamic'))
    tenquocgia = db.Column(db.String())
    ngaydiqua = db.Column(db.DateTime())
    
class BaoCaoNghiNgoNhiemBenhXetNghiem(CommonModel):
    __tablename__ = 'baocaonghingonhiembenhxetnghiem'
    id = db.Column(db.Integer, primary_key=True)
    baocao_id = db.Column(db.Integer,db.ForeignKey('baocaonghingonhiembenh.id'), nullable=True)
    baocao = db.relationship('BaoCaoNghiNgoNhiemBenh', backref=db.backref('baocaonghingonhiembenhxetnghiem',lazy='dynamic'))
    
    loaimauxetnghiem = db.Column(db.String())
    ngaylay = db.Column(db.DateTime())
    ketqua = db.Column(db.String())
    
class BaoCaoNghiNgoNhiemBenhVacxin(CommonModel):
    __tablename__ = 'baocaonghingonhiembenhvacxin'
    id = db.Column(db.Integer, primary_key=True)
    baocao_id = db.Column(db.Integer,db.ForeignKey('baocaonghingonhiembenh.id'), nullable=True)
    baocao = db.relationship('BaoCaoNghiNgoNhiemBenh', backref=db.backref('baocaonghingonhiembenhvacxin',lazy='dynamic'))
    
    tenvacxin = db.Column(db.String())
    solandung = db.Column(db.SmallInteger)
    ngaydunggannhat = db.Column(db.DateTime())
    ketqua = db.Column(db.String())
    
class BaoCaoNghiNgoNhiemBenhNguoiTiepXuc(CommonModel):
    __tablename__ = 'baocaonghingonhiembenhnguoitiepxuc'
    id = db.Column(db.Integer, primary_key=True)
    baocao_id = db.Column(db.Integer,db.ForeignKey('baocaonghingonhiembenh.id'), nullable=True)
    baocao = db.relationship('BaoCaoNghiNgoNhiemBenh', backref=db.backref('baocaonghingonhiembenhnguoitiepxuc',lazy='dynamic'))
    hoten = db.Column(db.String())
    quoctich = db.Column(db.String())
    cmtnd = db.Column(db.String())
    dienthoai = db.Column(db.String())
    email = db.Column(db.String())

class BaoCaoTongHopNghiNgoNhiemBenhNhomA(CommonModel):
    __tablename__ = "baocaotonghopnghingonhiembenhnhoma"
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid())
    loaibaocao = db.Column(db.SmallInteger()) #1 - don vi, 2 cua khau

    ngaybaocao = db.Column(db.DateTime(), index=True, default=func.now())
    
    donvi_id = db.Column(db.Integer, index=True, nullable=False)
    madonvi = db.Column(db.String())
    tendonvi = db.Column(db.String())

    cuakhau_id = db.Column(db.Integer, index=True, nullable=True)
    tencuakhau = db.Column(db.String())
    macuakhau = db.Column(db.String())

    #cuakhau
    songuoinhapcanh = db.Column(db.BigInteger)
    sohanhkhachkhaibao = db.Column(db.BigInteger)
    sochuyenbay = db.Column(db.BigInteger)
    songuoinguoinghingo = db.Column(db.BigInteger)

    #donvi
    songuoidangcachlytaptrung = db.Column(db.BigInteger)
    songuoidangcachlytaptrung_cotrieuchung = db.Column(db.BigInteger)
    diadiemcachlytaptrung = db.Column(db.String)
    songuoihetcachly = db.Column(db.BigInteger)

    # __table_args__ = (UniqueConstraint('donvi_id', 'cuakhau_id', 'ngaybaocao', name='uq_baocaotonghopnghingonhiembenhnhoma_donvi_id_cuakhau_id_ngaybaocao'),)
    # __table_args__ = (UniqueConstraint('donvi_id', 'ngaybaocao', name='uq_baocaotonghopnghingonhiembenhnhoma_donvi_id_ngaybaocao'),)

Index('baocaotonghopnghingonhiembenhnhoma_uq_idx', BaoCaoTongHopNghiNgoNhiemBenhNhomA.loaibaocao, BaoCaoTongHopNghiNgoNhiemBenhNhomA.donvi_id, BaoCaoTongHopNghiNgoNhiemBenhNhomA.cuakhau_id, BaoCaoTongHopNghiNgoNhiemBenhNhomA.ngaybaocao, unique=True)
Index('baocaotonghopnghingonhiembenhnhoma_uq_idx2', BaoCaoTongHopNghiNgoNhiemBenhNhomA.loaibaocao, BaoCaoTongHopNghiNgoNhiemBenhNhomA.donvi_id, BaoCaoTongHopNghiNgoNhiemBenhNhomA.ngaybaocao, unique=True, postgresql_where=(BaoCaoTongHopNghiNgoNhiemBenhNhomA.cuakhau_id.is_(None)))


class ToKhaiYTe(CommonModel):
    __tablename__ = "tokhaiyte"
    id = db.Column(db.String, primary_key=True)

    
    ngaykekhai = db.Column(db.DateTime())

    donvi_id = db.Column(db.Integer, nullable=False, index=True)
    tendonvi = db.Column(db.String())
    madonvi = db.Column(db.String())

    cuakhau_id = db.Column(db.Integer, nullable=True, index=True)
    tencuakhau = db.Column(db.String())
    macuakhau = db.Column(db.String())

    canbo_id = db.Column(db.Integer, nullable=True)
    tencanbo = db.Column(db.String)
    emailcanbo = db.Column(db.String)

    hoten = db.Column(db.String, index=True)
    namsinh = db.Column(db.Integer)
    gioitinh = db.Column(db.String)
    quoctich = db.Column(db.String)
    
    sohochieu = db.Column(db.String, index=True)
    
    thongtindilai_taubay = db.Column(db.SmallInteger) #taubay, tauthuyen, oto, khac
    thongtindilai_tauthuyen = db.Column(db.SmallInteger)
    thongtindilai_oto = db.Column(db.SmallInteger)
    thongtindilai_khac = db.Column(db.SmallInteger)
    thongtindilai_chitiet = db.Column(db.String)

    sohieu_phuongtien = db.Column(db.String)
    soghe_phuongtien = db.Column(db.String)

    ngay_khoihanh = db.Column(db.DateTime())
    ngay_nhapcanh = db.Column(db.DateTime())

    noi_khoihanh = db.Column(db.String)
    noiden = db.Column(db.String)
    quocgiadiqua = db.Column(db.String())
    
    diachi_taivietnam = db.Column(db.String)
    sodienthoai = db.Column(db.String)
    email = db.Column(db.String)

    dauhieubenh_sot = db.Column(db.SmallInteger)
    dauhieubenh_ho = db.Column(db.SmallInteger)
    dauhieubenh_khotho = db.Column(db.SmallInteger)
    dauhieubenh_dauhong = db.Column(db.SmallInteger)

    dauhieubenh_buonnon = db.Column(db.SmallInteger)
    dauhieubenh_tieuchay = db.Column(db.SmallInteger)
    dauhieubenh_xuathuyetngoaida = db.Column(db.SmallInteger)
    dauhieubenh_phatban = db.Column(db.SmallInteger)

    vacxin_dasudung = db.Column(db.String())

    tiepxuc_dongvat = db.Column(db.SmallInteger())
    chamsocnguoibenhtruyennhiem = db.Column(db.SmallInteger())
    
    # lienhe_email = db.Column(db.String)
    # lienhe_fax = db.Column(db.String)
    # lienhe_sodienthoai = db.Column(db.String(63))

    ngaygio_phathien = db.Column(db.String)
    tinhtrang = db.Column(db.String)
    huongxuly = db.Column(db.String)
    cachlytaptrung = db.Column(db.String)

    trangthai = db.Column(db.String)
    note = db.Column(db.Text())
    extra_data = db.Column(JSONB)
    

#### form to khai y te doi voi nguoi###
# class ToKhaiYTeDoiVoiNguoi(CommonModel):
#     __tablename__ = "tokhaiytedoivoinguoi"
#     id = db.Column(db.Integer, primary_key=True)
#     hoten = db.Column(db.String, nullable=False)
#     namsinh = db.Column(db.Integer())
#     gioitinh = db.Column(db.String())
#     quoctich = db.Column(db.String)
#     thongtin_dilai = db.relationship("ToKhaiYTeDoiVoiNguoiThongTinDiLai",  cascade="all, delete-orphan", lazy='dynamic')

#     sohochieu = db.Column(db.String)
#     sohieu_phuongtien = db.Column(db.String)
#     soghe = db.Column(db.String)
#     ngay_khoihanh = db.Column(db.DateTime())
#     ngay_nhapcanh = db.Column(db.DateTime())
#     noi_khoihanh = db.Column(db.String)
#     noiden = db.Column(db.String)
#     danhsach_quocgiadiqua = db.relationship("ToKhaiYTeDoiVoiNguoiQuocGia",  cascade="all, delete-orphan", lazy='dynamic')
#     diachi = db.Column(db.String)
#     sodienthoai = db.Column(db.String)
#     email = db.Column(db.String)
#     danhsach_vacxin = db.relationship("ToKhaiYTeDoiVoiNguoiVacxin",  cascade="all, delete-orphan", lazy='dynamic')
#     dauhieubenh = db.relationship("ToKhaiYTeDoiVoiNguoiXuatHienDauHieuBenh",  cascade="all, delete-orphan", lazy='dynamic')
#     den_trangtrai_cho_tiepxuc_dongvat = db.Column(db.Boolean())
#     tructiepchamsocnguoibenhtruyennhiem = db.Column(db.Boolean())
#     ngaykekhai = db.Column(db.DateTime())
#     canbo_id = db.Column(db.Integer,db.ForeignKey('user.id'), nullable=False)
#     tencanbo = db.Column(db.String)
#     lienhe_email = db.Column(db.String)
#     lienhe_fax = db.Column(db.String)
#     lienhe_sodienthoai = db.Column(db.String(63))
#     donvi_id = db.Column(db.Integer,db.ForeignKey('donvi.id'), nullable=False)
#     tendonvi = db.Column(db.String())
#     madonvi = db.Column(db.String())
#     cuakhau_id = db.Column(db.Integer,db.ForeignKey('cuakhau.id'), nullable=True)
#     tencuakhau = db.Column(db.String())
#     macuakhau = db.Column(db.String(25))

# class ToKhaiYTeDoiVoiNguoiQuocGia(CommonModel):
#     __tablename__ = 'tokhaiytedoivoinguoiquocgia'
#     id = db.Column(db.Integer, primary_key=True)
#     tokhaiyte_id = db.Column(db.Integer,db.ForeignKey('tokhaiytedoivoinguoi.id'), nullable=True)
#     tenquocgia = db.Column(db.String())
#     ngaydiqua = db.Column(db.DateTime())

# class ToKhaiYTeDoiVoiNguoiVacxin(CommonModel):
#     __tablename__ = 'tokhaiytedoivoinguoivacxin'
#     id = db.Column(db.Integer, primary_key=True)
#     tenvacxin = db.Column(db.String())
#     solandung = db.Column(db.SmallInteger)
#     ngaydunggannhat = db.Column(db.DateTime())
#     ketqua = db.Column(db.String())
#     tokhaiyte_id = db.Column(db.Integer,db.ForeignKey('tokhaiytedoivoinguoi.id'), nullable=True)

# class ToKhaiYTeDoiVoiNguoiXuatHienDauHieuBenh(CommonModel):
#     __tablename__ = 'tokhaiytedoivoinguoixuathiendauhieubenh'
#     id = db.Column(db.Integer, primary_key=True)
#     sot = db.Column(db.Boolean())
#     ho = db.Column(db.Boolean())
#     khotho = db.Column(db.Boolean())
#     dauhong = db.Column(db.Boolean())
#     buon_non = db.Column(db.Boolean())
#     tieuchay = db.Column(db.Boolean())
#     xuathuyet_ngoaida = db.Column(db.Boolean())
#     noiban_ngoaida = db.Column(db.Boolean())
#     tokhaiyte_id = db.Column(db.Integer,db.ForeignKey('tokhaiytedoivoinguoi.id'), nullable=True)

# class ToKhaiYTeDoiVoiNguoiThongTinDiLai(CommonModel):
#     __tablename__ = 'tokhaiytedoivoinguoithongtindilai'
#     id = db.Column(db.Integer, primary_key=True)
#     taubay = db.Column(db.Boolean())
#     tauthuyen = db.Column(db.Boolean())
#     oto = db.Column(db.Boolean())
#     phuongtien_khac = db.Column(db.String)
#     tokhaiyte_id = db.Column(db.Integer,db.ForeignKey('tokhaiytedoivoinguoi.id'), nullable=True)
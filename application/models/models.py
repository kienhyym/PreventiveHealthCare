from application.database import db
from application.database.model import CommonModel
from sqlalchemy import (String,SmallInteger, Integer, BigInteger, Boolean, DECIMAL, Float, Text, ForeignKey, UniqueConstraint, Index, DateTime)
from sqlalchemy.dialects.postgresql import UUID, JSONB

from sqlalchemy.orm import relationship, backref
import uuid
from math import floor
import time

def default_uuid():
    return str(uuid.uuid4())

class BaoCaoTongHopNghiNgoNhiemBenhNhomA:
    __tablename__ = "baocaotonghopnghingonhiembenhnhoma"
    id = db.Column(db.Integer, primary_key=True)
    ngaybaocao = db.Column(db.BigInteger(),default=floor(time.time()))
    
    donvi_id = db.Column(db.Integer,db.ForeignKey('donvi.id'), nullable=False)
    tendonvi = db.Column(db.String())

    cuakhau_id = db.Column(db.Integer,db.ForeignKey('cuakhau.id'), nullable=True)
    tencuakhau = db.Column(db.String())
    macuakhau = db.Column(db.String(25))

    sohanhkhach = db.Column(db.Integer)
    sochuyenbay = db.Column(db.Integer)

    danhsach_nguoinghinhiem = db.Column(JSONB())

    __table_args__ = (UniqueConstraint('donvi_id', 'cuakhau_id', 'ngaybaocao', name='uq_baocaotonghopnghingonhiembenhnhoma_donvi_id_cuakhau_id_ngaybaocao'),)

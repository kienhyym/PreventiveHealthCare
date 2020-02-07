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
from gatco_apimanager.views.sqlalchemy.helpers import to_dict
import ujson
# from application.models.models import ToKhaiYTeDoiVoiNguoi

from sqlalchemy import or_, and_, desc
 
def auth_func(**kw):
    pass

def user_to_dict(user):
    roles = [{"id":role.id,"name":role.name} for role in user.roles]
    donviobj = to_dict(user.donvi)
    cuakhauobj = to_dict(user.cuakhau)
    
    user_info = {
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "roles": roles,
        "info": {
            "donvi":donviobj,
            "cuakhau": cuakhauobj
        }
    }
    # obj = to_dict(user)
    # if "password" in obj:
    #     del(obj["password"])
    # if "salt" in obj:
    #     del(obj["salt"])
    return user_info

async def current_user(request):
    uid = auth.current_user(request)
    if uid is not None:
        user = db.session.query(User).filter(User.id == uid).first()
        return user
    else:
        return None

# @app.route('/api/v1/current_user')
# async def get_current_user(request):
#     error_msg = None
#     user = await current_user(request)
#     if user is not None:
#         roles = [{"id":role.id,"name":role.name} for role in user.roles]
#         donviobj = to_dict(user.donvi)
#         cuakhauobj = to_dict(user.cuakhau)
        
#         user_info = {
#             "id": user.id,
#             "email": user.email,
#             "name": user.name,
#             "roles": roles,
#             "info": {
#                 "donvi":donviobj,
#                 "cuakhau": cuakhauobj
#             }
#         }
#         return json({
#                     "user":user_info,
#                     "permission":None
#                     #"navigation": navidata
#         })
#     else:
#         error_msg = "User does not exist"
        
#     return json({
#         "error_code": "USER_NOT_FOUND",
#         "error_message":error_msg
#     }, status = 520)

@app.route('api/v1/current_user')
async def get_current_user(request):
    error_msg = None
    user = await current_user(request)
    print("===============", user)
    if user is not None:
        user_info = user_to_dict(user)
        return json(user_info)
    else:
        error_msg = "Tài khoản không tồn tại"
    return json({
        "error_code": "USER_NOT_FOUND",
        "error_message":error_msg
    }, status = 520)

@app.route('/api/v1/login', methods=['POST'])
async def login(request):
    data = request.json
    print("==================data", data)
    username = data['username']
    password = data['password']
    print("==================USER NAME", username)
    print("==================PASSWORD", password)
    user = db.session.query(User).filter(User.email == username).first()


    print("==================", user)
    if (user is not None) and auth.verify_password(password, user.password):
        
        auth.login_user(request, user)
        result = user_to_dict(user)
        return json(result)
        
    return json({"error_code":"LOGIN_FAILED","error_message":"Tài khoản hoặc mật khẩu không đúng"}, status=520)


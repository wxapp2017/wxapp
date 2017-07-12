# -*- coding: utf-8 -*-
from __future__ import unicode_literals


import sys
reload(sys)
sys.setdefaultencoding('utf8')
import os
from PIL import Image
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from models import *
import time

# Create your views here.


@csrf_exempt
def publishweibo(request):
    try:
        Isvalid = request.POST['isvalid']
    except:
        Isvalid = 2
    print Isvalid
    num = 1
    try:
        area = request.POST['area']
        essay = request.POST['essay']
        date = time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))
        p = Essay(area=area, Essay=essay, create_time=date)
        p.save()
    except:
        pass
    print u'多图片上传'
    photo = request.FILES['photo']
    print photo
    photo_path = './dat/upload_pic/'
    photo_last = str(photo).split('.')[-1]
    photo_name = '%s.%s' % (str(num),photo_last)
    while os.path.exists(photo_path+photo_name):
        num = num + 1
        photo_name = '%s.%s' % (str(num), photo_last)
        print photo_name
    f = open(photo_path + photo_name, 'wb+')
    f.write(photo.read())
    f.close()
    return HttpResponse("Hello world ! ")

def publishsell(request):
    pass

def down(request):
    filename = 'F:/wxapp/server/default.png'
    f = open(filename,'rb')

    c = f.read()
    # print c
    # f .close()
    response = HttpResponse(c, content_type='application/octet-stream')
    response['Content-Disposition'] = 'attachment; filename=default.png'
    return response
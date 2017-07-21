# -*- coding: utf-8 -*-
from __future__ import unicode_literals


import sys
reload(sys)
sys.setdefaultencoding('utf8')
import os
import json
from PIL import Image
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from models import *
import time

# Create your views here.

#-----------------------缓存------------------------
cache=[]
cache_area = []
cache_essay = []
cache_date = []
cache_pic = []

ca = Essay.objects.all()
for i in ca.values('create_time'):
    cache_date.append(i.values()[0].strftime('%Y-%m-%d %H:%M:%S'))

for i in ca.values('Essay'):
    cache_essay.append(i.values()[0])

for i in ca.values('pic_path'):
    cache_pic.append(i.values()[0])

for i in xrange(len(ca.values('create_time'))):
    cache.append({'essay':cache_essay[i],'date':cache_date[i],'pic':cache_pic[i]})


@csrf_exempt
def publishweibo(request):
    global cache

    num = 1
    try:
        area = request.POST['area']
        cache_area.append(area)
        essay = request.POST['essay']
        cache_essay.append(essay)
        date = time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))
        cache_date.append(date)
        cache.append({'area':area,'essay':essay,'date':date})
        p = Essay(area=area, Essay=essay, create_time=date)
        p.save()
    except:
        print 'fault'
        pass
    print u'多图片上传'
    photo = request.FILES['photo']
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
    p = Essay.objects.filter(create_time=date).update(pic_path='/dat/upload_pic/'+photo_name)
    for i in xrange(len(cache)):
        if cache[i]['date'] == date:
            cache[i]['pic'] = '/dat/upload_pic/'+photo_name
    p.save()
    print cache
    return HttpResponse("Hello world ! ")

def readweibo(request):
    global cache
    send_cache = list(reversed(cache))
    send_cache = json.dumps(send_cache)
    return HttpResponse(send_cache)

def pic(request):
    p = request.GET.get('path')
    print p
    filename = '.'+p
    f = open(filename, 'rb')
    c = f.read()
    return HttpResponse(c, content_type="image/png")


def publishsell(request):
    p =request.GET['x']
    print p
    return HttpResponse('succeed')

def down(request):
    filename = './dat/upload_pic/1.png'
    f = open(filename,'rb')
    c = f.read()
    # print c
    # f .close()
    response = HttpResponse(c, content_type='application/octet-stream')
    response['Content-Disposition'] = 'attachment; filename=default.png'
    return response



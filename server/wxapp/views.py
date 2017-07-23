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
cache_sign = []

ca = Essay.objects.all()
for i in ca.values('create_time'):
    cache_date.append(i.values()[0].strftime('%Y-%m-%d %H:%M:%S'))
#
for i in ca.values('essay'):
    cache_essay.append(i.values()[0])

for i in ca.values('pic'):
    cache_pic.append(i.values()[0].split())     #列表

for i in ca.values('sign'):
    cache_sign.append(str(i.values()[0]))


for i in xrange(len(ca.values('create_time'))):
    cache.append({'essay':cache_essay[i],'date':cache_date[i],'pic':cache_pic[i],'sign':cache_sign[i]})


@csrf_exempt
def publishweibo(request):
    global cache
    sign = request.POST['sign']
    path = '/dat/%s/' % (sign)
    photo_path = '.' + path
    num = 1
    try:
        print u'第一次带文字输入'
        area = request.POST['area']
        cache_area.append(area)
        essay = request.POST['essay']
        cache_essay.append(essay)
        date = time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))
        cache_date.append(date)
        if not sign in cache_sign:
            cache_sign.append(sign)
            cache_pic.append([])
            os.mkdir(r'./dat/%s/' % (sign))
        cache.append({'area':area,'essay':essay,'date':date,'sign':sign,'pic':[]})
        p = Essay(area=area, essay=essay, create_time=date,sign=sign)
        p.save()
    except:
        print 'fault'
        pass
    print u'多图片上传'
    photo = request.FILES['photo']
    photo_last = str(photo).split('.')[-1]
    photo_name = '%s.%s' % (str(num),photo_last)
    while os.path.exists(photo_path+photo_name):
        num = num + 1
        photo_name = '%s.%s' % (str(num), photo_last)
        # print photo_name
    f = open(photo_path + photo_name, 'wb+')
    f.write(photo.read())
    f.close()

    for i in xrange(len(cache)):
        if cache[i]['sign'] == sign:
            cache_pic[i].append(path+photo_name)
            cache[i]['pic'].append(path+photo_name)

            p = Essay.objects.filter(sign=sign).update(pic=' '.join(cache[i]['pic']))
    try:
        p.save()
    except:
        pass
    print cache
    return HttpResponse("Hello world ! ")

def readweibo(request):
    global cache
    send_cache = list(reversed(cache))
    send_cache = json.dumps(send_cache)
    return HttpResponse(send_cache)

def previewImage(request):
    pic_url = str(request.GET['pic_url'])
    pic_list = []
    sign = pic_url[pic_url.rfind('dat/')+4:pic_url.rfind('/')]
    print sign
    print cache_sign
    for i in cache:
        if i['sign'] == sign:
            pic_list = i['pic']
    print pic_list
    for j in xrange(len(pic_list)):
        print pic_list[j]
        print type(pic_list[j])
        pic_list[j] = 'http://127.0.0.1:8000/pic/?path='+str(pic_list[j])
    print pic_list
    send_pic_list = json.dumps(pic_list)
    return HttpResponse(send_pic_list)

def pic(request):
    p = request.GET.get('path')
    print p
    print 1111111
    print type(p)
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



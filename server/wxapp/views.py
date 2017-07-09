# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import sys
reload(sys)
sys.setdefaultencoding('utf8')

from PIL import Image
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from models import *

# Create your views here.

@csrf_exempt
def publish(request):
    print request.POST
    try:
        area = request.POST['area']
        essay = request.POST['essay']
        p = Essay(area=area, Essay=essay, )
        p.save()
    except:
        print u'多图片上传'
    photo = request.FILES['photo']
    # print len(photo)

    photo_path = './dat/'
    photo_last = str(photo).split('.')[-1]
    photo_name = 'default.%s' % (photo_last)
    f = open(photo_path + photo_name, 'wb+')
    f.write(photo.read())
    f.close()

    # for p in photo:
    #     print p
    #     photo_last = str(p).split('.')[-1]
    #     photo_name = 'default.%s' % (photo_last)
    #     f = open(photo_path + photo_name, 'wb+')
    #     f.write(p.read())
    #     f.close()


    return HttpResponse("Hello world ! ")



def down(request):
    filename = 'F:/wxapp/server/default.png'
    f = open(filename,'rb')

    c = f.read()
    # print c
    # f .close()
    response = HttpResponse(c, content_type='application/octet-stream')
    response['Content-Disposition'] = 'attachment; filename=default.png'



    return response
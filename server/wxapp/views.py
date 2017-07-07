# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from PIL import Image
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from models import *

# Create your views here.

@csrf_exempt
def index(request):
    # area = request.GET['area']
    # essay = request.GET['essay']

    photo = request.FILES['photo']
    photo_path = './dat/'
    photo_last = str(photo).split('.')[-1]
    photo_name = 'default.%s' % (photo_last)
    f = open(photo_path + photo_name, 'wb+')
    f.write(photo.read())
    f.close()

    # p = Essay(area=area,Essay=essay,)
    # p.save()
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
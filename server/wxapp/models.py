# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
import datetime

# Create your models here.
class Essay(models.Model):
	area = models.IntegerField()
	Essay = models.CharField(max_length=1000)
	pic_path = models.CharField(max_length=50)
	create_time = models.DateTimeField()
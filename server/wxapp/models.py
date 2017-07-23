# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
import datetime

# Create your models here.
class Essay(models.Model):
	area = models.IntegerField()
	essay = models.CharField(max_length=1000)
	pic = models.CharField(max_length=50)
	create_time = models.DateTimeField()
	sign = models.CharField(max_length=50)
# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-10 06:17
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('wxapp', '0005_essay_pic_path'),
    ]

    operations = [
        migrations.AddField(
            model_name='essay',
            name='create_time',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]

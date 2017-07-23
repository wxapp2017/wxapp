# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-23 04:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Essay',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('area', models.IntegerField()),
                ('essay', models.CharField(max_length=1000)),
                ('pic_path', models.CharField(max_length=50)),
                ('create_time', models.DateTimeField()),
                ('sign', models.CharField(max_length=50)),
            ],
        ),
    ]

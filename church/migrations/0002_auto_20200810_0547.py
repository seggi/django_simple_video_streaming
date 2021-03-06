# Generated by Django 3.0.8 on 2020-08-10 05:47

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('church', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='giving',
            name='balance',
            field=models.FloatField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='giving',
            name='date',
            field=models.TimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tith',
            name='balance',
            field=models.FloatField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tith',
            name='date',
            field=models.TimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]

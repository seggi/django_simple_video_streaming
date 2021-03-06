# Generated by Django 3.0.8 on 2020-08-14 03:38

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('church', '0005_auto_20200811_2021'),
    ]

    operations = [
        migrations.AddField(
            model_name='visitschedule',
            name='date',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='visitschedule',
            name='endhour',
            field=models.TimeField(),
        ),
        migrations.AlterField(
            model_name='visitschedule',
            name='starthour',
            field=models.TimeField(),
        ),
    ]

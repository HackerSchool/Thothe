# Generated by Django 3.1.7 on 2021-04-09 13:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exams', '0002_auto_20210409_1324'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exam',
            name='correct',
            field=models.ManyToManyField(related_name='correct', to='exams.Question'),
        ),
        migrations.AlterField(
            model_name='exam',
            name='failed',
            field=models.ManyToManyField(related_name='failed', to='exams.Question'),
        ),
        migrations.AlterField(
            model_name='exam',
            name='questions',
            field=models.ManyToManyField(related_name='questions', to='exams.Question'),
        ),
    ]

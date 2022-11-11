# Generated by Django 3.2.13 on 2022-11-11 23:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0017_xpsystem_total_xp'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='subjectinfo',
            name='correctAnswers',
        ),
        migrations.RemoveField(
            model_name='subjectinfo',
            name='wrongAnswers',
        ),
        migrations.AddField(
            model_name='subjectinfo',
            name='correct_answers',
            field=models.ManyToManyField(blank=True, related_name='correct_answers', to='users.AnswerInfo'),
        ),
        migrations.AddField(
            model_name='subjectinfo',
            name='wrong_answers',
            field=models.ManyToManyField(blank=True, related_name='wrong_answers', to='users.AnswerInfo'),
        ),
    ]

# Generated by Django 3.1.7 on 2021-04-09 13:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('exams', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=1000)),
                ('subject', models.CharField(choices=[('Matemática', 'Matemática'), ('Física-Química', 'Física-Química')], max_length=50)),
                ('subsubject', models.CharField(choices=[('Geometria', 'Geometria'), ('Imaginários', 'Imaginários'), ('Etc', 'Etc')], max_length=50)),
                ('year', models.IntegerField(choices=[(0, '0'), (10, '10'), (11, '11'), (12, '12')], default=0)),
                ('difficulty', models.CharField(choices=[('Fácil', 'Fácil'), ('Média', 'Média'), ('Difícil', 'Difícil')], max_length=10, null=True)),
                ('correctAnswer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='correctAnswer', to='exams.answer')),
                ('wrongAnswers', models.ManyToManyField(related_name='wrongAnswers', to='exams.Answer')),
            ],
        ),
        migrations.AddField(
            model_name='exam',
            name='correct',
            field=models.ManyToManyField(null=True, related_name='correct', to='exams.Question'),
        ),
        migrations.AddField(
            model_name='exam',
            name='failed',
            field=models.ManyToManyField(null=True, related_name='failed', to='exams.Question'),
        ),
        migrations.AddField(
            model_name='exam',
            name='questions',
            field=models.ManyToManyField(null=True, related_name='questions', to='exams.Question'),
        ),
    ]

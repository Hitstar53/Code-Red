# Generated by Django 4.1.4 on 2023-03-22 05:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('levels', '0004_agent_level1_pos_agent_level2_pos_agent_level3_pos_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='position',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]

# Generated by Django 3.2.12 on 2022-06-08 08:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0065_data_migration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='value_type',
            field=models.CharField(choices=[('text', 'Text'), ('url', 'URL'), ('integer', 'Integer'), ('float', 'Float'), ('boolean', 'Boolean'), ('datetime', 'Datetime'), ('email', 'Email'), ('phone', 'Phone'), ('option', 'Option'), ('file', 'File')], help_text='Type of value for this question.', max_length=8, verbose_name='Value type'),
        ),
    ]

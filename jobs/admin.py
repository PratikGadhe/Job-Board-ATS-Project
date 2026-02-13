from django.contrib import admin
from .models import Company, Job, CandidateProfile, Application

admin.site.register(Company)
admin.site.register(Job)
admin.site.register(CandidateProfile)
admin.site.register(Application)

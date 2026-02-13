from rest_framework import serializers
from .models import Company, Job, CandidateProfile, Application


# ===============================
# Company Serializer
# ===============================

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'
        read_only_fields = ['created_by', 'created_at']


# ===============================
# Job Serializer
# ===============================

class JobSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    company_id = serializers.PrimaryKeyRelatedField(
        queryset=Company.objects.all(),
        source='company',
        write_only=True
    )
    
    class Meta:
        model = Job
        fields = '__all__'
        read_only_fields = ['created_at']


# ===============================
# Candidate Profile Serializer
# ===============================

class CandidateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateProfile
        fields = '__all__'
        read_only_fields = ['user']


# ===============================
# Application Serializer
# ===============================

class ApplicationSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True)
    candidate = serializers.SerializerMethodField()
    
    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ['candidate', 'applied_at']
    
    def get_candidate(self, obj):
        return {
            'id': obj.candidate.id,
            'email': obj.candidate.email
        }

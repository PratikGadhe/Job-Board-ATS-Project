from django.db import models
from django.conf import settings


# ===============================
# Company Model
# ===============================

class Company(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    website = models.URLField(blank=True, null=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="companies"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# ===============================
# Job Model
# ===============================

class Job(models.Model):
    JOB_TYPE_CHOICES = (
        ("full_time", "Full Time"),
        ("part_time", "Part Time"),
        ("internship", "Internship"),
        ("contract", "Contract"),
    )

    title = models.CharField(max_length=255)
    description = models.TextField()
    requirements = models.TextField()
    salary = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    location = models.CharField(max_length=255)
    job_type = models.CharField(max_length=20, choices=JOB_TYPE_CHOICES)

    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="jobs")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


# ===============================
# Candidate Profile Model
# ===============================

class CandidateProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="candidate_profile",
    )
    skills = models.TextField()
    experience = models.TextField()
    resume = models.FileField(upload_to="resumes/", blank=True, null=True)

    def __str__(self):
        return self.user.email


# ===============================
# Application Model
# ===============================


class Application(models.Model):
    STATUS_CHOICES = (
        ("applied", "Applied"),
        ("screening", "Screening"),
        ("interview", "Interview"),
        ("offer", "Offer"),
        ("rejected", "Rejected"),
    )

    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="applications")

    candidate = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="applications"
    )

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="applied")

    applied_at = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ("job", "candidate")

    def __str__(self):
        return f"{self.candidate.email} - {self.job.title}"

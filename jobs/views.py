from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status



from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .permissions import IsEmployer, IsCandidate

from rest_framework import viewsets, permissions
from .models import Company, Job, CandidateProfile, Application
from .serializers import (
    CompanySerializer,
    JobSerializer,
    CandidateProfileSerializer,
    ApplicationSerializer
)


# ===============================
# Company ViewSet
# ===============================

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsEmployer]

    def get_queryset(self):
        # Only return companies created by logged-in employer
        return Company.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


# ===============================
# Job ViewSet
# ===============================

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    def get_permissions(self):

    # View jobs → any logged user
        if self.request.method in ['GET', 'HEAD', 'OPTIONS']:
            return [permissions.IsAuthenticated()]

    # Apply endpoint → candidate only
        if self.action == 'apply':
            return [IsCandidate()]

    # Create/update/delete jobs → employer only
        return [IsEmployer()]


    def perform_create(self, serializer):
        serializer.save()

    # ===============================
    # APPLY ACTION (IMPORTANT)
    # ===============================
    @action(detail=True, methods=['post'])
    def apply(self, request, pk=None):
        print("USER ROLE:", request.user.role)

        job = self.get_object()

        if request.user.role != "candidate":
            return Response(
                {"error": "Only candidates can apply"},
                status=status.HTTP_403_FORBIDDEN
            )

        if Application.objects.filter(job=job, candidate=request.user).exists():
            return Response(
                {"error": "You already applied"},
                status=status.HTTP_400_BAD_REQUEST
            )

        Application.objects.create(
            job=job,
            candidate=request.user
        )

        return Response(
            {"message": "Application submitted successfully"},
            status=status.HTTP_201_CREATED
        )


# ===============================
# Candidate Profile ViewSet
# ===============================

class CandidateProfileViewSet(viewsets.ModelViewSet):
    queryset = CandidateProfile.objects.all()
    serializer_class = CandidateProfileSerializer
    permission_classes = [IsCandidate]


    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# ===============================
# Application ViewSet
# ===============================

# ===============================
# Application ViewSet
# ===============================

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filter applications by logged-in candidate
        if self.request.user.role == 'candidate':
            return Application.objects.filter(candidate=self.request.user)
        # Employers should use /api/employer/applications/ endpoint
        return Application.objects.none()

    def perform_create(self, serializer):
        serializer.save(candidate=self.request.user)

    # ===============================
    # Employer → Update Status
    # ===============================
    @action(detail=True, methods=['post'], permission_classes=[IsEmployer])
    def update_status(self, request, pk=None):

        application = self.get_object()

        new_status = request.data.get("status")

        if new_status not in ['applied', 'screening', 'interview', 'selected', 'rejected']:
            return Response(
                {"error": "Invalid status"},
                status=status.HTTP_400_BAD_REQUEST
            )

        application.status = new_status
        application.save()

        return Response({"message": "Status updated"})


# ===============================
# Employer → View Applicants for Their Jobs
# ===============================



class EmployerApplicationsView(APIView):
    permission_classes = [IsAuthenticated, IsEmployer]

    def get(self, request):
        # Get companies created by employer
        companies = Company.objects.filter(created_by=request.user)

        # Get jobs of those companies
        jobs = Job.objects.filter(company__in=companies)

        # Get applications for those jobs
        applications = Application.objects.filter(job__in=jobs)

        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data)


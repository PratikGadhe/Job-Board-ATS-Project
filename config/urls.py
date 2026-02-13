"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from jobs.views import EmployerApplicationsView
from users.views import current_user



from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from jobs.views import (
    CompanyViewSet,
    JobViewSet,
    CandidateProfileViewSet,
    ApplicationViewSet,
)

router = DefaultRouter()
router.register(r'companies', CompanyViewSet)
router.register(r'jobs', JobViewSet)
router.register(r'profiles', CandidateProfileViewSet)
router.register(r'applications', ApplicationViewSet)

urlpatterns = [
    path('api/employer/applications/', EmployerApplicationsView.as_view()),
    path('api/user/', current_user, name='current_user'),



    path('admin/', admin.site.urls),

    # JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # API routes
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),

]

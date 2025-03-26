# from django.shortcuts import render
# from django.http import HttpResponse


# # Create your views here.

# def home(request):
#   return HttpResponse("Working")

from django.shortcuts import render, redirect # type: ignore
from django.contrib.auth.models import User # type: ignore
from django.contrib.auth import authenticate, login, logout # type: ignore
from django.contrib import messages # type: ignore
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt # type: ignore
from django.contrib.auth.decorators import login_required
import json
from .models import Review

def home(request):
    print("User authenticated:", request.user.is_authenticated)
    return render(request, "index.html")



def register(request):
    if request.method == 'POST':
        full_name = request.POST['signupName']
        email = request.POST['signupEmail']
        password = request.POST['signupPassword']
        confirm_password = request.POST['signupConfirmPassword']

        if password != confirm_password:
            messages.error(request, "Passwords do not match")
            return redirect('register')

        if User.objects.filter(username=email).exists():
            messages.error(request, "Email already taken")
            return redirect('register')

        user = User.objects.create_user(username=email, email=email, password=password)
        user.first_name = full_name
        user.save()
        messages.success(request, "Registration successful! Please log in.")
        return redirect('login')

    return render(request, 'authentication/signup.html')

def login_view(request):
    if request.method == 'POST':
        email = request.POST['loginEmail']
        password = request.POST['loginPassword']
        user = authenticate(request, username=email, password=password)

        if user is not None:
            login(request, user)
            messages.success(request, "Login successful!")
            return redirect('home')
       
        else:
            return render(request, 'authentication/login.html', {'error': 'Invalid credentials'})

    return render(request, 'authentication/login.html')

def logout_view(request):
    logout(request)
    return redirect('home') 
def password_reset_request(request):
    if request.method == "POST":
        email = request.POST.get("email")
        user = User.objects.filter(email=email).first()

        if user:
            # Send password reset email (Django built-in method)
            messages.success(request, "Password reset email has been sent.")
        else:
            messages.error(request, "No account found with this email.")

    return render(request, "registration/password_reset_form.html")

@csrf_exempt
@login_required
def submit_review(request):
    if request.method == "POST":
        data = json.loads(request.body)
        rating = data.get('rating')
        comment = data.get('comment')
        
        if not rating or not comment:
            return JsonResponse({'error': 'Rating and comment are required'}, status=400)
        
        Review.objects.create(user=request.user, rating=rating, comment=comment)
        return JsonResponse({'message': 'Review submitted successfully'})

def fetch_reviews(request):
    reviews = Review.objects.all().order_by('-created_at')
    review_list = [{
        'user': review.user.username,
        'rating': review.rating,
        'comment': review.comment,
        'date': review.created_at.strftime('%B %d, %Y')
    } for review in reviews]

    return JsonResponse({'reviews': review_list})
  






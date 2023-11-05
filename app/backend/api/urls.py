from django.urls import path
from .views import QuizListView, QuizDetailView, getQuestions, getAnswers

urlpatterns = [
    path('quizzes/', QuizListView.as_view(), name='quiz-list'),
    # path('quizzes/<int:pk>/', QuizDetailView.as_view(), name='quiz-detail'),
    # path('quizzes/<int:quiz>/<int:pk>/', QuestionView.as_view(), name='questions-detail'),
    path('quizzes/<int:pk>/', getQuestions, name='questions-detail'),
    path('quizzes/<int:pk>/<int:question_id>/', getAnswers, name='answers-detail'),
]

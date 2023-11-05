from django.shortcuts import render
from rest_framework.response import Response

from django.shortcuts import get_object_or_404
from .models import Question, Quiz
from .serializers import QuestionSerializer

# Create your views here.
from rest_framework import generics
from .models import Quiz, Question, Answer
from .serializers import QuizSerializer, QuestionSerializer, AnswerSerializer

class QuizListView(generics.ListAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

class QuizDetailView(generics.RetrieveAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

# class QuestionsView(generics.RetrieveAPIView):
    
#     serializer_class = QuestionSerializer

#     def get_queryset(self):
#         # Pobierz quiz o id=quiz z argumentu ścieżki
#         quiz_id = self.kwargs.get('pk')
#         quiz = get_object_or_404(Quiz, id=quiz_id)
        
#         # Pobierz wszystkie pytania, które należą do tego Quizu
#         return Question.objects.filter(quiz=quiz)
from rest_framework.decorators import api_view
@api_view(['GET'])
def getQuestions(request, pk):
    try:
        quiz = Quiz.objects.get(id=pk)
        questions = quiz.question_set.all()
        serializer = QuestionSerializer(questions, many=True)

        # Dodajemy odpowiedzi do odpowiednich pytań
        for data in serializer.data:
            question_id = data['id']
            answers = Answer.objects.filter(question=question_id)
            answer_serializer = AnswerSerializer(answers, many=True)
            data['answers'] = answer_serializer.data

        return Response(serializer.data)
    except Quiz.DoesNotExist:
        return Response({"message": "Quiz o podanym id nie istnieje."}, status=404)



@api_view(['GET'])
def getAnswers(request, pk, question_id):
    try:
        quiz = Quiz.objects.get(id=pk)
        question = Question.objects.get(id=question_id, quiz=quiz)
        answers = Answer.objects.filter(question=question)
        serializer = AnswerSerializer(answers, many=True)
        return Response(serializer.data)
    except Quiz.DoesNotExist:
        return Response({"message": "Quiz o podanym id nie istnieje."}, status=404)
    except Question.DoesNotExist:
        return Response({"message": "Pytanie o podanym id nie istnieje w tym quizie."}, status=404)
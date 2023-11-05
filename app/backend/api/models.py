from django.db import models

# Create your models here.
from django.db import models

class Quiz(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title
    
class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    text = models.CharField(max_length=200)
    question_number = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.quiz.title + " Q" + str(self.question_number) + "."
    
class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    text = models.CharField(max_length=200)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.question.quiz.title + " - Q" + str(self.question.question_number) + ". " + str(self.is_correct)
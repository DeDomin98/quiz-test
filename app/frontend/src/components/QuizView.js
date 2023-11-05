import React, { useState, useEffect, useContext, useRef  } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { QuizContext } from '../context/QuizContext';

const QuizView = () => {
  const { result, setResult } = useContext(QuizContext);
  let { id } = useParams();
  let [questions, setQuestions] = useState([]);
  let [quizTitle, setQuizTitle] = useState('');
  let [userAnswers, setUserAnswers] = useState({});
  let [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  let [selectedAnswer, setSelectedAnswer] = useState(null);
  let [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);


  useEffect(() => {
    getQuiz();
  }, [id]);
  
  //QUIZ TIMER
  let [currentTime, setCurrentTime] = useState(5);
  let [progress, setProgress] = useState(100);
  let [timeExpired, setTimeExpired] = useState(false);

  let timer
  // useEffect(() => {
  //   let timer;
  
  //   if (quizStarted && currentQuestionIndex < questions.length) {
  //     timer = setInterval(() => {
  //       if (currentTime > 0) {
  //         setCurrentTime((prevTime) => prevTime - 1);
  //         setProgress((prevProgress) => (prevProgress - 20)); // Zaktualizuj postęp
  //       } else {
  //         // ... (reszta kodu)
  //       }
  //     }, 1000);
  //   }
  
  //   return () => clearInterval(timer);
  // }, [quizStarted, currentQuestionIndex, questions.length, currentTime]);
  
  useEffect(() => {
    let timer, secondaryTimer;
  
    if (quizStarted && currentQuestionIndex < questions.length) {
      timer = setInterval(() => {
        if (currentTime > 0) {
          setCurrentTime((prevTime) => prevTime - 1);
          // setProgress((prevProgress) => (prevProgress - 20));
        } else {
          if (currentQuestionIndex === questions.length - 1) {
            setTimeExpired(true);
            showResults()
          } else {
            showNextQuestion();
            setCurrentTime(5);
            setProgress(100)
          }
        }
      }, 1000);
    }
    secondaryTimer = setInterval(() => {
      setProgress((prevProgress) => prevProgress - 1);
     }, 50);
     return () => {
              clearInterval(timer);
              clearInterval(secondaryTimer);
          };
  }, [quizStarted, currentQuestionIndex, questions.length, currentTime]);




  let getQuiz = async () => {
    try {
      let response = await axios.get(`http://localhost:8000/quizzes/${id}/`);
      setQuestions(response.data);
      setQuizTitle(response.data[0].quiz_title);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAnswerChange = (questionId, answerId) => {
    setUserAnswers((prevState) => ({
      ...prevState,
      [questionId]: answerId,
    }));
    setSelectedAnswer(answerId);
  };

  const showNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer(null);
    setCurrentTime(5)
    setProgress(100)
  };

  const showResults = () => {
    const entries = Object.entries(userAnswers);
    let score = 0;

    for (let i = 0; i < entries.length; i++) {
      const [key, value] = entries[i];
      const question = questions.find((question) => question.id === parseInt(key));
      if (question) {
        const answer = question.answers.find((answer) => answer.id === value);

        if (answer && answer.is_correct) {
          score += 1;
        }
      }
    }
    setResult(score);
    setQuizCompleted(true); // Ustawiamy, że quiz został ukończony
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentTime(5)
    setProgress(100)
  };
  const tryAgain = () => {
    setQuizStarted(true);
    setQuizCompleted(false);  
    setResult(0);
    setCurrentQuestionIndex(0)
    setUserAnswers({});
    setCurrentTime(5)
    setProgress(100)

  }


  return (
    <div className="max-w-xl m-auto mt-12 ">
      {!quizStarted && (
        <div className="text-center">
          <h1 className="text-3xl text-teal-700 mb-6">{quizTitle}</h1>
          <h2 className='text-xl mb-5 tracking-wide leading-8'>Witaj w naszym quizie matematycznym! Ten test skupia się na podstawowych operacjach matematycznych. Sprawdź, jak dobrze radzisz sobie z dodawaniem, odejmowaniem, mnożeniem i dzieleniem.</h2>
          <button onClick={startQuiz} className="p-5 w-48 rounded-2xl bg-blue-400 mt-10 mb-10">
            Przejdź do quizu
          </button>
        </div>
      )}
   {quizStarted && currentQuestionIndex < questions.length && (
    quizCompleted ? (
      <div className="h-max border-2 border-slate-400 p-5 mb-5 text-center">
        {/* <h1 className="text-3xl text-teal-700 mb-6">{quizTitle}</h1> */}
        <h1 className="text-4xl text-teal-700 mb-6">Podsumowanie</h1>
        <h2 className="text-2xl mb-4">Twój wynik: {Math.round((result / questions.length) * 100)}%</h2>
        <h2 className="text-2xl mb-4">Ilość pytań: {questions.length}</h2>
        <h2 className="text-2xl mb-4">Dobre odpowiedzi: {result}</h2>
        <h2 className="text-2xl mb-4">Błędne odpowiedzi: {questions.length - result}</h2>
        <button onClick={tryAgain} className="w-32 h-12 bg-blue-400">
           Spróbuj ponownie
          </button>
      </div>
      ) : (
        <ul>
        <li key={questions[currentQuestionIndex].id} className="h-max border-2 border-slate-400 p-5">
          <div className="h-2 bg-blue-600 rounded-full mb-5" style={{ width: `${progress}%` }}></div>

          <h1 className='w-4/5 mb-5 m-auto text-gray-400'> <span className='text-3xl p-1 text-black'>{currentQuestionIndex + 1}</span>/<span className=' p-1'>{questions.length}</span></h1>
          {/* <div>Czas na odpowiedź: {currentTime} s</div> */}
          <div className="w-4/5 mb-5 m-auto text-2xl">{questions[currentQuestionIndex].text}</div>
        
          <ul>
            {questions[currentQuestionIndex].answers.map((answer) => (
              <li

                key={answer.id}
                className={`m-auto mb-4 p-2 w-4/5 rounded-2xl border border-neutral-600 cursor-pointer hover:bg-blue-600 hover:text-white ${
                  selectedAnswer === answer.id ? 'bg-blue-600 text-white' : ''
                }`}
                onClick={() => handleAnswerChange(questions[currentQuestionIndex].id, answer.id)}
              >
                <span className="text-md">{answer.text}</span>
              </li>
            ))}
          </ul>
          {quizStarted && currentQuestionIndex < questions.length - 1 && (
          <div className="m-auto mb-4 p-2 w-4/5 flex justify-between items-center">
          <div></div> {/* Pusty element, aby przycisk był na prawym krańcu */}
          <button  onClick={showNextQuestion} className=" rounded-3xl bg-blue-400 p-5">
            Następne pytanie
          </button>
        </div>
          )}
          </li>
        </ul>
      )
     
     )}
 
   

{quizStarted && currentQuestionIndex === questions.length - 1 && !quizCompleted && (
  <div className="w-max m-auto flex justify-center items-center">
    <button onClick={showResults} className="w-32 h-12 bg-green-400">
      Pokaż wyniki
    </button>
  </div>
)}

 



    </div>
  );
};

export default QuizView;

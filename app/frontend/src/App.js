 
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'
import Quizzes from './pages/QuizzesPage';
import QuizResult from './pages/QuizResult';
import { QuizProvider } from './context/QuizContext';

function App() {
  return (
    <Router>
      <QuizProvider>

        <Routes >
          <Route path="/" element={<HomePage/>} />
          <Route path="/quizzes/" element={<Quizzes/>} />
          <Route path="/quizzes/:id" element={<QuizPage/>} />
          <Route path="/quizzes/result" element={<QuizResult/>} />

        </Routes>
      </QuizProvider>
    </Router>
  );
}

export default App;

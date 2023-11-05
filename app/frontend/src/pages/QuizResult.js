import Header from '../components/Header';
import { QuizContext } from '../context/QuizContext';
import React, { useContext } from 'react';
 

const QuizResult = () => {
  const { result } = useContext(QuizContext);
 

  return (
    <>
    <Header></Header>
    <div className='text-center'>
      <h1 className='text-3xl text-red-400 bold pt-5 pb-5'>
        Gratuluje otrzymałeś wynik: {result}
      </h1>
    </div>
    </>
  );
};

export default QuizResult;

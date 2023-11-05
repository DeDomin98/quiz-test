import React from 'react'
import QuizView from '../components/QuizView'
import Header from '../components/Header'

import { useState, useEffect } from 'react';

const QuizPage = () => {
  return (
    <div>
      <Header></Header>
      <QuizView></QuizView>
    </div>
    
  )
}

export default QuizPage
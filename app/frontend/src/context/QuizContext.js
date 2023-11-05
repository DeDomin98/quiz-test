// QuizContext.js
import React, { createContext, useState } from 'react';

const QuizContext = createContext(null);

const QuizProvider = ({ children }) => {
  const [result, setResult] = useState(null);

  return (
    <QuizContext.Provider value={{ result, setResult }}>
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContext, QuizProvider };

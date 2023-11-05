import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

class QuizComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        quizzes: [],
      };
    }
    
    componentDidMount() {
      axios.get('http://localhost:8000/quizzes/')
        .then(response => {
          this.setState({ quizzes: response.data });
        })
        .catch(error => {
          console.error('Error fetching quizzes:', error);
        });
    }
  
    render() {
      return (
        <div>
          <div className='lg:grid-cols-4 md:grid-cols-3 grid-cols-2 grid m-5'>
            {this.state.quizzes.map(quiz => (
            
            <Link to={`/quizzes/${quiz.id}/`} 
            key={quiz.id} 
            className='m-5'
            >
            
              <div className='max-w-xl h-32 pt-2 bg-teal-500 ' key={quiz.id}>
                <h1 className='text-2xl text-center'>{quiz.title}</h1>
              </div>
            </Link>
            ))}
          </div>
        </div>
      );
    }
  }
  
  export default QuizComponent;
  
import React from 'react'
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div className='bg-teal-400 w-full h-64'>
        <div className='w-full'>
            <h1 className="text-4xl w-max pt-12 m-auto font-bold">QUIZ APP</h1>
        </div>
        
        <nav className='w-max flex m-auto pt-20'>
            <div className='mr-10 p-1 text-2xl'><Link to='/' className='hover:text-teal-100'>Home</Link></div>
            <div className='p-1 text-2xl hover:text-teal-100'><Link to='/quizzes' className='hover:text-teal-100'>Quizzes</Link></div>
        </nav>
    </div>
 
  )
}

export default Header
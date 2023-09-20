import React from 'react';
import { Link } from 'react-router-dom';


export function Home() {
  return (
    <div className='p-4'>
      <h1 className='text-4xl font-bold mb-4'>Welcome to the Automated Job Interview Preparation Application!</h1>
      <p className='text-lg mb-4'>Please choose an option:</p>
      <div className='flex gap-4'>
        <Link to='/new-interview' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Start a New Interview</Link>
        <Link to='/past-interviews' className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>View Past Interviews</Link>
      </div>
    </div>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getUserInterviews from '@wasp/queries/getUserInterviews';

export function PastInterviews() {
  const { data: interviews, isLoading, error } = useQuery(getUserInterviews);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {interviews.map((interview) => (
        <div key={interview.id} className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{interview.jobDescription}</div>
          <div>Total Score: {interview.score}</div>
          <div>
            <Link to={`/interview/${interview.id}/result`} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
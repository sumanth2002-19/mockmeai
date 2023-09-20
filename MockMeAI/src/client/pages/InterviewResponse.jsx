import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getInterview from '@wasp/queries/getInterview';

export function InterviewResponsePage() {
  const { interviewId } = useParams();

  const { data: interview, isLoading, error } = useQuery(getInterview, { interviewId: interviewId });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div>
      {interview ? (
        <div>
          <h1 className='text-2xl mb-4'>Interview Result</h1>
          <p>Job Description: {interview.jobDescription}</p>
          <p>Resume: {interview.resume}</p>
          <p>Job Level: {interview.jobLevel}</p>
          <h2 className='text-xl mt-4 mb-2'>Questions:</h2>
          {interview.questions.map((question) => (
            <div key={question.id} className='border rounded p-4 mb-4'>
              <p className='font-bold'>{question.content}</p>
              <p>Expected Answer: {question.expectedAnswer}</p>
              <p>User Response: {question.userResponse}</p>
              <p>Score: {question.score}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No interview found.</p>
      )}
    </div>
  );
}
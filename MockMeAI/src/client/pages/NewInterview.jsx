import React from 'react';
import { useState } from 'react';
import { useAction } from '@wasp/actions';
import createInterview from '@wasp/actions/createInterview';

export function NewInterviewPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState(null);
  const [jobLevel, setJobLevel] = useState('');

  const createInterviewFn = useAction(createInterview);

  const handleSubmit = async () => {
    if(!jobDescription || !resume || !jobLevel) {
      alert('Please fill all the fields!');
      return;
    }
    const interviewQuestions = await createInterviewFn({
      jobDescription,
      resume,
      jobLevel
    });

    // Display the interview questions and start the timer.
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setResume(file);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">New Mock Interview</h1>
      <div className="mb-4">
        <label className="block text-lg mb-2">Job Description</label>
        <textarea
          className="border px-2 py-1 w-full"
          rows="6"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Upload Resume</label>
        <input
          type="file"
          onChange={handleFileChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Job Level</label>
        <select
          className="border px-2 py-1"
          value={jobLevel}
          onChange={(e) => setJobLevel(e.target.value)}
        >
          <option value="entry">Entry</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Start Interview
      </button>
    </div>
  );
}
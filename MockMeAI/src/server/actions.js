import HttpError from '@wasp/core/HttpError.js'
import textAnalysisModule from 'textAnalysisModule'
import questionGenerationModule from 'questionGenerationModule'

export const createInterview = async ({ jobDescription, resume, jobLevel }, context) => {
  // Invoke text analysis module to extract key skills and qualifications from job description and resume.
  const skills = await textAnalysisModule.extractSkills(jobDescription, resume);

  // Generate interview questions using advanced language models and extracted skills.
  const interviewQuestions = await questionGenerationModule.generateQuestions(skills, jobDescription, jobLevel);

  return interviewQuestions;
}

export const submitResponse = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { interviewId, responses } = args;

  const interview = await context.entities.Interview.findUnique({
    where: { id: interviewId }
  });

  if (!interview) { throw new HttpError(404) }

  const questions = await context.entities.Question.findMany({
    where: { interviewId: interview.id }
  });

  let totalScore = 0;

  for (let response of responses) {
    const question = questions.find(q => q.id === response.questionId);

    if (!question) { throw new HttpError(404) }

    // Perform text analysis on the user response and compute score
    const score = textAnalysisModule.computeScore(response.userResponse, question.expectedAnswer);

    // Update the question with the user response and score
    await context.entities.Question.update({
      where: { id: question.id },
      data: {
        userResponse: response.userResponse,
        score: score
      }
    });

    totalScore += score;
  }

  // Update the interview with the total score
  await context.entities.Interview.update({
    where: { id: interview.id },
    data: { score: totalScore }
  });

  return totalScore;
}
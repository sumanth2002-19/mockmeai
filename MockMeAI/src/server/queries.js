import HttpError from '@wasp/core/HttpError.js';

export const getInterview = async ({ interviewId }, context) => {
  if (!context.user) throw new HttpError(401);

  const interview = await context.entities.Interview.findUnique({
    where: { id: interviewId },
    include: { questions: true }
  });

  if (!interview) throw new HttpError(404, 'No interview with id ' + interviewId);

  return interview;
};

export const getUserInterviews = async (args, context) => {
  if (!context.user) throw new HttpError(401);

  return context.entities.Interview.findMany({
    where: { userId: context.user.id }
  });
};

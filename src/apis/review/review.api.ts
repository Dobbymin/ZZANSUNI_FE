import { axiosClient } from '../AxiosClient';

type GetReviewParams = {
  challengeGroupId: number;
  page: number;
  size: number;
};

type PostReviewParams = {
  challengeId: number;
  content: string;
  rating: number;
};

type GetChallengeAvgScoreParams = {
  challengeGroupId: number;
};

export async function getReview({
  challengeGroupId,
  page,
  size = 5,
}: GetReviewParams) {
  try {
    const response = await axiosClient.get(
      `api/challengeGroups/${challengeGroupId}/reviews`,
      {
        params: { page, size },
      }
    );
    console.log('getReview response: ', response.data);
    return response.data.data;
  } catch (error) {
    throw new Error(`getReview error: ${error}`);
  }
}

export async function postReview({
  challengeId,
  content,
  rating,
}: PostReviewParams) {
  const body = { content, rating };
  console.log('json : ', JSON.stringify(body));
  try {
    const response = await axiosClient.post(
      `api/challenges/${challengeId}/reviews`,
      JSON.stringify(body)
    );
    console.log('postReview response: ', response.data);
    return response.data.data;
  } catch (error) {
    throw new Error(`postReview error: ${error}`);
  }
}

export async function getChallegeAvgScore({
  challengeGroupId,
}: GetChallengeAvgScoreParams) {
  try {
    const response = await axiosClient.get(
      `api/challengeGroups/${challengeGroupId}/reviews/score`
    );
    console.log('getChallegeAvgScore response: ', response.data);
    return response.data.data;
  } catch (error) {
    throw new Error(`getChallegeAvgScore error: ${error}`);
  }
}

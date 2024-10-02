import { useCallback, useEffect, useState } from 'react';

import ListItem from './components/list-item';
import { useGetReview } from '@/apis/my-challenge-record/getReview.api';
import { ChallengeData } from '@/apis/my-challenge-record/getReview.response';
import EmptyState from '@/components/common/empty-state';
import TopBar, { HEADER_HEIGHT } from '@/components/features/layout/top-bar';
import { Box, Spinner } from '@chakra-ui/react';
import styled from '@emotion/styled';

const MyChallengeRecord = () => {
  const [page, setPage] = useState(0);
  const [allChallenges, setAllChallenges] = useState<ChallengeData[]>([]);
  const { data, isLoading } = useGetReview(page, 20);

  const loadMoreChallenges = useCallback(() => {
    if (data?.data.hasNext && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (data?.data.data) {
      setAllChallenges((prevChallenges) => [
        ...prevChallenges,
        ...data.data.data,
      ]);
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200
      ) {
        loadMoreChallenges();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreChallenges]);

  return (
    <>
      <TopBar
        type='Page'
        title='완료한 챌린지'
        backgroundColor='var(--color-green-06)'
      />
      <MyChallengeRecordLayout>
        <ChallengeList>
          {allChallenges.length > 0 ? (
            allChallenges.map((challenge, index) => (
              <ListItem
                key={`${challenge.challengeId}-${index}`}
                challengeId={challenge.challengeId}
                challengeTitle={challenge.challengeTitle}
                userNickname={challenge.user.nickname}
                profileImageUrl={challenge.user.profileImageUrl}
              />
            ))
          ) : (
            <EmptyState>
              <span>
                <span className='highlight'>
                  완료한 챌린지가 존재하지 않습니다.
                </span>
                <br />
                어서 챌린지를 인증하여 스탬프를 채워보세요!
              </span>
            </EmptyState>
          )}
        </ChallengeList>
        {isLoading && (
          <SpinnerContainer>
            <Spinner size='xl' />
          </SpinnerContainer>
        )}
      </MyChallengeRecordLayout>
    </>
  );
};

export default MyChallengeRecord;

const MyChallengeRecordLayout = styled.div`
  min-height: calc(
    100vh - ${HEADER_HEIGHT}
  ); // 부모가 block이므로 해당 요소에 직접 높이 지정
  display: flex;
  flex-direction: column;
  background-color: var(--color-green-06);
`;

const ChallengeList = styled(Box)`
  display: inline-flex;
  flex-direction: column;
  flex: 1;
  margin: 1rem 1rem 2rem 1rem;
  padding: 0 1rem;
  align-items: center;
  border-radius: 1.25rem;
  background-color: #fff;
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

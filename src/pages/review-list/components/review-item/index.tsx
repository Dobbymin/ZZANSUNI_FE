import { PiStarFill, PiStarLight } from 'react-icons/pi';

import { Box, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

const ReviewItem = ({ data }) => {
  const rating = 2;
  return (
    <ReviewItemBox>
      <UserWrapper>
        <Wrapper>
          <RowWrapper>
            <ImageBox>
              <Image
                height='100%'
                width='100%'
                objectFit='cover'
                src={data.user.profileImageUrl}
              />
            </ImageBox>
            <Text fontSize='var(--font-size-md)' fontWeight='700'>
              {data.user.nickname}
            </Text>
            <Text fontSize='var(--font-size-sm)' color='var(--color-gray-01)'>
              {data.user.tierinfo}
            </Text>
          </RowWrapper>
          <SmallText>참여난이도 {data.challengeDifficulty}</SmallText>
        </Wrapper>
        <StarWrapper>
          {[...Array(rating)].map((a, i) => (
            <PiStarFill size='15' key={i} color='var(--color-green-01)' />
          ))}
          {[...Array(5 - rating)].map((a, i) => (
            <PiStarLight size='15' key={i} color='var(--color-green-01)' />
          ))}
        </StarWrapper>
      </UserWrapper>
      <Text fontSize='var(--font-size-sm)' marginLeft='35px'>
        {data.content}
      </Text>
    </ReviewItemBox>
  );
};

export default ReviewItem;

const ReviewItemBox = styled(Box)`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export const SmallText = styled.div`
  font-size: 0.8rem;
  margin-left: 35px;
  margin-bottom: 5px;
  color: var(--color-grey-01);
  border-radius: 20px;
  width: 90px;
  border: var(--color-grey-02) 0.5px solid;
  text-align: center;
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: row;
`;

export const RowWrapper = styled(Wrapper)`
  gap: 5px;
  align-items: center;
  justify-content: space-between;
`;

export const UserWrapper = styled(Wrapper)`
  gap: 5px;
  align-items: start;
  justify-content: space-between;
`;

export const StarWrapper = styled(Wrapper)`
    position: absolute
    top: 0px;
    right: 0px;
    margin: 5px;
`;

export const ImageBox = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 70%;
  overflow: hidden;
  z-index: 10;
`;
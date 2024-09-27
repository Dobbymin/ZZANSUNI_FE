// import DefaultImage from '../../../../assets/UserImage.svg';
import * as S from './styles';
import type { ChallengeRankingData } from '@/apis/challenge-detail/challenge.ranking.response';
import { Chip } from '@/components/common/chip';
import { ProfileImage } from '@/components/common/profile-image';

type RankingItemProps = {
  item: ChallengeRankingData;
};

export const RankingItem = ({ item }: RankingItemProps) => {
  return (
    <S.Wrapper>
      <S.Content>
        <S.Rank ranking={item.ranking}>{item.ranking}위</S.Rank>
        <ProfileImage src={item.user.profileImageUrl} />
        <S.UserWrapper>
          <S.Nickname>{item.user.nickname}</S.Nickname>
          <S.Tier>{item.user.tierInfo.tier}</S.Tier>
        </S.UserWrapper>
      </S.Content>
      <Chip margin='0 0 0 12px' color='var(--color-green-05)'>
        + {item.acquiredPoint} 포인트
      </Chip>
    </S.Wrapper>
  );
};

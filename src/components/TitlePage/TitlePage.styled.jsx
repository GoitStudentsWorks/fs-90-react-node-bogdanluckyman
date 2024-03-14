import styled from 'styled-components';
import { colors } from '../../styles/colors';

export const Title = styled.h2`
  color: ${colors.white};
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 1.16; /* 116.667% */
  margin-top: 10px;

  @media screen and (min-width: 768px) {
    font-size: 32px;
    line-height: 1.37; /* 137.5% */
    // margin-top: 72px;
    margin-bottom: 0;
  }
`;

import React from 'react';
import styled from 'styled-components';

interface Props {
  children?: React.ReactNode;
}

const HomeContainer = styled.main`
  height: 100vh;
  width: 100vw;
`;

export const Home: React.FC = (props: Props) => {
  return <HomeContainer>{props.children}</HomeContainer>;
};

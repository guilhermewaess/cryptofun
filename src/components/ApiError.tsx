import React from 'react';
import styled from 'styled-components';

export interface Props {
  error: string;
  onDismiss: () => void;
}

const ErrorContainer = styled.div`
  position: relative;
  display: flex;
  align-content: center;
  border: solid 1px red;
  background-color: rgba(252, 32, 3, 0.4);
  color: white;
  font-weight: 300;
  padding: 12px;
  margin-top: 48px;
`;

const Spacer = styled.div`
  flex: 1;
`;

const DismissBtn = styled.div`
  padding-right: 16px;
  cursor: pointer;

  :before,
  :after {
    position: absolute;
    content: ' ';
    height: 20px;
    width: 3px;
    background-color: white;
  }
  :before {
    transform: rotate(45deg);
  }
  :after {
    transform: rotate(-45deg);
  }
`;

export const ApiError: React.FC<Props> = ({ error, onDismiss }: Props) => {
  return (
    <ErrorContainer>
      <span data-testid="error-msg">{error}</span>
      <Spacer />
      <DismissBtn data-testid="dismiss-btn" onClick={onDismiss} />
    </ErrorContainer>
  );
};

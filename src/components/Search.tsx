import React, { useState } from 'react';
import styled from 'styled-components';

export interface Props {
  onSearch: (searchTerm: string) => void;
}

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const Input = styled.input`
  width: 40%;
  margin-right: 18px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
  font-weight: 400;
  font-size: 16px;
  transition: all 0.2s;

  :focus {
    outline: none;
    box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.3);
    transform: scale(1.01);
  }
`;

const Button = styled.button`
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
  font-weight: 400;
  font-size: 16px;
  color: #000;
  cursor: pointer;

  :focus {
    outline: none;
  }

  :hover {
    outline: none;
    box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.3);
    transform: scale(1.01);
  }

  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Search: React.FC<Props> = (props: Props) => {
  const [searchValue, setSearchValue] = useState('');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    props.onSearch(searchValue.toUpperCase());
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input
        data-testid="search-input"
        placeholder="Example: BTC"
        value={searchValue}
        onChange={({ target: { value } }): void => setSearchValue(value)}
      />
      <Button data-testid="submit-btn" disabled={!searchValue} type="submit">
        Check Value
      </Button>
    </Form>
  );
};

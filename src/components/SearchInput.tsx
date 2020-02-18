import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  onSearch: (searchTerm: string) => void;
}

const Form = styled.form`
  display: flex;
`;

const Input = styled.input`
  width: 100%;
`;
const Button = styled.button``;

export const SearchInput: React.FC<Props> = (props: Props) => {
  const [searchValue, setSearchValue] = useState('');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    props.onSearch(searchValue);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input value={searchValue} onChange={({ target: { value } }): void => setSearchValue(value)} />
      <Button type="submit">Search</Button>
    </Form>
  );
};

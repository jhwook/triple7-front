import styled from 'styled-components';

export default function TitleRow() {
  return (
    <Container data-testid="title-row">
      <>
        <span>PRICE</span>
        <span>SIZE</span>
        <span>TOTAL</span>
      </>{' '}
      :
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  color: #98a6af;
  padding: 0.3em;
  background-color: #121723;

  span {
    min-width: 5rem;
  }
`;

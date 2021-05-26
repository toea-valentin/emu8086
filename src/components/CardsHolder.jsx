import styled from 'styled-components';

const CardsHolder = styled.div`
  display:flex;
  justify-content:start;
  flex-direction:column;
  width:100%;
  max-width: 500px;
  overflow: auto;
  box-shadow: rgb(0 0 0 / 50%) 0px 2px 15px;
  padding-right: 10px;
  & > *:not(:last-child) {
    display: block;
    margin-bottom: 8px; 
} 
`;

export default CardsHolder;
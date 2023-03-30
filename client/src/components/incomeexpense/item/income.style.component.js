import styled from 'styled-components';
export const IncomeStyledComponent = styled.div`
 
  font-size: 20px;
  letter-spacing: 1px;
  margin: 5px 0;
  color: ${props=>props.typeProp === 'plus' ? '#2ecc71' : '#c0392b'}
`;


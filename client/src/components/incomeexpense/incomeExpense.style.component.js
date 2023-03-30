import styled from 'styled-components';
export const IncomeExpenseContainerStyledComponent = styled.div`
  background-color: #fff;
  box-shadow: var(--box-shadow);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

 & > div {
  flex: 1;
  text-align: center;
}

 & > div:first-of-type {
  border-right: 1px solid #dedede;
}
`;


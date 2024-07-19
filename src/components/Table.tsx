import styled from '@emotion/styled';

export const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  margin: 20px;
  font-size: 18px;
  text-align: left;
`;

export const TableHeader = styled.th`
  background-color: #f2f2f2;
  border: 1px solid #dddddd;
  padding: 8px;
`;

export const TableRow = styled.tr`
  &:nth-of-type(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const TableCell = styled.td`
  border: 1px solid #dddddd;
  padding: 8px;
`;

export const ActionButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:nth-of-type(1) {
    background-color: #007bff;
    color: white;
  }

  &:nth-of-type(2) {
    background-color: #dc3545;
    color: white;
  }
`;

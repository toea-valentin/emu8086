import styled from "styled-components";

const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  min-width: 350px;
  background: #2d2d2d;

  tr th,
  tr td {
    border-right: 1px solid #bbb;
    border-bottom: 1px solid #bbb;
    padding: 5px;
  }
  tr th:first-child,
  tr td:first-child {
    border-left: 1px solid #bbb;
  }
  tr th {
    background: transparent;
    border-top: 1px solid #bbb;
    text-align: left;
  }

  tr:first-child th:first-child {
    border-top-left-radius: 6px;
  }

  tr:first-child th:last-child {
    border-top-right-radius: 6px;
  }

  tr:last-child td:first-child {
    border-bottom-left-radius: 6px;
  }

  tr:last-child td:last-child {
    border-bottom-right-radius: 6px;
  }
`;

export default Table;
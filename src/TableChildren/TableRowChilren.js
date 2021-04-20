import React from "react";
import { SortableHandle } from "react-sortable-hoc";
import styled from "styled-components";
import MyTableChildren from "./MyTableChildren";

const TrWrapper = styled.tr`
  /* background: blue; */
  border: solid;
  cursor: default;

  .firstElement {
    display: flex;
    flex-direction: row;
  }

  .helperContainerClass {
    width: auto;
    border: 1px solid #efefef;
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 3px;

    &:active {
      cursor: grabbing;
    }
  }
   td {
      padding: 5px;
      text-align: left;
      width: 200px;
      border : solid;
    }
`;

const Handle = styled.div`
  margin-right: 10px;
  padding: 0 5px;
  cursor: grab;
`;

// const RowHandler = SortableHandle(() => <Handle className="handle">Move</Handle>);
const RowHandler = SortableHandle(({ children }) => <Handle className="handle">{children || "A"}</Handle>);



const TableRowChilren = ({ values, moveRowDown, moveRowUp, onPick, cell }) => {
  // console.log(cell.cells[0]);
  return (
    <TrWrapper >
      <td {...cell.cells[0].getCellProps()}>{cell.cells[0].render('Cell')}</td>
      <td>
        <RowHandler>MOVE</RowHandler>

      </td>
      <td>{values?.s1s}</td>
      <td>{values?.s2s}</td>
      <td>
        {/* <NewComponent /> */}
        <button onClick={() => moveRowUp()}>
          up
        </button>
        <button onClick={() => moveRowDown()}>
          down
        </button>
      </td>
    </TrWrapper>
  );
};

export default TableRowChilren;

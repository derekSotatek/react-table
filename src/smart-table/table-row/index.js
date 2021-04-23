import React from "react";
import { SortableHandle } from "react-sortable-hoc";
import styled from "styled-components";
import MyTableChildren from "../table-children/TableChildren/MyTableChildren";


const Handle = styled.div`
  margin-right: 10px;
  padding: 0 5px;
  cursor: grab;
`;

// const RowHandler = SortableHandle(() => <Handle className="handle">Move</Handle>);
const RowHandler = SortableHandle(({ children }) => <Handle className="handle">{children || "A"}</Handle>);


const TableRow = ({ values, moveRowDown, moveRowUp, disableRowUp = false, disableRowDown = false, cell }) => {
  return (
    <tr >
      <td {...cell.cells[0].getCellProps()}>{cell.cells[0].render('Cell')}</td>
      <td>

        <button disabled={disableRowUp} onClick={() => moveRowUp()}>
          <i className="fas fa-chevron-up"></i>
        </button>
        <button disabled={disableRowDown} onClick={() => moveRowDown()}>
          <i className="fas fa-chevron-down"></i>
        </button>
      </td>
      <td>
        {values?.id}
      </td>

      <td>
        <RowHandler>{values?.fieldName}</RowHandler></td>
      <td>
        <div className="form-group">
          <input className="form-control" value={values?.format} />
        </div>
      </td>
      <td>
        <MyTableChildren />
      </td>

      <td>
        {values?.column}
      </td>
      <td>
        {values?.margin}
      </td>

    </tr>
  );
};

export default TableRow;

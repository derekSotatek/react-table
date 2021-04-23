import React from "react";
import { SortableHandle } from "react-sortable-hoc";
import styled from "styled-components";


const Handle = styled.div`
  margin-right: 10px;
  padding: 0 5px;
  cursor: grab;
`;

// const RowHandler = SortableHandle(() => <Handle className="handle">Move</Handle>);
const RowHandler = SortableHandle(({ children }) => <Handle className="handle">{children || "A"}</Handle>);



const TableRowChilren = ({ values, moveRowDown, moveRowUp, disableRowUp = false, disableRowDown = false, onInsertRow = null }) => {
  return (
    <tr >
      <td>
        <button disabled={disableRowUp} onClick={() => moveRowUp()}>
          <i className="fas fa-chevron-up"></i>
        </button>
        <button disabled={disableRowDown} onClick={() => moveRowDown()}>
          <i className="fas fa-chevron-down"></i>
        </button>
      </td>
      <td>
        <div className="form-group">
          <input className="form-control" value={values?.rowData} />
        </div>
      </td>
      <td>
        <button onClick={onInsertRow}>
          <i className="fas fa-plus"></i>
        </button>
      </td>

    </tr>
  );
};

export default TableRowChilren;

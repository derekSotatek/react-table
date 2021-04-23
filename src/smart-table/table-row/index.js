import React from "react";
import { SortableHandle } from "react-sortable-hoc";
import MyTableChildren from "../table-children/TableChildren/MyTableChildren";
const RowHandler = SortableHandle(({ children }) => <div className="handle">{children}</div>);

const TableRow = ({ values, moveRowDown, moveRowUp, disableRowUp = false, disableRowDown = false, cell }) => {
  return (
    <tr >
      <td {...cell.cells[0].getCellProps()}>{cell.cells[0].render('Cell')}</td>
      <td>
        <div>
          <button disabled={disableRowUp} onClick={() => moveRowUp()}>
            <i className="fas fa-chevron-up" />
          </button>
        </div>
        <div>
          <button disabled={disableRowDown} onClick={() => moveRowDown()}>
            <i className="fas fa-chevron-down" />
          </button>
        </div>
      </td>
      <td>
        <RowHandler>{values?.id}</RowHandler>
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
        <RowHandler>{values?.column}</RowHandler>
      </td>
      <td>
        <RowHandler>{values?.margin}</RowHandler>
      </td>
    </tr>
  );
};

export default TableRow;

import React from "react";

const TableRowChilren = ({
   values,
   moveRowDown,
   moveRowUp,
   disableRowUp = false,
   disableRowDown = false,
   addRow,
   removeRow,
}) => {
  return (
    <tr >
      <td>
        <div>
          <button disabled={disableRowUp} onClick={() => moveRowUp()}>
            <i className="fas fa-chevron-up" />
          </button>
        </div>
        <div>
          <button disabled={disableRowDown} onClick={() => moveRowDown()}>
            <i className="fas fa-chevron-down"/>
          </button>
        </div>
      </td>
      <td>
        <div className="form-group">
          <input className="form-control" value={values?.rowData} />
        </div>
      </td>
      <td>
        <div className="add-remove">
          <div>
            <button onClick={addRow}>
              <i className="fas fa-plus"/>
            </button>
          </div>
        <div>
          <button onClick={removeRow}>
            <i className="fas fa-minus" />
          </button>
        </div>
        </div>
      </td>
    </tr>
  );
};

export default TableRowChilren;

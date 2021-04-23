import React from "react";

const TableRowChilren = ({ values, moveRowDown, moveRowUp, disableRowUp = false, disableRowDown = false }) => {
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

    </tr>
  );
};

export default TableRowChilren;

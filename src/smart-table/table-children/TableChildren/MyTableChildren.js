import React, { useState, useCallback } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "../../utils";
import { useRowSelect, useSortBy, useTable } from "react-table";
import TableRowChildren from "./TableRowChildren";

const SortableCont = SortableContainer(({ children, getTableBodyProps }) => {
  return <tbody {...getTableBodyProps()}>{children}</tbody>;
});

const SortableItem = SortableElement(props => <TableRowChildren {...props} />);
const MyTableChildren = ({ listItem = [
  {
    rowData: 'abc',
  },
  {
    rowData: 'ghi',
  },
  {
    rowData: 'npq',
  },

],
  listColumn = [
    {
      Header: '',
      accessor: 'rowData',
    },
    {
      Header: '',
      accessor: 'actions',
    },
    {
      Header: '',
      accessor: 'addRemove',
    },
    {
      Header: '',
      accessor: 'move',
    },
  ]
}) => {

  const [items, setItems] = useState(listItem);
  const [columsConfig, setColumnConfig] = useState(listColumn);

  const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
    setItems(oldItems => arrayMove(oldItems, oldIndex, newIndex));
  }, []);


  const {
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
  } = useTable(
    {
      data: items,
      columns: columsConfig,
    },
    useSortBy,
    useRowSelect,
  );

  const addRow = (index) => {
    const defaultNewItem = {
      rowData: '',
    };
    const cloneItems = [...items];
    cloneItems.splice(index + 1, 0, defaultNewItem);
    setItems(cloneItems);
  };

  const removeRow = (index) => {
    const cloneItems = [...items];
    cloneItems.splice(index, 1);
    setItems(cloneItems);
  };

  if (!columsConfig.length) return "not data";

  return (
    <div>
      <table className="table as-sortable-dragging" {...getTableProps()}>
        <SortableCont
          getTableBodyProps={getTableBodyProps}
          onSortEnd={onSortEnd}
          axis="y"
          lockAxis="y"
          lockToContainerEdges={true}
          lockOffset={["30%", "50%"]}
          helperClass="helperContainerClass"
          useDragHandle={true}
        >
          {rows.map((value, index) => prepareRow(value) || (
            <SortableItem
              moveRowUp={() => { onSortEnd({ oldIndex: index, newIndex: index - 1 }) }}
              moveRowDown={() => { onSortEnd({ oldIndex: index, newIndex: index + 1 }) }}
              key={`item-${index}`}
              index={index}
              isSelected={value.isSelected}
              values={value.values}
              cell={value}
              disableRowUp={index === 0}
              disableRowDown={index === rows.length - 1}
              addRow={() => addRow(index)}
              removeRow={() => removeRow(index)}
            />
          ))}
        </SortableCont>
      </table>
    </div>
  );
};


export default MyTableChildren;

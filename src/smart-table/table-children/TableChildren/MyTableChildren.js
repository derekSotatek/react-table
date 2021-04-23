import React, { useState, useCallback } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "../../utils";
import { useRowSelect, useSortBy, useTable } from "react-table";
// import IndeterminateCheckbox from "../../indeterminate-checkbox";
import TableRowChilren from "./TableRowChilren";


const SortableCont = SortableContainer(({ children, getTableBodyProps }) => {
  return <tbody {...getTableBodyProps()}>{children}</tbody>;
});

const SortableItem = SortableElement(props => <TableRowChilren {...props} />);
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
      sortType: 'basic',
    },
    {
      Header: '',
      accessor: 'actions',
      sortType: 'basic',
    },
  ]
}) => {

  const [items, setItems] = useState(listItem);
  const [columsConfig, setColumnConfig] = useState(listColumn);

  const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
    setItems(oldItems => arrayMove(oldItems, oldIndex, newIndex));
  }, []);

  const onInsertRow = async (index) => {
    
  }
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
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

  if (columsConfig.length <= 0) return "not data";
  return (
    <div>
      <table className="table" {...getTableProps()}>
        <thead>
          {/* {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? column.isSortedDesc ? 'down' : 'up' : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))} */}
        </thead>
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
              moveRowUp={() => { index > 0 && onSortEnd({ oldIndex: index, newIndex: index - 1 }) }}
              moveRowDown={() => { index < rows.length && onSortEnd({ oldIndex: index, newIndex: index + 1 }) }}
              key={`item-${index}`}
              index={index}
              isSelected={value.isSelected}
              values={value.values}
              cell={value}
              disableRowUp={index === 0}
              disableRowDown={index === rows.length - 1}
              onInsertRow={() => onInsertRow(index + 1)}
            />
          ))}
        </SortableCont>
      </table>
    </div>
  );
};


export default MyTableChildren;

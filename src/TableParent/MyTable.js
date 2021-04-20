import React, { useState, useCallback } from "react";
import TableRow from "./TableRow";
import styled from "styled-components";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { fakeColumns, ITEMS } from "../data";
import arrayMove from "../arrayMove";
import { useRowSelect, useSortBy, useTable } from "react-table";
import IndeterminateCheckbox from "../IndeterminateCheckbox";

const MyTableWrapper = styled.div`
  padding: 10px;

  .fixed_header {
    width: 800px;
    table-layout: fixed;
    border-collapse: collapse;

    & > tbody {
      display: block;
      width: 807px;
      overflow: auto;
      height: 400px;
      cursor: grabbing;
      background: grey;
    }

    & > thead {
      background: yellow;
      color: black;

      & > tr {
        display: block;
        //width: 793px;
      }
    }

    & > thead th,
    & > tbody td {
      padding: 5px;
      text-align: left;
      width: 200px;
      border: 1px solid #000;
    }
  }
`;

const SortableCont = SortableContainer(({ children, getTableBodyProps }) => {
  return <tbody {...getTableBodyProps()}>{children}</tbody>;
});

const SortableItem = SortableElement(props => <TableRow {...props} />);

const MyTable = () => {
  const itemHaveChilTable = {
    move: "She",
    id: "TESTTTTTTTTT",
    firstName: () => <div>XXX</div>,
    basic: "fast"
  };
  ITEMS.push(itemHaveChilTable)
  const [items, setItems] = useState(ITEMS);
  const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
    setItems(oldItems => arrayMove(oldItems, oldIndex, newIndex));
  }, []);


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      data: items,
      columns: fakeColumns,
    },
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    },
    useSortBy,
    useRowSelect,
  );
  const onPick = (e) => {
    // selectedRowIds(e.id);
  }
  return (
    <MyTableWrapper>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
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
          ))}
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
              onPick={() => onPick(value)}
            />
          ))}
        </SortableCont>
      </table>
    </MyTableWrapper>
  );
};

export default MyTable;

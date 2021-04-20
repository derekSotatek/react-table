import React, { useState } from 'react';
import { useTable, useRowSelect, useSortBy } from 'react-table';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import Row from './row';
import IndeterminateCheckbox from './indeterminate-checkbox';
import './style.css';

const fakeData = [
  {
    age: 27,
    firstName: "teacher-cek7x",
    id: 0,
    lastName: "company-vfqib",
    progress: 88,
    status: "relationship",
    visits: 64,
  },
  {
    age: 14,
    firstName: "resource-a3nt8",
    id: 1,
    lastName: "ball-in5d9",
    progress: 37,
    status: "relationship",
    visits: 13,
  },
  {
    age: 15,
    firstName: "derek",
    id: 2,
    lastName: "derek",
    progress: 37,
    status: "relationship",
    visits: 13,
  },
];

const fakeColumns = [
  {
    Header: 'Move',
    accessor: 'move',
    sortType: 'basic',
  },
  {
    Header: 'ID',
    accessor: 'id',
    sortType: 'basic',
  },
  {
    Header: 'First Name',
    accessor: 'firstName',
    sortType: 'basic'
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
    sortType: 'basic',
  },
  {
    Header: 'Age',
    accessor: 'age',
  },
  {
    Header: 'Visits',
    accessor: 'visits',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Profile Progress',
    accessor: 'progress',
  },
];

const Table = () => {
  const [records, setRecords] = useState(fakeData);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      data: records,
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

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRecord = records[dragIndex];
    setRecords(update(records, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragRecord],
      ],
    }));
  };

  const moveRowUp = (moveIndex) => {
    if (moveIndex === 0) return;
    const targetIndex = moveIndex - 1;
    moveRow(moveIndex, targetIndex);
  };

  const moveRowDown = (moveIndex) => {
    const targetIndex = moveIndex + 1;
    moveRow(moveIndex, targetIndex);
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, index) =>
              prepareRow(row) || (
                <Row
                  index={index}
                  row={row}
                  moveRow={moveRow}
                  moveRowUp={moveRowUp}
                  moveRowDown={moveRowDown}
                  {...row.getRowProps()}
                />
              )
          )}
        </tbody>
      </table>
    </DndProvider>
  )
};

export default Table;
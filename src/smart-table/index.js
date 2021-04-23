import React, { useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { useRowSelect, useSortBy, useTable } from "react-table";
import { fakeColumns, ITEMS } from "../data";
import IndeterminateCheckbox from "./indeterminate-checkbox";
import TableRow from "./table-row";
import update from 'immutability-helper';
import "./style.css";

const SortableTBody = SortableContainer(({ children, getTableBodyProps }) => {
    return <tbody {...getTableBodyProps()}>{children}</tbody>;
});

const SortableTRow = SortableElement(props => <TableRow {...props} />);

const SmartTable = (props) => {
    const [records, setRecords] = useState(ITEMS);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        toggleRowSelected,
    } = useTable(
        {
            data: records,
            columns: fakeColumns,
        },
        hooks => {
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                    style: {
                        width: '50px',
                    }
                },
                ...columns,
            ])
        },
        useSortBy,
        useRowSelect,
    );


    const moveRow = (dragIndex, hoverIndex, oldRecords, isArrowMove = false) => {
        const dragRecord = records[dragIndex];
        const newRecords = update(records, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragRecord],
            ],
        });
        setRecords(newRecords);

        if (isArrowMove) {
            setTimeout(() => {
                oldRecords.forEach((r) => {
                    newRecords.forEach((n, i) => {
                        if (r.values.id === n.id) {
                            toggleRowSelected(i, r.isSelected);
                        }
                    })
                });
            });
            return;
        }

        oldRecords.forEach((r) => {
            newRecords.forEach((n, i) => {
                if (r.values.id === n.id) {
                    toggleRowSelected(i, r.isSelected);
                }
            })
        });
    };

    const moveRowUp = (moveIndex, oldRows) => {
        const targetIndex = moveIndex - 1;
        moveRow(moveIndex, targetIndex, oldRows, true);
    };
    const moveRowDown = (moveIndex, oldRows) => {
        const targetIndex = moveIndex + 1;
        moveRow(moveIndex, targetIndex, oldRows, true);
    };
    return (
        <div>
            <table className="table table-bordered as-sortable-dragging" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} style={column.style || {}}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? column.isSortedDesc ? (
                                          <i className="fas fa-chevron-down" />
                                        ) : (
                                          <i className="fas fa-chevron-up" />
                                        ) : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <SortableTBody
                    getTableBodyProps={getTableBodyProps}
                    onSortEnd={(e) => moveRow(e.oldIndex, e.newIndex, rows)}
                    axis="y"
                    lockAxis="y"
                    lockToContainerEdges={true}
                    lockOffset={["30%", "50%"]}
                    useDragHandle={true}
                    useWindowAsScrollContainer
                >
                    {rows.map((value, index) => prepareRow(value) || (
                        <SortableTRow
                            moveRowUp={() => moveRowUp(index, rows)}
                            moveRowDown={() => moveRowDown(index, rows)}
                            disableRowUp={index === 0}
                            disableRowDown={index === rows.length - 1}
                            key={`item-${index}`}
                            index={index}
                            values={value.values}
                            cell={value}
                        />
                    ))}
                </SortableTBody>
            </table>
        </div>
    );
};

export default SmartTable;
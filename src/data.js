const ITEMS = [
  {
    fieldName: "first field",
    id: 0,
    format: "first format",
    config: "first config",
    column: 'first column',
    margin: 'first margin',
  },
  {
    fieldName: "second field",
    id: 1,
    format: "second format",
    config: "second config",
    column: 'second column',
    margin: 'second margin'
  },
  {
    fieldName: "third field",
    id: 2,
    format: "third format",
    config: "third config",
    column: 'third column',
    margin: 'third margin'
  },
  {
    fieldName: "forth field",
    id: 3,
    format: "forth format",
    config: "forth config",
    column: 'forth column',
    margin: 'forth margin'
  },
  {
    fieldName: "fifth field",
    id: 4,
    format: "fifth format",
    config: "fifth config",
    column: 'fifth column',
    margin: 'fifth margin'
  },
];

const fakeColumns = [
  {
    Header: 'Actions',
    accessor: 'action',
    sortType: 'basic',
    style: {
      width: '100px',
    }
  },
  {
    Header: 'No',
    accessor: 'id',
    sortType: 'basic',
    style: {
      width: '100px',
    }
  },

  {
    Header: 'Field Name',
    accessor: 'fieldName',
    sortType: 'basic'
  },
  {
    Header: 'Format',
    accessor: 'format',
    sortType: 'basic'
  },
  {
    Header: 'Config',
    accessor: 'config',
    sortType: 'basic'
  },
  {
    Header: 'Column',
    accessor: 'column',
    sortType: 'basic'
  },
  {
    Header: 'Margin',
    accessor: 'margin',
    sortType: 'basic'
  },
];

export { ITEMS, fakeColumns }
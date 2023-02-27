import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First name", width: 150 },
  { field: "lastName", headerName: "Last name", width: 150 },
  {
    field: "age",
    headerName: "Age",
    sortable: false,
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone Number",
    sortable: false,
    width: 170,
  },
  {
    field: "fullName",
    headerName: "Full name",
    width: 200,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },{
    field:"action",
    headerName: "Delete",
    sortable:false,
  }
];


const StudentsTable = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    async function getPeople() {
      try {
        let { data } = await axios.get("https://dummyjson.com/users");
        setTeachers(data.users);
      } catch (error) {
        console.log(error);
      }
    }
    getPeople();
    
fetch("https://dummyjson.com/users/add", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    firstName: "Muhammad",
    lastName: "Ovi",
    age: 250,
    /* other user data */
  }),
})
  .then((res) => res.json())
  .then(console.log);
  }, []);

  const rows = teachers

   return (
    <div style={{ height: 650, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};

export default StudentsTable;

/**

import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
  import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';

const StudentsTable = () => {

  const [ teachers, setTeachers ] = useState([])

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  
  useEffect(()=>{
    async function getUsers(){
      try {
        let { data } = await axios.get("https://dummyjson.com/users");
        setTeachers(data.users);
      } catch (error) {
        console.log(error)
      }
    }
    getUsers();
  },[])


const data = teachers
  
  // SEARCH SYSTEM
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
          className='bg-sky-500 text-white hover:bg-sky-100'
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  // DELETE              NOT WORKING
const handleDelete = (key) => {
  const newData = teachers.filter((item) => item.key !== key);
  setTeachers(newData);
};
  
  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "20%",
      ...getColumnSearchProps("age"),
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Actions",
      dataIndex: "operation",
      render: (_, record) =>
        teachers.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  return <Table columns={columns} dataSource={data} />;
}

export default StudentsTable


 */

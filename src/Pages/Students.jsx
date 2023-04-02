import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import { Button, Input, Popover, Space, Table, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { toast } from "react-toastify";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [deletedStudent, setDeletedStudent] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  // Get students

  useEffect(() => {
    async function getPeople() {
      try {
        let { data } = await axios.get(
          "https://start21-backend.onrender.com/api/all"
        );
        setStudents(data);
      } catch (error) {
        console.log(error);
      }
    }
    getPeople();
  }, [deletedStudent]);

  // Columns search system
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
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
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
              background:"#0095ff",
              color:"white"
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
          color: filtered ? "#1890ff" : undefined,
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
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // Table Columns
  const columns = [
    // {
    //   title: "N#",
    //   dataIndex: "num",
    //   key: "num",
    //   render:(index, record) => (<p>{record.length}</p>)
    // },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      // ...getColumnSearchProps("course"),
      filters: [
        {
          text: "IELTS",
          value: "IELTS",
        },
        {
          text: "DTM",
          value: "DTM",
        },
        {
          text: "Intensive IELTS",
          value: "Intensive IELTS",
        },
        {
          text: "Kids English",
          value: "Kids English",
        },
        {
          text: "English in Russian",
          value: "English in Russian",
        },
      ],
      // filterSearch: true,
      // filterMode: "tree",
      onFilter: (value, record) => record.course.includes(value),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      ...getColumnSearchProps("date"),
    },
    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   key: "address",
    // },
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (<>
        
        <Popover
      content={<Button onClick={()=>{deleteStudent(record?.id);}} danger>Remove</Button>}
      title="Are you sure?"
      trigger="click"
      onOpenChange={handleOpenChange}
    >
      <Button type="primary" style={{background:"#e41717"}} danger>Remove</Button>
    </Popover>
        </>
      ),
    },
  ];

  // Delete student
  async function deleteStudent(id){
    try {
      await axios.delete(
        `https://start21-backend.onrender.com/api/student/${id}`
      );
      toast("Student Removed!", {type:"info"})
      setDeletedStudent(!deletedStudent);
    } catch (error) {
      console.log(error);
    }
  }
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  
  return (
    <>
    <h1 className="text-3xl font-semibold pl-10">New Registered Students :</h1>
    <div className="min-h-full pt-5">
      <Table columns={columns} dataSource={students} />
    </div>
    </>
  );
};

export default Students;

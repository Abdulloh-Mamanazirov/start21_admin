import React, { useEffect, useRef, useState } from "react";

import { Button, Input, Popover, Space, Table, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { toast } from "react-toastify";
import AddTeacherForm from "../Components/AddTeacherForm";
import axios from "axios";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [deletedTeacher, setDeletedTeacher] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  // Get teachers

  useEffect(() => {
    async function getPeople() {
      try {
        let { data } = await axios.get(
          "https://start21-backend.onrender.com/api/teachers"
        );
        setTeachers(data);
      } catch (error) {
        console.log(error);
      }
    }
    getPeople();
  }, [deletedTeacher]);

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
              background: "#0095ff",
              color: "white",
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
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      render: (record) => {
        let recorded = record?.map((course) => {
          return <p>{course}</p>;
        });
        return (
          <p className="font-bolder">{recorded}</p>
        );
      },
      // ...getColumnSearchProps("course"),
      filters: [
        {
          text: "IELTS (General English)",
          value: "IELTS (General English)",
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
      onFilter: (value, record) => record.course.includes(value),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age * 1 - b.age * 1,
    },
    // {
    //   title: "Date",
    //   dataIndex: "date",
    //   key: "date",
    //   ...getColumnSearchProps("date"),
    // },
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
      render: (_, record) => (
        <>
          <Popover
            content={
              <Button
                onClick={() => {
                  deleteTeacher(record?.id);
                }}
                danger
              >
                Remove
              </Button>
            }
            title="Are you sure?"
            trigger="click"
            onOpenChange={handleOpenChange}
          >
            <Button type="primary" style={{ background: "#e41717" }} danger>
              Remove
            </Button>
          </Popover>
        </>
      ),
    },
  ];

  // Delete teacher *****************************
  async function deleteTeacher(id) {
    try {
      await axios.delete(
        `https://start21-backend.onrender.com/api/teachers/${id}`
      );
      toast("Teacher Removed!", { type: "info" });
      setDeletedTeacher(!deletedTeacher);
    } catch (error) {
      console.log(error);
    }
  }
  const handleOpenChange = (newOpen) => {
    console.log(newOpen);
    setOpen(newOpen);
  };

  return (
    <>
      <div className="pt-5 flex items-center gap-10">
        <h1 className="text-3xl font-semibold pl-10">Teachers : </h1>
        <AddTeacherForm />
      </div>
      <div className="min-h-full pt-5">
        <Table columns={columns} dataSource={teachers} />
      </div>
    </>
  );
};

export default Teachers;

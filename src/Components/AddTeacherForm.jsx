import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import axios from "axios";
import { useState, useRef } from "react";
import { toast } from "react-toastify";

// course options 
const options = [
  {value:"DTM",label:"DTM"},
  {value:"IELTS (General English)",label:"IELTS (General English)"},
  {value:"Intensive IELTS",label:"Intensive IELTS"},
  {value:"English in Russian",label:"English in Russian"},
  {value:"Kids English",label:"Kids English"},
  {value:"Speaking",label:"Speaking"},
  {value:"Reading",label:"Reading"},
  {value:"Listening",label:"Listening"},
];

const AddTeacherForm = () => {
  const [open, setOpen] = useState(false);
  const nameInput = useRef()
  const ageInput = useRef()
  const phoneInput = useRef()
  const levelInput = useRef()
  
  // open Form
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // add teacher ******************************************************
  let data = {
    name:"",
    age:"",
    phone:"",
    course:[],
    levels:[],
  }
  async function handleCourses(value){
    data.course = value
  }
  async function handleAddTeacher() {
    
      data.name = nameInput.current.input.value,
      data.age = ageInput.current.input.value,
      data.phone = phoneInput.current.input.value,
      data.levels = levelInput.current.input.value,
    
    console.log(data);

    try {
      let {data:msg} = await axios.post("https://start21-backend.onrender.com/api/addTeacher", data);
      toast(msg, {type:"success"});
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <>
      <Button type="primary" className="bg-sky-500" onClick={showDrawer} icon={<PlusOutlined className="relative bottom-1"/>}>
        Add Teacher
      </Button>
      <Drawer
        title="Add a new teacher"
        // width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <Form layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please enter name",
              },
            ]}
          >
            <Input ref={nameInput} placeholder="Please enter name" />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input ref={ageInput} type="number" placeholder="Please enter age" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
                message: "Please enter phone number",
              },
            ]}
          >
            <Input
            min={"0"}
              ref={phoneInput}
              type="phone"
              placeholder="Please enter phone number"
            />
          </Form.Item>
          <Form.Item
            name="course"
            label="Course"
            rules={[
              {
                required: true,
                message: "Please select courses",
              },
            ]}
          >
            <Select
              mode="tags"
              style={{
                width: "100%",
              }}
              placeholder="Please select courses"
              onChange={handleCourses}
              options={options}
            />
          </Form.Item>
          <Form.Item
            name="levels"
            label="Levels (seperate with ',')"
            rules={[
              {
                required: true,
                message: "Please enter levels",
              },
            ]}
          >
            <Input
              ref={levelInput}
              type="text"
              placeholder="Please enter levels"
            />
          </Form.Item>
          {/* <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[
                  {
                    required: true,
                    message: "Please choose the dateTime",
                  },
                ]}
              >
                <DatePicker.RangePicker
                  style={{
                    width: "100%",
                  }}
                  getPopupContainer={(trigger) => trigger.parentElement}
                />
              </Form.Item> */}
          <Button type="primary"  className="bg-sky-500" onClick={handleAddTeacher}>
            Submit
          </Button>
        </Form>
      </Drawer>
    </>
  );
};
export default AddTeacherForm;

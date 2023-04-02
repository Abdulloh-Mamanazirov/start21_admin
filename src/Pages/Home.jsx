import React from "react";
import { Button, Card, Col, Row, Statistic } from "antd";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Home = () => {
  const [registeredStudents, setRegisteredStudents] = useState(null);
  const [teachers, setTeachers] = useState(null);

  useEffect(()=>{
    async function getData(){
      let {data:s} = await axios.get("https://start21-backend.onrender.com/api/all")
      setRegisteredStudents(s);
      let {data:t} = await axios.get("https://start21-backend.onrender.com/api/teachers")
      setTeachers(t);
    }
    getData()
  },[])

  return (
    <div className="pt-12 min-h-full">
      {/* <div className="flex">
        <h2 className="text-3xl font-semibold my-3">Staff :</h2>
        <span className="bg-white shadow-lg rounded-xl p-3">
          <h3 className="font-semibold text-xl">Total Teachers:</h3>
          <p className="text-2xl">{teachers?.length}</p>
        </span>
      </div> */}
      <h1 className="text-6xl">Under Construction {":)"}</h1>
    </div>
  );
};

export default Home;

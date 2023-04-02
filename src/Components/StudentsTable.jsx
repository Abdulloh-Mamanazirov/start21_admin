import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const StudentsTable = () => {
  const [registered_students, setStudents] = useState([]);

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
    console.log(registered_students);
    getPeople();
  }, []);


  return (
    <div>
      Hello
    </div>
  );
};

export default StudentsTable;
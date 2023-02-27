import React from 'react'
import Navbar from '../Components/Navbar'
import StudentsTable from '../Components/StudentsTable'

const Students = () => {

  return (
    <div className="min-h-full pt-7">
      <Navbar />
      <section className="container w-11/12 mx-auto">
        <StudentsTable />
      </section>
    </div>
  );
}

export default Students

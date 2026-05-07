import "./App.css";
import NumSum from "./components/NumSum";

import { useState } from "react";
import Form from "./components/Form";
import ScheduleList from "./components/ScheduleList";
import PersonGroup from "./components/PersonGroup";

function App() {

  const people = [
    {name: "John", title: "CEO"},
    {name: "James", title: "COO"},
    {name: "Jamie", title: "CFO"},
    {name: "Jesse", title: "CTO"},
    {name: "Jeeves", title: "Product manager"},
    {name: "Jason", title: "Business Analyst"},
  ];

  const [schedule, setSchedule] = useState([]);


  function addBooking(booking) {
    setSchedule(oldSchedule => [...oldSchedule, booking]);
  }

  return (
    <>
      <NumSum a={5} b={3} />
      <Form onAdd={addBooking} />
      <ScheduleList bookings={schedule} />
      <PersonGroup people={people}/>
    </>
  );
}

export default App;
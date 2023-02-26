import './App.css';
import React, {useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]) 
  useEffect(() => {
    axios
      .get('http://localhost:3001/employees')
      .then(response => {
        setEmployees(response.data)
      })
  }, [])
 
  function Employee(props) {
    return (
    
      <div className='box'>
        <img src={props.employee.image}></img>
      <p>{props.employee.lastName} {props.employee.firstName}</p>
      <p>{props.employee.title} @ {props.employee.department}</p>
      <p>{props.employee.email} </p>
      <p>{props.employee.phone} </p>
      
      
      </div>
      
    )
  }
  const employeeItems = employees.map((employee,index) =>
  <Employee  key={index} employee={employee}/>
);

return (
  <div className="App">
    
    <ul >
      
      {employeeItems}   
      
    </ul>
    
  </div>
);
}

export default App;

import React, { useEffect, useState } from 'react';
import './Project.css';
import axios from 'axios';

function Project() {
  const [result, setResult] = useState('');
  const [inputString, setInputString] = useState('');

  const sendData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/match', {
        headers: {
            'Content-Type': 'text/plain'
        },
        input: inputString,
      });
  
      const responseData = response.data;
  
      if (responseData && Object.keys(responseData).length > 0) {
        setResult(JSON.stringify(responseData.output)); 
      } else {
        setResult('No data available');
      }
    } catch (error) {
      console.log('Error', error);
      setResult('Error fetching data');
    }
  };

  useEffect(() => {
    sendData();
  }, []);

  const handleInputChange = (event) => {
    setInputString(event.target.value);
  }

  return (
    <>
      <div className="box">
        <h3>Finite Automata</h3>
        <input type="text" placeholder="Type Here..." value={inputString} onChange={handleInputChange} />
        <button onClick={sendData}>Submit</button>
        <h2>{result}</h2>
      </div>
    </>
  );
}

export default Project;

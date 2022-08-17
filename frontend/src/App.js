import {useState} from 'react';
import './App.css';

function App() {

  const [name, setName] = useState('');
  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');

  function submitToNotion() {
    fetch("http://localhost:4000/submitToNotion", {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        label: label,
        url: url
      })
    }).then(response => response.json())
    .then(data => {
      console.log("SUCCESS!!! ", data);
    }).catch((err) => {
      console.log("Error! ", err);
    });

  }

  return (
    <div className="App">
      <h1>Ringover Notion Document</h1>
      <div className='form'>
        <label>Name</label>
        <input type="text" id="name" onChange={(e) => setName(e.target.value)} />
      
        <label>Label</label>
        <input type="text" id="label" onChange={(e) => setLabel(e.target.value)} />
      
        <label>Link</label>
        <input type="text" id="url" onChange={(e) => setUrl(e.target.value)} />
      </div>
      <div>
        <button onClick={submitToNotion} >Submit</button>
      </div>
    </div>
  );
}

export default App;

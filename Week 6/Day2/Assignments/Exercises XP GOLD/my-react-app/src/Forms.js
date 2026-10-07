import { useState } from 'react';

function Forms() {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [errormessage, setErrormessage] = useState('');
  const [textarea, setTextarea] = useState('The textarea content goes here');
  const [myCar, setMyCar] = useState('Volvo');

  let header = '';

  if (username && age) {
    header = <h1>Hello {username} {age}</h1>;
  } else if (username) {
    header = <h1>Hello {username}</h1>;
  }

  const myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    if (nam === "age") {
      if (val !== "" && !Number(val)) {
        setErrormessage('Your age must be a number');
      } else {
        setErrormessage('');
      }
      setAge(val);
    }

    if (nam === "username") {
      setUsername(val);
    }
  };

  const mySubmitHandler = (event) => {
    event.preventDefault();
    alert("You are submitting " + username);
  };

  return (
    <>
      {header}
      <form onSubmit={mySubmitHandler}>
        <p>Enter your name:</p>
        <input 
          type="text" 
          name="username" 
          onChange={myChangeHandler} 
        />
        <p>Enter your age:</p>
        <input 
          type="text" 
          name="age" 
          onChange={myChangeHandler} 
        />
        <p style={{color: 'red'}}>{errormessage}</p>

        <input type="submit" value="Submit" />
      </form>

      <br />
      <textarea 
        value={textarea} 
        onChange={(e) => setTextarea(e.target.value)} 
      />
      <br />
      <select value={myCar} onChange={(e) => setMyCar(e.target.value)}>
        <option value="Ford">Ford</option>
        <option value="Volvo">Volvo</option>
        <option value="Fiat">Fiat</option>
      </select>
    </>
  );
}

export default Forms;
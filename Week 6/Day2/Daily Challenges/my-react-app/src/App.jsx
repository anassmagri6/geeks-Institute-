import React, { useState } from 'react';

function App() {
  const [languages, setLanguages] = useState([
    { name: "Php", votes: 0 },
    { name: "Python", votes: 0 },
    { name: "JavaSript", votes: 0 },
    { name: "Java", votes: 0 }
  ]);

  const handleVote = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index].votes += 1;
    setLanguages(updatedLanguages);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>Vote Your Language!</h1>
      {languages.map((lang, index) => (
        <div 
          key={index} 
          style={{
            border: "1px solid #000",
            backgroundColor: "#faebd7",
            padding: "15px 30px",
            margin: "12px auto",
            width: "350px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "22px"
          }}
        >
          <span>{lang.votes}</span>
          <span>{lang.name}</span>
          <button 
            onClick={() => handleVote(index)}
            style={{ 
              color: "#5c8a27", 
              background: "none", 
              border: "none", 
              cursor: "pointer", 
              fontWeight: "bold",
              fontSize: "22px"
            }}
          >
            Click Here
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
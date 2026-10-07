import './Exercise.css';

function Exercise (){
    const styleHeader = {
  color: "white",
  backgroundColor: "DodgerBlue",
  padding: "10px",
  fontFamily: "Arial",
};


return (
<div>
    <h1 style={styleHeader}>Exercise 3 </h1>
    <p className="para">This is exercise 3</p>
    <a href="https://react.dev">React Link</a>

    <form style={{ marginTop: '10px' }}>
    <input type="text" placeholder="Enter text..." />
    <button type="submit">Submit</button>
    </form>
    
    <div style={{ marginTop: '10px' }}>
    <img src="https://via.placeholder.com/100" alt="Placeholder" />
    </div>
    <ul>
        <li>First Item</li>
        <li>Second Item</li>
      </ul>

</div>




)
}
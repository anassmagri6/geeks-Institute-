function Events() {


    const clickMe = () => {
        alert('I was clicked');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            alert(`The Enter key was pressed, your input is: ${e.target.value}`);
        }
    };
    const [isToggleOn, setIsToggleOn] = useState(true);
    
    const handleClick  = (e)=> {
        setIsToggleOn(!isToggleOn);

    }


    return (
        <>
            <button onClick={clickMe}>Click Me</button>

            <input onKeyDown={handleKeyDown} />

         <button onClick={handleClick}>
            {isToggleOn ? "ON" : "OFF"}
        </button>


        </>
    );
}

export default Events;
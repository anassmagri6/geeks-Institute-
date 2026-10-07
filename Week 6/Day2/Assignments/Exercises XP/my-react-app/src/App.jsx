import Car from "./components/Car"; 
import Garage from "./components/Garage"; 

function App() {
    
    const carinfo = {name: "Ford", model: "Mustang"};

    return(
        <div>
            <Car carinfo={carinfo}/>
            <Garage size="small"/>

        </div>

    );
}
export default App;
  
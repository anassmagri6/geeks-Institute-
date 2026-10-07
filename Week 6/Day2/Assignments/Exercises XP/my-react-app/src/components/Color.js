import { useEffect, useState } from 'react';

function Color (){

    useEffect(() => {
    alert('useEffect reached');
  });
  const [favoriteColor,setfavoriteColor ] = useState('red');

  const changeColor = () => {
    setfavoriteColor('blue');

  }

    
    return(
        <div>
            <h1>My favorite color is {favoriteColor}</h1>
              <button onClick={changeColor}>Change Color</button>         
            
                

        </div>
    );
}



export default Color;
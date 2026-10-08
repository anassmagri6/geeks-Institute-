import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorBoundary from "./ErrorBoundary";
import PostList from "./PostList";
import Example1 from "./Example1";
import Example2 from "./Example2";


function HomeScreen (){
   return <h1>Home Screen</h1>;
}
function ProfileScreen (){
  return <h1>Profile Screen</h1>;
}
function ShopScreen  (){
  throw new Error("Something went wrong in ShopScreen");
}

function App() {
 const postData = async () => {
  const url ="https://webhook.site/82684c1b-82cc-47d9-b940-e3b48b21d831";
  
const data = {key1: 'myusername',
email: 'mymail@gmail.com',
name: 'Isaac',
lastname: 'Doe',
age: 27
};

const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    });

  const resData = await response.json();
  console.log(resData);
 };

  return(
    <BrowserRouter>
    <nav className="navbar navbar-expand navbar- mb-4">
    <div className="container-fluid">
    <div className="navbar-nav">

     <NavLink className="nav-link" to="/"  >Home</NavLink>
     <NavLink className="nav-link" to="/profile">Profile</NavLink>
     <NavLink className="nav-link" to="/shop">Shop</NavLink>
    </div>
      </div>
      </nav>
     <div className="container">
    <Routes>
    <Route path="/" element={<ErrorBoundary><HomeScreen /> </ErrorBoundary>} />
    <Route path="/profile" element={<ErrorBoundary> <ProfileScreen/>   </ErrorBoundary>}></Route>
    <Route path="/shop" element={<ErrorBoundary> <ShopScreen />   </ErrorBoundary>}></Route>
    </Routes> 
    </div> 
    <PostList/>
    <Example1/>
    <Example2/>
    <Example3/>
    <button onClick={postData} className="btn btn-primary mt-3">Send Data</button>
    </BrowserRouter>
  );
}
export default App;
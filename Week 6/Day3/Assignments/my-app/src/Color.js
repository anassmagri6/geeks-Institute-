import React, { Component } from 'react';

class Child extends Component{
  componentWillUnmount(){
    alert('The component named Header is about to be unmounted.');
  }

  render() {
    return <h1>Hello World!</h1>;
  }
}


class Color extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favoriteColor: 'red',
        show:true
    };
    
    
  }

  shouldComponentUpdate() {
    return true; 
  }

  changeColor = () => {
    this.setState({ favoriteColor: 'blue' });
  };


componentDidMount() {
    setTimeout(() => {
      this.setState({ favoriteColor: 'yellow' });
    }, 2000);
  }
  componentDidUpdate(){
    console.log("after update");
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("in getSnapshotBeforeUpdate");
    return null;
  }
  deleteHeader=()=>{
    this.setState({ show: false });
  };
  
  

  render() {
    return (
      <div>
        <h1>this my Favorite Color is {this.state.favoriteColor}</h1>
        <button onClick={this.changeColor}>Change Color</button>
        {this.state.show && <Child />}
        <button onClick={this.deleteHeader}>Delete Header</button>
        
      </div>
    );
  }
}

export default Color;
import { Component } from 'react';
import ErrorBoundary from './ErrorBoundary';

class BuggyCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  handleClick = () => {
    this.setState(({ counter }) => ({
      counter: counter + 1
    }));
  };

  render() {
    if (this.state.counter === 5) {
      throw new Error('I crashed!');
    }

    return (
      
      <div>
        <h1 onClick={this.handleClick} style={{ cursor: 'pointer' }}>
        {this.state.counter}</h1>
      </div>
      
    );
  }
}

function App (){
  return (
    <div style={{padding:'20px'}} >
      <h3>Simulation 1: Both counters inside one ErrorBoundary</h3>
      <ErrorBoundary>
        <BuggyCounter />
        <BuggyCounter />
      </ErrorBoundary>
      <hr/>
      <h3>Simulation 2: Each counter inside its own ErrorBoundary</h3>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
      <hr />
    <h3>Simulation 3: Counter without ErrorBoundary</h3>
   <BuggyCounter />
    </div>    
    
  );
}
export default App;

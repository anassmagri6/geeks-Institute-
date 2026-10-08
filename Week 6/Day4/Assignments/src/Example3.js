import React, { Component } from 'react';
import data from './data.json';

class Example3 extends Component {
  render() {
    return (
      <div>
        {data.Experiences.map((exp, index) => (
          <div key={index}>
            <img src={exp.logo} alt={exp.companyName} width="100" />
            <h3>{exp.companyName}</h3>
            {exp.roles.map((role, i) => (
              <div key={i}>
                <h4>{role.title}</h4>
                <p>{role.startDate} - {role.location}</p>
                <p>{role.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Example3;
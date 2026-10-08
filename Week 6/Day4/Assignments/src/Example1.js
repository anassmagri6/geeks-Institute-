import React, { Component } from 'react';
import data from './data.json';

class Example1 extends Component {
  render() {
    return (
      <ul>
        {data.SocialMedias.map((url, index) => (
          <li key={index}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

export default Example1;


import React, { Component } from 'react';
import { render } from 'react-dom';
import { Flipper, Flipped, FlippedText } from './Flipped';
import './style.css';

class App extends Component {
  state = {
    stacked: false
  };

  changeStack = () => {
    this.setState({ stacked: !this.state.stacked });
  };

  render() {
    const { stacked } = this.state;
    return (
      <Flipper value={{ flipKey: stacked }}>
        <div style={{ display: stacked ? 'block' : 'flex' }}>
          <p style={{ height: stacked ? '175px' : '300px' }}>
            <Flipped as="span" className="background" style={{ background: 'red' }} />
            <FlippedText>
              Start editing to see some magic happen :)
            </FlippedText>
          </p>
          <p style={{ height: stacked ? '175px' : '300px' }}>
            <Flipped as="span" className="background" style={{ background: 'blue' }} />
            <FlippedText>
              Start editing to see some magic happen :)
            </FlippedText>
          </p>
        </div>
        <button onClick={this.changeStack}>change</button>
      </Flipper>
    );
  }
}

render(<App />, document.getElementById('root'));

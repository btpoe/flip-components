import { Flipper, Flipped, FlippedText } from '../../src/index.js';

class App extends React.Component {
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

import React from 'react';
import TimelineAdapter from './DefaultTimelineAdapter';

const defaultContext = {
  flipConfig: {
    duration: 300,
    easing: 'cubic-bezier(0.42, 0, 0.58, 1)',
  },
  flipKey: null,
  TimelineAdapter,
};

const { Provider, Consumer } = React.createContext(defaultContext);

export class Flipper extends React.PureComponent {
  render() {
    const { flipKey, withParent, ...value } = this.props;

    return (
      <Consumer>
        {higherValue => (
          <Provider value={{ ...higherValue, ...value, flipKey: withParent ? `${higherValue.flipKey}${flipKey}` : flipKey }} />
        )}
      </Consumer>
    );
  }
}

class FlippedWithRef extends React.PureComponent {
  constructor(props, ...args) {
    super(props, ...args);

    this.ref = React.createRef();
    this.timeline = new props.TimelineAdapter(props.flipConfig);
  }

  getSnapshotBeforeUpdate(nextProps) {
    if (nextProps.flipKey !== this.props.flipKey && this.ref.current) {
      return this.timeline.pause().cacheData(this.ref.current);;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, cacheData) {
    if (prevProps.flipKey !== this.props.flipKey && this.ref.current) {
      this.timeline.animate(this.ref.current, cacheData);
    }
  }

  render() {
    const { children } = this.props;

    if (typeof children === 'function') {
      return children({ ref: this.ref });
    }

    const {
      as: As = 'div',
      style = {},
      flipConfig,
      flipKey,
      TimelineAdapter,
      ...props
    } = this.props;


    return <As {...props} ref={this.ref} style={{ ...style, willChange: 'transform' }} />;
  }
}

export class Flipped extends React.PureComponent {
  render() {
    return (
      <Consumer>
        {context => (
          <FlippedWithRef {...context} {...this.props} />
        )}
      </Consumer>
    );
  }
}

export class FlippedText extends React.PureComponent {
  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        {children.toString().trim().split(/\s+/).reduce((acc, textNode, i) => {
          if (i) {
            acc.push(
              <React.Fragment key={i}>
                {' '}
              </React.Fragment>
            );
          }

          acc.push(
            <Flipped as="span" style={{ display: 'inline-block' }} key={textNode + i}>
              {textNode}
            </Flipped>
          );

          return acc;
        }, [])}
      </React.Fragment>
    );
  }
}
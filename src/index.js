import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import timelineAdapter from './DefaultTimelineAdapter';

const defaultContext = {
  flipKey: null,
  timelineAdapter,
};

const FlipContext = createContext(defaultContext);

export function Flipper({ flipKey, withParent, children, ...value }) {
  const higherValue = useContext(FlipContext);

  return (
    <FlipContext.Provider
      value={{
        ...higherValue,
        ...value,
        flipKey: withParent ? `${higherValue.flipKey}${flipKey}` : flipKey,
      }}
    >
      {children}
    </FlipContext.Provider>
  );
}

export function Flipped({ children, as: As = 'div', style = {}, ...props }) {
  const {
    timelineAdapter: TimelineAdapter,
    flipKey,
    flipConfig = TimelineAdapter.defaultConfig,
  } = useContext(FlipContext);
  const ref = useRef(null);
  const timeline = useMemo(() => new TimelineAdapter(flipConfig), []);
  const prevFlipKey = useRef(flipKey);
  const cacheData = useRef(null);

  if (prevFlipKey.current !== flipKey && ref.current) {
    cacheData.current = timeline.pause().cacheData(ref.current);
  }

  useLayoutEffect(() => {
    timeline.animate(ref.current, cacheData.current);
  }, [cacheData.current]);

  prevFlipKey.current = flipKey;

  if (typeof children === 'function') {
    return children({ ref });
  }

  return (
    <As {...props} ref={ref} style={{ ...style, willChange: 'transform' }}>
      {children}
    </As>
  );
}

export function FlippedText({ children }) {
  return (
    <React.Fragment>
      {children
        .toString()
        .trim()
        .split(/\s+/)
        .reduce((acc, textNode, i) => {
          if (i) {
            acc.push(<React.Fragment key={i}> </React.Fragment>);
          }

          acc.push(
            <Flipped
              as="span"
              style={{ display: 'inline-block' }}
              key={textNode + i}
            >
              {' '}
              {textNode}{' '}
            </Flipped>
          );

          return acc;
        }, [])}
    </React.Fragment>
  );
}

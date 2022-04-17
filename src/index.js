import React from "react";
import TimelineAdapter from "./DefaultTimelineAdapter";

const FlipContext = React.createContext({
  flipConfig: {
    duration: 300,
    easing: "cubic-bezier(0.42, 0, 0.58, 1)",
  },
  flipKey: null,
  TimelineAdapter,
});

export function Flipper({ flipKey, withParent, children, ...value }) {
  const higherValue = React.useContext(FlipContext);
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

export function Flipped({ as: As = "div", style = {}, ...props }) {
  const { TimelineAdapter, flipConfig, flipKey } =
    React.useContext(FlipContext);
  const nodeRef = React.useRef();
  const cacheData = React.useRef();
  const timeline = React.useMemo(
    () => new TimelineAdapter(flipConfig),
    [TimelineAdapter, flipConfig]
  );
  const [mounting, setMounting] = React.useState(true);

  React.useMemo(() => {
    cacheData.current = timeline.pause().cacheData(nodeRef.current);
  }, [flipKey]);

  React.useLayoutEffect(() => {
    timeline.animate(nodeRef.current, cacheData.current);
  }, [flipKey]);

  if (typeof props.children === "function") {
    return props.children({ ref: nodeRef });
  }

  React.useLayoutEffect(() => {
    setMounting(false);
  }, []);

  React.useEffect(() => {
    const clone = nodeRef.current.cloneNode();
    const sibling = nodeRef.current.nextSibling;
    const parent = nodeRef.current.parentNode;

    return () => {
      if (!nodeRef.current) {
        const insert = parent.contains(sibling)
          ? "insertBefore"
          : "appendChild";
        parent[insert](clone, sibling);
        requestAnimationFrame(() => {
          clone.classList.add("is-exit");
        });
        setTimeout(() => {
          parent.removeChild(clone);
        }, 500);
      }
    };
  }, [flipKey]);

  return (
    <As
      {...props}
      className={`${props.className || ""}${mounting ? " is-enter" : ""}`}
      ref={nodeRef}
      style={{ ...style, willChange: "transform" }}
    />
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
              style={{ display: "inline-block" }}
              key={textNode + i}
            >
              {textNode}
            </Flipped>
          );

          return acc;
        }, [])}
    </React.Fragment>
  );
}

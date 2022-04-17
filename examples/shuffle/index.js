import React from "react";
import { createRoot } from "react-dom/client";
import { Flipper, Flipped } from "../../src/index.js";

const baseItems = new Array(16)
  .fill(null)
  .map(() => Math.round(Math.random() * 100))
  .reduce((acc, n) => {
    if (!acc.includes(n)) {
      acc.push(n);
    }
    return acc;
  }, []);

function App() {
  const [change, increment] = React.useState(0);

  const items = React.useMemo(
    () => baseItems.sort(() => Math.random() - 0.5),
    [change]
  );

  const changeStack = () => {
    increment(change + 1);
  };

  return (
    <Flipper flipKey={change}>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: "0",
          listStyle: "none",
        }}
      >
        {items.map((count) => (
          <Flipped
            as="li"
            style={{
              width: "100px",
              height: "100px",
              margin: "0",
              background: `#${(count * 99999999999999999)
                .toString(16)
                .slice(0, 6)}`,
            }}
            key={count}
          >
            <div>item {count}</div>
          </Flipped>
        ))}
        <li></li>
      </ul>
      <button onClick={changeStack}>change</button>
    </Flipper>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);

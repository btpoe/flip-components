import React from "react";
import { createRoot } from "react-dom/client";
import { Flipper, Flipped, FlippedText } from "../../src/index.js";

function App() {
  const [stacked, setStacked] = React.useState(false);

  const changeStack = () => {
    setStacked(!stacked);
  };

  return (
    <Flipper flipKey={stacked}>
      <div style={{ display: stacked ? "block" : "flex" }}>
        <p style={{ height: stacked ? "175px" : "300px" }}>
          <Flipped
            as="span"
            className="background"
            style={{ background: "red" }}
          />
          <FlippedText>Start editing to see some magic happen :)</FlippedText>
        </p>
        <p style={{ height: stacked ? "175px" : "300px" }}>
          <Flipped
            as="span"
            className="background"
            style={{ background: "blue" }}
          />
          <FlippedText>Start editing to see some magic happen :)</FlippedText>
        </p>
      </div>
      <button onClick={changeStack}>change</button>
    </Flipper>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);

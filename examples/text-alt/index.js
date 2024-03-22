import React, { useCallback, useState } from 'react';
import { render } from 'react-dom';
import { Flipper, Flipped, FlippedText } from '../../src/index.js';

function App() {
  const [stacked, setStacked] = useState(false);

  const changeStack = useCallback(() => {
    setStacked((old) => !old);
  }, []);

  return (
    <Flipper flipKey={stacked}>
      <div className={`parent ${stacked && 'alt'}`}>
        <header className="card header">
          <Flipped as="span" className="background" />
        </header>
        <p className="card sidebar">
          <Flipped as="span" className="background" />
          <FlippedText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            luctus, nisi vitae blandit placerat, elit mauris dapibus quam, in
            egestas arcu lectus nec odio. Vestibulum gravida tempus scelerisque.
            Phasellus placerat feugiat pharetra. Fusce a dui metus. Maecenas
            quis neque a nibh gravida sollicitudin ac et ipsum. Pellentesque
            tortor nibh, euismod eu maximus vitae, feugiat in justo. Suspendisse
            dapibus nulla ac egestas mattis. Fusce volutpat volutpat justo quis
            luctus. Integer vitae varius sapien, in lobortis tortor. Sed
            tristique metus non orci luctus viverra. Donec dapibus, ipsum ut
            tristique lobortis, nisl felis feugiat metus, ut faucibus augue odio
            id orci.
          </FlippedText>
        </p>
        <p className="card body">
          <Flipped as="span" className="background" />
          <FlippedText>
            Fusce tellus velit, suscipit a lacus at, volutpat consectetur
            sapien. Nunc sit amet dui ac lectus posuere interdum. Praesent
            pharetra velit eu purus porttitor posuere. Etiam lectus mi,
            consectetur eu elit ac, scelerisque egestas risus. Quisque laoreet
            leo in diam dictum, non egestas nunc scelerisque. Quisque lacinia
            tempor urna ut viverra. Nulla facilisi. Nunc eu urna mattis, finibus
            mi ut, egestas ante. Pellentesque consequat sapien quis eros luctus
            feugiat. Nulla at dapibus orci, nec euismod arcu. Cras viverra lorem
            sit amet tincidunt dictum. Fusce laoreet risus ut risus maximus
            congue. Curabitur at volutpat est. Maecenas nisi sapien, commodo
            rhoncus malesuada eget, congue et dolor. Ut eu lacus non est rutrum
            auctor.
          </FlippedText>
        </p>
        <footer className="card footer">
          <Flipped as="span" className="background" />
        </footer>
      </div>
      <button onClick={changeStack}>change</button>
    </Flipper>
  );
}

render(<App />, document.getElementById('root'));

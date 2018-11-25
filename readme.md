# FLIP Components

## Getting Started

`yarn add flip-components` or `npm install flip-components`

## Usage

```js
import React from 'react';
import { Flipper, Flipped } from 'flip-components';

export default () => {
  <Flipper flipKey={someTest}>
    <Flipped as="span" className="flip-me" />
  </Flipper>
}
```

## Animation Adapters

### Default ([Web Animations](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API))

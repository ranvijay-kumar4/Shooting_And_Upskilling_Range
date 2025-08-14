# USESTATE 
UseState is a React Hook store and update values (like numbers, strings, objects, arrays) that change over time in your component.

# How it works:

- You import useState from React.
- You call useState(initialValue) inside your component.
- It returns an array:
    - The first item is the current state value.
    - The second item is a function to update that value.

# Example
``` javaScript
import React, { useState } from 'react';

function Counter() {
  // Declare a state variable 'count', initialized to 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

#### Reconciliation Algorithm (React Fiber)
This is the process of rerendering. React finds the difference between the DOM and Virtual DOM using a diffing algorithm.

## UI loads on a page by 2 methods:
1. App Load → API Calls → Render data
2. App Load → Render Skeleton → API Calls → Render data


-------

# USE-EFFECT

The `useEffect` hook lets perform side effects in function components, such as fetching data, updating the DOM, or setting up subscriptions.

## How it works:

- Import `useEffect` from React.
- Call `useEffect(callback, dependencies)` inside your component.
    - The `callback` runs after the component renders.
    - The optional `dependencies` array controls when the effect runs.

## Example
```javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]); // Runs the effect when 'count' changes

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

- If you omit the dependencies array, the effect runs after every render.
- If you pass an empty array (`[]`), the effect runs only once after the initial render.
- If you specify dependencies, the effect runs when any dependency changes.
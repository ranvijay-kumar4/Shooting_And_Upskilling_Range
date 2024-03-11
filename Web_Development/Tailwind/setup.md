## How To setup Tailwind CSS

from the following documentation link :

## https://tailwindcss.com/docs/installation

Step 1 : Edit and save Node.js path to environment Variable.

Step 2 : Run the following command in terminal
```
npm install -D tailwindcss
npx tailwindcss init
```

Step 3 : Update tailwind.config.js

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

```

Step 4 : Create src/input.css and include :

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Step 5 : Run the following Command in the terminal
```
npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
```
Step 6 : link src/output.css inside index.html file outside the src folder

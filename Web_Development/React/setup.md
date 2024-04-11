# Run already created react file

Step 1 : Reach to the package.json file using cd >>/

Step 2 : Run the following command
### npm install is optional in nature can be skipped
```
npm install 
npm run dev
```
or 
``` 
npm i 
npm run dev
```
## If want to open in smartphone

Step 1 : First edit the package.json file 

```
script >> dev >>> add "vite --host" at "vite"
```

Step 2 : Run the following code at the place of "npm run dev" in the terminal. 
```
npm run dev -- --host
```

Step 3 : Open the local server on System and Open the Network server in smartphone's browser.






# How To setup React.js with VITE

## with Vite for fast loading in system.

from the following documentation link :
## https://vitejs.dev/guide/   for Vite

Step 1 : Download Node.js from --
## https://nodejs.org/en

Step 2 : Edit and save Node.js path to environment Variable.

Step 3 : Reach to the current folder by using 
```
cd _Folder_Name 
```
###

Step 4 : Run the following command in terminal
```
npm create vite@latest
```

Step 5 :  Type "Y" on terminal to proceed

Step 6 : Enter the Project/Folder Name

Step 7 : Click enter to proceed Package Name

Step 8 : Select any framework.

Step 9 : Select a Variant

Step 10 : Enter into the Project/Folder by "cd ___" command

Step 11 : Run the following command 
```
npm i   or npm install
```

Step 12 : Search the package.json file using "ls" command

Step 13 : Run the following command to launch or skip to the tailwind installation part Step 2 directly.
```
npm run dev
```


<!-- ------------------------------------------------------------------------ -->

### With CRA (Create React App) takes longer time

from the following documentation link :

## https://react.dev/learn   for React

Step 1 : Run the following Command
```
create-react-app Folder_name
```

Step 2 : Reach the Folder by running the following command :
```
cd Folder_Name
```

Step 3 : Search the package.json file using "ls" command

Step 4 : Run the following command :
```
npm i
```
Step 5 : Run the following command :
```
npm run start
```

## Directly it will launch to the preview website

# Installing Tailwind CSS inside the react folder

## Refferred Link
```
https://tailwindcss.com/docs/installation/framework-guides
```

Step 1 : Reach the React forlder by cd command after vite@latest command

Step 2 : Run the following command : D means dependencies inside package.json
NPX generates Tailwind.css file
```
npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p
```

Step 3 : Configure the created Tailwind.css file 
```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
Step 4 : Add the following code in Index.css at the top of file which is present in src folder 
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Step 5 : Now run the react file as usual
```
npm run dev

or

npm run dev -- --host
```
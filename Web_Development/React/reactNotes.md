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
  - Case 1 : If the dependency array will be empty then it gets rendered only once after the UI/Component renders [(()=>{}), []].
  - Case 2 : If there is absence of dependency array then it renders everytime with the UI/Components. 
  - Case 3 : If we pass any variable as a dependency then it renders with the change everytime. 

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

- Case 1 : If you omit the dependencies array, the effect runs after every render.
- Case 2 : If you pass an empty array (`[]`), the effect runs only once after the initial render.
- Case 3 : If you specify dependencies, the effect runs when any dependency changes.

---
# Conditional Rendering / Shimmer UI
  Conditional rendering is a rendering process that renders UI on the basis of specific condition.

  In this method a skeleton is shown before the API shows the fetched data using USE-EFFECT, by targeting the default value of USE-STATE if its value is 0 Then show skeleton or else show UI, increasing the UX of the UI.

  ## Example
  ``` Javascript []
    const [listOfProduct, setListOfProduct] = useState([]);
    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      const data = await fetch("https://fakestoreapi.com/products");
      const resData = await data.json();
      setListOfProduct(resData);
    }
// Method 1 (Not preferred)
    if(listOfProduct.length === 0)
      return <Skeleton/>;

// Method 2 (Preferred)
    return listOfProduct.length === 0 ? <Skeleton/> : (
      // JSX
    )
  ```

  # Implementing Searching Feature in UI


  ``` Javascript []
    const [listOFProduct, setListOfProduct] = useState([]);
    //     We cannot search directly in the fetched result because it get updated and we tend to loose data on every update.
    // Therefore, use use a temporary equal data for the searching feature.
    const [filterProduct, setFilterProduct] = useState([]);
    // Initially the searchText is empty and continuously gets updated on every render.
    const [searchText, setSearchText] = useState("");
    const fetchData = async () => {
      const data = await fetch("https://fakestoreapi.com/products");
      const resData = await data.json();
      setListOfProduct(resData);
// Copy the same data into temp data for searching feature.
      setFilterProduct(resData);
    }
    return listOfProduct.length === 0 ? <Skeleton/> : (
      // JSX
      <div>
        <div>
// Onchange Event checks is there any change happened or not
          <input type = "text" onChange = {(e) => setSearchText(e.target.value)} value = {searchText}/>
          <button onClick = {() => {
            const filteredData = listOfProduct.filter((product) => {
// Converted to lowercase letters and includes continuously finds if there is any part in the string or not.
              return product.title.toLowerCase().includes(searchText.toLowerCase());
            });
            setFilterProduct(filteredData);
          }}>Search</button>
    )
  ```

  ---
  # React Router DOM
  React Router DOM is a library for handling routing in React applications. It enables navigation between different components/pages without reloading the page.

   ## Key Concepts

  - **BrowserRouter**: Wraps your app and enables routing.
  - **Routes**: Defines a set of route definitions.
  - **Route**: Maps a URL path to a React component.
  - **Link**: Used for navigation without reloading the page.
  - **useNavigate**: Hook for programmatic navigation.

  ## Basic Example

  ```javascript []
  import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

  function Home() {
    return <h2>Home Page</h2>;
  }

  function About() {
    return <h2>About Page</h2>;
  }

  function App() {
    return (
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    );
  }
  ```

  ## Notes

  - Use `<Link>` instead of `<a>` for navigation to avoid full page reloads.
  - The `element` prop in `<Route>` specifies which component to render.
  - For dynamic routes, use `:param` in the path (e.g., `/user/:id`).

  ## Programmatic Navigation

  ```javascript
  import { useNavigate } from "react-router-dom";

  function MyComponent() {
    const navigate = useNavigate();
    return (
      <button onClick={() => navigate("/about")}>
        Go to About
      </button>
    );
  }
  ```

  ## Install
    npm i react-router-dom

  The react router DOM is configured in the APP.jsx Component or the main/Root file where every component is called.

    import {createBrowserRouter} from "react-router-dom"
  
  createBrowserRouter is a function can be written inside or outside of the component and list/array [] is passed as argument and inside list path/object is passed.

  On using const due to JS hoisting feature const declared variable cannot be accessed before declaration.

<!-- Routing Definition -->
``` Javascript []
    const appRouter = createBrowserRouter([
      {
        path: "/", // Home page/route
        element:<App/> // Element/Component which to be rendered on given path
      },
      {
        path: "/About",
        element:<About/>
      },
      {
        path: "/Project", 
        element:<Project/>
      }
    ])
```

Previously in the `root.render(<App/>)` App component is passed directly, whereas for using router DOM we have to pass `RouterProvider`, is a component and router is passed as a prop.

    import {createBrowserRouter, RouterProvider} from "react-router-dom"
    
    root.render(<RouterProvider router = {appRouter}/>)

The React Router provides a error handling page by self saying "Unexpected Application Error 404 Not Found".
``` Javascript []
      {
        path: "/",
        element:<App>
        errorElement:<ErrorPage/>
      }
```
We can also pass a custom error page to the Home route to handle error if any page is not found or wrong route is entered.

In the ErrorPage file
``` Javascript []
import {useRouteError} from "react-router-dom";

const ErrorPage = () => {
  // useRouteError() function returns object
    const err = useRouteError();
  return (
    <div>
      <h1> OOPS!!</h1>
      <h2> Something Went Wrong!</h2>
      <h2>{err.status} - {err.statusText}</h2>
      <h3>{err.data}</h3>
    </div>
  );
};
```
### Anchoring in React

Earlier in the HTML we use <a></a> to redirect to next page but it reloads the page completely therefore, but React is a single page application that prevents complete reloading.
Reloading renders all the components which is not required.

In the Navbar Section where anchoring or redirection needed, as well instead of <a></a> we will use <link></link> and instead of `href = ""` we use `to = ""` :
  
    import {Link} from "react-router-dom"

    <li><link to="/about"></link>


### Constant Navbar across Pages 
We need to use children in the home path, and import Outlet from Router DOM.
Children accepts list of objects

``` JavaScript []
import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom"
      
      {
        path: "/",
        element:<App>
        children: [
          {
            path: "/",
            element:<Home/>
          },
          {
            path: "/About",
            element:<About/>
          },
          {
            path: "/Project", 
            element:<Project/>
          }
        ]
        errorElement:<ErrorPage/>
      }
```

and in the App.jsx section
``` Javascript []
  const App = () => {
    return (
      <div>
      <!-- Components that needs to be constant -->
        <Navbar/>
        <!-- Component that get change or redirected in the children section come under Outlet component -->
        <Outlet/>
      </div>
    );
  };
```
## Dynamic Routing
  Dynamic routing allows you to render different components based on dynamic segments in the URL, such as user IDs or product slugs. This is useful for pages like user profiles, product details, or blog posts.

  ### Defining Dynamic Routes

  ``` Javascript []
  {
        path: "/",
        element:<App>
        children: [
          {
            path: "/",
            element:<Home/>
          },
          {
            path: "/About",
            element:<About/>
          },
          {
            path: "/Project", 
            element:<Project/>
          },
          {
            // Dynamic Routing is done by adding : to path for IDs
            path: "/product/:productId", 
            element:<ProductDetails/>
          }
        ]
        errorElement:<ErrorPage/>
      }
  ```
  You can define a dynamic route by using a colon (`:`) followed by a parameter name in the `path` prop:

  ```javascript
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import UserProfile from "./UserProfile";

  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/user/:userId" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    );
  }
  ```

  In the ProductDetails file

  ``` JavaScript []
    import {useState, useEffect} from "react";
    // import Skeleton Page
    // To get product ID
    import {useParams} from "react-router-dom";
    const ProductDetails = () => {
      const [singleProduct, setSingleProduct] = useState(null);

    const {productId} = useParams();

      useEffect(() => {
        fetchData();
      }, []);

      const fetchData = async () => {
        const data = fetch(`https://fakestoreapi.com/products/${productId}`);
        const resData = await data.json();
        setSingleProduct(resData);
      }

      // Method 1
      if(singleProduct === null){
        return <h1>Loading..</h1>
      } 
// First Check then destructure
// Destructuring Product Details
       const {image, title, description, rating, price} = singleProduct;

      // Method 2 
      // return singleProduct === null ? <Skeleton/> :(
      return (
        <div className = "product">
          <img className = "product_img" src={image}/>
          <h1>{title}</h1>
          <p>{rating.rate}</p>
          <p>Price : {price}</p>
          <p>{description}</p>
        </div>
      );
    };
  ```

  In the ProductCard Page:

    in place of return <Product Key = {product.id} product={product}/>

    change to 
    import {Link} from "react-router-dom";
    <Link Key = {product.id} to = {`/product/${product.id}`}><Product  product={product}/></Link>

  ### Accessing Route Parameters

  Inside the component rendered by a dynamic route, use the `useParams` hook to access the route parameters:

  ```javascript
  import { useParams } from "react-router-dom";

  function UserProfile() {
    const { userId } = useParams();
    // Fetch user data using userId or display it
    return <div>User ID: {userId}</div>;
  }
  ```

  ### Example: Product Details Page

  ```javascript
  import { useParams } from "react-router-dom";

  function ProductDetail() {
    const { productId } = useParams();
    // Fetch product details using productId
    return <div>Product ID: {productId}</div>;
  }
  ```

  ```javascript
  <Routes>
    <Route path="/products/:productId" element={<ProductDetail />} />
  </Routes>
  ```

  ### Notes

  - Dynamic segments can be used anywhere in the path (e.g., `/blog/:slug`).
  - You can have multiple dynamic parameters (e.g., `/user/:userId/post/:postId`).
  - Always validate and handle cases where the parameter might be missing or invalid.



# Class Based Components
## What are Class Based Components?

Class based components are one of the two main ways to create components in React (the other being function components). They use ES6 classes and provide access to additional features like lifecycle methods.

## Basic Syntax

```javascript
import React from "react";

class MyComponent extends React.Component {
  render() {
    return <h1>Hello from a class component!</h1>;
  }
}
```

## Key Features

- Must extend `React.Component`.
- Must define a `render()` method that returns JSX.
- Can use state and lifecycle methods.


``` Javascript []
import React from "react";
class ProfileClass extends React.Component{
  constructor(){
    super();
  }

  render(){
    return (
      <div>
      <h1>Heading</h1>
      <h3>Name : XYZ</h3>
      <h3>Address : XYZ</h3>
      <h3>Email : XYZ</h3>
      </div>
    )
  }
}
```
Calling of Components is Same as functional Components

  How To Recieve Props

``` Javascript []
import React from "react";
class ProfileClass extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
      <h1>Heading</h1>
      <h3>Name : {this.props.name}</h3>
      <h3>Address : {this.props.address}</h3>
      <h3>Email : {this.props.email}</h3>
      </div>
    )
  }
}
```

## State in Class Components (useState)

```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}
```

## Lifecycle Methods / Model

Some common lifecycle methods:

- `constructor` – Initialization.
- `componentDidMount` – Runs after the component mounts.
- `componentDidUpdate` – Runs after updates.
- `componentWillUnmount` – Runs before unmounting.

1. First Constructor is called then render then componentDidMount will be called.

```javascript
class Example extends React.Component {
  componentDidMount() {
    // Runs once after the component mounts
  }

  componentWillUnmount() {
    // Cleanup before the component is removed
  }

  render() {
    return <div>Lifecycle Example</div>;
  }
}
```

## When to Use

- When you need lifecycle methods.
- When working with legacy React code.
- For advanced patterns not easily handled by function components (though hooks now cover most use cases).

### Network Call in Class Based Components

``` JavaScript []
  import React from "react";

  class ProfileClass extends React.Component{
    constructor(){
      super();
      this.state = {
        userDetails:null
      }
    }

    async componentDidMount(){
      const data = fetch("https://api.github.com/users/ranvijay-kumar4");
      const resData = await data.json();
      this.setState({
        userDetails:resData
      });
    }
      componentDidUpdate(){

      }
      componentWillUnmount(){

      }

    // Method 1 Without Destructuring
    // render(){
    //   return this.state.userDetails === null ? <h1>Loading ... </h1> : (
    //     <div>
    //       <h3>Name : {this.state.userDetails.name}</h3>
    //       <img src={this.state.userDetails.avatar_url}/>
    //     </div>
    //   )
    // }

    // Method 2 with Destructuring + Early return
    if(this.state.userDetails === null)
        return <h1>Loading ... </h1>;
    const {name, avatar_url} = this.state.userDetails;
    render(){
      return (
        <div>
          <h3>Name : {name}</h3>
          <img src={avatar_url}/>
        </div>
      )
    }
  }

```
### Clean Up in componentWillUnmount
    It is used to end the current process or loop or interval which is continuously getting increased resulting in lagging of browser or stack overflow.

``` Javascript
    async componentDidMount(){
      const data = fetch("https://api.github.com/users/ranvijay-kumar4");
      const resData = await data.json();
      this.setState({
        userDetails:resData
      });

      this.timer = setInterval(() => {
        console.log("Hello");
      }, 1000);
    }
      componentDidUpdate(){

      }
      componentWillUnmount(){
        // It will stop the timer as soon we leave the page 
          clearInterval(this.timer)
      }

      // In functional component clean up done by return
      useEffect(()=>{
        fetchData();
        const timer = setInterval(()=>{
          console("Hello");
        },1000);

        return () =>{
          clearInterval(timer);
        }
      }, []);
```

# Optimization Techniques in React
 
## Single principal Responsibility
Every function should complete only 1 task in production.
### 1. Using Custom Hooks

  In the ProductDetails file
We can see we are doing network call as well as showing it on UI both the task are done in a single file which may can create a chaos in testing or debugging.

  ``` JavaScript []
    import {useState, useEffect} from "react";
    import {useParams} from "react-router-dom";
    const ProductDetails = () => {
      const [singleProduct, setSingleProduct] = useState(null);

    const {productId} = useParams();

      useEffect(() => {
        fetchData();
      }, []);

      const fetchData = async () => {
        const data = fetch(`https://fakestoreapi.com/products/${productId}`);
        const resData = await data.json();
        setSingleProduct(resData);
      }

      if(singleProduct === null){
        return <h1>Loading..</h1>
      } 
// First Check then destructure
// Destructuring Product Details
       const {image, title, description, rating, price} = singleProduct;

      return (
        <div className = "product">
          <img className = "product_img" src={image}/>
          <h1>{title}</h1>
          <p>{rating.rate}</p>
          <p>Price : {price}</p>
          <p>{description}</p>
        </div>
      );
    };
  ```

  Create a hook folder in the SRC folder
  create a useSingleProduct.jsx acts as a normal component.

  in the useSingleProduct file
  ``` JavaScript []
    import {useState, useEffect} from "react";
    // import {useParams} from "react-router-dom";
    const useSingleProduct = (productID) => {
      const [singleProduct, setSingleProduct] = useState(null);

    // const {productId} = useParams();

      useEffect(() => {
        fetchSingleProduct();
      }, []);

      const fetchSingleProduct = async () => {
        const data = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const resData = await data.json();
        setSingleProduct(resData);
      }
        return singleProduct;
    };

    export default useSingleProduct;

  ```
  Whereas in the above file there in only doing network call nothing else other than fetching API nor displaying on UI.

  Now the ProductDetails file will looks like :

``` JavaScript []
    import {useState, useEffect} from "react";
    import {useParams} from "react-router-dom";
    const ProductDetails = () => {
    const {productId} = useParams();
    const singleProduct = useSingleProduct(productId)
    

      if(singleProduct === null){
        return <h1>Loading..</h1>
      } 
// First Check then destructure
// Destructuring Product Details
       const {image, title, description, rating, price} = singleProduct;

      return (
        <div className = "product">
          <img className = "product_img" src={image}/>
          <h1>{title}</h1>
          <p>{rating.rate}</p>
          <p>Price : {price}</p>
          <p>{description}</p>
        </div>
      );
    };
```

### 2. Lazy Loading, Code splitting, Dynamic Import
``` Javascript
import React, {lazy} from "react";

const Grocery = lazy(() => import('./components/Grocery'));

// Path / Children
{
  path:"/grocery",
  element:<Grocery/>
}
``` 
in the above file initially react will show error as grocery is getting fetched to solve this we use suspense

<!-- Check in Network section of Inspect Element -->
### 3. suspense
It creates a new bundle for the Grocery, About Components reducing index7271.js file size making website faster loading

``` Javascript
import React, {suspense, lazy} from "react";

const Grocery = lazy(() => import('./components/Grocery'));

// Path / Children
{
  path:"/grocery",
  element:<Suspense fallback={<h1>Loading ...</h1>}><Grocery/></Suspense>
}
{
  path:"/grocery",
  element:<Suspense fallback={<h1>Loading ...</h1>}><About/></Suspense>
}
``` 

# Tailwind CSS

# Higher Order Component

Higher Order Component is a type of component/function that receives a component as argument and return after modifying/enhancing it.

E.g. - Best Seller tag in E-commerce, Trending tag etc

in The Product.jsx file;
``` JavaScript []
const Product = ({product}) => {
  const {image, title, price, rating} = product;
  return (
    <div>
      <img src={image}/>
      <h1>{title}</h1>
      <p>{rating.rate}</p>
      <p>Price : {price}</p>
    </div>
  );
};

export default Product;

// Method 1
const NewCompo = () => {
  return (
  <div>
  
  </div>)
}
const HOF = (Product) => {
  return NewCompo;
}

// Method 2
export const HOF = (Product) => {
  return (props) => {
      return (
        <div>
          <span>Best Seller</span>
          <Product ...props/>
          // ... is a spread operator
        </div>)
    );
  };
};

// in the ProductCard page call HOF;
import Product, {HOF} fro "./Product";

const HOFComponent = HOF(Product);

// in ProductCard earlier we are passing
<Link Key = {product.id} to = {`/product/${product.id}`}>
<Product  product={product}/>
</Link> 
// will change it as :

<Link Key = {product.id} to = {`/product/${product.id}`}>
{
  product.rating.rate >= 4 ? <HOFComponent product={product}/> : <Product  product={product}/>
}

</Link>
```

# Lifting State Up
It is a method of lifting of state from one component to its parent component so that parent can control all of its child components.

### Filter option in Website or Accordian

Accordian is a + sign means Open list which on click converts to - sign means close list

Create an Accordian.js file 

``` Javascript []
import React from 'react'

const Accordian = () => {
  return (
    <div>
      <h1>Gender</h1>
    </div>
  );
};

export default Accordian
```

Create an Accordian.js file 

``` Javascript []
import React, {useState} from 'react';
import ListItems from "./ListItems";

const Accordian = ({title, open, setOpen}) => {
  // Due to Lift State Up this state is moved to parent component (Men)
  // const [open, setOpen] = useState(false);
  const showItemList = () => {
    setOpen();
  };
  return (
    <div>
      <div>
        <h1>{title}</h1>
        <button onclick={showItemList}>Show</button>
      </div>
      {
        open && <ListItems/>
      }
    </div>
  );
};

export default Accordian

// Create a Men.js File

const Men = () => {
  const [open, setOpen] = useState(0);
  // O -> will open the first one
  // null -> will close all by default
  return (
    <div>
      <h1>Men Page</h1>
      {
        ["Brand", "Gender", "Kids"].map((title, index) => <Accordian key="index" title={title} open={index === open ? true : false}
        setOpen = {() => setOpen(index)}
        />)
      }

      


      // Below Component call is coverted to loop above
      // <Accordian title="Brand"/>
      // <Accordian title="Gender"/>
      // <Accordian title="Kids"/>
    </div>
  );
};


// Create ListItem.js File

create ListItems = () => {
  return (
    <ul>
      <li>Women</li>
      <li>Boy</li>
      <li>Girl</li>
      <li>Kids</li> 
    </ul>
  );
};
export default ListItems
```
<!-- UI Layer - Color, HTML
Data Layer -  React Developer Tool Extension On Chrome 

Redux -> Components {shows hirarchy of Files}
-->

## Props Drilling

Props drilling is the process of passing data from a parent component to deeply nested child components through multiple layers of intermediate components. This can make the code harder to maintain, as intermediate components need to accept and forward props they don't actually use.

### Example

```javascript
function Grandparent() {
  const message = "Hello from Grandparent!";
  return <Parent message={message} />;
}

function Parent({ message }) {
  return <Child message={message} />;
}

function Child({ message }) {
  return <div>{message}</div>;
}
```

In this example, the `message` prop is passed from `Grandparent` to `Parent` to `Child`, even though only `Child` uses it.

### Problems with Props Drilling

- Makes components tightly coupled.
- Harder to refactor and maintain.
- Intermediate components become cluttered with unused props.
- Props only moves to downward direction, can't be accessed to upward components.

### Solutions

- **Context API**: Allows sharing data without passing props through every level.
- **State management libraries**: (e.g., Redux, Zustand) for global state.

#### Using Context API Example

```javascript
import React, { createContext, useContext } from "react";

const MessageContext = createContext();

function Grandparent() {
  return (
    <MessageContext.Provider value="Hello from Grandparent!">
      <Parent />
    </MessageContext.Provider>
  );
}

function Parent() {
  return <Child />;
}

function Child() {
  const message = useContext(MessageContext);
  return <div>{message}</div>;
}

// Using useContext Hook for global access of any components

// Create a userContext file or any file which want to accessed globally in the Utils folder
// Object having key value pair

import {createContext} from "react";
const UserContext = createContext({
  name : 'Neha',
  email : 'neha2003@gmail.com'
})

export default UserContext;

// to Use the file in functional based component :
// in the file where data needed
import React, {useContext} from 'react';
import UserContext from '../utils/UserContext'
// in the component
const user = useContext(UserContext)

// use anywhere needed in the component -> {user}

// to use the file in class based component : 
import UserContext from '../utils/UserContext';

// Write below where needed
<UserContext.Consumer>
{(data)=>{
  <h1> Name : {data.name}</h1>
}};

// To update the UserContext Data from any component

in the component

return (
  <UserContext.Provider value={{name : "Ranvijay", email: "0201It221083@gmail.com"}}>
    <div>
      <Navbar />
      <Outlet />
    </div>
  </UserContext.Provider>
)
```

# Redux Toolkit
<!-- A State Management library -->
<!-- Add to Cart Button -->

Whenever Add To Cart button is clicked it sends a dispatch an action to the reducer function which further changes the values in the Store. After that store sends a selector to update the UI from where action was dispatched.

Reducer keeps slices in store
<!-- Install Redux DevTools in chrome extension helps in debugging-->
<!-- Redux is a external Library not a part of React -->
  npm install @redux.js/toolkit
  npm install react-redux

<!-- Create a Store folder in Src -->
<!-- Store -> store.js -->
``` Javascript []
// store.js
  import {configureStore} from "@reduxjs/toolkit"
  import cartReducer from "./cartSlice";

  const appStore = configureStore({
    reducer:{
      cart: cartReducer
      // user : userReducer
      // payment : paymentReducer

    }
  });

  export default appStore;


  // cartSlice.js
  import {createSlice} from "@reduxjs/toolkit"
  const cartSlice = createSlice({
    name : 'cart'
    initialState:{
      cartItems : []
    },
    reducers : {
      addItems : (state, action) =>{
        // To get CartItems we use State
        state.cartItems.push(action.payload)
        // whenever action is dispatched comes in action's payload
      },
      removeItems : (state, action) =>{
        state.cartItems.pop();
      },
      clearItems : (state, action) =>{
        state.cartItems.length = 0;
      }
    }
  });
  export const {addItems, removeItems, clearItems} = cartSlice.actions;

  export default cartSlice.reducer;
// createSlice returns action and reducer


// In the App.js we have to wrap up to use Redux

import {Provider} from "react-redux";
import appStore from "./store/store";

return (
  <Provider store={appStore}>
    <UserContext.Provider value={{name : "Ranvijay", email: "0201It221083@gmail.com"}}>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </UserContext.Provider>
  </Provider>
)


// In the Navbar.js where Cart button is present and need to be updated

const cartItems = useSelector((store)=> store.cart.cartItems);

// File where Add To card Button is present
import {addItems} from "../store/cartSlice";
import {useDispatch} from "react-redux";

const dispatch = useDispatch();

<button onClick ={handleCartItem}>Add To Cart</button>

const handleCartItem = () => {
  dispatch(addItems(singleProduct));
}

// In Cart.js

import React;
import {useSelector};
import {clearItems};
import {useDispatch}

const Cart = () => {
  cost cartItems = useSelector((store) => store.cart.cartItems)
  const dispatch = useDispatch();
  const clearCartItemHandler = () => {
    dispatch(clearItems());
  }
  return (
    <div>
      <h1> Cart - ({cartItems.length})</h1>
      <button onClick=>{clearCartItemHandler}>Clear Cart</button>
      {cartItems.map((item) => (
        <img src-{item.image}/>
        <h1>{item.title}</h1>
        <p>{item.rating.rate} ratings</p>
        <p>Price : {item.price}</p>
        <p>{item.description}</p>
      ))}
    </div>
  )
}
```
<!-- First : we configure store in which there will be various slices like cartItem, user slice, cart slice  -->

<!-- We cannot directly modify the store for that we first dispatch an action then action will call reducer function and that will update the store slices -->

# Hooks
- useState, useEffect, useRef, useMemo

## useMemo
`useMemo` is a React Hook that memoizes the result of a calculation, recomputing it only when its dependencies change. This helps optimize performance by avoiding unnecessary recalculations on every render.

Without useMemo the components gets re rendered again and again which increases website loading speed.

### Syntax

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

- The first argument is a function that returns the computed value.
- The second argument is an array of dependencies; the function runs again only if any dependency changes.

### Example

```javascript
import React, { useState, useMemo } from "react";

function ExpensiveComponent({ items }) {
  const [filter, setFilter] = useState("");

  // Only recalculates when 'items' or 'filter' changes
  const filteredItems = useMemo(() => {
    return items.filter(item => item.includes(filter));
  }, [items, filter]);

  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      <ul>
        {filteredItems.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
```

### When to Use

- When you have expensive calculations in your render logic.
- When you want to avoid recalculating derived data unless dependencies change.

**Note:** Only use `useMemo` for performance optimization when necessary; premature use can add complexity.

## useRef
`useRef` is a React Hook that returns a mutable ref object whose `.current` property persists across renders. It’s commonly used to access DOM elements directly or to keep a mutable value that doesn’t trigger re-renders.

### Syntax

```javascript
const myRef = useRef(initialValue);
```

### Common Uses

- **Accessing DOM elements:**  
  Attach the ref to a JSX element to access it directly.

  ```javascript
  import React, { useRef } from "react";

  function InputFocus() {
    const inputRef = useRef(null);

    const focusInput = () => {
      inputRef.current.focus();
    };

    return (
      <div>
        <input ref={inputRef} type="text" />
        <button onClick={focusInput}>Focus Input</button>
      </div>
    );
  }
  ```

- **Storing mutable values:**  
  Store values that should persist but not cause re-renders when changed.

  ```javascript
  const countRef = useRef(0);
  countRef.current += 1; // Updates value without causing a re-render
  ```

### Notes

- Changing `.current` does **not** cause a component to re-render.
- Useful for timers, intervals, or keeping previous values.
- Prefer `useRef` over state when you don’t need to trigger a re-render.

# Form Handling
``` JavaScript []
// Component -> Login.js
import React, {useState} from "react";
const Login = () => {
  const [formData, setFormData] = useState({
    emai:"",
    password:""
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
      setFormData({...formData, [name]:value});
  }

// const emailHandler = (e) => {
  //     setEmail(e.target.value);
  // }
  const submitHandler = (e) => {
    e.preventDefault();
  }
  // providing name is importan in input field for handling
  return (
    <div>
        <form onSubmit = {submitHandler}>
          <input value = {formData.email} onChange={changeHandler} type="email" name="email" placeholder = "Email"/>
          <input value = {formData.password} onChange={changeHandler} type="password" name="password" placeholder = "Password"/>
        </form>
    </div>
  )
}
```

# Form Validation using ZOD
  npm i zod

``` JavaScript []
// Component -> Login.js
import React, {useState} from "react";
import {z} from "zod";

const loginschema = z.object({
  email:z.string().email('Invalid email address'),
  password:z.string().min(6, "Pass Must be at least 6 char")
})
const Login = () => {
  const [formData, setFormData] = useState({
    emai:"",
    password:""
  });
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});


  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
      setFormData({...formData, [name]:value});
  }

// const emailHandler = (e) => {
  //     setEmail(e.target.value);
  // }
  const submitHandler = (e) => {
    e.preventDefault();
    const result = loginSchema.safeParse(formData);
    if(!result.success){
      const errorField = result.error.formErrors.fieldErrors;

      setError(errorField);
      return;
    }

    // API call iske baadki jaati hai login waali
  }
  // providing name is important in input field for handling
  return (
    <div>
        <form onSubmit = {submitHandler}>
          <input value = {formData.email} onChange={changeHandler} type="email" name="email" placeholder = "Email"/>
          <span>{error && error.email}</span>
          <input value = {formData.password} onChange={changeHandler} type="password" name="password" placeholder = "Password"/>
          <span>{error && error.password}</span>

        </form>
    </div>
  )
}
```


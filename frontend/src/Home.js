import React from 'react'

function Home() {
  return (
    <div>This is the Home Page!</div>
  )
}

export default Home;


/*

React functional Components: const vs. function

const MyComponent = () => {}   vs.   function MyComponent() {}

If you like to write your components on the bottom of the file 
and declare them on the top, we can write them with the function syntax. 
This will hoist the components to the top of the file, and your linter 
will not throw an error.

*/


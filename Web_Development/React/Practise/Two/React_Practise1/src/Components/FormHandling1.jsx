import React, { useRef} from 'react'

// By Using USEREF : Is method me input ko select kr lete hai and unki value tb extract krte hai jb submit click hota hai. Usually pass null in useRef
function FormHandling1() {
    const name = useRef(null);
    const age = useRef(null);

// event is details, event can be written as detail or any other name

// prevent default used to stop reloading on form submission.

const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name.current.value, age.current.value);
    // Reset the fields after form submission
    name.current.value = '';
    age.current.value = '';
  
}

  return (
    <>
    <form action="" onSubmit={handleSubmit}>
        <input ref={name} placeholder='name' type="text" name="name" id="" />
        <input ref={age} placeholder='age' type="text" name="age" id="" />
        <input type="submit" value="Submit" />
    </form>
      
    </>
  )
}

export default FormHandling1

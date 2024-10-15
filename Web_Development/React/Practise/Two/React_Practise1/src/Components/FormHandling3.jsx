import React from 'react'



import { useForm } from 'react-hook-form'
// https://react-hook-form.com/get-started
// This is mostly used for Form Handling purpose
// In this first install npm and import useForm hook
function FormHandling3() {
    const { register, handleSubmit, errors } = useForm()

  return (
    <>
      <form action="" onSubmit={handleSubmit(data => console.log(data))}>
        <input {...register('name')} type="text" placeholder='Name' />
        <input {...register('email')} type="text" placeholder='Email' />
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

export default FormHandling3

import React from 'react'

import {useForm} from 'react-hook-form'
function Form({handleSubmitData}) {

    const {register, handleSubmit, reset} = useForm();
const handleFormSubmit = (data) => {
    handleSubmitData(data);
    reset();
}

  return (
    <>
      <div className="mt-10 flex justify-center">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex gap-10">
            <input {...register('name')} className='rounded-md px-2 py-1 font-semibold outline-none text-base' type="text" placeholder='Name' name="" id="" />
            <input {...register('email')} className='rounded-md px-2 py-1 font-semibold outline-none text-base' type="text" placeholder='Email' name="" id="" />
            <input {...register('image')} className='rounded-md px-2 py-1 font-semibold outline-none text-base' type="text" placeholder='Image Link' name="" id="" />
            <input className='rounded-md px-5 py-1 bg-blue-500 text-white font-semibold' type="submit" value="Submit" />
        </form>
      </div>
    </>
  )
}

export default Form

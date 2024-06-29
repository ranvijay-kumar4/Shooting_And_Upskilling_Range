import React from 'react'

function Pass_prop(user) {
    return (
        <div>
            <h1 className='m-10'>My Name is {user.his_name}, her name was {user.her_name} and {user.statement}</h1>
        </div>
    )
}

export default Pass_prop

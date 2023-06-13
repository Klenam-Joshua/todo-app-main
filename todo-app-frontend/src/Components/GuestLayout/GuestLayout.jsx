import React from 'react'
import "./GuestLayout.css"


function GuestLayout(props) {
    return (
        <div className='layout_container'>
            {props.children}
        </div>
    )
}

export default GuestLayout

import React from 'react'
import empty from '../assets/empty.svg'

const NoPosts = ({text}) => {
  return (
    <div className='no-posts-component'>
        <div className='post-image-container'>
            <object type="image/svg+xml" data={empty}>
                Error to load svg
            </object>
            <p>{text}</p>
        </div>
    </div>
  )
}

export default NoPosts
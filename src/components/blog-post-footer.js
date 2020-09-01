import React from 'react'
import dustin from '../images/dustin.png'

function BlogFooter() {
  return (
    <div style={{display: 'flex'}}>
      <div
        style={{
          paddingRight: 20,
        }}
      >
        <img
          src={dustin}
          alt="Dustin Davis"
          style={{
            maxWidth: 80,
            borderRadius: '50%',
          }}
        />
      </div>
      <p>
        <strong>Dustin Davis</strong>
        {`
          is a software engineer, people manager, hacker, and
          entreprenuer. He loves to develop systems and automation. 
          He lives with his wife and five kids in Utah.
        `}
      </p>
    </div>
  )
}

export default BlogFooter

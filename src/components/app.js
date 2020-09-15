import React from 'react'

function App({name, icon, href}) {
  return (
    <div
      css={{
        width: 120,
        height: 160,
        float: 'left',
        textAlign: 'center',
        padding: 10,
        marginBottom: 10,
        border: 0,
        ':hover': {
          border: 0,
          borderRadius: 10,
          boxShadow: '0 0 20px 10px #1c9a2c',
        },
      }}
    >
      <a href={href} target="_app">
        <img
          src={icon}
          alt={name}
          css={{
            maxHeight: 100,
            maxWidth: 100,
            marginBottom: 5,
          }}
        />
        <p
          css={{
            fontSize: 14,
            color: 'black',
            fontWeight: 'bold',
          }}
        >
          {name}
        </p>
      </a>
    </div>
  )
}

export default App

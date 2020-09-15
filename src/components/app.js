import React from 'react'

function App({name, icon, href}) {
  return (
    <div
      css={{
        width: 120,
        height: 150,
        float: 'left',
        textAlign: 'center',
        paddingTop: 10,
        marginBottom: 10,
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

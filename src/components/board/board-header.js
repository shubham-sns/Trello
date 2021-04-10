import {Header} from 'semantic-ui-react'

function BoardHeader({title}) {
  return (
    <div className="board__header">
      <Header
        as="h2"
        style={{
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '5rem',
        }}
      >
        {title}
      </Header>
    </div>
  )
}

export {BoardHeader}

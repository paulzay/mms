import React from 'react'

function Search({ query, onChange, onKeyUp }: { query: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void }) {
  return (
    <div>
      <input className='border rounded p-2' type="text" placeholder='Search' value={query} onChange={onChange} onKeyUp={onKeyUp} />
    </div>
  )
}

export default Search
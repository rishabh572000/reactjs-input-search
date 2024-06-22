import React from 'react'

function Suggestion({ searchData, dataKey, customLoading, loading, handleApiCall, NoDataFound, inputValue }) {


  return (
    <div className='suggestionBox'>
      {loading ? customLoading : searchData?.length === 0 && NoDataFound}
      {searchData?.map((val, ind) => {
        let word = val?.[dataKey]?.split(inputValue)

        return <li key={ind} className='suggestionItem' onClick={() => handleApiCall(val?.[dataKey])}>
          <span>{word[0]}<span style={{color:'blue'}}>{inputValue}</span>{word[1]}</span>
        </li>
      })}
    </div>
  )
}

export default Suggestion
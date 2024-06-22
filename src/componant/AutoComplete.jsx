import React, { useEffect, useRef } from 'react'
import useDebounce from '../hooks/useDebounce';
import Suggestion from './Suggestion';

function AutoComplete({ placeholder, fetchSuggestion, dataKey, searchData, customLoading, onSelect, loading, onFocus, customStyle, suggestionShow, setSuggestionShow, NoDataFound, setSearchData, setLoading }) {
  const showSuggestionRef = useRef()
 
  const { value, handleChange, setValue } = useDebounce((debouncedValue) => {
    fetchSuggestion(debouncedValue);
  }, 500);

  const handleApiCall = (listName) =>{
    // fetchSuggestion(listName)
    setValue(listName)
    setSuggestionShow(false)
  }

  const handleClickOutside = (e) => {
    if (showSuggestionRef.current && !showSuggestionRef.current.contains(e.target)) {
      setSuggestionShow(false)
    }
  };

  const handleInputChange = (e) =>{
    if(!e.target.value){
      setSearchData([])
    }
    setLoading(true)
    handleChange(e.target.value)
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className='inputBox'>
      <h1>Auto Complete search</h1>
      <span ref={showSuggestionRef}>
      <input
        className='inputStyle'
        placeholder={placeholder}
        value={value}
        style={customStyle}
        onChange={(e)=>handleInputChange(e)}
        type='search'
        onSelect={onSelect}
        // onBlur={onBlur}
        onFocus={onFocus}
      />

      {(value?.length>0 && suggestionShow) && <ul>
        <Suggestion customLoading={customLoading} loading={loading} searchData={searchData} dataKey={dataKey} handleApiCall={handleApiCall} inputValue={value} NoDataFound={NoDataFound} />
      </ul>}
      </span>
    </div>
  )
}

export default AutoComplete
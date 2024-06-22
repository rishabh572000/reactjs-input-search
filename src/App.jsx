import React, { useState } from 'react'
import './App.css'
import AutoComplete from './componant/AutoComplete'

const apiUrl = 'https://freetestapi.com/api/v1/countries'

function App({}) {
  const [searchData, setSearchData] = useState([])
  const [suggestionShow, setSuggestionShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const inputFunction = async (inputValue) => {
    try {
      const response = await fetch(`${apiUrl}?search=${inputValue}`);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  }

  const fetchSuggestion = async (inputValue) => {
    setLoading(true)

    try {
      const result = await inputFunction(inputValue)
      setSearchData(result)
    }
    catch {
      (err) => {
        console.log(err)
      }
    }
    finally {
      setLoading(false)

    }
  }




  return (
    <>
      <AutoComplete
        placeholder='Search employee'
        searchData={searchData}
        fetchSuggestion={fetchSuggestion}
        dataKey='name'
        customLoading='Loading...'
        NoDataFound='No Data Found'
        onSelect={(e) => console.log('select')}
        onBlur={(e) => setSuggestionShow(false)}
        onFocus={(e) => setSuggestionShow(true)}
        customStyle={{}}
        suggestionShow={suggestionShow}
        setSuggestionShow={setSuggestionShow}
        loading={loading}
        setLoading={setLoading}
        setSearchData={setSearchData}
      />
    </>
  )
}

export default App

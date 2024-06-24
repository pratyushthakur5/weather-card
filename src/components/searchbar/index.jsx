import React, { useEffect, useMemo, useState } from 'react'
import { getSearchListData } from '@/actions/api'
import { debounce } from '@/utils/index'
import { NO_OF_SEARCH_ITEMS, WAIT_TIME } from '@/constants/global'
import SearchBarImg from '@/assets/search.png'
import './index.scss'
const Searchbar = (props) => {
  const { setLatLong, setLoading, setError } = props || {}
  const [inputValue, setInputValue] = useState('')
  const [dropdownData, setDropdownData] = useState([])
  const [isDropdownActive, setIsDropdownActive] = useState(false)

  const handleInputChange = (e) => {
    const valueToBeSearched = e.target.value
    setInputValue(valueToBeSearched)
    if (valueToBeSearched) {
      debouncedFetch(valueToBeSearched)
    } else {
      setIsDropdownActive(false)
      setError(true)
    }
  }

  const handleSearch = (valueToBeSearched) => {
    setLoading(true)
    getSearchListData(valueToBeSearched, NO_OF_SEARCH_ITEMS)
      .then((res) => {
        setLoading(false)
        setError(false)
        setIsDropdownActive(true)
        setDropdownData(res)
        if (res?.length === 0 || res?.cod === '400') {
          setError(true)
        }
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        setError(true)
      })
  }

  const debouncedFetch = useMemo(() => debounce(handleSearch, WAIT_TIME), [])

  const onDropdownClick = (e) => {
    const item = e.target.dataset
    const lat = item.lat
    const lon = item.lon
    setInputValue(e.target.innerText)
    setIsDropdownActive(false)
    setLatLong([lat, lon])
  }

  useEffect(() => {
    /**
     * Used for closing dropdown on outside click
     */
    const elem = document.querySelector('.search-bar-container')
    document.addEventListener('click', (e) => {
      if (!elem.contains(e.target)) {
        setIsDropdownActive(false)
      }
    })
  }, [isDropdownActive])

  return (
    <div className='search-bar-container'>
      <div className='sbc__input'>
        <input className='sbc__text' value={inputValue} onChange={handleInputChange} placeholder='Search city' />
        <img
          className='sbc__icon'
          src={SearchBarImg.src}
          width='20'
          height='20'
          onClick={() => handleSearch(inputValue)}
        ></img>
      </div>

      <div id='x'>
        {isDropdownActive && dropdownData?.length ? (
          <div className='sbc__dropdown' onClick={onDropdownClick}>
            {dropdownData.map((item) => {
              return (
                <div
                  className='sbc__dd__item'
                  data-lat={item.lat}
                  data-lon={item.lon}
                  key={`${item.name}-${item.lat}-${item.lon}`}
                >
                  {`${item.name},${item.state ? item.state + ',' : ''}${item.country}`}
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Searchbar

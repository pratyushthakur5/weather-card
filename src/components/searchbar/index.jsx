import React, { useState } from 'react'
import { getSearchListData } from '@/actions/api'
import { NO_OF_SEARCH_ITEMS } from '@/constants/global'
import SearchBarImg from '@/assets/search.png'
import './index.scss'
const Searchbar = (props) => {
  const { setLatLong, setLoading, setError } = props || {}
  const [inputValue, setInputValue] = useState('')
  const [dropdownData, setDropdownData] = useState([])
  const [isDropdownActive, setIsDropdownActive] = useState(false)

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSearch = () => {
    setLoading(true)
    getSearchListData(inputValue, NO_OF_SEARCH_ITEMS)
      .then((res) => {
        console.log(res)
        setLoading(false)
        setIsDropdownActive(true)
        setDropdownData(res)
        if (res?.length === 0) {
          setError(true)
        }
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        setError(true)
      })
  }

  const onDropdownClick = (e) => {
    const item = e.target.dataset
    const lat = item.lat
    const lon = item.lon
    setInputValue(e.target.innerText)
    setIsDropdownActive(false)
    setLatLong([lat, lon])
  }

  return (
    <div className='search-bar-container'>
      <div className='sbc__input'>
        <input className='sbc__text' value={inputValue} onChange={handleInputChange} />
        <img className='sbc__icon' src={SearchBarImg.src} width='20' height='20' onClick={handleSearch}></img>
      </div>

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
  )
}

export default Searchbar

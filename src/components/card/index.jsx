'use client'
import React, { useEffect, useState } from 'react'
import Searchbar from '@/components/searchbar'
import './index.scss'
import { getCityWeather } from '@/actions/api'

const WeatherCard = () => {
  const [latLong, setLatLong] = useState([null, null])
  const [cityData, setCityData] = useState()
  const [tempUnit, setTempUnit] = useState('C')

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    //Whenever latlong changes due to me clicking dropdown, gotta search the weather for that city.
    const lat = latLong[0]
    const lon = latLong[1]

    if (lat && lon) {
      setLoading(true)
      getCityWeather(lat, lon)
        .then((res) => {
          console.log(res)
          setCityData(res)
          setLoading(false)
          setError(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
          setError(true)
        })
    }
  }, latLong)

  const convertToFahren = (temp) => {
    return Math.round(parseFloat(temp) * 1.8 + 32)
  }
  const onTemperatureToggle = () => {
    setTempUnit((curr) => {
      return curr === 'C' ? 'F' : 'C'
    })
  }

  const renderCardData = (data) => {
    const { name } = data || {}
    const { main, description, icon } = data.weather[0] || []
    const { temp } = data.main || {}

    const TEMP = {
      C: temp,
      F: convertToFahren(temp),
    }
    return (
      <div className='wcc__info'>
        <img height='100' width='100' src={`https://openweathermap.org/img/wn/${icon}@2x.png`}></img>
        <div className='wcc__name'>{name}</div>

        <div className='wcc__tempCont'>
          <div className='wcc__temp'>
            {TEMP[tempUnit]}&deg;{tempUnit}
          </div>
          <div class={`switch ${tempUnit === 'C' ? 'toggle' : 'toggle-on'}`} onClick={onTemperatureToggle}>
            <span></span>
            <span>{tempUnit === 'C' ? 'C' : 'F'}</span>
          </div>
        </div>
        <div className='wcc__desc'>
          {main}, {description}
        </div>
      </div>
    )
  }

  return (
    <div className='weather-card-container'>
      {loading && <div id='cover-spin'></div>}
      <Searchbar setLatLong={setLatLong} setLoading={setLoading} setCityData={setCityData} setError={setError} />
      {error ? <div className='wcc__no-data'>No data found</div> : cityData ? renderCardData(cityData) : null}
    </div>
  )
}

export default WeatherCard

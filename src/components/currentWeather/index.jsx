import React from 'react'
import WeatherCard from '@/components/card/index'
import './index.scss'

const CurrentWeather = () => {
  return (
    <div className='current-weather-container'>
      <WeatherCard></WeatherCard>
    </div>
  )
}

export default CurrentWeather

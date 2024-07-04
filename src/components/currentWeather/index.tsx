import React, { FC } from 'react'
import WeatherCard from '@/components/card/index'
import './index.scss'

const CurrentWeather: FC = () => {
  return (
    <div className='current-weather-container'>
      <WeatherCard></WeatherCard>
    </div>
  )
}

export default CurrentWeather

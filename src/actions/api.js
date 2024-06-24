import { fetchDataWithCache } from '@/utils'
import { API_KEY, CURRENT_WEATHER_API_URL, GEOCODING_API_URL } from '../constants/envConfig'

export const getSearchListData = async (query, limit = 5) => {
  try {
    const url = GEOCODING_API_URL + `?q=${query}&limit=${limit}&appid=${API_KEY}`
    const data = await fetchDataWithCache(url, { key: query, ttl: 86400 })
    return data
  } catch (error) {
    throw error
  }
}

export const getCityWeather = async (lat, lon, units = 'metric') => {
  try {
    const url = CURRENT_WEATHER_API_URL + `?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
    const data = await fetchDataWithCache(url, { key: lat + '-' + lon, ttl: 86400 })

    return data
  } catch (error) {
    throw error
  }
}

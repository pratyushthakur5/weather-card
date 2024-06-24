import { API_KEY, CURRENT_WEATHER_API_URL, GEOCODING_API_URL } from '../constants/envConfig'

export const getSearchListData = async (query, limit = 5) => {
  try {
    const resp = await fetch(GEOCODING_API_URL + `?q=${query}&limit=${limit}&appid=${API_KEY}`)
    if (!resp.ok) {
      throw new Error('Error in API')
    }
    const data = await resp.json()
    return data
  } catch (error) {
    throw error
  }
}

export const getCityWeather = async (lat, lon, units = 'metric') => {
  try {
    const resp = await fetch(CURRENT_WEATHER_API_URL + `?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`)
    if (!resp.ok) {
      throw new Error('Error in API')
    }
    const data = await resp.json()
    return data
  } catch (error) {
    throw error
  }
}

import { fetchDataWithCache } from '@/utils'
import { API_KEY, CURRENT_WEATHER_API_URL, GEOCODING_API_URL } from '../constants/env-config'

export const getSearchListData = async (query: string, limit: number = 5): Promise<any> => {
  try {
    const url: string = GEOCODING_API_URL + `?q=${query}&limit=${limit}&appid=${API_KEY}`
    const data: any = await fetchDataWithCache(url, { key: query, ttl: 86400 })
    return data
  } catch (error) {
    throw error
  }
}

export const getCityWeather = async (lat: number, lon: number, units: string = 'metric'): Promise<any> => {
  try {
    const url: string = CURRENT_WEATHER_API_URL + `?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
    const data: any = await fetchDataWithCache(url, { key: lat + '-' + lon, ttl: 86400 })

    return data
  } catch (error) {
    throw error
  }
}

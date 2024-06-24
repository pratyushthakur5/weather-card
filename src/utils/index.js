export const debounce = (cb, delay = 1000) => {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    const context = this
    timeout = setTimeout(() => {
      cb.apply(context, args)
    }, delay)
  }
}

export function timestampGenerator(ttl) {
  if (typeof ttl === 'number' && !Number.isNaN(ttl)) {
    return Date.now() + ttl * 1000
  }
}

function setLocalStorageItemWithExpiry(key, value, ttl = null) {
  try {
    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: value,
      expiry: timestampGenerator(ttl),
    }
    localStorage.setItem(key, JSON.stringify(item))
  } catch (error) {
    throw error
  }
}

function getLocalStorageItemWithExpiry(key) {
  try {
    const itemStr = localStorage.getItem(key)
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key)
      return null
    }
    return item.value
  } catch (error) {
    throw error
  }
}

export const fetchDataWithCache = async (url, cache) => {
  const { key, ttl } = cache || {}
  //Here I want that API response get cached till midnight
  //Want to keep it consistent with 7/135 behaviour of entity caching.
  //Will use localStorage
  try {
    const cachedResponse = getLocalStorageItemWithExpiry(key)
    if (cachedResponse) {
      return cachedResponse
    }
    const resp = await fetch(url)
    const data = await resp.json()
    setLocalStorageItemWithExpiry(key, data, ttl)
    return data
  } catch (error) {
    throw error
  }
}

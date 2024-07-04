export const debounce = (cb: Function, delay: number = 1000): Function => {
  let timeout: NodeJS.Timeout
  return function (...args: any[]): void {
    clearTimeout(timeout)
    const context = this
    timeout = setTimeout(() => {
      cb.apply(context, args)
    }, delay)
  }
}

export function timestampGenerator(ttl: number): number | undefined {
  if (typeof ttl === 'number' && !Number.isNaN(ttl)) {
    return Date.now() + ttl * 1000
  }
}

function setLocalStorageItemWithExpiry(key: string, value: any, ttl: number | null = null): void {
  try {
    const item = {
      value: value,
      expiry: timestampGenerator(ttl),
    }
    localStorage.setItem(key, JSON.stringify(item))
  } catch (error) {
    throw error
  }
}

function getLocalStorageItemWithExpiry(key: string): any {
  try {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) {
      return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key)
      return null
    }
    return item.value
  } catch (error) {
    throw error
  }
}

export const fetchDataWithCache = async (url: string, cache?: { key: string; ttl: number }): Promise<any> => {
  const { key, ttl } = cache || {}
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

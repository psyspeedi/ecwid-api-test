export function useRequestUrl(route: string, params = {}): string {
  const STORE_ID = <string>'58958138'
  const API_KEY = <string>'public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD'

  const queryParams = <string>(
    new URLSearchParams({ ...params, token: API_KEY }).toString()
  )

  return <string>(
    `https://app.ecwid.com/api/v3/${STORE_ID}/${route}?${queryParams}`
  )
}


// we use this environment variable here so if there wasn't a production url we will use local url

export const API_URL = process.env.NEXT_PUPLIC_API_URL ||"http://localhost:1337"

export const PER_PAGE = 1



export const NEXT_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'



// we use this environment variable here so if there wasn't a production url we will use local url

export const API_URL = process.env.NEXT_PUPLIC_API_URL ||"http://localhost:1337"

export const PER_PAGE = 1
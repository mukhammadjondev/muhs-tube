import axios from "axios"

const BASE_URL = 'https://youtube-v31.p.rapidapi.com'

const options = {
  params: {
    maxResults: '50',
  },
  headers: {
    'X-RapidAPI-Key': '0e0b5a220fmsh98d316fd74d9049p10e515jsna6b8b61151c0',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
}

export const ApiServise = {
  async fetching(url) {
    const response = await axios.get(`${BASE_URL}/${url}`, options)
    return response.data
  }
}
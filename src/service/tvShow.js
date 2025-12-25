const axios = require('axios');

exports.fetchShowFromApi = async () => {
  try {
    const response = await axios.get('https://api.tvmaze.com/shows')
    return response.data
  } catch (error) {
    throw error
  }
}
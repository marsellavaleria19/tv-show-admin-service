const axios = require('axios');

exports.fetchShowFromApi = async () => {
  try {
    const response = await axios.get(`${process.env.PUBLIC_API_URL}`)
    return response.data
  } catch (error) {
    throw error
  }
}
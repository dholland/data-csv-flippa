const axios = require('axios')

const baseUrl = 'https://api.flippa.com/v3/listings/?page[size]=250&filter[property_type]=established_website'

const getAllListings = async (status, page) => {
  const query = `${baseUrl}&filter[status]=${status}&page[number]=${page}`
  const response = await axios.get(query)
  const next = response.data.links.next
  const data = response.data.data
  const totalResults = response.data.meta.total_results

  let pages = Math.ceil(Number(totalResults) / 250)

  console.log(`On Page ${page} of ${pages} total pages`)

  if (next !== null) {
    return data.concat(await getAllListings(status, page + 1))
  } else {
    return data
  }
}

module.exports = getAllListings
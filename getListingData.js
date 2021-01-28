const axios = require('axios')

const baseUrl = 'https://api.flippa.com/v3/listings/?page[size]=250&filter[property_type]=established_website'

const getAllListings = async (status, page) => {
  //build Query
  const query = `${baseUrl}&filter[status]=${status}&page[number]=${page}`

  //await response from get request
  const response = await axios.get(query)

  //set variables from response 
  //Next is the url for the next page of results
  const next = response.data.links.next

  //the jucy data we want to keep
  const data = response.data.data

  //Total number of results for caclulating number of pages / requests
  const totalResults = response.data.meta.total_results

  let pages = Math.ceil(Number(totalResults) / 250)

  console.log(`On Page ${page} of ${pages} total pages`)

  //if the next page is not empty then send another request 
  // return data and concat the returned data from the next request
  if (next !== null) {
    return data.concat(await getAllListings(status, page + 1))
  } else {
    //when no more pages return final payload of data
    return data
  }
}

module.exports = getAllListings
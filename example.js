const fetchAllTheRepos = (userName, repoCount) => {
  const MAX_PER_PAGE = 250;
  const baseUrl = 'https://api.github.com/users/' + userName +
    '/repos?per_page=' + MAX_PER_PAGE;

  //Start fetching every page of repos.
  const fetchPromises = [], pageCount = Math.ceil(repoCount /
    MAX_PER_PAGE);
  for (let pageI = 1; pageI <= pageCount; ++pageI) {
    const fetchPagePromise = fetch(baseUrl + '&page=' + pageI);
    fetchPromises.push(fetchPagePromise);
  }

  //This promise resolves after all the fetching is done.
  return Promise.all(fetchPromises)
    .then((responses) => {
      //Parse all the responses to JSON.
      return Promise.all(responses.map((response) => response.json()));
    }).then((results) => {
      //Copy the results into one big array that has all the friggin repos.
      let repos = [];
      results.forEach((result) => {
        repos = repos.concat(result);
      });
      return repos;
    });
};
jim gaffin
talk or toast platform


//I left out the code to get the repo count, but that's pretty easy.
fetchAllTheRepos('erikh2000', 7).then((repos) => {
  console.log(repos.length);
});

//https://api.flippa.com/v3/listings/?page[size]=250&filter[status]=open&filter[property_type]=established_website&//page[number]=2

import axios from 'axios'

const baseUrl = 'https://api.flippa.com/v3/listings/?page[size]=250&filter[property_type]=established_website'

const getAllListings = async (status, page) => {
  const query = `${baseUrl}/&filter[status]=${status}&page[number]=${page}`
  const response = await axios.get(query)
  const data = response.data

  if (data.links.next !== null) {
    return data.concat(await getAllListings(status, page + 1))
  } else {
    return data
  }
}


const getAllListings = () => {
  axios.get('https://api.flippa.com/v3/listings/?page[size]=250&filter[status]=open&filter[property_type]=established_website')
    .then(res => {
      console.log(res.data)
      fs.writeFileSync('./data/listings.json', JSON.stringify(res.data), (err) => {
        if (err) throw err;
        console.log('Listing Page 1 Saved');
      })
    })
}


export function fetchAction(params) {
  return {
    type: FETCH_ACTION,
    promise: (axios) => {
      function fetch(page, responses) {
        return new Promise((resolve) => {
          axios.get("foo/bar", { params: { ...params, page: page } }).then(response => {
            responses.push(response);
            const { data: { paging: { nextPage, lastPage } } } = response;
            if (response.data.paging && nextPage <= lastPage) {
              const pages = _.range(nextPage, lastPage); // lodash range as example to simplify
              axios.all(pages.map(m => fetch(m, responses)).then(() => resolve());
            } else {
              resolve();
            }
          });
        });
      }

      let responses = [];
      return fetch(params.page, responses).then(() => {
        return [...responses.map(response => response.data.results)];
      });
    }
  };
}
// setup the config for the API
// in a full stack application -- save your api keys in a dot env file - read it up!
const APIKey = "b9e6e82534f7a6837c4b623a65a6e281"

const imgApi = "https://image.tmdb.org/t/p/w1280"
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&query=`
// implement the logic of various functionalities

//connect the input forms and its child fields from html to js
const form = document.getElementById('search-form')

// for the user query
const query = document.getElementById("search-input")

// html element where results needs to be embedded

const result = document.getElementById('result')

// control variables
let page = 1
let isSearching = false

// implement logic of various functionalities

// fetch the initial data from the API on page load
async function fetchData(url) {
    try {
        const response = await  fetch(url)
        if(!response.ok) {
            throw new Error('oops something went wrong')
        }
        return await response.json()
    } catch (err) {
        return (null)
    }
}

// show the data after fetching it
async function fetchAndShowResult(url) {
    const data = await fetchData(url)
    if(data && data.results) {
        showResults(data.results)
    }
}

// dynamic content generation using JS code
function createMovieCard(movie) {
    // extract the different objects from teh data returned by the API
    // for this you need to know what is the metadata of the return set from the API
    // new concepts - object destructuring in JS
    // syntax of obj property exactly the same as provided by the API
    const { poster_path, original_title, release_date, overview } = movie

    const imagePath = poster_path ? imgApi : "./img-01.jpeg"
}
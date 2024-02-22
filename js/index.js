// setup the config for the API
// in a full stack application -- save your api keys in a dot env file - read it up!
const APIKey = "b9e6e82534f7a6837c4b623a65a6e281";

const imgApi = "https://image.tmdb.org/t/p/w1280";
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&query=`;
// implement the logic of various functionalities

//connect the input forms and its child fields from html to js
const form = document.getElementById("search-form");

// for the user query
const query = document.getElementById("search-input");

// html element where results needs to be embedded

const result = document.getElementById("result");

// control variables
let page = 1;
let isSearching = false;

// implement logic of various functionalities

// fetch the initial data from the API on page load
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("oops something went wrong");
    }
    return await response.json();
  } catch (err) {
    return null; /* create your own error handling logic */
  }
}

// show the data after fetching it
async function fetchAndShowResult(url) {
  const data = await fetchData(url);
  if (data && data.results) {
    showResults(data.results);
  }
}

// dynamic content generation using JS code
function createMovieCard(movie) {
  // extract the different objects from teh data returned by the API
  // for this you need to know what is the metadata of the return set from the API
  // new concepts - object destructuring in JS
  // syntax of obj property exactly the same as provided by the API
  const { poster_path, original_title, release_date, overview } = movie;

  const imagePath = poster_path ? imgApi : "./img-01.jpeg";

  const truncatedTitle =
    original_title.length > 15
      ? original_title.slice(0, 15) + "..."
      : original_title;

  const formattedDate = release_date || "No release date available...";

  // the creation of the dynamic content in html format
  const cardTemplate = `
        <div class="column">
            <div class="card">
                <a class="card-media" href="./img-01.jpeg"><img src="${imagePath}" alt="${original_title}" width="100%"></a>
                <div class="card-content">
                    <div class="card-header">
                        <div class="left-content">
                            <h3 style="font-weight: 600">${truncatedTitle}</h3>
                            <span style="color: #12efec">${formattedDate}</span>
                        </div>
                        <div class="right-content">
                            <a href="${imagePath}" target="_blank" class="card-btn"> See Cover </a>
                        </div>
                    </div>
                    <div class="info">
                        ${overview || "No overview available"}
                    </div>
                </div>
            </div>
        </div>

    
    `;
  return cardTemplate;
}

// reset the page for showing the output from a new search operations
function clearResults() {
  result.innerHTML = "";
}

// display the dynamic content with the movie results
function showResults(item) {
  const newContent = item.map(createMovieCard).join("");
  result.innerHTML += newContent || "<p> No Results Found. Search Again. </p>";
}

// the load more results functionality
async function loadMoreResults() {
  if (isSearching) {
    return;
  }
  page++;
  const searchTerm = query.value;
  const url = searchTerm
    ? `${searchUrl}${searchTerm}&page=${page}`
    : `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${APIKey}&page=${page}`;

  await fetchAndShowResults(url);
}

//detect end of the page to load more results

function detectEnd() {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 20) {
    loadMoreResults();
  }
}

// functionality to handle the search operations
// input param - event parameter
async function handleSearch(e) {
  const searchTerm = query.value.trim();
  if (searchTerm) {
    isSearching = true;
    clearResults();
    const newUrl = `${searchUrl}${searchTerm}&page=${page}`;
    await fetchAndShowResult(newUrl);
    query.value = "";
  }
}

// create our event listeners
form.addEventListener("submit", handleSearch);
window.addEventListener("scroll", detectEnd);
window.addEventListener("resize", detectEnd);

//main function or the function to initialize and call all other pending functions above
async function init() {
  clearResults();
  const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${APIKey}&page=${page}`;
  isSearching = false;
  await fetchAndShowResult(url);
}

// call the initialization function
init();

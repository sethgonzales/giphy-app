import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

function getGiphy(search) {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${search}&limit=5&offset=0&rating=r&lang=en&bundle=clips_grid_picker`;

  request.addEventListener("loadend", function () {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, search);
    } else {
      printError(this, search);
    }
  });

  request.open("GET", url, true);
  request.send();
}

function getTrending() {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY2}&limit=25&offset=0&rating=g&bundle=clips_grid_picker`;
  request.addEventListener("loadend", function () {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printTrending(response);
    } else {
      printError(this);
    }
  });
  request.open("GET", url, true);
  request.send();
}

// UI Logic
function handleFormSubmission(event) {
  event.preventDefault();
  const search = document.querySelector('#gif').value;
  document.querySelector('#gif').value = null;
  getGiphy(search);
}


function printError(request, search) {
  document.querySelector('#showResponse').innerHTML = `<p>There was an error accessing the gif data for ${search}:  ${request.status} ${request.statusText}</p>`;
}


function printElements(apiResponse, search) {
  document.querySelector('#showResponse').innerHTML = `<h2>${search} gifs: <h2></br>`;
  let apiArray = apiResponse.data;
  for (let i = 0; i < apiArray.length; i++) {
    document.querySelector('#showResponse').innerHTML +=
      `<p><img src="${apiArray[i].images.fixed_width.url}"></p>`;
  }
}

function printTrending(apiResponse) {
  document.querySelector('#showResponse').innerHTML = `<h2>Trending gifs: <h2></br>`;
  let apiArray = apiResponse.data;
  for (let i = 0; i < apiArray.length; i++) {
    document.querySelector('#showResponse').innerHTML +=
      `<img src="${apiArray[i].images.fixed_width.url}">`;
  }

}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
  document.querySelector('#trending').addEventListener("click", getTrending);
});


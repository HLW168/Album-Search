//API
//https://itunes.apple.com/search?term=swift&media=music&entity=album&attribute=artistTerm&limit=5

const searchBox = document.querySelector("#searchBox");
const searchButton = document.querySelector("#search");
const resultsContainer = document.querySelector("#results-cont");

//press button
searchButton.addEventListener("click", searchArtist);

//press enter
document.querySelector("#searchBox").onkeypress = function (e) {
  document.getElementById("box").classList.remove("col-sm-4 col-sm-offset-4");
  document.getElementById("box").classList.add("col-sm-6 col-sm-offset-3");
  if (!e) e = window.event;
  var keyCode = e.code || e.key;
  if (keyCode == "Enter") {
    // Enter pressed
    searchArtist();
    return false;
  }
};

function searchArtist() {
  let searchTerm = document.querySelector(".searchBox").value;
  let req = new XMLHttpRequest();
  req.onload = function () {
    if (req.status >= 200 && req.status < 300) {
      displayAlbums(JSON.parse(req.responseText));
      displayCounter(JSON.parse(req.responseText));
    }
  };
  req.open(
    "GET",
    "https://itunes.apple.com/search?term=" +
      searchTerm +
      "&media=music&entity=album&attribute=artistTerm&limit=200",
    true
  );
  req.send();
}

function displayAlbums(albums) {
  resultsContainer.innerHTML = "";
  console.log(albums);
  let itemsArray = albums.results;
  console.log(itemsArray);
  for (let index in itemsArray) {
    let newElem =
      '<div class="card">' +
      //'<div class="name"><p>' +
      //itemsArray[index].collectionName +
      //'</p>'+
      '<img src="' +
      itemsArray[index].artworkUrl100 +
      '"></div></div>';
    resultsContainer.innerHTML += newElem;
  }
}

function displayCounter(albums) {
  let searchTerm = document.querySelector(".searchBox").value;
  document.querySelector("#counter").innerHTML =
    albums.resultCount + ' results for "' + searchTerm + '"';
}

fetchJsonp("http://localhost:5500")
  .then((res) => res.json())
  .then((json) => console.log(json));

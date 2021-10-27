// RUN json-server --watch db.json
//git add . -> git commit -m -> git push

let filmData = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchFilms();
  findForm();
  //findImage()
});

///Fetch films///
function fetchFilms() {
  fetch("https://ghibliapi.herokuapp.com/films")
    .then((response) => response.json())
    .then((data) => (filmData = data));
}

///Find the form///
function findForm() {
  let form = document.querySelector("#form");
  form.addEventListener("submit", handleSubmit);
}

///Handle event listener///
function handleSubmit(e) {
  e.preventDefault();
  document.querySelector("#container").innerHTML = " ";

  if (e.target.select_films.value) {
    const film = filmData.find((data) => data.title === select_films.value);
    renderFilms(film);
  } else if (e.target.search_box.value) {
    const films = filmData.filter((data) => data.release_date === search_box.value);

    if (films.length === 0) {
      alert("invalid year"); ///////CHANGE TEXT LATER/////////
    } else if (films) {
      films.forEach((film) => renderFilms(film));
    }
  }

  document.querySelector("#form").reset();
}

///Render films by search///
function renderFilms(filmData) {
  const container = document.querySelector("#container");
  container.innerHTML += `
      <li class="film_list">
       <img id="film_poster" src="${filmData.image}">
       <div id="film_info">
       <h2>${filmData.title}</h2>
       <p>Original title in Japanese: ${filmData.original_title} (${filmData.original_title_romanised})</p>
       <p>Director: ${filmData.director}</p>
       <p>Released in ${filmData.release_date}</p>
       <p>${filmData.description}</p>
       <p>See an <span id="film_banner">image</span> from this film</p>
       </div>
       </li>
      `;
      
}

//Find the image text link
function findImage() {
  const imageLink = document.querySelector("#film_banner")
  imageLink.addEventListener('click', popUpImage)
}

//Pop up banner image
function popUpImage() {
  console.log("hello")
}
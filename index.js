// RUN json-server --watch db.json
let filmData = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchFilms();
  findForm();
});

//Fetch films
function fetchFilms() {
  fetch("https://ghibliapi.herokuapp.com/films")
    .then((response) => response.json())
    .then((data) => (filmData = data));
}

//Find the form
function findForm() {
  let form = document.querySelector("#form");
  form.addEventListener("submit", handleSubmit);
}

//
function handleSubmit(e) {
  e.preventDefault();
  //clear film container
  document.querySelector("#container").innerHTML = " ";

  if (e.target.select_films.value) {
    const film = filmData.find((data) => data.title === select_films.value);
    renderFilms(film);

    //filmData.find - find film object by title
    //film.title === select_films.value
    //const film = filmData.find
    //renderFilm(film)
  } else if (e.target.search_box.value) {
    const films = filmData.filter(
      (data) => data.release_date === search_box.value
    );
    films.forEach((film) => renderFilms(film));

    //const films = filter - film.release_date == search_box.value
    //forEach film renderFilm(film)
  }
}

//Render films by search
function renderFilms(filmData) {
  let container = document.querySelector("#container");
  container.innerHTML += `
      <li>
       <img id="film_poster" src="${filmData.image}">
       <div id="film_info">
       <h2>${filmData.title}</h2>
       <p>Original title in Japanese: ${filmData.original_title} (${filmData.original_title_romanised})</p>
       <p>Director: ${filmData.director}</p>
       <p>Released in ${filmData.release_date}</p>
       <p>${filmData.description}</p>
       </div>
       </li>
      `;
}

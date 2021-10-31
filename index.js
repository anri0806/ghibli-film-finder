// RUN json-server --watch db.json
//git add . -> git commit -m -> git push

let fetchedFilmData = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchFilms();
  findForm();
});

///Fetch films///
function fetchFilms() {
  fetch("https://ghibliapi.herokuapp.com/films")
    .then((response) => response.json())
    .then((data) => (fetchedFilmData = data));
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
    const film = fetchedFilmData.find(
      (data) => data.title === select_films.value
    );
    renderFilms(film);
  } else if (e.target.search_box.value) {
    const films = fetchedFilmData.filter(
      (data) => data.release_date === search_box.value
    );

    if (films.length === 0) {
      alert("invalid year");
    } else if (films) {
      films.forEach((filmsData) => renderFilms(filmsData));
    }
  }

  document.querySelector("#form").reset();
}

///Render films by search///
function renderFilms(filmData) {
  const container = document.querySelector("#container");
  container.innerHTML += `
      <div class="film_list">
       <img id="film_poster" src="${filmData.image}">
       <div id="film_info">
       <img class="empty_heart" src="./emptyHeart.png">
       <h2 class="film_title">${filmData.title}</h2>
       <p>Original title in Japanese: ${filmData.original_title} (${filmData.original_title_romanised})</p>
       <p>Director: ${filmData.director}</p>
       <p>Released in ${filmData.release_date}</p>
       <p>${filmData.description}</p>
       <p>See an <span class="span" id="${filmData.id}">image</span> from this film</p>
       </div>
       </div>
      `;


  popUpBanner();
  findLike();
}

///Find image(span) button & Render banner///
function popUpBanner() {
  document.querySelectorAll(".span").forEach((span) => {
    span.addEventListener("click", () => {
      fetchedFilmData.filter((fetchedData) => {
        if (fetchedData.id === span.id) {
          const popUpWindow = document.createElement("div");
          popUpWindow.id = "popup_window";

          popUpWindow.innerHTML += `
              <span id="close">x</span>
              <img id="banner_image" src="${fetchedData.movie_banner}">
              `;

          document.querySelector("#container").appendChild(popUpWindow);
        }
      });

      findCloseBtn();
    });
  });
}

///Find close button///
function findCloseBtn() {
  document.querySelector("#close").addEventListener("click", closeWindow);
}

///Close popup window///
function closeWindow() {
  const popUpWindow = document.querySelector("#popup_window");
  popUpWindow.remove();
}


//CHANGE HEART TO RED///
///Find like button & like film///
function findLike() {
  document.querySelectorAll(".empty_heart").forEach(heart => {
    heart.addEventListener("click", (e) => {
      console.log(e.target.classList)

      if(e.target.classList.contains("empty_heart")) {
        console.log("clicked")

    }
  })
})
}
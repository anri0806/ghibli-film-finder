let fetchedFilmData = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchFilms();
  findForm();
  myFavorite();
});



//////My favorite tab//////
function myFavorite() {
  const tabs = document.querySelectorAll("[data-tab-target]");
  const contents = document.querySelectorAll("[data-tab-content]");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabTarget = document.querySelector(tab.dataset.tabTarget);

      contents.forEach((content) => {
        content.classList.remove("active");
      });

      tabTarget.classList.add("active");
    });
  });
}



//////Search films//////
function fetchFilms() {
  fetch("https://ghibliapi.herokuapp.com/films")
    .then((response) => response.json())
    .then((data) => (fetchedFilmData = data));
}

function findForm() {
  document.querySelector("#form").addEventListener("submit", handleSubmit);
}

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
      alert("Invalid year");
    } else if (films) {
      films.forEach((filmsData) => renderFilms(filmsData));
    }
  }

  document.querySelector("#form").reset();
}



//////Render films//////
function renderFilms(filmData) {
  const container = document.querySelector("#container");
  container.innerHTML += `
      <div class="film_list">
       <img id="film_poster" src="${filmData.image}">
       <div id="film_info">
       <img id="${filmData.title}" class="empty_heart" src="./image/emptyHeart.png">
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



//////Render banner in a pop up window//////
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



//////Close popup window//////
function findCloseBtn() {
  document.querySelector("#close").addEventListener("click", closeWindow);
}

function closeWindow() {
  const popUpWindow = document.querySelector("#popup_window");
  popUpWindow.remove();
}



//////like films//////
function findLike() {
  document.querySelectorAll(".empty_heart").forEach((heart) => {
    heart.addEventListener("click", (e) => {
      if (e.target.classList.contains("empty_heart")) {
        e.target.src = "./image/fullHeart.png";
        e.target.classList.remove("empty_heart");
        e.target.classList.add("full_heart");

        addFilm(heart);
      }
    });
  });
}



//////Add to my favorite//////
function addFilm(heart) {
  fetchedFilmData.filter((data) => {
    if (data.title === heart.id) {
      const li = document.createElement("li");

      li.innerHTML = `
      <img src="${data.image}">
      <button class="remove_button">remove</button>
      `;

      document.querySelector("#favorite_list").appendChild(li);
      alert("Added to My Favorite!");
    }
  });

  removeFilm();
}



//////Remove film from my favorite//////
function removeFilm() {
  document.querySelectorAll(".remove_button").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.target.parentNode.remove();
    });
  });
}

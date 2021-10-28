// RUN json-server --watch db.json
//git add . -> git commit -m -> git push

let filmData = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchFilms();
  findForm();
  //findSpan();
  //findClose();
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
    const films = filmData.filter(
      (data) => data.release_date === search_box.value
    );

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
      <div class="film_list">
       <img id="film_poster" src="${filmData.image}">
       <div id="film_info">
       <h2>${filmData.title}</h2>
       <p>Original title in Japanese: ${filmData.original_title} (${filmData.original_title_romanised})</p>
       <p>Director: ${filmData.director}</p>
       <p>Released in ${filmData.release_date}</p>
       <p>${filmData.description}</p>
       <p>See an <span class="span">image</span> from this film</p>
       </div>
       </div>
      `;

  popUpBanner(filmData);
  // document.querySelector(".span").addEventListener("click", () => {
  //   const popUpWindow = document.createElement("div");
  //   popUpWindow.className = "popup_window";

  //   popUpWindow.innerHTML = `
  //     <span class="close">x</span>
  //     <img class="banner_image" src="${filmData.movie_banner}">
  //     `;

  //   document.querySelector("#container").appendChild(popUpWindow);
  // });
}

//Find span to attach event listener
function popUpBanner(filmData) {
  document.querySelector(".span").addEventListener("click", () => {
    const popUpWindow = document.createElement("div");
    popUpWindow.id = "popup_window";

    popUpWindow.innerHTML = `
      <span id="close">x</span>
      <img id="banner_image" src="${filmData.movie_banner}">
      `;

    document.querySelector("#container").appendChild(popUpWindow);

    findClose()
  });
}

// //Handle findSpan event listener
// function handleBanner() {
//   const imgLink = filmData.filter((data) => data.movie_banner);
//   console.log(imgLink)
//   //renderBanner(imgLink);
// }

// //Render pop up image
// function renderBanner(filmData) {
//   const popUpWindow = document.createElement("div");
//   popUpWindow.className = "popup_window";

//   popUpWindow.innerHTML = `
//   <span class="close">x</span>
//   <img class="banner_image" src="${filmData.movie_banner}">
//   `;

//   document.querySelector("#container").appendChild(popUpWindow);

//   findClose()
// }

//Find close button
function findClose() {
  document.querySelector("#close").addEventListener("click", closeWindow);
}

//Close popup window
function closeWindow() {
  const popUpWindow = document.querySelector("#popup_window")
  popUpWindow.remove();
}

// RUN json-server --watch db.json
document.addEventListener("DOMContentLoaded", () => {
  fetchFilms();
});

//Fetch films
function fetchFilms() {
  fetch("https://ghibliapi.herokuapp.com/films")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((filmData) => {
        //console.log(filmData)
        renderFilms(filmData);
      });
    });
}

// .then((data) => {
//   renderFilms(data);
//   //console.log(data);
// });

//Render films by search
function renderFilms(filmData) {
  let form = document.querySelector("#form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    //console.log("Selected value is:", e.target.select_films.value)
    //console.log("Typed year is:", e.target.search_box.value)

    if (e.target.select_films.value === filmData.title) {
      let container = document.querySelector("#container");
      container.innerHTML = `
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

      //form.reset();

    } else if (e.target.search_box.value === filmData.release_date) {
      let li = document.createElement("li");

      let img = document.createElement("img");
      img.src = filmData.image;
      img.id = "film_poster";

      let filmInfo = document.createElement("div");
      filmInfo.id = "film_info";
      let h2 = document.createElement("h2");
      h2.innerText = filmData.title;
      let p1 = document.createElement("p");
      p1.innerText = `Original title in Japanese: ${filmData.original_title} (${filmData.original_title_romanised})`;
      let p2 = document.createElement("p");
      p2.innerText = `Director: ${filmData.director}`;
      let p3 = document.createElement("p");
      p3.innerText = `Released in ${filmData.release_date}`;
      let p4 = document.createElement("p");
      p4.innerText = `${filmData.description}`;

      filmInfo.append(h2, p1, p2, p3, p4);

      li.append(img, filmInfo);

      container.appendChild(li);

      
      //console.log(container);
      //form.reset();
    }
  });
}

// container.innerHTML = container.innerHTML.replace(
//   container.innerHTML,
// `
//  <li>
//  <img id="film_poster" src="${filmData.image}">
//  <div id="film_info">
//  <h2>${filmData.title}</h2>
//  <p>Original title in Japanese: ${filmData.original_title} (${filmData.original_title_romanised})</p>
//  <p>Director: ${filmData.director}</p>
//  <p>Released in ${filmData.release_date}</p>
//  <p>${filmData.description}</p>
//  </div>
//  </li>
// `
// );

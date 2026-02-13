const APILINK = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=61645069f812eb18ca57978cf56da9bd&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?api_key=61645069f812eb18ca57978cf56da9bd&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK);

function returnMovies(url){
    fetch(url)
    .then(res => res.json())
    .then(data => {
        main.innerHTML = ""; // Vide la section avant d’afficher les films

        // Crée une ligne pour tous les films
        const div_row = document.createElement("div");
        div_row.classList.add("row");

        data.results.forEach(element => {
            const div_column = document.createElement("div");
            div_column.classList.add("column");

            const div_card = document.createElement("div");
            div_card.classList.add("card");

            const image = document.createElement("img");
            image.classList.add("thumbnail");
            image.alt = element.title;

            if (element.poster_path) {
                image.src = IMG_PATH + element.poster_path;
            } else {
                image.src = "placeholder.jpg"; // image de secours
            }

            const title = document.createElement("h3");
            title.textContent = element.title;

            div_card.appendChild(image);
            div_card.appendChild(title);
            div_column.appendChild(div_card);
            div_row.appendChild(div_column);
        });

        main.appendChild(div_row);
    })
    .catch(err => console.error("Erreur fetch:", err));
}

// Formulaire de recherche
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchItem = search.value.trim();
    if (searchItem) {
        returnMovies(SEARCHAPI + searchItem);
        search.value = "";
    }
});


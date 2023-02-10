const elMoviesList = document.querySelector(".movies__list");

// Form start
const elForm = document.querySelector(".movies__form");
const elSearch = elForm.querySelector(".movies__search");
const elSelectCategories = elForm.querySelector(".movies__categories");
const elMinYear = elForm.querySelector(".movies__minyear");
const elMaxYear = elForm.querySelector(".movies__maxyear");
const elSelectSort = elForm.querySelector(".movies__sort");

// Modal start
const elModal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal__title");
const modalIframe = document.querySelector(".modal__iframe");
const modalRating = document.querySelector(".modal__rating");
const modalYear = document.querySelector(".modal__year");
const modalRuntime = document.querySelector(".modal__runtime");
const modalCategoria = document.querySelector(".modal__categoriya");
const modalSummary = document.querySelector(".modal__summary");
const modalLink = document.querySelector(".modal__link");

// Time function 

function getTime(time) {
    
    const hour = Math.floor(time / 60);
    const minut = Math.floor(time % 60);
    
    return `${hour} hrs ${minut} min`;
}

// Render Movies Function

function renderMovies(item){
    
    elMoviesList.innerHTML = ""; 
    
    const elTemplateMovies = document.querySelector(".movies__temp").content;
    const elFragmentMovies = document.createDocumentFragment();
    
    item.forEach(element => {
        
        const elCloneMovies = elTemplateMovies.cloneNode(true);
        
        elCloneMovies.querySelector(".movies__img").src = element.poster_min;
        elCloneMovies.querySelector(".movies__img").alt = element.title;
        elCloneMovies.querySelector(".movies__title").textContent = element.title;
        elCloneMovies.querySelector(".movies__rating").textContent = element.imdb_rating;
        elCloneMovies.querySelector(".movies__year").textContent = element.movie_year;
        elCloneMovies.querySelector(".movies__runtime").textContent = getTime(element.runtime);
        elCloneMovies.querySelector(".movies__categorie").textContent = element.categories.join("  ");
        elCloneMovies.querySelector(".movies__btn").dataset.id = element.imdb_id;
        
        elFragmentMovies.appendChild(elCloneMovies);
    });
    
    elMoviesList.appendChild(elFragmentMovies);
    
}

// Topilgan kinolarni modalga render qilish;

function renderModal(modalMovies){
    
    modalTitle.textContent = modalMovies.title;
    modalIframe.src = modalMovies.ytid;
    modalRating.textContent = modalMovies.imdb_rating;
    modalYear.textContent = modalMovies.movie_year;
    modalRuntime.textContent = getTime(modalMovies.runtime);
    modalCategoria.textContent = modalMovies.categories.join("  ");
    modalSummary.textContent = modalMovies.summary;
    modalLink.href = modalMovies.imdb_id;
}

// Categoriyani DOMga chizish

const newCategoria = [];

function movieCategoria(categ){
    categ.forEach(ganre => {
        ganre.categories.forEach(ganres =>{
            if(!newCategoria.includes(ganres)){
                newCategoria.push(ganres)
            }
        }) 
    })
    
    newCategoria.sort();
    
    const elGanresFragment = document.createDocumentFragment();
    
    newCategoria.forEach(movieganre => {
        
        const elOption = document.createElement("option");
        
        elOption.textContent = movieganre;
        elOption.value = movieganre;
        
        elGanresFragment.appendChild(elOption);
    })
    
    elSelectCategories.appendChild(elGanresFragment)
    
}

movieCategoria(fullMovies);

// Elmovies Sort function 

function moviesSort(movieSort , value) {
    
    if(value == "a-z"){
        
        movieSort.sort((a , b) => {
            
            if(a.title > b.title){
                return 1;
            }else if(a.title < b.title){
                return -1
            }else {
                return 0
            }
            
        });  
    }

    if(value == "z-a"){
        
        movieSort.sort((a , b) => {
            
            if(a.title > b.title){
                return -1;
            }else if(a.title < b.title){
                return 1
            }else {
                return 0
            }
            
        });  
    }

    if(value === "10-1"){
        movieSort.sort((a,b) => b.imdb_rating - a.imdb_rating)
    }

    if(value === "1-10"){
        movieSort.sort((a,b) => a.imdb_rating - b.imdb_rating)
    }

    if(value === "2018-2000") {
        movieSort.sort((a,b) => b.movie_year - a.movie_year)
    }

    if(value === "2000-2018") {
        movieSort.sort((a,b) => a.movie_year - b.movie_year)
    }
    
}


// Event delegation

elMoviesList.addEventListener("click" , evt => {
    
    if(evt.target.matches(".movies__btn")){
        
        const modalBtn = evt.target.dataset.id;
        const findModal = fullMovies.find(element => element.imdb_id === modalBtn);
        
        renderModal(findModal);
    }
});

// Elform start

elForm.addEventListener("submit" , evt => {
    evt.preventDefault();
    
    const searchMovies = elSearch.value.trim();
    const elSelectValue = elSelectCategories.value.trim();
    const elMin = elMinYear.value.trim();
    const elMax = elMaxYear.value.trim();
    const elSort = elSelectSort.value.trim();
    
    const moviesRegex = new RegExp(searchMovies , "gi");
    
    const moviesFilter = fullMovies.filter(movie => (movie.title.match((moviesRegex))) && (elSelectValue === "All" ||        movie.categories.includes(elSelectValue)) && (( elMin == "" || movie.movie_year >= Number(elMin)) && (elMax == "" || 
    movie.movie_year <= elMax)));
    
    // console.log(moviesFilter);
    
    if(moviesFilter.length > 0){
        moviesSort(moviesFilter , elSort)
        renderMovies(moviesFilter);
    }else {
        alert("Not Found 404 !!!!")
    }
    
})



//  Modalni ovozini uchirish

elModal.addEventListener("hide.bs.modal" , ()=> {
    modalIframe.src = "";
})


renderMovies(fullMovies.slice(0 , 12));


// const fullMovies = movies.map(movie => {

//     return {
//         title : movie.Title.toString(),
//         full_title: movie.fulltitle,
//         summary: movie.summary,
//         categories : movie.Categories.split("|"),
//         imdb_id : `https://www.imdb.com/title/${movie.imdb_id}`,
//         iframe_ytid: `https://www.youtube-nocookie.com/embed/${movie.ytid}`,
//         poster_max : `https://i3.ytimg.com/vi/${movie.ytid}/maxresdefault.jpg`,
//         poster_min : `http://i3.ytimg.com/vi/${movie.ytid}/mqdefault.jpg`,
//         movie_year: movie.movie_year,
//         imdb_rating: movie.imdb_rating,
//         runtime: movie.runtime,
//         language: movie.language,
//     }

// })

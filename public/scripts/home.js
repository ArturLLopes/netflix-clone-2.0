// const main = document.querySelector(".main")

// fetchGenresList()

// function fetchGenresList() {
//   const url = genres_list_http + new URLSearchParams({
//     api_key: api_key
//   })

//   fetch(url)
//     .then(res => res.json())
//     .then(data => {
//       data.genres.forEach(item => {
//         fetchMoviesListByGenres(item.id, item.name)
//       });
//     })
//     .catch(err => console.log(err))
// }

// const fetchMoviesListByGenres = (id, genres) => {
//   const url = movie_genres_http + new URLSearchParams({
//     api_key: api_key,
//     with_genres: id,
//     page: Math.floor(Math.random() * 3) + 1
//   })

//   fetch(url)
//     .then(res => res.json())
//     .then(data => {
//       const category = genres.replace("_", " ")
//       makeCategoryElement(category, data.results)
//     })
//     .catch(err => console.log(err))
// }

// const makeCategoryElement = (category, data) => {
//   const categoryHTML = `
//   <div class="movie-list">

//     <button class="pre-btn">
//       <img src="images/prev.png" alt="previous button">
//     </button>

//     <h1 class="movie-category">${category.replace("_", " ")}</h1>
    
//     <div class="movie-container" id="${category}">

//     </div>

//     <button class="next-btn">
//       <img src="images/next.png" alt="next button">
//     </button>

//   </div>
  
//   `
//   main.innerHTML += categoryHTML
//   makeCards(category, data)
// }

// const makeCards = (category, data) => {
//   const movieContainer = document.getElementById(category.replace(" ", "_"));

//   data.forEach((item, index) => {
//     if (!item.backdrop_path) {
//       item.backdrop_path = item.poster_path

//       if (!item.backdrop_path) {
//         return
//       }
//     }

//     const movieHTML = `
//     <div class="movie">
//       <img src="${img_url}${item.backdrop_path}" alt="poster">
//       <p class="movie-title">${item.title}</p>
//     </div>
//     `
//     movieContainer.innerHTML += movieHTML

//     if (index == data.length - 1) {
//       setTimeout(() => {
//         setupScrooling()
//       }, 100)
//     }

//   })
// }



// Seleciona o elemento principal onde as categorias de filmes serão adicionadas
const main = document.querySelector(".main");

// Função principal para buscar a lista de gêneros
(async function fetchGenresList() {
  try {
    // Monta a URL para buscar os gêneros usando o endpoint e a chave da API
    const url = `${genres_list_http}${new URLSearchParams({ api_key })}`;

    // Faz a requisição para obter a lista de gêneros
    const response = await fetch(url);
    const data = await response.json();

    // Para cada gênero recebido, busca a lista de filmes correspondente
    data.genres.forEach(({ id, name }) => fetchMoviesListByGenres(id, name));
  } catch (error) {
    // Exibe um erro caso a requisição falhe
    console.error("Erro ao buscar lista de gêneros:", error);
  }
})();

// Função para buscar a lista de filmes de um gênero específico
const fetchMoviesListByGenres = async (id, genre) => {
  try {
    // Monta a URL para buscar filmes do gênero, incluindo filtros e parâmetros
    const url = `${movie_genres_http}${new URLSearchParams({
      api_key,
      with_genres: id, // ID do gênero
      page: Math.floor(Math.random() * 3) + 1, // Escolhe uma página aleatória (1 a 3)
    })}`;

    // Faz a requisição para obter os filmes
    const response = await fetch(url);
    const data = await response.json();

    // Formata o nome do gênero e cria o elemento da categoria
    const category = genre.replace("_", " ");
    createCategoryElement(category, data.results);
  } catch (error) {
    // Exibe um erro caso a requisição falhe
    console.error(`Erro ao buscar filmes para o gênero ${genre}:`, error);
  }
};

// Função para criar o elemento HTML da categoria
const createCategoryElement = (category, movies) => {
  // Estrutura HTML da categoria, incluindo botões de navegação e container de filmes
  const categoryHTML = `
    <div class="movie-list">
      <button class="pre-btn">
        <img src="images/prev.png" alt="previous button">
      </button>
      <h1 class="movie-category">${category}</h1>
      <div class="movie-container" id="${category.replace(" ", "_")}"></div>
      <button class="next-btn">
        <img src="images/next.png" alt="next button">
      </button>
    </div>
  `;

  // Adiciona o HTML da categoria ao elemento principal
  main.innerHTML += categoryHTML;

  // Preenche o container da categoria com os filmes
  populateMovies(category, movies);
};

// Função para adicionar os filmes no container da categoria
const populateMovies = (category, movies) => {
  // Seleciona o container específico da categoria
  const movieContainer = document.getElementById(category.replace(" ", "_"));

  // Itera sobre os filmes recebidos
  movies.forEach((movie, index) => {
    // Desestrutura os atributos necessários do objeto do filme
    const { backdrop_path, poster_path, title } = movie;

    // Usa o backdrop_path como imagem principal; se não existir, usa o poster_path
    const imagePath = backdrop_path || poster_path;

    // Se nenhum dos dois estiver disponível, pula o filme
    if (!imagePath) return;

    // Cria o HTML do filme
    const movieHTML = `
      <div class="movie">
        <img src="${img_url}${imagePath}" alt="${title}">
        <p class="movie-title">${title}</p>
      </div>
    `;

    // Adiciona o filme ao container da categoria
    movieContainer.innerHTML += movieHTML;

    // Verifica se é o último filme da lista; caso seja, inicializa o scroll
    if (index === movies.length - 1) {
      setTimeout(setupScrolling, 100); // Adiciona um pequeno atraso para garantir que o DOM está pronto
    }
  });
};
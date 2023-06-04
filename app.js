const searchForm = document.getElementById('search-form');
const yearInput = document.getElementById('year-input');
const monthInput = document.getElementById('month-input');
const articlesContainer = document.getElementById('articles-container');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const API = 'https://linden-backend-git-verceldeploy-larimos.vercel.app'
  const year = yearInput.value;
  const month = monthInput.value;

  try {
    // Make a request to the backend API endpoint
    // const response = await axios.get(`${API}/api/articles`);
    const response = await axios.get(`${API}/api/articles?year=${year}&month=${month}`);
    const articles = response.data;

    console.log(articles);

    // Clear the existing articles
    articlesContainer.innerHTML = '';

    // Update the front-end UI to display the fetched articles
    articles.forEach((article) => {
      // Create a thumbnail container
      const thumbnailContainer = document.createElement('div');
      thumbnailContainer.classList.add('thumbnail-container');

      // Create an image element for the thumbnail
      const thumbnailImg = document.createElement('img');
      thumbnailImg.src = article.imageURL;
      thumbnailImg.alt = article.title;
      thumbnailImg.classList.add('thumbnail-image');

      // Create a title element for the article
      const articleTitle = document.createElement('h3');
      articleTitle.textContent = article.title;
      articleTitle.classList.add('article-title');

      // Append the thumbnail and title to the thumbnail container
      thumbnailContainer.appendChild(thumbnailImg);
      thumbnailContainer.appendChild(articleTitle);

      // Add event listener to open the article when thumbnail is clicked
      thumbnailContainer.addEventListener('click', () => {
        openArticle(article.articleId);
      });

      // Append the thumbnail container to the articles container
      articlesContainer.appendChild(thumbnailContainer);
    });
  } catch (error) {
    // Handle any errors that occurred during the API request
    console.error(error);
  }
});

// Function to open an article
function openArticle(articleId) {
  // Make a request to the backend API endpoint to retrieve the article by its ID
  axios.get(`${API}/api/articles/${articleId}`)
    .then((response) => {
      const article = response.data;

      // Display the article content however you want (e.g., in a modal or a separate page)
      console.log(article);
    })
    .catch((error) => {
      // Handle any errors that occurred during the API request
      console.error(error);
    });
}

// Function to save an article to favorites
function saveArticle(articleId) {
  // Make a request to the backend API endpoint to save the article by its ID
  axios.post(`${API}/api/articles/${articleId}/save`)
    .then((response) => {
      console.log(response.data); // Success message from the server
    })
    .catch((error) => {
      // Handle any errors that occurred during the API request
      console.error(error);
    });
}

//create one for delete
 



//FRUIT EXAMPLE
// const fruitDiv = document.getElementById("fruit")

// const fruitBtn = document.getElementById("get-fruit")
//       fruitBtn.addEventListener('click', getRandomFruit)

// const eatBtn = document.getElementById("eat-fruit")
//       eatBtn.addEventListener('click', eatFruit)

// async function getAFruit(random) {
//     const response = await fetch(`http://localhost:3000/fruits/${random}`)
//     return response
// }

// async function getRMStuff() {
//     const response = await fetch('https://rickandmortyapi.com/api/character')
//     return response
// }

// const RMStuff = () => {
//     getRMStuff()
//     .then((response) => {
//         // Error handling and parsing of the response
//         return response.text()
//     })
//     .then((data) => {
//         // Use the handled data
//         console.log(JSON.parse(data).results)
//     })
// }

// console.log('hi')
// RMStuff()

// async function deleteFruit(fruitName) {
//     const response = await fetch(
//         `http://localhost:3000/fruits`,
//         {
//             method: "DELETE",
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 name: fruitName
//             })
//         }
//     )

//     return response
// }

// function getRandomFruit() {
//     const random = Math.floor(Math.random() * 4 + 1)
    
//     getAFruit(random)
//     .then((response) => {
//         const fruitData = response.json()
//         return fruitData
//     })
//     .then((data) => {
//         if(data.name) {
//             fruitDiv.innerText = data.name
//         }
//         else {
//             return 'Some server error'
//         }
//     })
// }

// function eatFruit() {
//     const fruit = fruitDiv.innerText
//     console.log(fruit)
//     deleteFruit(fruit)
//     .then((response) => {
//         const fruitData = response.json()
//         return fruitData
//     })
//     .then((data) => {
//         console.log(data)
//         window.location.reload();
//     })
// }
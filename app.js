const pages = [
  'log-in-page',
  'hello-prompt-page',
  'read-prompt-page',
  'search-year-page',
  'search-month-page',
  'displayed-articles-page',
  'favorites-page'
];

function showPage(pageId) {
  pages.forEach((page) => {
    const container = document.getElementById(page);
    if (page === pageId) {
      container.style.display = 'block';
    } else {
      container.style.display = 'none';
    }
  });
}

const API = 'https://linden-backend-git-verceldeploy-larimos.vercel.app';
const searchForm = document.getElementById('search-form');
const yearInput = document.getElementById('year-input');
const monthInput = document.getElementById('month-input');
const articlesContainer = document.getElementById('articles-container');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const year = yearInput.value;
  const month = monthInput.value;

  try {
    const response = await axios.get(`${API}/api/articles?year=${year}&month=${month}`);
    const articles = response.data;

    // Clear the existing articles
    articlesContainer.innerHTML = '';

    // Loop through the articles and create a card for each one
    articles.forEach((article) => {
      // Create the card element
      const card = document.createElement('article');
      card.classList.add('card');

      // Create the temporary text element
      const temporaryText = document.createElement('div');
      temporaryText.classList.add('temporary_text');
      temporaryText.textContent = `${year} ${month}`;
      card.appendChild(temporaryText);

      // Create the card content element
      const cardContent = document.createElement('div');
      cardContent.classList.add('card_content');
      card.appendChild(cardContent);

      // Create the card title element
      const cardTitle = document.createElement('span');
      cardTitle.classList.add('card_title');
      cardTitle.textContent = article.title;
      cardContent.appendChild(cardTitle);

      // Create the card subtitle element
      const cardSubtitle = document.createElement('span');
      cardSubtitle.classList.add('card_subtitle');

      // Create the anchor tag for the web URL
      const cardSubtitleLink = document.createElement('a');
      cardSubtitleLink.href = article.webURL;
      cardSubtitleLink.target = '_blank';
      cardSubtitleLink.textContent = article.webURL;
      cardSubtitle.appendChild(cardSubtitleLink);

      cardContent.appendChild(cardSubtitle);

      // Create the card description element
      const cardDescription = document.createElement('p');
      cardDescription.classList.add('card_description');
      cardDescription.textContent = article.summary || '';
      cardContent.appendChild(cardDescription);

      // Check if the article has an imageURL
      if (article.imageURL) {
        card.style.backgroundImage = `url(${article.imageURL})`;
      }

      // Append the card to the articles container
      articlesContainer.appendChild(card);
    });
  } catch (error) {
    console.error(error);
  }
});

// Add event listeners to the buttons for switching between pages

const logInButton = document.getElementById('log-in-button');
logInButton.addEventListener('click', () => {
  showPage('log-in-page');
});

const helloPromptButton = document.getElementById('hello-prompt-button');
helloPromptButton.addEventListener('click', () => {
  showPage('hello-prompt-page');
});

const readPromptButton = document.getElementById('read-prompt-button');
readPromptButton.addEventListener('click', () => {
  showPage('read-prompt-page');
});

const searchYearButton = document.getElementById('search-year-button');
searchYearButton.addEventListener('click', () => {
  showPage('search-year-page');
});

const searchMonthButton = document.getElementById('search-month-button');
searchMonthButton.addEventListener('click', () => {
  showPage('search-month-page');
});

const displayedArticlesButton = document.getElementById('displayed-articles-button');
displayedArticlesButton.addEventListener('click', () => {
  showPage('displayed-articles-page');
});

const favoritesButton = document.getElementById('favorites-button');
favoritesButton.addEventListener('click', () => {
  showPage('favorites-page');
});

//FUNCTIONS TO USE ARTICLES
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
      console.error('Cannot open article, please try again', error);
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
      console.error('Cannot save article, please try again', error);
    });
}

// Function to delete an article
function deleteArticle(articleId) {
  // Make a request to the backend API endpoint to delete the article by its ID
  axios.delete(`${API}/api/articles/${articleId}/delete`)
    .then((response) => {
      console.log(response.data); // Success message from the server
    })
    .catch((error) => {
      // Handle any errors that occurred during the API request
      console.error('Cannot delete article, please try again', error);
    });
}

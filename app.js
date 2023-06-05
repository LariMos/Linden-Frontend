document.addEventListener('DOMContentLoaded', () => {
  const logInPage = document.getElementById('log-in-page');
  const helloPromptPage = document.getElementById('hello-prompt-page');
  const searchPage = document.getElementById('search-page');
  const articlesContainer = document.getElementById('articles-container');

  const displayedArticlesPage = document.getElementById('displayed-articles-page');
  const favoritesPage = document.getElementById('favorites-page');
  const API = 'https://linden-backend-git-verceldeploy-larimos.vercel.app';
  let loggedInUsername = ''; // Variable to store the logged-in username

  // Function to switch between pages
  function showPage(page) {
    const pages = [
      logInPage,
      helloPromptPage,
      searchPage,
      articlesContainer,
      displayedArticlesPage,
      favoritesPage
    ];

    pages.forEach(p => {
      if (p === page) {
        p.style.display = 'flex';
  
        // Check if the page is the displayed article page and show the articles container
        if (p === displayedArticlesPage) {
          articlesContainer.style.display = 'flex';
        }
      } else {
        p.style.display = 'none';
      }
       });
    }


  const sendButton = document.getElementById('send-button');
  sendButton.addEventListener('click', (e) => {
    e.preventDefault();
  
    const usernameInput = document.getElementById('username-input').value;
    const passwordInput = document.getElementById('password-input').value;
  
    // Send a request to the backend to check username and password
    axios.post(`${API}/api/login`, { username: usernameInput, password: passwordInput })
      .then(response => {
        // Check if the login was successful
        if (response.status === 200) {
          // Set the logged-in username
          loggedInUsername = usernameInput;
          // Display the hello-prompt-page
          showHelloPrompt(loggedInUsername);
        } else {
          // Handle other response statuses if needed
          console.log('Login failed');
        }
      })
      .catch(error => {
        // Handle error from the request
        console.error(error);
      });
  });
  
  // Function to show the hello prompt and add event listener
  function showHelloPrompt(username) {
    const helloPromptText = document.createElement('p');
    const helloPrompt = document.createElement('div');
    helloPrompt.classList.add('prompt');
    helloPromptPage.appendChild(helloPrompt);

    showPage(helloPromptPage);
  
    // Function to simulate typing effect
    function typeText(text, index) {
      if (index < text.length) {
        helloPromptText.textContent += text.charAt(index);
        setTimeout(() => {
          typeText(text, index + 1);
        }, 100); // Delay between each character (adjust as needed)
      }
    }
  
    // Text to be displayed
    const welcomeText = `HELLO ${username}, WELCOME BACK!`;
  
    // Start typing effect after a delay of 1 second
    setTimeout(() => {
      typeText(welcomeText, 0);
    }, 1000); // Delay before starting the typing effect (adjust as needed)
    
    helloPrompt.appendChild(helloPromptText);
  }

  const helloPromptButton = document.getElementById('hello-prompt-button');
  helloPromptButton.addEventListener('click', () => {
    showPage(searchPage);
  });

  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', (e) => {
    e.preventDefault();

  
    const year = document.getElementById('year-input');
    const month = document.getElementById('month-input');

    showPage(displayedArticlesPage);
    getArticles(year.value, month.value);

  });

  // Function to get articles based on year and month
  function getArticles(year, month) {
    axios.get(`${API}/api/articles?year=${year}&month=${month}`)
      .then(response => {
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
          // Create the plus button element
          const plusButton = document.createElement('button');
          plusButton.classList.add('plus-button');
          plusButton.innerHTML = '+';
          card.appendChild(plusButton);

          // Add event listener to the plus button
          plusButton.addEventListener('click', (event) => {
          event.stopPropagation(); // Prevent the click event from bubbling to the card element

          // Save the article
          saveArticle(article.id);
        });

          // Append the card to the articles container
          articlesContainer.appendChild(card);
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  const favoritesButton = document.getElementById('favorites-button');
  favoritesButton.addEventListener('click', () => {
    showPage(favoritesPage);
  });


  // const displayedArticlesButton = document.getElementById('displayed-articles-button');
  // displayedArticlesButton.addEventListener('click', () => {
  //   showPage(displayedArticlesPage);
  // });

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
})  

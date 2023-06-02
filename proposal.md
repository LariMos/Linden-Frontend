# Project Proposal
The goal of my project is to create an app that assists individuals struggling with Alzheimer's by providing memory training exercises and social engagement opportunities. The app will leverage New York Times articles to offer memory-enhancing activities and encourage user interaction. It aims to improve cognitive abilities and foster a sense of connection and engagement for users.

## Project name 
Unter Den Linden (Under the linden tree)

## Description
Unter Den Linden is an app designed to support individuals with Alzheimer's by providing memory training exercises and facilitating social engagement. The app incorporates New York Times articles, allowing users to explore news from different years and dates. Users can filter articles based on specific criteria and save articles they find interesting.

<a href="https://imgur.com/JBcHnT0"><img src="https://i.imgur.com/JBcHnT0.jpg" title="source: imgur.com" /></a>

<a href="https://imgur.com/LhKm5or"><img src="https://i.imgur.com/LhKm5or.jpg" title="source: imgur.com" /></a>


<a href="https://imgur.com/tj8nyvK"><img src="https://i.imgur.com/tj8nyvK.jpg" title="source: imgur.com" /></a>

<a href="https://imgur.com/cnFc6y7"><img src="https://i.imgur.com/cnFc6y7.png" title="source: imgur.com" /></a>

## GitHub Links
https://github.com/LariMos/Unter-Den-Linden-Frontend.git
https://github.com/LariMos/Unter-Den-Linden-Backend.git


## Routes and models
<!-- Define your routes and what HTTP method they will be using -->

### Routes
#### Authentication Routes:
    - POST /signup: Creates a new user account.
    - POST /login: Authenticates a user and generates a session token.

#### User Profile Routes:
    - GET /profile : Retrieves the user's profile information.
    - PUT /profile : Updates the user's profile information.
#### Article Routes:
    -GET /articles : Retrieves a list of articles based on specified filters (year, date).
    -GET /articles/:id : Retrieves a specific article by its ID.
    -POST /articles/:id/save : Saves an article to the user's saved articles list.
    -DELETE /articles/:id/delete : Deletes a saved article from the user's list.

#### AI Chat Routes (stretch goals):
    -POST /articles/:id/chat : Triggers an AI chat interaction related to the article with the user.

### Models:
    -SuperUser
    - User(move to stretch):
        - username
        -password
        -savedArticles (array of article IDs)

    -Article:
        -title
        -date
        -content
        -author
        -category
        -summary
        -imageURL

```javascript
const articleSchema = new mongoose.Schema({
  articleId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
});



const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  savedArticles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
  }],
});
```

#### API Links: 
    - https://developer.nytimes.com/apis 
    - https://developer.nytimes.com/docs/archive-product/1/overview



## User Stories
<!-- Your user stories are a way to talk about your applications features in the following format:

- `As a user I should be able to <fill in the feature description>`

Example:
- "As a user I should be able to query `/locations` route to GET all locations" -->

- As a user, I should be able to sign up for a Unter Den Linden account and securely log in.
- As a user, I should be able to view my profile information and update it if necessary.
- As a user, I should be able to browse New York Times articles based on year and date filters.
- As a user, I should be able to read the full content of an article and save it for future reference.
- As a user, I should be able to remove articles from my saved list.
- As a user, I should be able to trigger an AI chat interaction related to the article I just read.
- As a user, I should be able to provide my opinion on the article and a brief summary of its content during the AI chat interaction.

#### MVP Goals
<!-- These features are the minimum to get your application working.  -->

- Implement user authentication and profile management.
- Integrate MongoDB to store user and article data.
- Retrieval and display of New York Times articles based on year and date filters.
- Enable browsing and filtering of articles.
- Allow users to save and delete articles from their profiles.

#### Stretch Goals

- Integration of an AI chat system to engage in conversation related to the article content.
- Implementation of opinion and summary collection during the AI chat interaction.
- Enhanced user interface and accessibility features.
- Gamification elements to incentivize regular engagement and progress tracking.
- Add memory exercises to the profile such as sudoku, new language learning (duolingo)


By incorporating these features, Unter Den Linden aims to provide a valuable resource for individuals with Alzheimer's, promoting memory training, social interaction, and cognitive stimulation.
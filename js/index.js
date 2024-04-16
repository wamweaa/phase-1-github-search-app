// Function to perform user search on GitHub
function searchUsers(query) {
    const url = `https://api.github.com/search/users?q=${query}`;
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then(data => {
        displayUsers(data.items);
      })
      .catch(error => {
        console.error('Error searching users:', error);
      });
  }
  
  // Function to display search results (users) on the page
  function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
  
    users.forEach(user => {
      const userItem = document.createElement('li');
      userItem.innerHTML = `
        <img src="${user.avatar_url}" alt="Avatar" width="50" height="50">
        <span>${user.login}</span>
        <a href="${user.html_url}" target="_blank">Profile</a>
      `;
      userItem.addEventListener('click', () => {
        getUserRepositories(user.login);
      });
      userList.appendChild(userItem);
    });
  }
  
  // Function to fetch repositories for a specific user
  function getUserRepositories(username) {
    const url = `https://api.github.com/users/${username}/repos`;
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        return response.json();
      })
      .then(repos => {
        displayRepositories(repos);
      })
      .catch(error => {
        console.error('Error fetching repositories:', error);
      });
  }
  
  // Function to display repositories for a user on the page
  function displayRepositories(repos) {
    const reposList = document.getElementById('repos-list');
    reposList.innerHTML = '';
  
    repos.forEach(repo => {
      const repoItem = document.createElement('li');
      repoItem.textContent = repo.name;
      reposList.appendChild(repoItem);
    });
  }
  
  // Event listener for form submission
  document.getElementById('github-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('search').value.trim();
    if (searchTerm !== '') {
      searchUsers(searchTerm);
    }
  });
  
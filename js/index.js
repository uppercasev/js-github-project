const searchForm = document.querySelector('#github-form');
const searchInput = document.querySelector('#search');
const userList = document.querySelector('#user-list');
const reposList = document.querySelector('#repos-list');

const getUsers = async (input) => {
    const response = await fetch(`https://api.github.com/search/users?q=${input.value}`);
    const data = await response.json();
    return data.items;
}

const getUserRepos = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await response.json();
    return data;
}

const renderUserRepo = function(repo) {
    const repoItem = document.createElement('li');
    repoItem.innerHTML = `${repo.name}`;
    reposList.appendChild(repoItem);
}

const renderUserDeets = function(user) {
    const userItem = document.createElement('li');
    const username = user.login;
    userItem.style.border = "2px solid white";
    userItem.innerHTML = `
        <img src="${user.avatar_url}" height="50px" alt="display_pic" style="display:inline">
        <span>${username}</span>
        <a href="${user.html_url}" target="_blank">Go to github profile</a>
    `;
    userList.appendChild(userItem);
    userItem.addEventListener('click', async () => {
        reposList.innerHTML = "";
        document.querySelectorAll('#user-list li').forEach(function(item) {
            item.style.borderColor = "white";
        })
        userItem.style.borderColor = "red";
        const userRepos = await getUserRepos(username);
        userRepos.forEach(renderUserRepo);
    });
}

searchForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    userList.innerHTML = "";
    reposList.innerHTML = "";
    const userResults = await getUsers(searchInput);
    userResults.forEach(renderUserDeets);
});
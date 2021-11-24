const searchForm = document.querySelector('#github-form');
const searchInput = document.querySelector('#search');
const userList = document.querySelector('#user-list');

const getUsers = async (input) => {
    const response = await fetch(`https://api.github.com/search/users?q=${input.value}`);
    const data = await response.json();
    return data.items;
}

const renderUserDeets = function(user) {
    const userItem = document.createElement('li');
    userItem.innerHTML = `
        <img src="${user.avatar_url}" height="100px" alt="display_pic"><br>
        <p>Username: ${user.login}</p>
        <a href="${user.html_url}" target"_blank">Go to github profile</a>
    `;
    userList.appendChild(userItem);
}

searchForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    userList.innerHTML = "";
    const userResults = await getUsers(searchInput);
    userResults.forEach(renderUserDeets);
});
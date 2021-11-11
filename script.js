const APIURL = `https://api.github.com/users/`;

const main = document.querySelector('#main');
const form = document.querySelector('#form');
const search = document.querySelector('#search');
const btn = document.querySelector('.btn-theme');

getUser('othiagomoreira');
// getUser('othiagomoreira')
async function getUser(username) {
    const response = await fetch(APIURL + username);
    const responseData = await response.json();

    createUserCard(responseData);
}


function createUserCard(user) {
    const error = document.querySelector('#error');

    const cardHtml = `
    <div class="card">
        <div class="profile-info">
            <div class="profile-image">
                <img src="${user.avatar_url}" alt="">
            </div>
            <div class="profile">
                <div class="name-info">
                    <h1 class="name">${user.name}</h1>
                    <small class="name-user">@${user.login}</small>
                </div>
                <div class="date">Joined ${formatDate(user.created_at)}</div>
            </div>
        </div>

        <p class="bio">${user.bio || "This profile has no bio"}</p>

        <div class="info-github">
            <div class="repos">
                Repos
                <span class="value-repos">${user.public_repos}</span>
            </div>
            <div class="repos">
                Followers
                <span class="value-repos">${user.followers}</span>
            </div>
            <div class="repos">
                Following
                <span class="value-repos">${user.following}</span>
            </div>
        </div> 

        <ul class="addres-contact">
            <li class="addres-item">
                <i class='bx bxs-map'></i>
                <span class="location">${user.location || "Not available"}</span>
            </li>
            <li class="addres-item">
                <i class='bx bx-link'></i>
                <a href="${user.blog || '#'}" class="addres-link">
                    ${user.blog || "Not available"}
                </a>
            </li>
            <li class="addres-item">
                <i class='bx bxl-twitter'></i>
                <a href="${user.twitter || '#'}" class="addres-link">
                    ${user.twitter || "Not available"}
                </a>
            </li>
            <li class="addres-item">
                <i class='bx bxs-building-house'></i>
                <span>${user.company || "Not available"}</span> 
            </li>
        </ul>
    </div>
    `;

    if(user.message === 'Not Found') {
        error.style.visibility = 'visible';
    }else {
        error.style.visibility = 'hidden';
        main.innerHTML = cardHtml;
    }

    
}

function formatDate(date) {
    const dataString = new Date(date);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return dataString.toLocaleDateString('en-US', options);
}

function verifica(bio) {
    if(bio == null) {
        
    }
    console.log(bio)
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);

        search.value = '';
    }
})

// dark theme
btn.addEventListener('click', () => {
    const img = document.querySelector('.header img');
    const iconTheme = btn.querySelector('i');
    const textTheme = document.querySelector('.text-theme');

    document.body.classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
        img.setAttribute('src', 'img/devfinder.svg');
        textTheme.innerText = 'light'
        iconTheme.className = 'bx bxs-sun dark-icon';

    } else {
        img.setAttribute('src', 'img/devfinder-light.svg');
        textTheme.innerText = 'dark'
        iconTheme.className = 'bx bxs-moon dark-icon';
    }


})
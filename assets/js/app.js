const body = document.querySelector('body')
const textMode = document.querySelector('.header__mode span')
const theme = document.querySelector('.theme')
const imageProfile = document.querySelector("img");
const btnSearch = document.querySelector(".search");
const input = document.querySelector("input");
const userLogin = document.querySelector(".user");
const nameLogin = document.querySelector("h2");
const biography = document.querySelector(".bio");
const following = document.querySelector(".following");
const followers = document.querySelector(".followers");
const userRepos = document.querySelector('.repos')
const linkUser = document.querySelector(".blog");
const userLocation = document.querySelector(".location");
const userTwitter = document.querySelector('.twitter')
const userCompany = document.querySelector('.company')
const userJoin = document.querySelector('.joined')


function lightMode() {
  body.classList.toggle("light")
}

const mutation = new MutationObserver(function (mutations) {
  if (mutations[0].target.classList.contains('light')) {
    textMode.innerText = 'DARK'
    textMode.style.color = '#202123'
    theme.classList.replace('fa-sun', 'fa-moon');
    return;
  }
  theme.classList.replace('fa-moon', 'fa-sun');
  textMode.innerText = 'LIGHT'
  textMode.style.color = '#FFFF'
})
mutation.observe(document.body, { attributes: true })

input.addEventListener('keydown', function (event) {
  input.setAttribute('value', event.target.value)
})

function searchUser() {
  const nameUser = input.value.toLowerCase();
  if (!nameUser || nameUser.trim().length === 0) {
    alert('User not found')
    return;
  }
  fetch(`https://api.github.com/users/${nameUser}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (!data.name) { throw new Error('User not found') }
      
        imageProfile.src = data.avatar_url;
        nameLogin.innerText = data.name;
        userLogin.innerText = `@${data.login}`;
        userJoin.innerText = `Joined ${new Date(data.created_at).getUTCFullYear()}`;
        biography.innerText = !data.bio ? 'Not Available' : data.bio;
        userRepos.innerText = data.public_repos;
        followers.innerText = data.followers;
        following.innerText = data.following;
        linkUser.innerText = !data.blog ? 'Not Available' : data.blog;
        userLocation.innerText = !data.location  ? 'Not Available' : data.location;
        userTwitter.innerHTML = !data.twitter_username  ? 'Not Available' : data.twitter_username;
        userCompany.innerText = !data.company ? 'Not Available' : data.company;
        
    })
    .catch((error) => {
      alert(error.message)
    })
    input.value = ''
}
input.addEventListener('keypress', function(event){
  if(event.key === 'Enter'){
    btnSearch.click()
  }
})
btnSearch.addEventListener('click', searchUser)
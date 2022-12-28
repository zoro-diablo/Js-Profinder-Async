// fetch(`https://api.github.com/users/andrew`).then((res) => res.json()).then((profile) => console.log(profile));

// One method ⬆️

// Another method ⬇️  (speed: 100 api in one hour)

// async function getUser(name){
//     const res=await fetch(`https://api.github.com/users/andrew`);
//     const profile=await res.json();
//     return profile;
// }; 

// Another method ⬇️  (speed: 5000 api in one hour) using github Oauth

const CLIENT_ID='8a89d92c6117fa96dee1';
const CLIENT_SECRET_ID='df29387cdcb30e685093896d0863c264223f164f';

async function getUser(name){

    const res=await fetch(`https://api.github.com/users/${name}?client_id=${CLIENT_ID}&client_secret_id=${CLIENT_SECRET_ID}`);

    const profile=await res.json();

    return profile;
}; 

async function getRepos(profile){

    const res=await fetch(`${profile.repos_url}?client_id=${CLIENT_ID}&client_secret_id=${CLIENT_SECRET_ID}`);

    const repo=await res.json();

    return repo;
}

document.querySelector('#search').addEventListener('submit',async (e)=> {
  e.preventDefault();
  const username=document.querySelector('#findByUsername').value;

  

    if(username.length > 0){

      document.querySelector('.loader').style.display='block';
      document.querySelector('.user-details').style.display='none';
      document.querySelector('.notFound').style.display='none';
      const profile=await getUser(username);
      document.querySelector('.loader').style.display='none';

      if(profile.message === 'Not Found'){
        document.querySelector('.notFound').style.display='block';
      }else{
        const repos=await getRepos(profile);
        document.querySelector('.user-details').style.display='flex';
        showProfile(profile);
        showRepos(repos);
      };
    
    };

    
});

function showRepos(repos){
    let newHtml='';
    for(let repo of repos){
        newHtml+=`
            <div class="repo">
              <div class="repo_name">
                <a href="${repo.html_url}">${repo.name}</a>
              </div>
              <p>
                <span class="circle"></span> ${repo.language}
                <ion-icon name="star-outline"></ion-icon> ${repo.watchers_count}
                <ion-icon name="git-branch-outline"></ion-icon> ${repo.forks_count}
              </p>
            </div>
        `;
    };
    document.querySelector('.repos').innerHTML=newHtml;
};

function showProfile(profile){
    document.querySelector('.profile').innerHTML=`
        <img src="${profile.avatar_url}"/>
          <p class="name">${profile.name}</p>
          <p class="username login">${profile.login}</p>
          <p class="bio">
          ${profile.bio}
          </p>

          <div class="followers-stars">
            <p>
              <ion-icon name="people-outline"></ion-icon>
              <span class="followers"> ${profile.followers} </span> followers
            </p>
            <span class="dot">·</span>
            <p><span class="following"> ${profile.following} </span> following</p>
          </div>

          <p class="company">
            <ion-icon name="business-outline"></ion-icon>
            ${profile.company}
          </p>
          <p class="location">
            <ion-icon name="location-outline"></ion-icon>${profile.location}
          </p>
    `
};

/* <div class="profile">
          <img
            src="https://avatars3.githubusercontent.com/u/47313?s=400&u=7ba05204271a726f8642ac15864e2f361b5c0198&v=4"
            alt="letstrie"
          />
          <p class="name">Fabien Potencier</p>
          <p class="username login">fabpot</p>
          <p class="bio">
            Simplifying things for fun
          </p>

          <div class="followers-stars">
            <p>
              <ion-icon name="people-outline"></ion-icon>
              <span class="followers"> 10 </span> followers
            </p>
            <span class="dot">·</span>
            <p><span class="following"> 20 </span> following</p>
          </div>

          <p class="company">
            <ion-icon name="business-outline"></ion-icon>
            Symfony/Blackfire
          </p>
          <p class="location">
            <ion-icon name="location-outline"></ion-icon>Lille, France
          </p>
        </div> */

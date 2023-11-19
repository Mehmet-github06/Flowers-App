
/// selectors

const searhBtn = document.getElementById("button");
//   console.log("🚀 ~ file: app2.js:2 ~  searhBtn:",  searhBtn)
const searchInput = document.getElementById("searchFollowers");
// console.log("🚀 ~ file: app2.js:4 ~ searchInput:", searchInput)
const cardsDiv = document.getElementById("cards");
// console.log("🚀 ~ file: app2.js:6 ~ cardsDiv:", cardsDiv)

/// api adres;
//+https://api.github.com/users/anthonyharold67/followers?per_page=100



let followers =[];


const getFollowers = async (username)=>{

    cardsDiv.innerHTML="";
   
   try {
    const res = await fetch(`https://api.github.com/users/${username}/followers?per_page=100`)
    if(res.ok){
        const data = await res.json()
        console.log(data);
        followers=data;
        data.forEach(item => createElement(item))
        searchInput.style.display = "flex";

    }else{
        cardsDiv.innerHTML=`<p class="mx-auto text-center" >Kullanıcı Bulunamadı...</p>`;
        searchInput.style.display = "none";
    }
   } catch (error) {
    
   }
}

// getFollowers("esin")
const createElement = ({avatar_url,login,html_url}) =>{ 
    //  console.log(user);
    //  const{avatar_url,login,html_url} = user;
    const newElem = `
    <div class="col">
        <div class="card">
        <img src="${avatar_url}" class="card-img-top" alt="followers">
        <div class="card-body">
            <h5 class="card-title">${login}</h5>
            <a href="${html_url}" target="_blank" class="btn btn-dark">View Profile</a>
        </div>
        </div>
    </div>
    `;
    cardsDiv.innerHTML += newElem;
}

searhBtn.addEventListener("click", (e)=>{
    const value = document.getElementById("searchText").value.trim();

    if(value){
        getFollowers(value)
    }else{
        alert("Lütfen bir kullanıcı ismi giriniz...")
    }
   
    
})

searchInput.addEventListener("input", (e)=>{
    // console.log(e.target.value);
    // console.log(followers); 
    // console.log(  followers.filter(item => item.login.includes(e.target.value))); 
    
    cardsDiv.innerHTML="";

    followers.filter(item => item.login.toLowerCase().includes(e.target.value.toLowerCase()))
    .forEach((user)=> createElement(user))

})

window.addEventListener("load",()=>{
    searchInput.style.display = "none";
})
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Sayfanın yeniden yüklenmesini engellemek için
        searhBtn.click(); // searhBtn butonunu tetikle
    }
});
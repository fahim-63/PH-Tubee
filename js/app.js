const  showLoader = ()=>{
    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('video-container').classList.add('hidden');
}
const  hideLoader = ()=>{
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('video-container').classList.remove('hidden');
}

function loadCategories(){
   fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
   .then(res=>res.json())
   .then(data => {
        
         displayCategories(data.categories);
      });
}

function removeActiveClass (){
 const activeButtons = document.getElementsByClassName('active');
for (let btn of activeButtons){
btn.classList.remove('active')
}
}



function loadVideo(searchText = ""){
    showLoader();
   
   fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
   .then((res) => res.json())
   .then((data)=> {
    document.getElementById('btn-all').classList.add('active')
    displayVideos(data.videos)
   })
}





const loadCategoryVideos = (id)=>{
    showLoader();
    const url = `
    https://openapi.programming-hero.com/api/phero-tube/category/${id}
    `

    removeActiveClass();
    console.log(url);
    fetch(url)
    .then((res) => res.json())
    .then((data)=>{
        const clickedButton = document.getElementById(`btn-${id}`)
        clickedButton.classList.add('active')
        displayVideos(data.category)
    })
}

const loadVideoDetails = (videoId)=>{
    console.log(videoId)
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    fetch(url)
    .then((res)=>res.json())
    .then((data)=> displayVideoDetails(data.video))
}
 const displayVideoDetails = (video) => {
   document.getElementById('video_details').showModal();
   const detailsContainer = document.getElementById('details-container');
   detailsContainer.innerHTML = `
  <div class="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">The song details here</h2>
    <p>song:Tomar jonno</p>
    <p>Writer:Fahim Farhan</p>
    <p>Music:Imran</p>
   
    
  </div>
</div>
   `
 }


function displayCategories(categories){
   const categoryContainer =  document.getElementById("category-container");
   for (let cat of categories){
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
     <button id=btn-${cat.category_id} onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm  hover:bg-red-500 hover:text-white">${cat.category}</button>
    `;
    categoryContainer.append(categoryDiv)
   }
}

const displayVideos = (videos)=>{
const videoContainer = document.getElementById('video-container');
videoContainer.innerHTML = "";

if(videos.length === 0){
    videoContainer.innerHTML = `
    <div class="col-span-full flex flex-col py-20 items-center justify-center">
            <img src="./images/Icon.png" alt="Drawing picture">
            <h2 class="text-3xl font-bold">Oops!!Sorry,There is no content here.</h2>
        </div>
    `
return;
}
videos.forEach(video => {
   const videoCard = document.createElement('div');
   videoCard.innerHTML = `
   <div class="card bg-base-100">
            <figure class="relative">
                <img class="w-full h-[250px] object-cover" src="${video.thumbnail}}" />
                <span class="absolute bottom-2 right-2 text-white bg-black text-sm p-2 rounded-md">3hrs 56 min
                    ago</span>
            </figure>
            <div class="flex gap-3 px-0 p-5">
                <div class="profile">
                    <div class="avatar">
                        <div class="mask mask-squircle w-8">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
                <div class="text">
                    <h2 class="text-sm font-semibold">Midnight Serenade</h2>
                    <p class="text-sm text-gray-500 flex gap-1">
                    ${video.authors[0].profile_name}
                    ${video.authors[0].verified == true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="verified logo"></p>` : `` }
                    <p/>
                    <p class="text-gray-600 text-sm">${video.others.views} views</p>

                </div>
            </div>
            <button onclick = loadVideoDetails('${video.video_id}') class="btn btn-block">Show Details</button>
            </div>
   `
   videoContainer.append(videoCard);
    hideLoader();
});
}

document.getElementById('search-input').addEventListener('keyup', (e)=>{
   const input =e.target.value;
   loadVideo(input)
})
loadCategories()
// loadVideo()

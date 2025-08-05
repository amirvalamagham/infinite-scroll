const userOnUnsplash = 'om1bkvPkOkSjVFUi-VR3MHbXFUNQ7J3Rf1aJx9lbVMM';
const count = 15;
let photos;
let loadedImages = 0;
let totalImages = 0;
let ready = false;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${userOnUnsplash}&count=${count}`;
const photoContainer = document.querySelector('.image-container');
const loading = document.querySelector('.loading');

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photos = await response.json();
    displayPhotos();
  
  }
  catch (error) {
    console.log('THIS ERROR :' + error);

  }
}

function displayPhotos() {
  photos.forEach((photo => {
    loadedImages = 0;
    totalImages = photos.length;
    console.log('total images: ' + totalImages)
    const a = document.createElement('a');
    a.setAttribute('href', photo.links.html);
    a.setAttribute('target', '_blank');
    a.setAttribute('alt', photo.alt_descrition)
    a.classList.add('image-container');
    const img = document.createElement('img');
    img.classList.add('photos');
    img.setAttribute('src', photo.urls.regular);
    img.addEventListener('load', () => {
      loadedImages++
      console.log(loadedImages);
      if (loadedImages === totalImages) {
        ready = true;
        console.log('loading done!');
         loading.hidden=true;
       
      }
    })
    const h3 = document.createElement('h3');
    h3.innerText = photo.alt_description;
    photoContainer.appendChild(h3);
    photoContainer.appendChild(a);
    a.appendChild(img);
  }));

}


window.addEventListener('scroll', () => {
  if (window.scrollY + window.innerHeight > document.body.offsetHeight-1200 && ready) {
    ready=false;
    getPhotos();
  }
})


getPhotos();
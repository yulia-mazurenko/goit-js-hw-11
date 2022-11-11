// import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import fetchSubjects from './fetchSubjects.js'
// import './intersection-observer.js'

getEl = selector => document.querySelector(selector)
getEl('.search-form').addEventListener('submit', onFormSubmit)
getEl('.load-more').addEventListener('click', onLoadMoreBtnClick)


let searchSubject=''
let pageCount = 1;
let lightbox;

function onFormSubmit(evt) {

  evt.preventDefault();
  pageCount=1  
  searchSubject = evt.currentTarget.elements.searchQuery.value;

   fetchSubjects(searchSubject, pageCount).then(data => {
   renderMarkup(data)
   lightbox = new SimpleLightbox('.gallery a', {
    
     captionsData: "alt",
    captionDelay: 250,
   })
     lightbox.refresh()

     makeSmoothScrolling()
     pageCount += 1
     Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
     getEl('.load-more').classList.remove('is-hidden')
     
    
   }).catch(console.log)    
}

function onLoadMoreBtnClick() {
  
  searchSubject = getEl('.search-form input').value
    
  getEl('.load-more').classList.add('is-hidden')
  
  fetchSubjects(searchSubject, pageCount).then(data => {

    renderMarkup(data) 

    lightbox = new SimpleLightbox('.gallery a', {
    
     captionsData: "alt",
    captionDelay: 250,
    })
    lightbox.refresh()

    makeSmoothScrolling()
      
    if ((pageCount > data.totalHits / 40) || data.hits.length < 40) {
      Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
      getEl('.load-more').classList.add('is-hidden')
      return
    } 
    
    pageCount += 1
    getEl('.load-more').classList.remove('is-hidden')    
    
  }).catch(console.log)  
}

function renderMarkup(data) {
  clearMarkup()

  if (data.hits.length === 0) {
    Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
  }

    const markup = data.hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
    return `<div class="photo-card">
    <a href="${largeImageURL}">
    <img class="photo-card-pic" src="${webformatURL}" alt="${tags}" width=220px height=180px loading="lazy" />
    </a>

    <div class="info">
    <p class="info-item">
      <b>
      Likes:
      ${likes}
      </b>
    </p>
    <p class="info-item">
      <b>
      Views:
      ${views}</b>
    </p>
    <p class="info-item">
      <b>
      Comments:
      ${comments}</b>
    </p>
    <p class="info-item">
      <b>
      Downloads:
      ${downloads}</b>
    </p>
  </div>
</div>`
  }).join('')

  getEl('.gallery').insertAdjacentHTML('beforeend', markup)

   
}

function clearMarkup() {
  getEl('.gallery').innerHTML = '';
}

function makeSmoothScrolling() {

  const { height: cardHeight } = document
  .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();
  
  setTimeout(() => {
    window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
  }, 1000);


}



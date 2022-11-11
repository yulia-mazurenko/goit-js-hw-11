// import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import fetchSubjects from './fetchSubjects.js'
import './scroll-top-button.js'

let getEl = selector => document.querySelector(selector)
getEl('.search-form').addEventListener('submit', onFormSubmit)
// getEl('.load-more').addEventListener('click', onLoadMoreBtnClick)


let searchSubject=''
let pageCount = 1;
let lightbox;

function onFormSubmit(evt) {
  clearMarkup()
  
  evt.preventDefault();
  pageCount=1  
  searchSubject = evt.currentTarget.elements.searchQuery.value;
if (searchSubject!=='') {
   fetchSubjects(searchSubject, pageCount).then(data => {
   renderMarkup(data)
   lightbox = new SimpleLightbox('.gallery a', {
    
     captionsData: "author",
    captionDelay: 250,
   })
     lightbox.refresh()

    //  makeSmoothScrolling()
     pageCount += 1
     if (data.totalHits !== 0) {
       Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
     }
    
    //  getEl('.load-more').classList.remove('is-hidden')
        
   }).catch(console.log)  
}
    
}

// function onLoadMoreBtnClick() {
  
//   searchSubject = getEl('.search-form input').value
    
//   getEl('.load-more').classList.add('is-hidden')
  
//   fetchSubjects(searchSubject, pageCount).then(data => {

//     renderMarkup(data) 

//     lightbox = new SimpleLightbox('.gallery a', {
    
//      captionsData: "alt",
//     captionDelay: 250,
//     })
//     lightbox.refresh()

//     makeSmoothScrolling()
      
//     if ((pageCount > data.totalHits / 40) || data.hits.length < 40) {
//       Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
//       getEl('.load-more').classList.add('is-hidden')
//       return
//     } 
    
//     pageCount += 1
//     getEl('.load-more').classList.remove('is-hidden')    
    
//   }).catch(console.log)  
// }

function renderMarkup(data) {
  
  if (data.hits.length === 0) {
    Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
  }

  const markup = data.hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads, user}) => {
        return `<div class="photo-card">
        <a href="${largeImageURL}">
        <img class="photo-card-pic" src="${webformatURL}" alt="${tags}" author="${user}" width=220px height=180px loading="lazy" />
        </a>

        <div class="info">
        <p class="info-item">
          <b>Likes:</b><span class="info-text">${likes}</span>
        </p>
        <p class="info-item">
          <b>Views:</b><span class="info-text">${views}</span>
        </p>
        <p class="info-item">
          <b>Comments:</b><span class="info-text">${comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads:</b><span class="info-text"> ${downloads}</span>
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

const onEntry = (entries) => {
  searchSubject = getEl('.search-form input').value
  entries.forEach((entry) => {
      
        if(entry.isIntersecting && searchSubject!=='') {
            
          fetchSubjects(searchSubject, pageCount).then(data => {
          
          renderMarkup(data) 

          lightbox = new SimpleLightbox('.gallery a', {
          
          captionsData: "author",
          captionDelay: 250,
          })
  
         lightbox.refresh()

    // makeSmoothScrolling()
      
            if ((pageCount > data.totalHits / 40) || data.hits.length < 40) {
      
                Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
                observer.unobserve(target);
                return
    }     
            pageCount += 1                    
        
  }).catch(console.log)  
} 
})    
}

/*
infinite-scroll
*/

const options = {
  rootMargin: '150px',
//   threshold: 1.0
}

const observer = new IntersectionObserver(onEntry, options);
const target = document.querySelector('.sentinel')

observer.observe(target);




const callbak=(entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
           console.log(entry) 
}    
})    
}

const options = {
  root: document.querySelector('#scrollArea'),
  rootMargin: '0px',
  threshold: 1.0
}

const observer = new IntersectionObserver(callback, options);

observer.observe(document.querySelector('.gallery'));

// let options = {
//   root: document.querySelector('#scrollArea'),
//   rootMargin: '0px',
//   threshold: 1.0
// }


// let target = document.querySelector('#listItem');
// observer.observe(target);

// let callback = (entries, observer) => {
//   entries.forEach((entry) => {
//     // Each entry describes an intersection change for one observed
//     // target element:
//     //   entry.boundingClientRect
//     //   entry.intersectionRatio
//     //   entry.intersectionRect
//     //   entry.isIntersecting
//     //   entry.rootBounds
//     //   entry.target
//     //   entry.time
//   });
// };
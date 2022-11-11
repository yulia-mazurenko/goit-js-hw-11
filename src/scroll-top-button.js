/*
scroll-top-button
*/
let getEl = selector => document.querySelector(selector)
getEl('.js-button-scroll-top').addEventListener('click', onScrollBtnClick)

  window.onscroll = () => {
  if (window.scrollY > 700) {
    getEl('.js-button-scroll-top').classList.add('is-show')
  } else if (window.scrollY < 700) {
    getEl('.js-button-scroll-top').classList.remove('is-show')
  }
}

function onScrollBtnClick() {
    window.scrollTo(0,0)
}
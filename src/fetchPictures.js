import axios from 'axios'

const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '31162878-b0b34cee5ee846d8bb063e7fc'


// export default async function fetchPictures(searchSubject, pageCount) {
//     const searchParams = new URLSearchParams({
//         key: API_KEY,
//         q: searchSubject,
//         image_type: "photo",
//         orientation: "horizontal",
//         safesearch: true,
//         page: pageCount,
//         per_page: 40
//     })
    
//     const response = await fetch(`${BASE_URL}?${searchParams}`)
//     const data = await response.json()
//     return data         
// }

export default async function fetchPictures(searchSubject, pageCount) {
    const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchSubject,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page: pageCount,
    per_page: 40    
})
    const response = await axios.get(`${BASE_URL}?${searchParams}`)
    return response.data         
}


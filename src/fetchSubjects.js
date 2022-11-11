const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '31162878-b0b34cee5ee846d8bb063e7fc'
const parameters = 'image_type="photo"&orientation="horizontal"&safesearch=true'


export default function fetchSubjects(searchSubject, pageCount) {
    
    return fetch(`${BASE_URL}?key=${API_KEY}&q=${searchSubject}&${parameters}&page=${pageCount}&per_page=40`)
        .then(response => response.json())
        
}


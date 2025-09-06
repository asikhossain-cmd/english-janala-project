// Get and fetch the buttons

const getLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((response) => response.json())
    .then((resData) => getLessonsData(resData.data))
}


const levelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((response) => response.json())
    .then((resData) => getWords(resData.data))
}

const getWords = (wordArray) => {
    wordArray.forEach(wordObj => {
        const word = wordObj.word;
        const pronounce = wordObj.pronunciation;
        const meaning = wordObj.meaning;
        
        
    })
}


// Lets Create a function and get the objects
const getLessonsData = (lessons) => {
    const getParentElement = document.getElementById('learning-btn-id')
    getParentElement.innerHTML = '';
    // get each items with forEach loop
    lessons.forEach((lesson) => {
        const getTheLessonName = lesson.lessonName;
        const getTheLessonId = lesson['level_no']
        

        const createElement = document.createElement('div');
        createElement.innerHTML = `
            <button onclick="levelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${getTheLessonId}</button>
        `

        getParentElement.appendChild(createElement);
        


    })
}
getLessons()

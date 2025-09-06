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
    // Get the Words Container
    const getWordContainer = document.getElementById('words-container-id');
    getWordContainer.innerHTML = '';
    wordArray.forEach(wordObj => {
        const word = wordObj.word;
        const pronounce = wordObj.pronunciation;
        const meaning = wordObj.meaning;

        const createNewElement = document.createElement('div');
        
        createNewElement.innerHTML = `
                <div class="word-card m-auto w-90 h-full bg-white rounded-md shadow-xl p-8 text-center flex flex-col gap-3">
                    <h1 class="text-2xl font-bold">${word}</h1>
                    <p>Meaning / Pronounciation</p>
                    <h1 class="text-2xl font-semibold text-gray-700 font-bangla">${meaning} / ${pronounce}</h1>
                    <div class="word-card-btn flex justify-between items-center mt-7">
                        <button class="w-12 h-12 rounded-sm bg-blue-100 text-gray-700 hover:bg-blue-300 cursor-pointer"><i class="fa-solid fa-circle-info"></i></button>
                        <button class="w-12 h-12 rounded-sm bg-blue-100 text-gray-700 hover:bg-blue-300 cursor-pointer"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>
            `

        getWordContainer.appendChild(createNewElement)
        

        
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

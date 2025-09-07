// Get and fetch the buttons

const getLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((response) => response.json())
    .then((resData) => getLessonsData(resData.data))
}

const activeClasRemove = () => {
    const getAllButton = document.querySelectorAll('.lesson-button');
    getAllButton.forEach((removeBtn) => {
        removeBtn.classList.remove('active')
    })
}



const levelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((response) => response.json())
    .then((resData) => {
        const getButton = document.getElementById(`lesson-button-${id}`);
        activeClasRemove()
        getButton.classList.add('active')    
        getWords(resData.data)})
    }
    

    // Word Details Function Program
    const levelWordDetails = async (id) => {
        const url = `https://openapi.programming-hero.com/api/word/${id}`
        const getWordDetailsAPI = await fetch(url)
        const response = await getWordDetailsAPI.json();
        showLevelWordDetails(response.data)
        
    }

    // Show Word Details
    const showLevelWordDetails = async (wordDetails) => {
        const getModalParent = document.getElementById('details-container-id');
        getModalParent.innerHTML = `
            <div class="p-2 flex flex-col gap-5">
                    <h1 class="font-bold text-2xl">${wordDetails.word} (<i class="fa-solid fa-microphone-lines"></i> :${wordDetails.pronunciation})</h1>
                    <div>
                        <p class="font-semibold text-lg">Meaning</p>
                        <p class="font-normal text-base font-bangla">${wordDetails.meaning}</p>
                    </div>
                    <div>
                        <p class="font-semibold text-lg">Example</p>
                        <p class="font-normal text-base text-gray-700">${wordDetails.sentence}</p>
                    </div>
                    <div>
                        <p class="font-semibold text-lg font-bangla">সমার্থক শব্দ গুলো</p>
                        <div class="synonym-btns flex gap-3">
                            <button class="btn">Enthusiastic</button>
                            <button class="btn">Enthusiastic</button>
                            <button class="btn">Enthusiastic</button>
                        </div>
                    </div>
                </div>
        `

        document.getElementById('word_details').showModal()
    }

    // Blank lesson error message
const getWords = (wordArray) => {
    // Get the Words Container
    const getWordContainer = document.getElementById('words-container-id');
    getWordContainer.innerHTML = '';

    if(wordArray.length == 0) {
        getWordContainer.innerHTML = `
        <div class="blank-lesson col-span-full flex flex-col items-center justify-between gap-4">
            <img src="assets/alert-error.png" alt="Alert Error">
            <p class="font-bangla text-xl font-medium text-gray-600">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="font-bangla text-3xl font-bold">নেক্সট Lesson এ যান</h1>
        </div>
        `;
        return
    }

    wordArray.forEach(wordObj => {
        const word = wordObj.word;
        const pronounce = wordObj.pronunciation;
        const meaning = wordObj.meaning;

        const createNewElement = document.createElement('div');
        
        createNewElement.innerHTML = `
                <div class="word-card m-auto w-90 h-full bg-white rounded-md shadow-xl p-8 text-center flex flex-col gap-3">
                    <h1 class="text-2xl font-bold">${word ? word : 'শব্দ পাওয়া যায়নি'}</h1>
                    <p>Meaning / Pronounciation</p>
                    <h1 class="text-2xl font-semibold text-gray-700 font-bangla">${meaning ? meaning : 'অর্থ পাওয়া যায়নি'} / ${pronounce ? pronounce : 'উচ্চারণ পাওয়া যায়নি'}</h1>
                    <div class="word-card-btn flex justify-between items-center mt-7">
                        <button onclick="levelWordDetails(${wordObj.id})" class="w-12 h-12 rounded-sm bg-blue-100 text-gray-700 hover:bg-blue-300 cursor-pointer"><i class="fa-solid fa-circle-info"></i></button>
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
            <button id="lesson-button-${lesson.level_no}" onclick="levelWord(${lesson.level_no})" class="lesson-button btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${getTheLessonId}</button>
        `

        getParentElement.appendChild(createElement);
        


    })
}
getLessons()

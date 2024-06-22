const questions = [
    {
        question: "In HTML, what is the semantic meaning behind the <i> tag?",
        choices: ["block of text used to represent the main content of the HTML page",
            "block of text used to highlight misspelled words",
            "span of text that represents a change in mood or quality of text",
            "span of text used to signal high importance"],
        answer: "span of text that represents a change in mood or quality of text"
    },
    {
        question: "In CSS, how is the comma operator used in a media query?",
        choices: ["It joins multiple media features.",
            "It separates multiple media features by commas and it applies the styles inside the curly braces if one of the conditions is true.",
            "It splits media queries into separate ones.",
            "It reverses a true query into a false query and a false query into a true query."],
        answer: "The comma operator is used to separate multiple media features by commas and to apply the styles inside the curly braces if one of the conditions is true."
    },
    {
        question: "In JavaScript, what method removes the first element of an array and returns it?",
        choices: [".unshift()",
            ".pop()",
            ".push()",
            ".shift()"],
        answer: " .shift() "
    },
    {
        question: "In CSS, what property is used to customize the marker of a list item?",
        choices: ["list-marker-type",
         "list-style-type",
         "list-markers",
         "list-style"],
        answer: "list-style-type"
    },
    {
        question: "In HTML, what is the primary purpose of the <canvas> tag?",
        choices: ["It displays annotated images.",
         "It allows drawing on a bitmap via JavaScript.",
         "It allows vector images to be rendered on the webpage.",
         "It allows raster images to be rendered on the webpage."],
        answer: "It allows drawing on a bitmap via JavaScript."
    },
    {
        question: "In JavaScript, which of the following statements is correct regarding async await?",
        choices: ["await keeps executing code regardless of promise status",
         "async automatically returns a promise",
         "async can be used independently without an async function",
         "Multiple await keywords can be used in a single line inside an async function"],
        answer: "async automatically returns a promise"
    },
    {
        question: "What does HTML stand for?",
        choices: [ "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "None of these"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "If you have a page of search results and want to highlight the search term, what HTML tag would you use?",
        choices: ["< em >",
         "< strong >",
         "< mark >",
         "< highlight >"],
        answer: "< mark >"
    },
    {
        question: "The stylesheet file will not be loaded by the browser if you omit_______",
        choices: ["REL",
         "STYLE",
         "BODY",
         "HTML"],
        answer: "REL"
    },
    {
        question: "Using a <style> element in head section is known as",
        choices: ["External",
         "Outline",
         "Internal",
         "Inline"],
        answer: "Internal"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const nextButton = document.getElementById('next-btn');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultElement.classList.add('hidden');
    nextButton.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    currentQuestion.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice;
        button.classList.add('btn');
        if (choice === currentQuestion.answer) {
            button.dataset.correct = true;
        }
        button.addEventListener('click', selectAnswer);
        choicesElement.appendChild(button);
    });
} 

function resetState() {
    while (choicesElement.firstChild) {
        choicesElement.removeChild(choicesElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        score++;
    }
    Array.from(choicesElement.children).forEach(button => {
        button.disabled = true;
        setStatusClass(button, button.dataset.correct);
    });
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hidden');
    } else {
        showResult();
    }
}

function setStatusClass(element, correct) {
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function showResult() {
    nextButton.classList.add('hidden');
    resultElement.classList.remove('hidden');
    scoreElement.innerText = `${score} out of ${questions.length}`;
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion();
});

restartButton.addEventListener('click', startQuiz);

startQuiz();

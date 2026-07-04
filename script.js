const questions = [

    {
        question: "What does HTML stand for?",
        answers: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyper Transfer Machine Language",
            "Hyper Text Machine Language"
        ],
        correct: 0
    },

    {
        question: "Which language styles webpages?",
        answers: ["HTML", "CSS", "Java", "Python"],
        correct: 1
    },

    {
        question: "Which language adds interactivity?",
        answers: ["HTML", "CSS", "JavaScript", "SQL"],
        correct: 2
    },

    {
        question: "Which tag creates a hyperlink?",
        answers: ["&lt;a&gt;", "&lt;p&gt;", "&lt;h1&gt;", "&lt;img&gt;"],
        correct: 0
    },

    {
        question: "Which company developed JavaScript?",
        answers: ["Google", "Netscape", "Apple", "Microsoft"],
        correct: 1
    },

    {
        question: "Which symbol is used for comments in JavaScript?",
        answers: ["//", "<!-- -->", "##", "**"],
        correct: 0
    },

    {
        question: "Which HTML tag inserts an image?",
        answers: ["&lt;img&gt;", "&lt;image&gt;", "&lt;pic&gt;", "&lt;src&gt;"],
        correct: 0
    },

    {
        question: "Which CSS property changes text color?",
        answers: ["font-color", "text-color", "color", "background"],
        correct: 2
    },

    {
        question: "Which method writes output to console?",
        answers: [
            "console.log()",
            "print()",
            "echo()",
            "write()"
        ],
        correct: 0
    },

    {
        question: "Which HTML element is used for forms?",
        answers: ["&lt;form&gt;", "&lt;input&gt;", "&lt;label&gt;", "&lt;button&gt;"],
        correct: 0
    }

];

let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(questions.length).fill(null);

let timer;
let timeLeft = 15;

const question = document.getElementById("question");
const answers = document.getElementById("answers");
const result = document.getElementById("result");
const quiz = document.getElementById("quiz");
const scoreText = document.getElementById("score");
const qNumber = document.getElementById("question-number");

function loadQuestion() {

    updateProgress();
    startTimer();

    const q = questions[currentQuestion];

    qNumber.innerHTML =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    question.textContent = q.question;

    answers.innerHTML = "";

    q.answers.forEach((answer, index) => {

        const label = document.createElement("label");

        label.classList.add("option");

        label.innerHTML = `
            <input
                type="radio"
                name="answer"
                value="${index}"
                ${userAnswers[currentQuestion] === index ? "checked" : ""}
            >
            ${answer}
        `;

        answers.appendChild(label);

    });

}

function startTimer() {

    clearInterval(timer);

    timeLeft = 15;

    document.getElementById("time").textContent = timeLeft;

    timer = setInterval(() => {

        timeLeft--;

        document.getElementById("time").textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            nextQuestion();

        }

    }, 1000);

}

function updateProgress() {

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    document.getElementById("progress-bar").style.width =
        progress + "%";

}

function saveAnswer() {

    const selected =
        document.querySelector('input[name="answer"]:checked');

    if (selected) {

        userAnswers[currentQuestion] = Number(selected.value);

        alert("Answer Saved!");

    } else {

        alert("Please select an answer.");

    }

}

function nextQuestion() {

    clearInterval(timer);

    const selected =
        document.querySelector('input[name="answer"]:checked');

    if (selected) {

        userAnswers[currentQuestion] = Number(selected.value);

    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();

    }

}

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        loadQuestion();

    }

}

function showResult() {

    quiz.classList.add("hide");

    result.classList.remove("hide");

    score = 0;

    for (let i = 0; i < questions.length; i++) {

        if (userAnswers[i] === questions[i].correct) {

            score++;

        }

    }

    let percentage = (score / questions.length) * 100;

    let grade = "D";

    if (percentage >= 90) {

        grade = "A";

    } else if (percentage >= 75) {

        grade = "B";

    } else if (percentage >= 50) {

        grade = "C";

    }

    let status =
        percentage >= 50 ? "✅ PASS" : "❌ FAIL";

    scoreText.innerHTML = `
        <h3>Score: ${score}/${questions.length}</h3>
        <h3>Percentage: ${percentage.toFixed(2)}%</h3>
        <h2>Grade: ${grade}</h2>
        <h2>${status}</h2>
    `;

}

function showReview() {

    result.classList.add("hide");

    document.getElementById("reviewPage")
        .classList.remove("hide");

    let html = "";

    questions.forEach((q, index) => {

        let userChoice = userAnswers[index];

        let userText =
            userChoice !== null
                ? q.answers[userChoice]
                : "Not Answered";

        let correctText = q.answers[q.correct];

        html += `
            <div class="review-card">
                <h3>Question ${index + 1}</h3>
                <p><b>${q.question}</b></p>
                <p>Your Answer: ${userText}</p>
                <p>Correct Answer: ${correctText}</p>
            </div>
        `;

    });

    document.getElementById("reviewContent").innerHTML = html;

}

function backToResult() {

    document.getElementById("reviewPage")
        .classList.add("hide");

    result.classList.remove("hide");

}

function restartQuiz() {

    clearInterval(timer);

    currentQuestion = 0;
    score = 0;
    userAnswers = new Array(questions.length).fill(null);

    result.classList.add("hide");

    document.getElementById("reviewPage")
        .classList.add("hide");

    quiz.classList.remove("hide");

    loadQuestion();

}

document.getElementById("darkModeBtn")
    .addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

    });

loadQuestion();
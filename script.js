let welcomeScreen = document.querySelector(".welcome");
let quizScreen = document.querySelector(".quiz");
let resultScreen = document.querySelector(".result");
let startQuizBtn = document.querySelector(".start-quiz-btn");
let answerBtns = document.querySelectorAll(".answer");
let restartQuizBtn = document.querySelector(".restart-quiz-btn");
let quizQuestion = document.querySelector(".quiz__question")
let resultTitle = document.querySelector(".result__title")
let quizCounter = document.querySelector(".quiz__counter span")
let timerElement = document.querySelector(".timer") // отримали дув з класом таймер
let interval // створили змінну для нашого інтурвалу
let startTimerValue = 10 // встановили початкове значеня для таймеру

function startTimer() {    // написали функцію яка буде запускати таймер 
	timerElement.innerHTML = startTimerValue // при запуску одразу вивели на сторінку 10

	interval = setInterval(function () {  // запустили  інтервал
		if (startTimerValue == 1) {   // якщо початкове значення рівне 1 то:
			timerElement.innerHTML = 0   // то  показали на сторінці 0
			clearInterval(interval)    // видалили інтервал 
			showQuestionResult("red")  // показали червоний екран 
			showNextQuestion()       // запустили  наступне запитання 
		} else {   // в іншому випадку
			startTimerValue--  // зменшили початкове значення на 1
			timerElement.innerHTML = startTimerValue  // показали його на сторінці 
		}
	}, 1000) // через 1 секунду повернулись на початок нашого інтервалу
}

let allQuestion = [
	{
		question: "1 + 4",
		answers: [1, 2, 3, 4, 5],
		correctAnswer: 5
	},
	{
		question: "3 + 4",
		answers: [7, 8, 3, 4, 5],
		correctAnswer: 5
	},
	{
		question: "4 + 4",
		answers: [6, 8, 5, 4, 5],
		correctAnswer: 5
	},
	{
		question: "7 + 4",
		answers: [11, 12, 13, 14, 15],
		correctAnswer: 5
	},
	{
		question: "1 + 7",
		answers: [6, 8, 3, 4, 5],
		correctAnswer: 5
	}
]
let userPoint = 0
let currQuestionNumber = 0

function renderQuestion(quest) {
	quizQuestion.innerHTML = quest.question
	answerBtns.forEach((btn, i) => btn.innerHTML = quest.answers[i])
	startTimer()
}

function showQuestionResult(color) {
	quizScreen.style.background = color

	setTimeout(() => {
		quizScreen.style.background = "#5fdfff"
	}, 600)
}

function disabledButton(option) {
	answerBtns.forEach(btn => btn.disabled = option)
}

function deleteActiveScreen() {
	welcomeScreen.classList.remove("active");
	quizScreen.classList.remove("active");
	resultScreen.classList.remove("active");
}

function runQuiz() {
	deleteActiveScreen();
	quizScreen.classList.add("active");
	currQuestionNumber = 0
	userPoint = 0
	renderQuestion(allQuestion[currQuestionNumber])
	quizCounter.innerHTML = currQuestionNumber + 1
}

function finishQuiz() {
	deleteActiveScreen();
	resultScreen.classList.add("active");
	resultTitle.innerHTML = `Вітаю, ти закінчив опитування і отримав ${userPoint} з ${allQuestion.length}`
}

startQuizBtn.addEventListener("click", runQuiz);
restartQuizBtn.addEventListener("click", runQuiz);

answerBtns.forEach(btn => {
	btn.addEventListener("click", () => {
		clearInterval(interval)

		if (btn.innerHTML == allQuestion[currQuestionNumber].correctAnswer) {
			userPoint++
			showQuestionResult("lightgreen")
		} else {
			showQuestionResult("red")
		}
		showNextQuestion()
	})
})
function showNextQuestion() {
	disabledButton(true)

	startTimerValue = 10
	setTimeout(() => {
		if (currQuestionNumber == allQuestion.length - 1) {
			finishQuiz()
		} else {
			currQuestionNumber++
			renderQuestion(allQuestion[currQuestionNumber])
			quizCounter.innerHTML = currQuestionNumber + 1
		}
		disabledButton(false)
	}, 800)
}

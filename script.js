const leftIcon = document.getElementById('left');
const rightIcon = document.getElementById('right');

const questionList = document.getElementById('question-list');
const answerList = document.getElementById('answer-list');
const questionCount = document.getElementById('question-count');
const scoreCount = document.getElementById('score-count');
const totalQuestion = document.getElementById('total-question');

const questions = ['1. How many elements are in the periodic table?', '2. What is the most common surname in the United States?', '3. What does "du bist ein hund" mean in German?', '4. Who was the Ancient Greek God of the Sun?', '5. What country has the highest life expectancy?', '6. What is the capital city of Nepal'];
const answers = [
    ["198", "116", "118", "32"],
    ["Hawkins", "Smith", "Walter", "Dickinson"],
    ["You are a dog", "He is smart", "Goodbye, I am sorry!", "You are a student"],
    ["Rupesh Bardewa", "Ammit", "Khonsu", "Apollo"],
    ["Nepal", "Korea", "Hong Kong", "Russia"],
    ["Kathmandu", "Kanchanpur", "Damak", "Itahari"]
];
totalQuestion.textContent = `/${questions.length}`;
const correctAnswers = [2, 1, 0, 3, 2, 0];
let currentQuestionIndex = 0;
let score = 0;

function updateQuestion() {
    questionList.innerHTML = questions[currentQuestionIndex];
    answerList.innerHTML = answers[currentQuestionIndex].map((answer, index) => `<li onclick="checkAnswer(${index})">${answer}</li>`).join('');
    questionCount.textContent = currentQuestionIndex + 1;
    rightIcon.style.pointerEvents = 'none';
    rightIcon.classList.add('disabled');
    checkQuizCompletion();
}

function checkAnswer(selectedIndex) {
    const correctIndex = correctAnswers[currentQuestionIndex];
    const selectedAnswer = answerList.children[selectedIndex];

    if (selectedIndex === correctIndex) {
        selectedAnswer.style.backgroundColor = 'green';
        score++;
        scoreCount.textContent = score;
    } else {
        selectedAnswer.style.backgroundColor = 'red';
        answerList.children[correctIndex].style.backgroundColor = 'green';
    }

    Array.from(answerList.children).forEach(item => {
        item.style.pointerEvents = 'none';
    });

    if (currentQuestionIndex === questions.length - 1) {
        showFinalScore();
    } else {
        rightIcon.style.pointerEvents = 'auto';
        rightIcon.classList.remove('disabled');
    }
}

leftIcon.addEventListener('click', function () {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        updateQuestion();
    }
});

rightIcon.addEventListener('click', function () {
    if (!rightIcon.classList.contains('disabled')) {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            updateQuestion();
        }
        rightIcon.style.pointerEvents = 'none';
        rightIcon.classList.add('disabled');
    }
});

function showFinalScore() {
    alert(`Congratulations! You have completed the quiz.\nYour score: ${score} out of ${questions.length}`);
}

updateQuestion();

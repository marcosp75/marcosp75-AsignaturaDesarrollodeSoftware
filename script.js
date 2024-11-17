const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let questions = [];

// Cargar preguntas del archivo JSON
fetch('questions_complete.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        showQuestion();
    });

// Mostrar la pregunta actual
function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.pregunta;
    answersContainer.innerHTML = '';

    question.respuestas.forEach((respuesta, index) => {
        const button = document.createElement('button');
        button.textContent = respuesta;
        button.classList.add('answer-btn');
        button.addEventListener('click', () => checkAnswer(index));
        answersContainer.appendChild(button);
    });
}

// Verificar la respuesta
function checkAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    if (question.respuestas[selectedIndex] === question.respuesta_correcta) {
        alert('¡Correcto!');
    } else {
        alert('Incorrecto. ' + question.explicacion);
    }
    nextQuestion();
}

// Mostrar la siguiente pregunta
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        alert('¡Cuestionario completado!');
        quizContainer.innerHTML = '<h2>¡Has completado el cuestionario!</h2>';
    }
}

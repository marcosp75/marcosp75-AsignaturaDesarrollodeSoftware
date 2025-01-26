const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let questions = [];

// Cargar preguntas del archivo JSON
fetch('questions_complete.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        questions = data;
        showQuestion();
    })
    .catch(error => {
        console.error('Error fetching questions:', error);
        quizContainer.innerHTML = '<p>Sorry, there was an error loading the quiz questions.</p>';
    });

// Mostrar la pregunta actual
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.pregunta;
    answersContainer.innerHTML = '';

    currentQuestion.respuestas.forEach((respuesta, index) => {
        const answerButton = document.createElement('button');
        answerButton.textContent = respuesta;
        answerButton.classList.add('answer-btn');
        answerButton.addEventListener('click', () => checkAnswer(index));
        answersContainer.appendChild(answerButton);
    });
}

// Verificar la respuesta
function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = currentQuestion.respuestas[selectedIndex] === currentQuestion.respuesta_correcta;
    const feedback = document.createElement('p');
    feedback.textContent = isCorrect ? '¡Correcto!' : `Incorrecto. ${currentQuestion.explicacion}`;
    feedback.classList.add(isCorrect ? 'correct' : 'incorrect');
    quizContainer.appendChild(feedback);

    setTimeout(() => {
        feedback.remove();
        nextQuestion();
    }, 2000);
}

// Mostrar la siguiente pregunta
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        quizContainer.innerHTML = '<h2>¡Has completado el cuestionario!</h2>';
    }
}
```

### Changes made:
- Added error handling for the fetch request.
- Replaced `alert` with DOM elements for feedback.
- Improved function and variable names for clarity.
- Used `const` and `let` appropriately.

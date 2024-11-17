let questions = [];
let currentQuestion = 0;

// Cargar preguntas desde el archivo JSON
fetch('questions_complete.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    loadQuestion();
  })
  .catch(error => console.error('Error al cargar preguntas:', error));

// Cargar la pregunta actual
function loadQuestion() {
  const questionContainer = document.getElementById("question");
  const optionsContainer = document.getElementById("options");
  const nextButton = document.getElementById("next-button");
  const result = document.getElementById("result");

  // Limpiar contenido anterior
  questionContainer.textContent = '';
  optionsContainer.innerHTML = '';
  result.textContent = '';
  nextButton.style.display = 'none';

  // Cargar nueva pregunta
  const question = questions[currentQuestion];
  questionContainer.textContent = question.question;

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(index);
    optionsContainer.appendChild(button);
  });
}

// Validar respuesta seleccionada
function checkAnswer(selected) {
  const question = questions[currentQuestion];
  const result = document.getElementById("result");
  const nextButton = document.getElementById("next-button");

  if (selected === question.correctAnswer) {
    result.textContent = "¡Correcto!";
    result.style.color = "green";
  } else {
    result.textContent = `Incorrecto. La respuesta correcta es: "${question.options[question.correctAnswer]}". ${question.explanation}`;
    result.style.color = "red";
  }

  nextButton.style.display = 'inline-block';
}

// Pasar a la siguiente pregunta
function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    alert("¡Has completado el test!");
  }
}

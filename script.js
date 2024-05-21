let questionsData = [];
let currentQuestionIndex = 0;
let totalCost = 0; //donde guardare el total del costo a valer de la app
let selectedOptionsCosts = []; // Para guardar la ultima seleccion del valor del json
document.addEventListener('DOMContentLoaded', () => {
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            questionsData = data;
            selectedOptionsCosts = Array(questionsData.length).fill(0); // Inicializar el array con ceros ya que si no cuando reste el valor me da error Nan
            loadQuestion(currentQuestionIndex);
        })
        .catch(error => console.error('Error al cargar las preguntas:', error));
});

function loadQuestion(index) {
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = '';

    const question = questionsData[index];
    const questionText = document.createElement('p');
    questionText.textContent = question.question;
    questionContainer.appendChild(questionText);

    question.options.forEach(option => {
        const optionContainer = document.createElement('div');
        optionContainer.className = 'option-container';

        const optionImage = document.createElement('img');
        optionImage.src = option.image;
        optionImage.alt = option.text;
        optionImage.className = 'option-image';

        const optionBtn = document.createElement('button');
        optionBtn.textContent = option.text;
        optionBtn.onclick = () => selectOption(index, option.cost);

        optionContainer.appendChild(optionImage);
        optionContainer.appendChild(optionBtn);
        questionContainer.appendChild(optionContainer);
    });

    document.getElementById('prevBtn').style.display = index > 0 ? 'block' : 'none';
}

function selectOption(index, cost) {
    // Restar el costo anterior antes de actualizarlo
    totalCost -= selectedOptionsCosts[index];
    // Actualizar el costo seleccionado
    selectedOptionsCosts[index] = cost;
    // Agregar el nuevo costo seleccionado
    totalCost += cost;
    document.getElementById('totalCost').textContent = totalCost;

    if (index < questionsData.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    } else {
        alert('Has completado todas las preguntas.');
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        // Restar el costo de la opción previamente seleccionada
        totalCost -= selectedOptionsCosts[currentQuestionIndex];
        document.getElementById('totalCost').textContent = totalCost;

        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
}

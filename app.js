// Initialize quiz state
let currentQuestionIndex = 0;
let score = 0;

// Initialize quiz elements
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const startBtn = document.getElementById("start-btn");
const startAgainBtn = document.getElementById("start-again-btn");
const toggleBtn = document.getElementById("toggle-theme");
const loadingScreen = document.getElementById("loading-screen");
const loadingSound = document.getElementById("loading-sound");
const correctSound = document.getElementById("correct-sound");
const incorrectSound = document.getElementById("incorrect-sound");
const startSound = document.getElementById("start-sound");
const endSound = document.getElementById("end-sound");

// Theme toggle functionality
let isDark = false;

// Initialize theme based on system preference
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
if (prefersDarkScheme.matches) {
  document.body.classList.add('dark-mode');
  isDark = true;
  toggleBtn.textContent = "Light Mode";
} else {
  toggleBtn.textContent = "Dark Mode";
}

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
  if (e.matches) {
    document.body.classList.add('dark-mode');
    isDark = true;
    toggleBtn.textContent = "Light Mode";
  } else {
    document.body.classList.remove('dark-mode');
    isDark = false;
    toggleBtn.textContent = "Dark Mode";
  }
});

// Theme toggle functionality
toggleBtn.addEventListener("click", () => {
  isDark = !isDark;
  document.body.classList.toggle("dark-mode", isDark);
  toggleBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
});

// Next button event listener
nextBtn.addEventListener('click', () => {
  // Play sound effect
  nextBtn.classList.add('clicked');
  setTimeout(() => {
    nextBtn.classList.remove('clicked');
  }, 200);
  
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    questionEl.textContent = `Quiz Completed! Your score: ${score}/${questions.length}`;
    nextBtn.style.display = 'none';
    endSound.play();
  }
});

// Choice selection event listener
choicesEl.addEventListener('click', (e) => {
  const selectedChoice = e.target;
  if (!selectedChoice) return;
  
  const isCorrect = selectedChoice.dataset.correct === 'true';
  
  // Play sound effect
  if (isCorrect) {
    correctSound.play();
    feedbackEl.innerHTML = '<span style="color: #10b981;">✅ Correct!</span>';
  } else {
    incorrectSound.play();
    feedbackEl.innerHTML = '<span style="color: #ef4444;">❌ Incorrect!</span>';
  }
  
  // Add animation class
  selectedChoice.classList.add(isCorrect ? 'correct' : 'incorrect');
  
  // Disable other choices
  const choices = choicesEl.querySelectorAll('li');
  choices.forEach(choice => {
    choice.style.pointerEvents = 'none';
  });
});

// Function to show current question
function showQuestion() {
  if (currentQuestionIndex < questions.length) {
    const question = questions[currentQuestionIndex];
    questionEl.textContent = question.question;
    choicesEl.innerHTML = '';
    feedbackEl.textContent = '';
    
    // Create choice buttons with animations
    question.choices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.dataset.correct = choice === question.answer;
      li.style.opacity = '0';
      li.style.transform = 'translateY(20px)';
      
      // Add animation when inserted
      choicesEl.appendChild(li);
      setTimeout(() => {
        li.style.opacity = '1';
        li.style.transform = 'translateY(0)';
      }, 100);
    });
  }
}

// Function to start the quiz
function startQuiz() {
  // Reset quiz state
  currentQuestionIndex = 0;
  score = 0;
  
  // Play start sound
  startSound.play();
  
  // Hide start button
  startBtn.style.display = 'none';
  
  // Show question elements
  questionEl.style.display = 'block';
  choicesEl.style.display = 'block';
  feedbackEl.style.display = 'block';
  nextBtn.style.display = 'inline-block';
  
  // Show first question
  showQuestion();
}

// Add event listener to start button
startBtn.addEventListener('click', startQuiz);

// Add event listener to start again button
startAgainBtn.addEventListener('click', () => {
  // Reset quiz state
  currentQuestionIndex = 0;
  score = 0;
  
  // Reset display
  questionEl.textContent = '';
  feedbackEl.textContent = '';
  nextBtn.style.display = 'inline-block';
  startBtn.style.display = 'block';
  startAgainBtn.style.display = 'none';
  
  // Reset choices
  choicesEl.innerHTML = '';
  
  // Show start button
  startBtn.style.display = 'block';
});

// Initialize questions from db.json
const questions = [
  {
    id: 1,
    question: "What is the capital city of Kenya?",
    choices: ["Nairobi", "Mombasa", "Kisumu", "Eldoret"],
    answer: "Nairobi"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Venus", "Jupiter"],
    answer: "Mars"
  },
  {
    id: 3,
    question: "Who wrote 'Romeo and Juliet'?",
    choices: ["Chinua Achebe", "William Shakespeare", "Ngũgĩ wa Thiong'o", "Leo Tolstoy"],
    answer: "William Shakespeare"
  },
  {
    id: 4,
    question: "What is the largest mammal in the world?",
    choices: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
    answer: "Blue Whale"
  },
  {
    id: 5,
    question: "Which country is known as the Land of the Rising Sun?",
    choices: ["China", "Japan", "South Korea", "Thailand"],
    answer: "Japan"
  },
  {
    id: 6,
    question: "What is the chemical symbol for gold?",
    choices: ["Au", "Ag", "Pb", "Fe"],
    answer: "Au"
  },
  {
    id: 7,
    question: "Who painted the Mona Lisa?",
    choices: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    answer: "Leonardo da Vinci"
  },
  {
    id: 8,
    question: "What is the main ingredient in guacamole?",
    choices: ["Tomato", "Avocado", "Pepper", "Onion"],
    answer: "Avocado"
  }
];

// Show loading screen and start quiz
function showLoadingScreen() {
  loadingScreen.style.display = 'flex';
  loadingSound.play();
  
  // Simulate loading delay
  setTimeout(() => {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      startBtn.style.display = 'block';
    }, 300);
  }, 2000);
}

// Start loading screen when page loads
showLoadingScreen();

function checkAnswer(selected, correct) {
  const buttons = document.querySelectorAll('.choice-btn');
  buttons.forEach(btn => btn.disabled = true);

  if (selected === correct) {
    feedbackEl.textContent = " Correct!";
    feedbackEl.textContent = "✅ Correct!";
    score++;
    buttons.forEach(btn => {
      if (btn.textContent === selected) {
        btn.classList.add('correct');
      }
    });
    correctSound.currentTime = 0;
    correctSound.play();
    updateScoreDisplay();
  } else {
    feedbackEl.textContent = ` Wrong! Correct answer: ${correct}`;
    buttons.forEach(btn => {
      if (btn.textContent === correct) {
        btn.classList.add('correct');
      } else if (btn.textContent === selected) {
        btn.classList.add('incorrect');
      }
    });
    incorrectSound.currentTime = 0;
    incorrectSound.play();
  }

  // Automatically go to next question after 2 seconds
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }, 2000);
}

//function checkAnswer(selected, correct) {
  //const buttons = document.querySelectorAll("button");
  //buttons.forEach(btn => btn.disabled = true);
  //if (selected === correct) {
    //feedbackEl.textContent = "✅ Correct!";
    //score++;
  //} else {
    //feedbackEl.textContent = `❌ Wrong! Correct answer: ${correct}`;
  //}

  //nextBtn.style.display = "inline-block";
//}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
});

startAgainBtn.addEventListener("click", () => {
  resetQuiz();
});

function endQuiz() {
  questionEl.textContent = `Quiz finished! Your score: ${score} / ${questions.length}`;
  
  if (score === questions.length) {
    feedbackEl.textContent = "🏆 Congratulations! Perfect score!";
  }
  else if (score >= questions.length / 2) {
    feedbackEl.textContent = "👍 Good job!";
  }
  else {
    feedbackEl.textContent = "😔 Better luck next time!";
  }
  
  // Show Start Again button and hide Next button
  nextBtn.style.display = "none";
  startAgainBtn.style.display = "inline-block";
  
  // Play end sound
  endSound.currentTime = 0;
  endSound.play();
  
  // Reset all choices
  const choices = choicesEl.querySelectorAll('li');
  choices.forEach(choice => {
    choice.style.backgroundColor = '';
    choice.style.pointerEvents = 'auto';
  });
  choicesEl.innerHTML = "";
  nextBtn.style.display = "none";
  startAgainBtn.style.display = "inline-block";
  
  // Hide score display
  scoreDisplay.style.display = 'none';
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (nextBtn.style.display !== "none") nextBtn.click();
  }
});

function resetQuiz() {
  // Reset all state variables
  currentQuestionIndex = 0;
  score = 0;
  
  // Reset UI elements
  choicesEl.innerHTML = "";
  questionEl.textContent = "Loading...";
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";
  startAgainBtn.style.display = "none";
  
  // Fetch new questions
  fetch('https://json-quiz-project-server.onrender.com/questions')
    .then(res => res.json())
    .then(data => {
      questions = data;
      showQuestion();
    })
    .catch(err => {
      questionEl.textContent = 'Error loading quiz. Please try again later.';
      console.error(err);
    });
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (nextBtn.style.display !== "none") nextBtn.click();
  }
});

function endQuiz() {
  questionEl.textContent = `Quiz finished! Your score: ${score} / ${questions.length}`;
  
  if (score === questions.length) {
    feedbackEl.textContent = "🏆 Congratulations! Perfect score!";
  }
  else if (score >= questions.length / 2) {
    feedbackEl.textContent = "👍 Good job!";
  }
  else {
    feedbackEl.textContent = "😔 Better luck next time!";
  }
  
  // Show Start Again button and hide Next button
  nextBtn.style.display = "none";
  startAgainBtn.style.display = "inline-block";
  
  // Reset all choices
  const choices = choicesEl.querySelectorAll('li');
  choices.forEach(choice => {
    choice.style.backgroundColor = '';
    choice.style.pointerEvents = 'auto';
  });
  }
  choicesEl.innerHTML = "";
  nextBtn.style.display = "none";
  startAgainBtn.style.display = "inline-block";
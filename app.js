let currentQuestionIndex = 0;
let questions = [];
let score = 0;

// Initialize quiz elements
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const startAgainBtn = document.getElementById("start-again-btn");
const toggleBtn = document.getElementById("toggle-theme");

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

// Add hover effect for theme toggle button
toggleBtn.addEventListener("mouseover", () => {
  toggleBtn.style.transform = "scale(1.05)";
});
toggleBtn.addEventListener("mouseout", () => {
  toggleBtn.style.transform = "scale(1)";
});

fetch("http://localhost:3000/questions")
  .then(res => res.json())
  .then(data => {
    questions = data;
    showQuestion();
  })
  .catch(err => {
    questionEl.textContent = "load quiz.";
    console.error(err);
  });

function showQuestion() {
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";
  const question = questions[currentQuestionIndex];
  questionEl.textContent = question.question;
  choicesEl.innerHTML = "";

  // Create choice buttons
  question.choices.forEach(choice => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.classList.add('choice-btn');
    li.appendChild(btn);
    choicesEl.appendChild(li);
  });

  // Add event listeners to choice buttons
  const choiceButtons = document.querySelectorAll('.choice-btn');
  choiceButtons.forEach(button => {
    button.addEventListener('click', function() {
      const selected = this.textContent;
      checkAnswer(selected, question.answer);
    });
  });
}

function checkAnswer(selected, correct) {
  const buttons = document.querySelectorAll('.choice-btn');
  buttons.forEach(btn => btn.disabled = true);

  if (selected === correct) {
    feedbackEl.textContent = "✅ Correct!";
    score++;
    buttons.forEach(btn => {
      if (btn.textContent === selected) {
        btn.classList.add('correct');
      }
    });
  } else {
    feedbackEl.textContent = ` Wrong! Correct answer: ${correct}`;
    buttons.forEach(btn => {
      if (btn.textContent === correct) {
        btn.classList.add('correct');
      } else if (btn.textContent === selected) {
        btn.classList.add('incorrect');
      }
    });
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
    feedbackEl.textContent = "Congratulations! Perfect score!";
  }
  else if (score >= questions.length / 2) {
    feedbackEl.textContent = "Good job!";
  }
  choicesEl.innerHTML = "";
  nextBtn.style.display = "none";
  startAgainBtn.style.display = "inline-block";
}

function resetQuiz() {
  choicesEl.innerHTML = "";
  questionEl.textContent = "";
  nextBtn.style.display = "none";
  startAgainBtn.style.display = "none";
  fetch("http://localhost:3000/questions")
    .then(res => res.json())
    .then(data => {
      questions = data;
      showQuestion();
    })
    .catch(err => {
      questionEl.textContent = "loading quiz.";
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
  choicesEl.innerHTML = "";
  nextBtn.style.display = "none";
  startAgainBtn.style.display = "inline-block";}
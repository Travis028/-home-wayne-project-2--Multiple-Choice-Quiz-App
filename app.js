let currentQuestionIndex = 0;
let questions = [];
let score = 0;
 
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");

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

  question.choices.forEach(choice => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => checkAnswer(choice, question.answer);
    li.appendChild(btn);
      choicesEl.appendChild(li);
  });
}
function checkAnswer(selected, correct) {
  const buttons = document.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);

  if (selected === correct) {
    feedbackEl.textContent = "✅ Correct!";
    score++;
  } else {
    feedbackEl.textContent = `❌ Wrong! Correct answer: ${correct}`;
  }

  // Automatically go to next question after 2 seconds
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }, 2000); // wait 2 seconds
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

function endQuiz() {
  questionEl.textContent = `Quiz finished! Your score: ${score} / ${questions.length}`;
  
  if (score === questions.length) {
    feedbackEl.textContent = "🎉 Perfect score!";
  }
  else if (score >= questions.length / 2) {
    feedbackEl.textContent = "👍 Good job!";

  }

  choicesEl.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";
}

const questions = [
    {
      question: "Which language runs in a web browser?",
      answers: [
        { text: "Java", correct: false },
        { text: "C", correct: false },
        { text: "Python", correct: false },
        { text: "JavaScript", correct: true }
      ]
    },
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Central Style Sheets", correct: false },
        { text: "Cascading Style Sheets", correct: true },
        { text: "Cascading Simple Sheets", correct: false },
        { text: "Cars SUVs Sailboats", correct: false }
      ]
    },
    {
      question: "What does HTML stand for?",
      answers: [
        { text: "Hypertext Markup Language", correct: true },
        { text: "Hyperloop Machine Language", correct: false },
        { text: "Helicopters Terminals Motorboats Lamborghinis", correct: false },
        { text: "None of the above", correct: false }
      ]
    },
    {
      question: "What year was JavaScript launched?",
      answers: [
        { text: "1996", correct: false },
        { text: "1995", correct: true },
        { text: "1994", correct: false },
        { text: "None of the above", correct: false }
      ]
    },
    {
      question: "Which tag is used to link a CSS file?",
      answers: [
        { text: "<link>", correct: true },
        { text: "<style>", correct: false },
        { text: "<script>", correct: false },
        { text: "<css>", correct: false }
      ]
    },
    {
      question: "Inside which HTML element do we put the JavaScript?",
      answers: [
        { text: "<script>", correct: true },
        { text: "<javascript>", correct: false },
        { text: "<js>", correct: false },
        { text: "<code>", correct: false }
      ]
    },
    {
      question: "What does DOM stand for?",
      answers: [
        { text: "Document Object Model", correct: true },
        { text: "Display Object Management", correct: false },
        { text: "Digital Ordinance Model", correct: false },
        { text: "Desktop Object Model", correct: false }
      ]
    },
    {
      question: "Which company developed JavaScript?",
      answers: [
        { text: "Netscape", correct: true },
        { text: "Microsoft", correct: false },
        { text: "Sun Microsystems", correct: false },
        { text: "Oracle", correct: false }
      ]
    },
    {
      question: "What is the correct syntax to refer to an external script?",
      answers: [
        { text: '<script src="app.js">', correct: true },
        { text: '<script href="app.js">', correct: false },
        { text: '<script ref="app.js">', correct: false },
        { text: '<script name="app.js">', correct: false }
      ]
    },
    {
      question: "How do you write 'Hello World' in an alert box?",
      answers: [
        { text: "msgBox('Hello World');", correct: false },
        { text: "alert('Hello World');", correct: true },
        { text: "msg('Hello World');", correct: false },
        { text: "alertBox('Hello World');", correct: false }
      ]
    }
  ];
  
  const startBtn = document.getElementById("start-btn");
  const playerNameInput = document.getElementById("player-name");
  const startBox = document.getElementById("start-box");
  const quizBox = document.getElementById("quiz-box");
  const questionEl = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const progressBar = document.getElementById("progress-bar");
  const resultBox = document.getElementById("result-box");
  const resultText = document.getElementById("result-text");
  const restartBtn = document.getElementById("restart-btn");
  
  let shuffledQuestions, currentQuestionIndex, score = 0, playerName = "", timer, answered, questionCount = 0;
  
  startBtn.addEventListener("click", () => {
    playerName = playerNameInput.value.trim();
    if (playerName === "") {
      alert("Please enter your name!");
      return;
    }
    startBox.style.display = "none";
    quizBox.style.display = "block";
    shuffledQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 10);
    currentQuestionIndex = 0;
    score = 0;
    questionCount = 0;
    showQuestion();
  });
  
  restartBtn.addEventListener("click", () => {
    resultBox.style.display = "none";
    startBox.style.display = "block";
    playerNameInput.value = "";
  });
  
  function showQuestion() {
    resetState();
    answered = false;
    const current = shuffledQuestions[currentQuestionIndex];
    questionEl.innerText = `Q${currentQuestionIndex + 1}. ${current.question}`;
  
    current.answers.forEach(answer => {
      const btn = document.createElement("button");
      btn.innerText = answer.text;
      btn.classList.add("btn");
      btn.dataset.correct = answer.correct;
      btn.addEventListener("click", selectAnswer);
      answerButtons.appendChild(btn);
    });
  
    startProgressBar();
  }
  
  function resetState() {
    clearInterval(timer);
    progressBar.style.width = "100%";
    answerButtons.innerHTML = "";
  }
  
  function startProgressBar() {
    let timeLeft = 10; // 10 seconds countdown
    timer = setInterval(() => {
      timeLeft--;
      progressBar.style.width = `${(timeLeft / 10) * 100}%`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        if (!answered) {
          nextQuestion();
        }
      }
    }, 1000);
  }
  
  function selectAnswer(e) {
    if (answered) return;
    answered = true;
    clearInterval(timer);
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct === "true";
  
    // Apply green for correct answer, red for incorrect answer
    if (correct) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("incorrect");
    }
  
    // Show correct/incorrect for all buttons
    Array.from(answerButtons.children).forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.correct === "true") {
        btn.classList.add("correct");
      } else if (btn !== selectedBtn) {
        btn.classList.add("incorrect");
      }
    });
  
    questionCount++;
    if (questionCount < 5) {
      setTimeout(nextQuestion, 1000);
    } else {
      setTimeout(showResult, 1000);
    }
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }
  
  function showResult() {
    quizBox.style.display = "none";
    resultBox.style.display = "block";
    resultText.innerText = `${playerName}, you scored ${score} out of 5!`;
  }
  
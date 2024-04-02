const questions=[
    {
        question: "What does DoS stand for??",
        answers: [
            {text:"Distribution of service", correct:false},
            {text:"Destruction of service", correct:false},
            {text:"Denial of service", correct:true},
            
        ]
    },
    {
        question: "A cybercriminal might ask for a ransom fee to restore access to a service they have taken down with a DoS attack. True or false?",
        answers: [
            {text:"True", correct:true},
            {text:"False", correct:false},
        ]
    },
    {
        question: "What are ways in which a DoS attack could harm your company's reputation?\n Please select all correct options",
        answers: [
            {text:"Making your website or app inaccessible", correct:true},
            {text:"Making you unable to help customers due to the internal company network being down", correct:true},
            {text:"Denial of service", correct:false},
        ]
    },
    {
        question: "What harm could a denial-of-service attack cause to your company?\n Please select all correct options",
        answers: [
            {text:"Wasting time and resources to resolve", correct:true},
            {text:"Damaging the company reputation", correct:true},
            {text:"A DoS attack won't actually cause any harm", correct:false},
            
        ]
    },
    {
        question: "What is a botnet?",
        answers: [
            {text:"A network of devices used to carry out distributed denial of service attacks", correct:true},
            {text:"A malicious script created by a cyber criminal", correct:false},
            {text:"A robot used to infiltrate offices", correct:false},
            
        ]
    },
    {
        question: "How does a DoS attack take down servers and web applications?",
        answers: [
            {text:"By overloading them with connection attempts", correct:true},
            {text:"By disconnecting them from the power supply", correct:false},
            {text:"By intruding into the building the servers are stored in", correct:false},
            
        ]
    },
    {
        question: "What does a DoS attack do to a website or service?",
        answers: [
            {text:"Infects them with malware", correct:false},
            {text:"Makes them unusable", correct:true},
            {text:"Makes them more expensive", correct:false},
            
        ]
    },
    {
        question: "If your device is infected with malware, it could be used to carry out a DDoS attack as part of a botnet. True or false?",
        answers: [
            {text:"True", correct:true},
            {text:"False", correct:false},
        ]
    },
    {
        question: "How can you help stop your devices from being used as part of a DDoS botnet?\n Please select all correct options",
        answers: [
            {text:"Ensure that your operating system has the latest security patches", correct:true},
            {text:"Run regular anti-malware scans", correct:true},
            {text:"Open all ports in your connection manager", correct:false},
            {text:"Avoid browsing illegal or suspicious websites",correct:true}
            
        ]
    },
    {
        question: "How might avoiding clicking on links or attachments in unexpected emails help stop DDoS attacks?",
        answers: [
            {text:"It'll stop a cybercriminal from finding your IP address", correct:false},
            {text:"It'll make your device more expensive to infect with malware", correct:false},
            {text:"It'll make your device less likely to be infected with botnet malware", correct:true},
            
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex =0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex +1;
    questionElement.innerHTML=questionNo + ". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    const isAlreadyCorrect = selectedBtn.classList.contains("correct");
  
    if (isCorrect) {
      selectedBtn.classList.toggle("correct");
      if (!isAlreadyCorrect) {
        score++;
      }
    } else {
      selectedBtn.classList.add("incorrect");
      disableAnswerButtons();
      score--;
    }
  
    nextButton.style.display = "block";
  }
  
  function disableAnswerButtons() {
    const buttons = Array.from(answerButtons.children);
    buttons.forEach((button) => {
      button.disabled = true;
    });
  }
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
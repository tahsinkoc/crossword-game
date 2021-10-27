let alphabet = ['a', 'b', 'c', 'ç', 'd', 'e', 'f', 'g', 'ğ', 'h', 'ı', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'ö', 'p', 'r', 's', 'ş', 't', 'u', 'ü', 'v', 'y', 'z'];
let randomLetters = [];
let arr = [];
fetch('/script/questions.json')
    .then(response => response.json())
    .then(questions => {
        let queueNumber = 0;
        let quesControl = 0;
        let goNext = document.getElementById('goNext')
        let totalQuestion = document.getElementById('totalQuestion')
        let questionC = document.getElementById('question')
        let inQuestion = document.getElementById('inQuestion')
        let answerBox = document.getElementById('answerBox')
        let stackBoxParent = document.getElementById('stackBox')
        let answerLetter = document.getElementsByClassName('answer-letter-box')
        let stackBR = document.getElementsByClassName('stack-box')
        totalQuestion.textContent = questions.length
        questionViewer(queueNumber);
        answerLetterBoxCreator(queueNumber);
        checkResult()
        goNext.addEventListener('click', function () {
            if (queueNumber >= questions.length - 1) {
                alert('Bütün Bulmacaları Gördünüz')
            }
            else {
                for (let j = -1; j < questions[queueNumber].answer.length; j++) {
                    if (answerLetter.length > 0) {
                        answerLetter[0].remove()
                    }
                }
                for (let geti = 0; geti < arr.length; geti++) {
                    if (stackBR.length > 0) {
                        stackBR[0].remove()
                    }
                }
                randomLetters = [];
                arr = [];
                queueNumber++
                questionViewer(queueNumber)
                answerLetterBoxCreator(queueNumber)
                checkResult()
            }
        })
        function questionViewer(index) {
            questionC.textContent = questions[index].question
            inQuestion.textContent = index + 1
        }
        function answerLetterBoxCreator(index) {
            for (let t = 0; t < 5; t++) {
                let letter = Math.floor(Math.random() * questions[index].answer.length)
                randomLetters.push(alphabet[letter])
            }
            for (let i = 0; i < questions[index].answer.length; i++) {
                let answerLetterBox = document.createElement('div')

                answerLetterBox.className = 'answer-letter-box'
                randomLetters.push(questions[index].answer[i])
                answerLetterBox.id = questions[index].answer[i]
                answerBox.appendChild(answerLetterBox)
            }
            for (let r = 0; r < randomLetters.length * 11; r++) {
                if (randomLetters.length > 0) {
                    let rndmNumber = Math.floor(Math.random() * randomLetters.length)
                    arr.push(randomLetters[rndmNumber])
                    randomLetters.splice(rndmNumber, 1)
                }
            }
            for (let arg = 0; arg < arr.length; arg++) {
                let stackBox = document.createElement('div')
                stackBox.className = 'stack-box'
                stackBox.id = arr[arg]
                stackBox.textContent = arr[arg]
                // stackBox.setAttribute('onclick', 'checkResult(this.id)')
                stackBoxParent.appendChild(stackBox)
            }
        }
        function checkResult() {
            for (let chk = 0; chk < stackBR.length; chk++) {
                stackBR[chk].addEventListener('click', function () {
                    let idKepper = stackBR[chk].id
                    for (let thk = 0; thk < answerLetter.length; thk++) {
                        if (idKepper == answerLetter[thk].id) {
                            answerLetter[thk].setAttribute('class', 'answer-letter-box true')
                            answerLetter[thk].textContent = answerLetter[thk].id

                            stackBR[chk].setAttribute('class', 'stack-box true')
                            quesControl++
                        }
                    }
                })
            }
        }
    })

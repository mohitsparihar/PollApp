function createPoll(options) {

    return {
        id: Date.now(),
        status: options.status,
        private: options.priavate,
        author: options.userId,
        question: options.question,
        answers: options.answers.map(answer => createAnswer(answer))
    }
}

function createAnswer(text){
    return {
        text: text,
        count: 0
    };
}

function renderPoll(poll) {
    return `<section> 
            <h1>${poll.title}</h1>
            <h2>${poll.question}</h2>
        </section>`;
}

const app = (function() {
    let noOfOptions = 0;
    let that;
    return {
        init: function(){
            this.cacheElements();
            this.bindElements();
            // this.createAnswerRow();
            that = this;
        },
        cacheElements: function() {
            this.createPollBtn = document.querySelector('#createPollBtn');
            this.questionTextBox = document.querySelector('#questionText');
            this.addNewOptionBtn = document.getElementById('addNewOptionBtn');
            this.optionsWrapper = document.querySelector('.options-wrapper');
            this.answerTextBoxes = document.getElementsByClassName('option-text')
        },
        bindElements: function() {
            this.addNewOptionBtn.addEventListener('click', this.createAnswerRow.bind(this));
            this.createPollBtn.addEventListener('click', this.createPoll.bind(this));
        },
        createAnswerRow: function() {
            const optionHTML = `<div>Option ${++noOfOptions} <input type="text" class="option-text"><button id="removeOptionBtn">-</button></div></div>`;
            this.optionsWrapper.innerHTML += optionHTML;
        },
        createPoll: function() {
            let answers = Array.from(this.answerTextBoxes).map(answerTextBox => answerTextBox.value);
            console.log(answers);
            let poll = createPoll({
                status: 'open',
                author: 'bparihar',
                question: this.questionTextBox.value,
                answers: answers
            });

            console.log(poll);
        }
    }

})();

app.init();
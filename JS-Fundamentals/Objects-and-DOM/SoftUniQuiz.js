function solve() {
    let rightAnswers = 0;
    let result = document.getElementById('result');

    document.querySelector('#exercise section button').addEventListener('click', () => {
        let answers = document.getElementsByName('softUniYear');
        let i = checkAnswers(answers);
        if (i >= 0) {
            if (i === 1) {
                rightAnswers++;
            }
            document.querySelector('.hidden').style.display = 'block';
            document.querySelector('#exercise section button').disabled = true;
        }
    });

    document.querySelector('#exercise .hidden button').addEventListener('click', () => {
       let answers = document.getElementsByName('popularName');
       let i = checkAnswers(answers);
       if (i >= 0) {
           if (i === 2){
               rightAnswers++;
           }
           let next = document.querySelectorAll('#exercise .hidden').item(1);
           next.style.display = 'block';
           document.querySelector('#exercise .hidden button').disabled = true;
       }
    });

    document.querySelectorAll('#exercise .hidden button').item(1).addEventListener('click', () =>{
        let answers = document.getElementsByName('softUniFounder');
        let i = checkAnswers(answers);
        if (i >= 0) {
            if (i === 3) {
                rightAnswers++;
            }
            if (rightAnswers === 3) {
                result.textContent = 'You are recognized as top SoftUni fan!';
            } else {
                result.textContent = `You have ${rightAnswers} right answers`;
            }
            document.querySelectorAll('#exercise .hidden button').item(1).disabled = true;
        }
    });

    function checkAnswers(answers) {
        answerIndex = -1;
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].checked) {
                answerIndex = i;
            }
        }
        return answerIndex;
    }
}

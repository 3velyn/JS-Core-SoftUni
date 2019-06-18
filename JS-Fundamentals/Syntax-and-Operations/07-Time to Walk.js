function solve(steps, footprintLength, speed) {
    let s = +steps * +footprintLength; //m
    let time = (s / ((speed * 1000) / 3600)) + Math.floor(s / 500) * 60;
    let sec = Math.round(time % 60);
    let min = Math.floor(time / 60) % 60;
    let hours = Math.floor(time / 60 / 60) % 60;

    console.log(formatTheOutput(hours, min, sec));

    function formatTheOutput(hours, min, sec) {
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (min < 10) {
            min = '0' + min;
        }
        if (sec < 10) {
            sec = '0' + sec;
        }
        time = `${hours}:${min}:${sec}`;
        return time;
    }
}

// solve(2564, 0.70, 5.5);
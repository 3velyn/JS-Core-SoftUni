function solve(day, service, time) {
    let week = true;
    let money = 0;

    // let dayOfWeek = function (day) {
    //     return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(day);
    // }

    function dayOfWeek(day) {
        switch (day) {
            case 'Monday': return week = true; break;
            case 'Tuesday': return week = true; break;
            case 'Wednesday': return week = true; break;
            case 'Thursday': return week = true; break;
            case 'Friday': return week = true; break;
            case 'Saturday': return week = false; break;
            case 'Sunday': return week = false; break;
        }
    }

    if (service === 'Fitness') {
        if (dayOfWeek(day)) {
            if (time >= 8 && time <= 15) {
                money = 5;
            } else {
                money = 7.5;
            }
        } else {
            money = 8;
        }
    }else if  (service === 'Sauna') {
        if (dayOfWeek(day)) {
            if (time >= 8 && time <= 15) {
                money = 4;
            } else {
                money = 6.5;
            }
        } else {
            money = 7;
        }
    }else if  (service === 'Instructor') {
        if (dayOfWeek(day)) {
            if (time >= 8 && time <= 15) {
                money = 10;
            } else {
                money = 12.5;
            }
        } else {
            money = 15;
        }
    }

    return money;
}

// console.log(solve('Sunday', 'Instructor', 15.00));
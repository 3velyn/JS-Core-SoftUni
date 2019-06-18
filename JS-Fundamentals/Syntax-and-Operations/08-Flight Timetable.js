function solve(arr) {
    let arrDep = arr[0];
    let town = arr[1];
    let time = arr[2];
    let flightNumber = arr[3];
    let gateNumber = arr[4];

    console.log(`${arrDep}: Destination - ${town}, Flight - ${flightNumber}, Time - ${time}, Gate - ${gateNumber}`);
}

// solve(['Arrivals', 'Paris', '02:22', 'VD17', '3']);
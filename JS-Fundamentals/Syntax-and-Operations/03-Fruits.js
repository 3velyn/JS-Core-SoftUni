function solver(fruit, weight, price) {
    weight = Number(weight);
    price = Number(price);
    let result = ((weight * price)/1000).toFixed(2);
    weight = Math.round(weight/1000 , 2).toFixed(2);
 //   weight = (weight/1000).toFixed(2);
    console.log(`I need ${result} leva to buy ${weight} kilograms ${fruit}.`);
}

 solver('orange', 2500, 1.80);
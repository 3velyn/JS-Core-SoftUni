function solve() {
  let string = document.getElementById('str').value;
  let result = document.getElementById('result');

  let slicedString = string.slice(sum(string), -(sum(string)));

  let text = slicedString
      .split(/(\d{8})/)
      .filter(x => x)
      .map(a => binaryToString(a))
      .filter(b => /[A-Za-z ]+/g.test(b))
      .join('');

  result.textContent = text;

  function sum(str) {
      let result = str;

    while (result.length > 1) {
        let temp = result
            .split('')
            .reduce((total, num) => +total + +num)
            .toString();
        result = temp;
    }
    return +result;
  }

  function binaryToString(e) {
    let decimal = parseInt(e, 2);
    return String.fromCharCode(decimal);
  }
}

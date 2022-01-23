const { Console } = require("./console");

const console = new Console();
let data = ["a", "b", "c", "d", "e"];
printRows("Permutación", getPermutations(data));

function printRows(title, data) {
  for (let i = 0; i < data.length; i++) {
    printRow(`${title}-${i}`, data[i]);
  }
}

function printRow(title, data) {
  let msg = `${title}: `;
  for (let i = 0; i < data.length; i++) {
    msg += `${data[i]} `;
  }
  console.writeln(`${msg}`);
}

function getPermutations(data) {
  let buffer = data.slice();
  let result = [buffer.slice()];
  let counters = new Array(buffer.length).fill(0);
  let column = 1;
  console.writeln(getSwapingTr(counters, buffer));
  while (column < buffer.length) {
    if (counters[column] === column) {
      console.writeln(getResetTr(counters, column));
      counters[column] = 0;
      column++;
    } else {
      swap(buffer, column, getPivot(counters, column));
      result.push(buffer.slice());
      console.writeln(getSwapingTr(counters, buffer, column, getPivot(counters, column)));
      counters[column]++;
      column = 1;
    }
  }
  return result;

  function getPivot(counters, column) {
    let result = column % 2;
    if (result === 1) {
      result = counters[column];
    }
    return result;
  }

  function swap(data, left, right) {
    let temp = data[left];
    data[left] = data[right];
    data[right] = temp;
  }

  function getResetTr(counters, i) {
    return `<tr><td></td><td>${i}</td>${getTds(counters)}</tr>`;
  }

  function getSwapingTr(counters, buffer, i, k) {
    return `<tr>${getTd("k", k)}${getTd("i", i)}${getTds(counters, "c")}${getTds(buffer)}</tr>`;
  }

  function getTd(name, value){
    return `<td ${value === undefined ? `>${name}` : `class="${name}${value}">${value}`}</td>`;
  }

  function getTds(counters, style) {
    let msg = ``;
    for (let counter of counters) {
      msg += `<td ${style === undefined? ``:`class="${style}"`}>${counter}</td>`;
    }
    return msg;
  }

}


const bills = [100, 50, 20, 10, 5, 1, 2, 0.50, 0.20, 0.10, 0.05, 0.02, 0.01];
const multItems = [];
const sumItems = [];
const rBtn = document.createElement("button");
const printBtn = document.createElement("button");
const body = document.querySelector("#table");
const buttons = document.querySelector('#buttons');
console.log(buttons);
function GeneratePage() {
  bills.forEach((element) => {
    const row = document.createElement("div");
    row.classList.add("row");

    const billItem = document.createElement("h1");
    billItem.innerText = element;
    billItem.classList.add("bill_item");

    const xItem = document.createElement("h1");
    xItem.innerText = "X";
    xItem.classList.add("x_item");

    const multItem = document.createElement("textarea");
    multItem.placeholder = "0";
    multItem.classList.add("mult_item");
    multItems.push(multItem);

    const equalsItem = document.createElement("h1");
    equalsItem.innerText = "=";
    equalsItem.classList.add("equals_item");

    const sumItem = document.createElement("h1");
    sumItem.innerText = "0.00";
    sumItem.classList.add("sum_item");
    sumItems.push(sumItem);

    row.appendChild(billItem);
    row.appendChild(xItem);
    row.appendChild(multItem);
    row.appendChild(equalsItem);
    row.appendChild(sumItem);

    body.appendChild(row);
  });

  const row = document.createElement("div");
  row.classList.add("row");
  const billItem = document.createElement("h1");
  billItem.classList.add("bill_item");

  const xItem = document.createElement("h1");
  xItem.classList.add("x_item");

  const multSum = document.createElement("h1");
  multSum.innerText = "0";
  multSum.classList.add("mult_item");
  multSum.id = "mult_sum";

  const equalsItem = document.createElement("h1");
  equalsItem.innerText = "=";
  equalsItem.classList.add("equals_item");

  const sumSum = document.createElement("h1");
  sumSum.innerText = "0.00";
  sumSum.classList.add("sum_item");
  sumSum.id = "sum_sum";

  row.appendChild(billItem);
  row.appendChild(xItem);
  row.appendChild(multSum);
  row.appendChild(equalsItem);
  row.appendChild(sumSum);

  body.appendChild(row);

  rBtn.id = "resetBtn";
  rBtn.innerText = "Reset";
  printBtn.id = 'printBtn';
  printBtn.innerText = "Print";
  buttons.appendChild(rBtn);
  buttons.appendChild(printBtn);
}

body.addEventListener("input", (event) => {
  if (event.target.classList.contains("mult_item")) {
    const row = event.target.closest(".row");
    const billItem = row.querySelector(".bill_item");
    const multItemValue = parseFloat(event.target.value);
    const billItemValue = parseFloat(billItem.innerText);
    const sum = multItemValue * billItemValue;
    const formatedSum = numeral(sum).format("0,0.00");
    const sumItem = row.querySelector(".sum_item");
    sumItem.innerText = formatedSum;
    let totalSum = 0;
    let multSum = 0;
    console.log(multItems);
    multItems.forEach((multItem) => {
      const multItemValue = parseFloat(multItem.value);
      if (!isNaN(multItemValue)) {
        const billItem = multItem.closest(".row").querySelector(".bill_item");
        const billItemValue = parseFloat(billItem.innerText);
        totalSum += multItemValue * billItemValue;
        multSum += multItemValue;
      }
    });
    const SumSumElement = body.querySelector("#sum_sum");
    SumSumElement.innerText = numeral(totalSum).format("0,0.00");
    const multSumElement = body.querySelector("#mult_sum");
    multSumElement.innerText = multSum;
  }
});

rBtn.addEventListener("click",()=>{
  multItems.forEach((multItem)=>multItem.value = null);
  sumItems.forEach((sumitem)=>sumitem.innerText = numeral(0.00).format("0,0.00"));
  document.querySelector('#sum_sum').innerText = numeral(0.00).format("0,0.00");
  document.querySelector('#mult_sum').innerText = 0;

})

printBtn.addEventListener("click",()=>{
  rBtn.style.visibility ="hidden";
  printBtn.style.visibility = "hidden";
  window.print();
  rBtn.style.visibility ="visible";
  printBtn.style.visibility = "visible";
});

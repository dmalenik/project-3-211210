// add bulletpoints inside the p tag
/*
 **income object
 ** expenditures object
 */
let income = {
  incomeItems: function () {
    return document.querySelectorAll("#income-items li p");
  },
  // button input fields values
  incomeItem: function () {
    return document.querySelector("#income-item");
  },
  incomeItemValue: function () {
    return this.incomeItem().value;
  },
  incomeAmount: function () {
    return document.querySelector("#income-amount");
  },
  incomeAmountValue: function () {
    return Number(this.incomeAmount().value);
  },
  // show 2 decimals in number
  formatIncomeAmountValue: function () {
    return this.incomeAmountValue().toFixed(2).toString();
  },
  incomeUL: function () {
    return document.querySelector("#income-items");
  },
  strongIncome: function () {
    return document.querySelector(".income div .text .sum-info");
  },
};
let expenditures = {
  exItems: function () {
    return document.querySelectorAll("#expenditures-items li p");
  },
  // button input fields values
  exItem: function () {
    return document.querySelector("#expenditures-item");
  },
  exItemValue: function () {
    return this.exItem().value;
  },
  exAmount: function () {
    return document.querySelector("#expenditures-amount");
  },
  exAmountValue: function () {
    return Number(this.exAmount().value);
  },
  // show 2 decimals in number
  formatExAmountValue: function () {
    return this.exAmountValue().toFixed(2).toString();
  },
  exUL: function () {
    return document.querySelector("#expenditures-items");
  },
  strongEx: function () {
    return document.querySelector(".expenditures div .text .sum-info");
  },
};
/*
 ** sum income and expenditures
 */
let sumIncome = () => {
  var numArrIncome = [];
  // split the p on array, extract the numbers and add the numbers to the array of numbers
  income.incomeItems().forEach((elem) => {
    // create an array of the p tag elements
    var pArrIncome = elem.innerText.split(" ");
    // extract the number value from the array
    var pArrIncomeElem = pArrIncome.find((el) => {
      return isNaN(el) == false;
    });
    var lastElemIncome = () => {
      if (isNaN(pArrIncomeElem) == false) {
        return Number(pArrIncomeElem);
      } else {
        return 0;
      }
    };
    numArrIncome.push(lastElemIncome());
  });
  // reduce the array of numbers
  // if the array is empty
  if (numArrIncome.length == 0) {
    numArrIncome.push(null);
    var sumNumArrIncome = numArrIncome.reduce((a, b) => {
      return a + b;
    });
    // if the array is full - standard scenario
  } else {
    var sumNumArrIncome = numArrIncome
      .reduce((a, b) => {
        if (isNaN(a) || isNaN(b) || (isNaN(a) && isNaN(b))) {
          return b || a || null;
        } else {
          return a + b;
        }
      }, 0)
      .toFixed(2);
  }
  // add the sum from the array of numbers in the strong tag
  var chooseTheFormatAnswerIncome = () => {
    // if sumNumArrIncome doesn't equal 0 - return a string
    if (sumNumArrIncome != null) {
      return `${sumNumArrIncome} PLN`;
    }
    // if sumNumArrIncome equals 0 - do not return a string
    else {
      return sumNumArrIncome;
    }
  };
  income.strongIncome().innerText = chooseTheFormatAnswerIncome();
  return income.strongIncome();
};
let sumEx = () => {
  var numArrEx = [];
  // split the p on array and add the numbers to the array of numbers
  expenditures.exItems().forEach((elem) => {
    // create the array of the p tag elements
    var pArrEx = elem.innerText.split(" ");
    // extract the number value from the array
    var pArrExElem = pArrEx.find((el) => {
      return isNaN(el) == false;
    });
    var lastElemEx = () => {
      if (isNaN(pArrExElem) == false) {
        return Number(pArrExElem);
      } else {
        return 0;
      }
    };
    numArrEx.push(lastElemEx());
  });
  // reduce the array of numbers
  // if the array is empty
  if (numArrEx.length == 0) {
    numArrEx.push(null);
    var sumNumArrEx = numArrEx.reduce((a, b) => {
      return a + b;
    });
    // if the array is full - standard scenario
  } else {
    var sumNumArrEx = numArrEx
      .reduce((a, b) => {
        if (isNaN(a) || isNaN(b) || (isNaN(a) && isNaN(b))) {
          return b || a || null;
        } else {
          return a + b;
        }
      }, 0)
      .toFixed(2);
  }
  // add the sum from the array of numbers in the strong tag
  var chooseTheFormatAnswerEx = () => {
    // if sumNumArrEx doesn't equal 0 - return a string
    if (sumNumArrEx != null) {
      return `${sumNumArrEx} PLN`;
    }
    // if sumNumArrEx equals 0 - do not return a string
    else {
      return sumNumArrEx;
    }
  };
  expenditures.strongEx().innerText = chooseTheFormatAnswerEx();
  return expenditures.strongEx();
};
/*
 ** actions on submit button for income
 ** actions on submit button for expenditures
 */
let showIncomeEntry = () => {
  var incomeEntry = `${income.incomeItemValue()} ${income.formatIncomeAmountValue()} PLN`;
  var p = document.createElement("p");
  p.setAttribute("class", "text-break w-50 p-2 mb-0 me-3");
  // mark the entry in green if the amount of the income entry is greater than 100
  if (income.incomeAmountValue() >= 100.0) {
    p.setAttribute("style", "color: green;");
  }
  p.innerText = incomeEntry;
  return p;
};
let showIncomeList = () => {
  var li = document.createElement("li");
  li.setAttribute(
    "class",
    "d-flex flex-row justify-content-start align-items-center flex-nowrap list-group-item"
  );
  li.setAttribute("style", "width: 100%;");
  li.appendChild(showIncomeEntry());
  li.appendChild(createEditButton());
  li.appendChild(createDeleteButton());
  // sum the general amount
  if (li) {
    sumIncome();
  }
  income.incomeUL().appendChild(li);
  return income.incomeUL();
};
let showExpendituresEntry = () => {
  var exEntry = `${expenditures.exItemValue()} ${expenditures.formatExAmountValue()} PLN`;
  var p = document.createElement("p");
  p.setAttribute("class", "text-break w-50 p-2 mb-0 me-3");
  // mark the entry in red if the amount of the expenditures entry is greater than 100
  if (expenditures.exAmountValue() >= 100.0) {
    p.setAttribute("style", "color: red;");
  }
  p.innerText = exEntry;
  return p;
};
let showExpendituresList = () => {
  var li = document.createElement("li");
  li.setAttribute(
    "class",
    "d-flex flex-row justify-content-start align-items-center flex-nowrap list-group-item"
  );
  li.setAttribute("style", "width: 100%;");
  li.appendChild(showExpendituresEntry());
  li.appendChild(createEditButton());
  li.appendChild(createDeleteButton());
  // sum the general amount
  if (li) {
    sumEx();
  }
  expenditures.exUL().appendChild(li);
  return expenditures.exUL();
};
/*
 ** edit button and its scenarios
 ** delete button and its scenarios
 */
let createEditButton = () => {
  var editButton = document.createElement("input");
  editButton.setAttribute("type", "button");
  editButton.setAttribute("value", "Edit");
  editButton.setAttribute("class", "w-25 py-1 me-2");
  editButton.setAttribute("onclick", "editOnclick()");
  return editButton;
};
let addPLN = () => {
  // select the text of 1st child element of li tag
  var activeItem = document.activeElement.parentElement.firstElementChild;
  var splitActiveItem = activeItem.innerText.split(" ");
  // if the array is empty
  if (splitActiveItem == "") {
    return (activeItem.innerText = "Empty string");
  }
  // last element in the array
  var lastEl = splitActiveItem.findLast((el) => {
    return el;
  });
  // numeric value in the array
  var nanEl = splitActiveItem.find((el) => {
    return isNaN(el) == false;
  });
  var indexNanEl = splitActiveItem.findIndex((el) => {
    return el === nanEl;
  });
  if (
    // if no PLN text in general
    lastEl != "PLN" &&
    isNaN(lastEl) == false
  ) {
    var indexLastElem = splitActiveItem.findLastIndex((el) => {
      return el;
    });
    var formatNumber = Number(lastEl).toFixed(2).toString();
    // replace the values in the array
    splitActiveItem.splice(indexLastElem, 1, formatNumber);
    splitActiveItem.push("PLN");
    var createStringFromArray = splitActiveItem.join(" ");
    return (activeItem.innerText = createStringFromArray);
  } else if (
    // if only some letters exist
    (lastEl.length < 3 && lastEl.length >= 1) ||
    // if after number is another title than PLN
    (lastEl != "PLN" && isNaN(lastEl) && nanEl)
  ) {
    splitActiveItem.pop();
    splitActiveItem.push("PLN");
    var createStringFromArray = splitActiveItem.join(" ");
    return (activeItem.innerText = createStringFromArray);
  } else if (isNaN(lastEl) && lastEl != "PLN") {
    // if no values in the field - do not input the PLN
    var createStringFromArray = splitActiveItem.join(" ");
    return (activeItem.innerText = createStringFromArray);
  } else if (isNaN(lastEl) && lastEl == "PLN" && isNaN(nanEl)) {
    // if no number in the array
    splitActiveItem.pop();
    var createStringFromArray = splitActiveItem.join(" ");
    return (activeItem.innerText = createStringFromArray);
  } else {
    // if PLN text exists
    // extract index of the number element
    var formatNanEl = Number(nanEl).toFixed(2).toString();
    // change the number format in the array
    splitActiveItem.splice(indexNanEl, 1, formatNanEl);
    var createStringFromArray = splitActiveItem.join(" ");
    return (activeItem.innerText = createStringFromArray);
  }
};
let changeIncomeEntryStyle = () => {
  var activeElementFirstChild =
    document.activeElement.parentElement.firstElementChild;
  var activeElementFirstChildColor = activeElementFirstChild.style.color;
  activeElementFirstChildColor = "initial";
  var incomeEntryArr = activeElementFirstChild.innerText.split(" ");
  // find the number value in the array
  var incomeEntryNanEl = incomeEntryArr.find((el) => {
    return isNaN(el) == false;
  });
  if (activeElementFirstChildColor == "initial" && incomeEntryNanEl >= 100.0) {
    activeElementFirstChild.setAttribute("style", "color: green;");
  } else {
    activeElementFirstChild.setAttribute("style", "color: initial;");
  }
};
let changeExEntryStyle = () => {
  var activeElementFirstChild =
    document.activeElement.parentElement.firstElementChild;
  var activeElementFirstChildColor = activeElementFirstChild.style.color;
  activeElementFirstChildColor = "initial";
  var entryExArr = activeElementFirstChild.innerText.split(" ");
  var exEntryNanEl = entryExArr.find((el) => {
    return isNaN(el) == false;
  });
  if (activeElementFirstChildColor == "initial" && exEntryNanEl >= 100.0) {
    activeElementFirstChild.setAttribute("style", "color: red;");
  } else {
    activeElementFirstChild.setAttribute("style", "color: initial;");
  }
};
let setContentEdit = () => {
  var activeElement = document.activeElement;
  var activeElementFirstChild = activeElement.parentElement.firstElementChild;
  if (
    activeElement.name == createEditButton().name &&
    activeElementFirstChild.isContentEditable == false
  ) {
    activeElementFirstChild.contentEditable = true;
    activeElementFirstChild.focus();
  } else if (
    activeElement.name == createEditButton().name &&
    activeElementFirstChild.isContentEditable == true
  ) {
    activeElementFirstChild.contentEditable = false;
    activeElementFirstChild.blur();
    // set sum counter on edit scenario
    if (activeElement.parentElement.parentElement.id == "income-items") {
      addPLN();
      changeIncomeEntryStyle();
      sumIncome();
    } else if (
      activeElement.parentElement.parentElement.id == "expenditures-items"
    ) {
      // addPLNToEx();
      addPLN();
      changeExEntryStyle();
      sumEx();
    }
  }
};
let createDeleteButton = () => {
  var deleteButton = document.createElement("input");
  deleteButton.setAttribute("type", "button");
  deleteButton.setAttribute("value", "Delete");
  deleteButton.setAttribute("class", "w-25 py-1");
  deleteButton.setAttribute("onclick", "deleteOnclick()");
  return deleteButton;
};
let setContentDel = () => {
  var activeElement = document.activeElement;
  // if delete active button is defined and p tag relates to income list
  if (
    activeElement.name === createDeleteButton().name &&
    activeElement.parentElement.parentElement.id == "income-items"
  ) {
    activeElement.parentElement.remove();
    sumIncome();
  }
  // if delete active button is defined and p tag relates to expenditures list
  else if (
    activeElement.name === createDeleteButton().name &&
    activeElement.parentElement.parentElement.id == "expenditures-items"
  ) {
    activeElement.parentElement.remove();
    sumEx();
  }
};
/*
 ** BALANCE
 ** if income>expenditures - show the difference - "You can take xxx PLN"
 ** if difference = 0 - show 0 balance - "Balance is 0"
 ** if income<expenditures - show the loss - "Balance is negative. You are in xxx loss"
 */
let showBalance = () => {
  // result from the sum functions
  var strongIncomeText = sumIncome().innerText.split(" ")[0];
  var strongExText = sumEx().innerText.split(" ")[0];
  var balance = (strongIncomeText - strongExText).toFixed(2);
  var main = document.querySelector(".container main");
  var balanceHeader = document.createElement("h1");
  if (balance > 0) {
    balanceHeader.setAttribute(
      "class",
      "col-auto border border-dark balance bg-success text-white"
    );
    balanceHeader.innerText = `You can take ${balance} PLN`;
    main.insertAdjacentElement("beforeend", balanceHeader);
    // if more than 1 tag is present in the main tag
    if (main.childElementCount > 1) {
      main.lastElementChild.previousElementSibling.remove();
    }
  } else if (balance < 0) {
    balanceHeader.setAttribute(
      "class",
      "col-auto border border-dark balance bg-danger text-white"
    );
    balanceHeader.innerText = `Balance is negative. You are in ${balance} PLN loss`;
    main.insertAdjacentElement("beforeend", balanceHeader);
    // if more than 1 tag is present in the main tag
    if (main.childElementCount > 1) {
      main.lastElementChild.previousElementSibling.remove();
    }
  } else {
    balanceHeader.setAttribute(
      "class",
      "col-auto border border-dark balance bg-info text-white"
    );
    balanceHeader.innerText = "Balance is 0";
    main.insertAdjacentElement("beforeend", balanceHeader);
    // if more than 1 tag is present in the main tag
    if (main.childElementCount > 1) {
      main.lastElementChild.previousElementSibling.remove();
    }
  }
  return main;
};
/*
 ** functions to execute on click
 */
// check the addEventListener for the incomeButton out
document.incomeForm.incomeButton.addEventListener("click", submitOnClick());
console.log(document.incomeForm.incomeButton.addEventListener("click", submitOnClick()););
// function to execute while click on the submit button
let submitOnClick = () => {
  var activeElement = document.activeElement;
  var activeElementParent = activeElement.parentElement;
  if (activeElementParent.parentElement.name == "incomeForm") {
    showIncomeList();
  } else if (activeElementParent.parentElement.name == "expendituresForm") {
    showExpendituresList();
  }
  showBalance();
};
// functions to execute while click on the edit button
let editOnclick = () => {
  setContentEdit();
  showBalance();
};
// functions to execute while click on the delete button
let deleteOnclick = () => {
  setContentDel();
  showBalance();
};

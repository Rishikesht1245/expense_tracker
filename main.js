const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const clear_btn = document.getElementById('clear-btn');




// variable to hold transactions (converted to object form using JSON.parse)
const localStorageTransactions = JSON.parse(
      localStorage.getItem('transactions')
);

// variable to validate and hold transactions
// These are initialised in top as engine should always check if there are any previous transactions.
let transactions = localStorage
.getItem('transactions') !== null ? localStorageTransactions : [];


// Add transaction

function addTransaction(e) {
      e.preventDefault();  // this method cancels the event if it is cancellable ( here clicking on submit button prevent it from submitting a form)

      //validating transaction text and amount
            //.trim() method removes the white spaces.
      if(text.value.trim() === '' || amount.value.trim() ===''){
            alert('Please add a text and amount');
      }else{
            // object to hold individual transactions
            const transaction = {
                  id : generateID(),  //function will create ID based on math.random
                  text : text.value,
                  amount : +amount.value
            };

            // adding hte new transaction object to the transactions array.
            transactions.push(transaction);

            //Calling - Adding the transaction to the Dynamic list in html
            addTransactionDOM(transaction);

            //Function to update income , expense and balance.
            updateValues();

            // Adding transactions to the local storage.
            updateLocalStorage();


            //clearing the current input fields and set it to empty.
            text.value = '';
            amount.value = '';
      }
}


// Function to generate Random ID
function generateID(){
      return Math.floor(Math.random() * 100000000);
}


// Function to add the transaction to the dynamic list.
function addTransactionDOM(transaction) {
      // Get sign
      const sign = transaction.amount < 0 ? '-' : '+';
    
      const item = document.createElement('li');
    
      // Add class based on value
      item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    
      item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(
        transaction.amount
      )}</span> <button class="delete-btn" onclick="removeTransaction(${
        transaction.id
      })">x</button>`;
      
    
      list.appendChild(item);
    }


// Update Balance income and expense
function updateValues() {

      //variable to hold all transaction amounts
      const amounts = transactions.map(transaction => transaction.amount);

      // total amount
      const total = amounts.reduce((acc,item) => (acc += item),0)
      .toFixed(2); // 0 is the initial value of acc and toFixed will fix the decimal points to 2( rounding)

      //Income 
      const income = amounts.filter(item => item > 0)
                  .reduce((acc,item) => (acc  += item),0)
                  .toFixed(2);

      //expense 
      const expense = (amounts.filter(item => item < 0).reduce((acc,item) => (acc += item),0) * -1)
                        .toFixed(2);

      //.innerText only sets or retrievs the visible content of HTML element ( innerHTML will retrieves sets both visible and HTML markup content)
      balance.innerText = `$${total}`;
      money_plus.innerText = `$${income}`;
      money_minus.innerText = `$${expense}`;
}   

//Remove transaction by ID
function removeTransaction(id){
      // removing transaction from the transactions array using the id for which delete button has been clicked.
      transactions = transactions.filter(transaction => transaction.id !== id);

      updateLocalStorage();

      //to make the list Empty
      init();
}


//Update local storage Transactions
function updateLocalStorage(){
                              // key and value
      localStorage.setItem('transactions', JSON.stringify(transactions));
}


// Initialise app 
function init(){
      list.innerHTML = '';

      //Calling the transactonDOM function for all transactions currently available after deletion
      transactions.forEach(addTransactionDOM);
      updateValues();
}

init();

form.addEventListener('submit', addTransaction);

clear_btn.addEventListener('click', function(){
      alert('Please confirm if you want to exit')
      window.location.href = "https:google.com";

});




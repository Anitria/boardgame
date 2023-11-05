window.onload = function () {
  // Initialize counters to keep track of player performance
  let totalAttempts = 0;
  let successfulAttempts = 0;
  let excavatedRuins = 0;

  // Function to update the game status
  function updateGameStatus() {
    totalAttempts++;

    // Check if all ruins have been excavated
    if (board.ruins.every((ruin) => ruin.successes === ruin.size)) {
      excavatedRuins = board.ruins.length;
      document.getElementById("status").textContent = "Completed";
      assessPlayerPerformance();
    }
  }

  // Function to assess player performance and display the result
  function assessPlayerPerformance() {
    const successRate = (successfulAttempts / totalAttempts) * 100;
    const performanceMessage = `Success Rate: ${successRate.toFixed(2)}%, Total Attempts: ${totalAttempts}`;
    displayOutcomeMessage(performanceMessage);
  }

  // Function to display outcome messages
  function displayOutcomeMessage(message) {
    const outcomeMessage = document.getElementById("outcomeMessage");
    outcomeMessage.textContent = message;
  }

  // Function to handle the digging process
  function handleDig(targetCell) {
    let targetObj = board.dig(targetCell);

    if (targetObj) {
      // Display a success message
      displayOutcomeMessage('Success finding the ' + targetObj.name);
      targetCell.innerHTML = '=';
      targetCell.style.color = 'red';
      successfulAttempts++;
    }
    else {
      // Display a failure message
      displayOutcomeMessage('Failure!');
      targetCell.innerHTML = 'O';
      targetCell.style.color = 'green';
    }

    updateGameStatus();
  }

  // Function to attach the handleDig function to the "Dig" button
  function attachDigHandler() {
    document.getElementById("digButton").addEventListener("click", function () {
      // Get user input from the input fields
      const rowInput = document.getElementById("rowInput").value.toLowerCase();
      const colInput = document.getElementById("colInput").value;
      const targetCellId = "cell" + rowInput + colInput;
      const targetCell = document.getElementById(targetCellId);

      if (targetCell) {
        handleDig(targetCell);
      } else {
        // Handle invalid coordinates or input
        displayOutcomeMessage('Invalid coordinates or input');
      }
    });
  }

  // Initialize the board and attach the click event handler
  const board = new GameBoard();
  board.setBoard();

  // Attach the event handler to the "Dig" button
  attachDigHandler();

  // Initialize the previous code
  function tryDig(targetCell) {
    let targetObj = board.dig(targetCell);

    if (targetObj) {
      alert('Success finding the ' + targetObj.name);
      targetCell.innerHTML = '=';
      targetCell.style.color = 'red';
    } else {
      alert('Failure!');
      targetCell.innerHTML = 'O';
      targetCell.style.color = 'green';
    }
  }

  const cell = document.querySelector('#cellb3');
  tryDig(cell);
};

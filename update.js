const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(fieldArray) {
    this.fieldArray = fieldArray;
  }

  print() {
    for (let i = 0; i < this.fieldArray.length; i++) {
      console.log(this.fieldArray[i].toString().replace(/,/g, ""));
    }
  }

  generateField(height, width) {
  const options = [hole, fieldCharacter, fieldCharacter, fieldCharacter];
  let newField = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => options[Math.floor(Math.random() * options.length)])
  );

  newField[0][0] = pathCharacter;

  let hatPlaced = false;
  while (!hatPlaced) {
    let hatY = Math.floor(Math.random() * height);
    let hatX = Math.floor(Math.random() * width);
    if (hatY !== 0 || hatX !== 0) {
      newField[hatY][hatX] = hat;
      hatPlaced = true;
    }
  }

  this.fieldArray = newField; // <<-- Important!
}

playGame() {
  this.generateField(3, 5);
  let horizontalPath = 0;
  let verticalPath = 0;

  while (true) {
    console.clear(); // Clears terminal for cleaner display
    this.print();

    const userPath = prompt('Move j: left, i: up, k: down, l: right, or "exit": ');

    if (userPath.toLowerCase() === 'exit') {
      console.log("Thanks for playing!");
      break;
    }

    // Tracks user movement through each loop
    let newX = horizontalPath;
    let newY = verticalPath;

    // Handles user movement
    if (userPath === 'j') newX -= 1;
    else if (userPath === 'l') newX += 1;
    else if (userPath === 'i') newY -= 1;
    else if (userPath === 'k') newY += 1;
    else {
      console.log('Invalid input.');
      continue;
    }

    // Check bounds
    if (
      newX < 0 ||
      newX >= this.fieldArray[0].length ||
      newY < 0 ||
      newY >= this.fieldArray.length
    ) {
      console.log('Out of bounds!');
      this.playAgain();
      break;
    }

    // Checks whether user fell in hole or found hat
    const tile = this.fieldArray[newY][newX];

    if (tile === hole) {
      console.log('You fell into a hole!');
      this.playAgain();
      break;
    } else if (tile === hat) {
      console.log('You found your hat!');
      this.playAgain();
      break;
    }

    // Updates position and marks path
    horizontalPath = newX;
    verticalPath = newY;
    this.fieldArray[verticalPath][horizontalPath] = pathCharacter;
  }
}

  playAgain() {
    let playAgain = prompt('Play again? y/n: ');
    if (playAgain === 'y') {
      this.playGame();
    } else {
      process.exit(1);
    }
  }
}

const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);

myField.playGame();
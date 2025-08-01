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
  newField[Math.floor(Math.random() * height)][Math.floor(Math.random() * width)] = hat;

  this.fieldArray = newField; // <<-- Important!
}

  playGame() {
    this.generateField(3, 5);
    this.print();
    let horizontalPath = 0;
    let verticalPath = 0;

    let userPath;
    while (true) {
      userPath = prompt(
        'Which way? Use jikl to move or type "exit" to quit): '
      );
      if (userPath.toLowerCase() === "exit") {
        break; // Exit the loop
      }
      
      if (userPath === 'j') {
        horizontalPath += 1;
      } else if (userPath === 'l') {
        horizontalPath -= 1;
      } else if (userPath === 'i') {
        verticalPath += 1;
      } else if (userPath === 'k') {
        verticalPath -= 1;
      }

      if (horizontalPath < 0 || horizontalPath > this.fieldArray[1].length || verticalPath < 0 || verticalPath > this.fieldArray.length) {
        console.log('Oops! You moved outside the field!');
        break;
      }
      // Handles cases when user selects 'j'
      /* if (
        userPath === "j" &&
        horizontalPath > 0 &&
        horizontalPath < this.fieldArray[1].length
      ) {
        horizontalPath -= 1;

        // Handles cases for each option of hat, hole, or field character
        if (this.fieldArray[verticalPath][horizontalPath] === hat) {
          console.log("You found your hat!");
          playGame();
        } else if (this.fieldArray[verticalPath][horizontalPath] === hole) {
          console.log("Oops! You fell in a hole!");
          break;
        } else if (
          this.fieldArray[verticalPath][horizontalPath] === fieldCharacter
        ) {
          this.fieldArray[verticalPath][horizontalPath] = pathCharacter;
          this.print();
        }
      } else if (userPath === "j" && horizontalPath === 0) {
        console.log("You moved outside the field!");
        break;
      } // Handles cases when user selects 'l'
      else if (
        userPath === "l" &&
        horizontalPath === this.fieldArray[1].length
      ) {
        console.log("You moved outside the field!");
        break;
      } else if (
        userPath === "l" &&
        horizontalPath < this.fieldArray[1].length
      ) {
        horizontalPath += 1;

        // Handles cases for each option of hat, hole, or field character
        if (this.fieldArray[verticalPath][horizontalPath] === hat) {
          console.log("You found your hat!");
          break;
        } else if (this.fieldArray[verticalPath][horizontalPath] === hole) {
          console.log("Oops! You fell in a hole!");
          break;
        } else if (
          this.fieldArray[verticalPath][horizontalPath] === fieldCharacter
        ) {
          this.fieldArray[verticalPath][horizontalPath] = pathCharacter;
          this.print();
        }
      } // Handles cases when user selects 'i'
      else if (userPath === "i" && verticalPath > 0) {
        verticalPath -= 1;

        // Handles cases for each option of hat, hole, or field character
        if (this.fieldArray[verticalPath][horizontalPath] === hat) {
          console.log("You found your hat!");
          break;
        } else if (this.fieldArray[verticalPath][horizontalPath] === hole) {
          console.log("Oops! You fell in a hole!");
          break;
        } else if (
          this.fieldArray[verticalPath][horizontalPath] === fieldCharacter
        ) {
          this.fieldArray[verticalPath][horizontalPath] = pathCharacter;
          this.print();
        }
      } else if (userPath === "i" && verticalPath === 0) {
        console.log("You moved outside the field!");
        break;
      } // Handles cases when user selects 'k'
      else if (userPath === "k" && verticalPath < this.fieldArray.length) {
        verticalPath += 1;

        // Handles cases for each option of hat, hole, or field character
        if (this.fieldArray[verticalPath][horizontalPath] === hat) {
          console.log("You found your hat!");
          break;
        } else if (this.fieldArray[verticalPath][horizontalPath] === hole) {
          console.log("Oops! You fell in a hole!");
          break;
        } else if (
          this.fieldArray[verticalPath][horizontalPath] === fieldCharacter
        ) {
          this.fieldArray[verticalPath][horizontalPath] = pathCharacter;
          this.print();
        }
      } else if (userPath === "k" && verticalPath === this.fieldArray.length) {
        console.log("You moved outside the field!");
        break;
      }
    }
  } */
}

const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);

myField.playGame();

const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(fieldArray) {
    this.field = fieldArray;
    this.rowIndex = 0;
    this.columnIndex = 0;
    this.field[this.rowIndex][this.columnIndex] = pathCharacter;
  }
    //Prints the inital field
    print() {
      for (let i = 0; i < this.field.length; i++) {
        console.log(this.field[i].toString().replace(/,/g, ''));
      }
    }

    //This resets the field to begin the game anew
    reset() {
      // Step 1: Reset the field to its initial state
      this.field = this.field.map(row => row.map(cell => (cell === pathCharacter ? fieldCharacter : cell)));
    
      // Step 2: Reset the player's position to the starting point
      this.rowIndex = 0;
      this.columnIndex = 0;
    
      // Step 3: Place the pathCharacter at the starting position
      this.field[this.rowIndex][this.columnIndex] = pathCharacter;
    
      // Step 4: Print the reset field
      this.print();
    }

      // Displays the end message
    displayEndMessage(message) {
      console.log(message);
      setTimeout(() => {
        console.clear();
      }, 4000); // Clear the message after 3 seconds
    }

    //Checks if the move is valid (if it is, it updates the player's position)
    move() {
      const whichWay = prompt('Which way? (l: right, j: left, k: down, i: up) : ');
      let newRowIndex = this.rowIndex;
      let newColumnIndex = this.columnIndex;
  
      if (whichWay === 'l') {
        newColumnIndex += 1;
      } else if (whichWay === 'j') {
        newColumnIndex -= 1;
      } else if (whichWay === 'k') {
        newRowIndex += 1;
      } else if (whichWay === 'i') {
        newRowIndex -= 1;
      }
  
      if (newRowIndex < 0 || newRowIndex >= this.field.length || newColumnIndex < 0 || newColumnIndex >= this.field[newRowIndex].length) {
        this.displayEndMessage('Game Over: Out of bounds!');
        this.reset();
        return false;
      }
  
      const newPosition = this.field[newRowIndex][newColumnIndex];
      if (newPosition === hole) {
        this.displayEndMessage('Game Over: Oops, you fell in a hole!');
        this.reset();
        return false;
      } else if (newPosition === hat) {
        this.displayEndMessage('Congrats! You found your hat!');
        this.reset();
        return false;
      } else if (newPosition !== fieldCharacter) {
        console.log('Invalid move!');
        return false;
      }
  
      this.field[this.rowIndex][this.columnIndex] = pathCharacter;
      this.rowIndex = newRowIndex;
      this.columnIndex = newColumnIndex;
      this.field[this.rowIndex][this.columnIndex] = pathCharacter;
      this.print();
      return true;
    }

    //Generates random field (still working on making sure it's always winable)
    generateField(rows, columns) {
      let newField = Array.from({ length: rows }, () => Array(columns));
      let options = [hole, fieldCharacter, fieldCharacter, fieldCharacter]; // Exclude hat from options initially
    
      // Place the hat in a random position
      let hatRow = Math.floor(Math.random() * rows);
      let hatCol = Math.floor(Math.random() * columns);
    
      for (let i = 0; i < newField.length; i++) {
        for (let j = 0; j < newField[i].length; j++) {
          if (i === hatRow && j === hatCol) {
            newField[i][j] = hat; // Place the hat at the random position
          } else {
            newField[i][j] = options[Math.floor(Math.random() * options.length)];
          }
        }
      }
    
      newField[0][0] = pathCharacter;
    
      for (let i = 0; i < newField.length; i++) {
        console.log(newField[i].toString().replace(/,/g, ''));
      }
    }
}

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

myField.generateField(3, 4);
myField.print();
while (true) {
  myField.move();
}
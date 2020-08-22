document.addEventListener('DOMContentLoaded', () => {
const grid = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
const width = 8
const squares = []
let score = 0


const candyColors = [
    'url(images/red-candy.png)',
    'url(images/yellow-candy.png)',
    'url(images/orange-candy.png)',
    'url(images/purple-candy.png)',
    'url(images/green-candy.png)',
    'url(images/blue-candy.png)'
  ]


//create  board
function createBoard() {
  for (let i = 0; i < width*width; i++) {
    const square = document.createElement('div')
    square.setAttribute('draggable', true)
    square.setAttribute('id', i)//which square we are dragging
    let randomColor = Math.floor(Math.random() * candyColors.length)
    square.style.backgroundImage = candyColors[randomColor]
    grid.appendChild(square)
    squares.push(square)
  }
}
createBoard()

//drag candies
//each dragging contains 5 stages
//all the functions are in-built
// Dragging the Candy
let colorBeingDragged
let colorBeingReplaced
let squareIdBeingDragged
let squareIdBeingReplaced

squares.forEach(square => square.addEventListener('dragstart', dragStart))
squares.forEach(square => square.addEventListener('dragend', dragEnd))
squares.forEach(square => square.addEventListener('dragover', dragOver))
squares.forEach(square => square.addEventListener('dragenter', dragEnter))
squares.forEach(square => square.addEventListener('drageleave', dragLeave))
squares.forEach(square => square.addEventListener('drop', dragDrop))

//for each events functions must be created
function dragStart(){
    colorBeingDragged = this.style.backgroundImage
    squareIdBeingDragged = parseInt(this.id)//parse int always gives a number
    // this.style.backgroundImage = ''
}

function dragOver(e) {
    e.preventDefault()
}

function dragEnter(e) {
    e.preventDefault()
}

function dragLeave() {
    this.style.backgroundImage = ''
}

function dragDrop() {
    colorBeingReplaced = this.style.backgroundImage
    squareIdBeingReplaced = parseInt(this.id)
    //change the color into the  color being daragged
    this.style.backgroundImage = colorBeingDragged
    //changes the  original square color to the replaced color
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
}

function dragEnd() {
    //What is a valid move?
    let validMoves = [squareIdBeingDragged -1 , squareIdBeingDragged -width, squareIdBeingDragged +1, squareIdBeingDragged +width]
    let validMove = validMoves.includes(squareIdBeingReplaced)
    //if the id of the square being replaced exists

    if (squareIdBeingReplaced && validMove) {
        squareIdBeingReplaced = null
    }  else if (squareIdBeingReplaced && !validMove) {
       squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
       squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
    } else  squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
}//if the square is outside the grid 

//drop candies once some have been cleared
function moveIntoSquareBelow() {
  //first 7 rows
    for (i = 0; i < 55; i ++) {
      //checking square background color
        if(squares[i + width].style.backgroundImage === '') {
          //if it has wmpty background color exectu code
      //it gives it a background color
            squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
            //making color empty
            squares[i].style.backgroundImage = ''
            //generate candy
      //if the row is empty we need to add color
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)
            if (isFirstRow && (squares[i].style.backgroundImage === '')) {
              let randomColor = Math.floor(Math.random() * candyColors.length)
              squares[i].style.backgroundImage = candyColors[randomColor]
            }
        }
    }
}


///Checking for Matches
//for row of Four
  function checkRowForFour() {
    for (i = 0; i < 60; i ++) {
      let rowOfFour = [i, i+1, i+2, i+3]
      let decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''
      //dont want to check at these squares as these are in the edge

      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
      if (notValid.includes(i)) continue //continue skips it
        // if the 3 colors in the row are same this code is executed

      if(rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        score += 4
        scoreDisplay.innerHTML = score
        rowOfFour.forEach(index => {
          //empty background colorif the match is found
        squares[index].style.backgroundImage = ''
        })
      }
    }
  }
  checkRowForFour()

//for column of Four
  function checkColumnForFour() {
    for (i = 0; i < 39; i ++) {
      let columnOfFour = [i, i+width, i+width*2, i+width*3]
      let decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      // if the 3 colors in the row are same this code is executed

      if(columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        score += 4
        scoreDisplay.innerHTML = score
        columnOfFour.forEach(index => {
          //empty background colorif the match is found
        squares[index].style.backgroundImage = ''
        })
      }
    }
  }
checkColumnForFour()

  //for row of Three
  function checkRowForThree() {
    for (i = 0; i < 61; i ++) {
      let rowOfThree = [i, i+1, i+2]
      let decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''
      //dont want to check at these squares as these are in the edge

      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
      if (notValid.includes(i)) continue
// if the 3 colors in the row are same this code is executed
      if(rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        score += 3
        scoreDisplay.innerHTML = score
        rowOfThree.forEach(index => {
          //empty background colorif the match is found
        squares[index].style.backgroundImage = ''
        })
      }
    }
  }
  checkRowForThree()

//for column of Three
  function checkColumnForThree() {
    for (i = 0; i < 47; i ++) {
      let columnOfThree = [i, i+width, i+width*2]
      let decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      if(columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        score += 3
        scoreDisplay.innerHTML = score
        columnOfThree.forEach(index => {
        squares[index].style.backgroundImage = ''
        })
      }
    }
  }
checkColumnForThree()

// Checks carried out indefintely - Add Butotn to clear interval for best practise
window.setInterval(function(){
    checkRowForFour()
    checkColumnForFour()
    checkRowForThree()
    checkColumnForThree()
    moveIntoSquareBelow()
  }, 100);
})

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-button')
  const width = 10

  //shapes of the tetrominoes
  const lTetrimino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetrimino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]

  const tTerimino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetrimino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetrimino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

  const theTetriminoes = [lTetrimino, zTetrimino, tTerimino, oTetrimino, iTetrimino]

//start position and starting angle
  let currentPosition = 4
  let currentRotation = 0

//choose a random tetrimino
  let random = Math.floor(Math.random()*theTetriminoes.length)
  let current = theTetriminoes[random][0]

//draw the first rotation of first tetrimino
function draw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.add('tetrimino')
  })
}

function undraw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.remove('tetrimino')
  })
}


//make the tetrimino move down every second
timerId = setInterval(moveDown, 1000)

//assign movements to keyboard/keycodes
function control(e) {
    if(e.keyCode === 37) {
      moveLeft()
  } else if (e.keyCode === 38) {
    rotate()
  } else if (e.keyCode === 39) {
    moveRight()
  } else if (e.keyCode === 40) {
    moveDown()
  }
}
document.addEventListener('keyup', control)

//move move down function
function moveDown() {
  undraw()
  currentPosition += width
  draw()
  freeze()
}

//freeze function
function freeze() {
  if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
    current.forEach(index => squares[currentPosition + index].classList.add('taken'))
    //start a new tetrimino
    random = Math.floor(Math.random() * theTetriminoes.length)
    current = theTetriminoes[random][currentRotation]
    currentPosition = 4
    draw()
  }
}


//move tetrimino left, unless it hits the edge
function moveLeft() {
  undraw()
  const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

  if(!isAtLeftEdge) currentPosition -=1

  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
    currentPosition +=1
  }
  draw()
}

//move tetrimino right, unless it hits the edge
function moveRight() {
  undraw()
  const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)
  if(!isAtRightEdge) currentPosition +=1
  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition -=1
  }
  draw()
}

//rotate the tetrimino
function rotate() {
  undraw()
  currentRotation ++
  if(currentRotation === current.length) {
    currentRotation = 0
  }
  current = theTetriminoes[random][currentRotation]
  draw()
}




})

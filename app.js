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


//move move down function
function moveDown() {
  undraw()
  currentPosition += width
  draw()
}

})

document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    const width = 10
    let nextRandom = 0
    let timerId
    let score = 0
    const colors = [
        'orange',
        'red',
        'purple',
        'green',
        'blue'
    ]

    //The Tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ]

    const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]

    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]

    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    //Init position and rotation of the tetromino
    let currentPosition = 4
    let currentRotation = 0

    //randomly select a Tetromino and its first rotation
    let random = Math.floor(Math.random()*theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation]

    //draw the Tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }

    function undraw() {
        current.forEach(index =>{
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }

    //Set timer to down movement every second -> every second this function will be triggered
    //timerId = setInterval(moveDown, 500)

    //Controller using keyboard
    function control(e) {
        if(e.keyCode == 37) {
            moveLeft()
        }else if(e.keyCode == 38) {
            rotate()
        }else if(e.keyCode == 39) {
            moveRight()
        }else if(e.keyCode == 40) {
            moveDown()
        }
    }
    document.addEventListener('keyup', control)

    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    function freeze() {
        //checks if current tetromino collided with a taken square
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //Start new Tetromino
            random = Math.floor(Math.random()*theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
        }
    }

    function moveLeft() {
        undraw()
        if(!current.some(index => (currentPosition + index) % width == 0)) {
            currentPosition -=1
        }
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition +=1
        }
        draw()
    }

    function moveRight() {
        undraw()
        if(!current.some(index => (currentPosition + index) % width == width-1)) {
            currentPosition +=1
        }
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition -=1
        }
        draw()
    }

    function rotate() {
        undraw()
        currentRotation = (currentRotation + 1) % current.length
        current = theTetrominoes[random][currentRotation]
        draw()
    }

    //Experimental code --------------------------------------------
    //removes initial tetromino
    let init=false
    startBtn.addEventListener("click", () => {
        if(!init) {
            draw()
            init=true
            
        }else {
            undraw()
            init=false
        }
    });
})
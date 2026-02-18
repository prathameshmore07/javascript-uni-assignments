let divs = document.querySelectorAll('.parent-div div')

let turn = 0
let gameOver = false

let player1moves = []
let player2moves = []

// winning patterns
let winningmoves = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],

    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],

    [1, 5, 9],
    [3, 5, 7],
]

function checkWinner() {

    for (let pattern of winningmoves) {

        let p1win = pattern.every(num =>
            player1moves.includes(num)
        )

        let p2win = pattern.every(num =>
            player2moves.includes(num)
        )

        if (p1win) {
            alert("player 1 (x) wins")
            gameOver = true
            return
        }

        if (p2win) {
            alert("player 2 (o) wins")
            gameOver = true
            return
        }
    }

    // draw check
    if (player1moves.length + player2moves.length === 9) {
        alert("draw")
        gameOver = true
    }
}


divs.forEach((d, index) => {

    d.addEventListener('click', () => {

        if (gameOver) return
        if (d.innerText !== '') return

        let cellNumber = index + 1

        if (turn === 0) {
            d.innerText = 'X'
            player1moves.push(cellNumber)
            turn = 1
        }
        else {
            d.innerText = 'O'
            player2moves.push(cellNumber)
            turn = 0
        }

        checkWinner()
    })
})


function restartGame() {

    divs.forEach(d => d.innerText = '')

    player1moves = []
    player2moves = []

    turn = 0
    gameOver = false
}

var isValidSudoku = function(board) {
    const set = new Set()

    for (let i = 0; i < board[0].length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            if (cell === '.') continue;
            const row = `${cell} of row ${i}`
            const col = `${cell} of col ${j}`
            const grid = `${cell} of grid ${Math.floor(i/3)} ${Math.floor(j/3)}`
            if (set.has(row) || set.has(col) || set.has(grid)) return false
            set.add(row)
            set.add(col)
            set.add(grid)
        }
    }
    return true
};
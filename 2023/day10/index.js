import { readFile } from 'fs'
import { start } from 'repl'
const day = 10
let moves = 0
let movesMap = []
let err = ''
let datacopy = []

const allowNorth = ['|', 'F', '7']
const allowSouth = ['|', 'J', 'L']
const allowWest = ['-', 'F', 'L']
const allowEast = ['-', 'J', '7']

const getDir = (col, row, nxtCol, nxtRow) => {
    if (col < nxtCol) return 'E'
    if (col > nxtCol) return 'W'
    if (row < nxtRow) return 'S'
    if (row > nxtRow) return 'N'
}

const nextPipeOk = (dir, pipe) => {
    switch (dir){
        case 'N':
            return allowNorth.includes(pipe)
        case 'S':
            return allowSouth.includes(pipe)
        case 'W':
            return allowWest.includes(pipe)
        case 'E':
            return allowEast.includes(pipe)
        default:
            return false
    }
}

const getNextDir = (dir, nextPipe, colInd, rowInd) => {
    if (dir === 'N' && nextPipe === '|') return [rowInd - 1, colInd]
    if (dir === 'N' && nextPipe === 'F') return [rowInd, colInd + 1]
    if (dir === 'N' && nextPipe === '7') return [rowInd, colInd - 1]
    if (dir === 'S' && nextPipe === '|') return [rowInd + 1, colInd]
    if (dir === 'S' && nextPipe === 'L') return [rowInd, colInd + 1]
    if (dir === 'S' && nextPipe === 'J') return [rowInd, colInd - 1]
    if (dir === 'W' && nextPipe === '-') return [rowInd, colInd - 1]
    if (dir === 'W' && nextPipe === 'F') return [rowInd + 1, colInd]
    if (dir === 'W' && nextPipe === 'L') return [rowInd - 1, colInd]
    if (dir === 'E' && nextPipe === '-') return [rowInd, colInd + 1]
    if (dir === 'E' && nextPipe === 'J') return [rowInd - 1 , colInd]
    if (dir === 'E' && nextPipe === '7') return [rowInd + 1, colInd]

    console.log('FAILED TO GET NEXT COORDS')
}

const move = (data, currColInd, currRowInd, colInd, rowInd) => {
    //console.log(moves)
    //console.log('')
    const dir = getDir(currColInd, currRowInd, colInd, rowInd)
    //console.log('dir: ', dir)
    const nextPipe = data[rowInd][colInd]
    //console.log('next pipe: ', nextPipe)
    if (nextPipe === 'S') {
        movesMap.push(moves)
        moves = 0
        return false
    }
    if (!nextPipeOk(dir, nextPipe)) {
        err = 'Error'
        console.log('error: ', err)
        console.log('currMoves: ', moves)
        return false
    }
    const nextStep = getNextDir(dir, nextPipe, colInd, rowInd)
    //console.log('next step: ', nextStep)
    moves++
    let result = [colInd, rowInd, nextStep[1], nextStep[0]]
    //console.log(result)
    datacopy[currRowInd][currColInd] = 'X'
    return result
}

const bordersO = (rowsAbove, rowArr, rowI, charI) => {
    if (rowI === 0 && charI === 0) return false
    if (rowI === 0 && charI > 0) return rowArr[charI - 1] === 'O'
    if (charI === 0 && rowI > 0) return rowsAbove[rowI - 1][charI] === 'O'
    return rowsAbove[rowI-1][charI] === 'O' || rowArr[charI - 1] === 'O' || rowsAbove[rowI-1][charI-1] === 'O' || rowsAbove[rowI-1][charI+1] === 'O' 
}

const main = (data) => {
    data = data.map(row => row.split(''))
    datacopy = data
    let startR = data.find(row => row.find(a => a === 'S'))
    let startRow = data.indexOf(startR)
    let startCol = startR.indexOf('S')
    let north = startRow > 0 ? [startRow - 1, startCol] : null
    let south = startRow < data.length - 1 ? [startRow + 1, startCol] : null
    let west = startCol > 0 ? [startRow, startCol - 1] : null
    let east = startCol < startR.length - 1 ? [startRow, startCol + 1] : null

    const dirs = [south, east, north, west].filter(a => a !== null)
    dirs.forEach(a => {
        let step = move(data, startCol, startRow, a[1], a[0])
        while (step !== false) {
            step = move(data, step[0], step[1], step[2], step[3])
        }
    })
    datacopy[startRow][startCol] = 'X'
    let iterableArr = datacopy
    let changesNotFound = false
    while (!changesNotFound) {
        changesNotFound = true
        let arrToCopy = []
        iterableArr.forEach((row, rowI) => {
            let rowArr = []
            row.forEach((char, charI) => {
                if (char === 'O') {
                    rowArr.push('O')
                }
                else if (char === 'X' || char === 'S') {
                    rowArr.push('X')
                }
                else if (rowI === 0 && char !== 'X') {
                    changesNotFound = false
                    rowArr.push('O')
                } 
                else if (bordersO(arrToCopy, rowArr, rowI, charI)) {
                    changesNotFound = false
                    rowArr.push('O')
                }
                else rowArr.push(char)
            })
            arrToCopy.push(rowArr)
        })

        iterableArr = arrToCopy.map(row => row.reverse()).reverse()
    }

    //Found the issue for pt2, code is currently finding all parts that are SURROUNDED, not INSIDE the loop
    
    let sum = 0
    //Print that should help debug edge cases but still nada
    //iterableArr.forEach(row => console.log(row.join().replaceAll('O', '#').replaceAll('X', ' ').replaceAll(',', ',')))
    const chars = 'XO'
    const ans = iterableArr.map(row => row.filter(a => !chars.includes(a))).filter(a => a.length !== 0).map(row => row.join()).join().replaceAll(',', '').length
    //this is wrong
    console.log((Math.ceil(moves/2)),ans)
}

readFile(`day${day}/input.txt`, "utf8", (err, data) => {
    if (err) console.log(err)
    main(data.split('\n'))
})
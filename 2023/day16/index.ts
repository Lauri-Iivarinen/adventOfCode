import { readFile } from 'fs'
const day = 16

type Tuple = [number, number]

const getNewDirections = (directions: string[], startingPoints: Tuple[], data: string[]): [string[], Tuple[]] => {

    const newDirections: string[] = []
    const newSps: Tuple[] = []
    directions.forEach((direction, i) => {
        
        let startingPointR = startingPoints[i][0]
        let startingPointC = startingPoints[i][1]
        
        if (direction === 'R') startingPointC++
        if (direction === 'L') startingPointC--
        if (direction === 'U') startingPointR --
        if (direction === 'D') startingPointR++
        let startingPoint: Tuple = [startingPointR, startingPointC]
        
        if (startingPoint[0] < data.length && startingPoint[1] < data[0].length && startingPoint[0] >= 0 && startingPoint[1] >= 0) {
            let mirror = data[startingPoint[0]][startingPoint[1]]
            if (mirror === '/' && direction === 'R') {
                newSps.push(startingPoint)
                direction = 'U'
                newDirections.push(direction)
            } else if (mirror === '/' && direction === 'L') {
                direction = 'D'
                newSps.push(startingPoint)
                newDirections.push(direction)
            }
            else if (mirror === '/' && direction === 'U') {
                direction = 'R'
                newSps.push(startingPoint)
                newDirections.push(direction)
            }
            else if (mirror === '/' && direction === 'D') {
                direction = 'L'
                newSps.push(startingPoint)
                newDirections.push(direction)
            }
            else if (mirror === "\\" && direction === 'L') {
                direction = 'U'
                newSps.push(startingPoint)
                newDirections.push(direction)
            }
            else if (mirror === "\\" && direction === 'R') {
                direction = 'D'
                newSps.push(startingPoint)
                newDirections.push(direction)
            }
            else if (mirror === "\\" && direction === 'U') {
                direction = 'L'
                newSps.push(startingPoint)
                newDirections.push(direction)
            }
            else if (mirror === "\\" && direction === 'D') {
                direction = 'R'
                newSps.push(startingPoint)
                newDirections.push(direction)
            } else if (mirror === '|' && direction === 'R') {
                //Split
                direction = 'U'
                newDirections.push('D')
                newSps.push(startingPoint)
                newSps.push(startingPoint)
                newDirections.push(direction)
            } else if (mirror === '|' && direction === 'L') {
                //Split
                direction = 'U'
                newDirections.push('D')
                newSps.push(startingPoint)
                newSps.push(startingPoint)
                newDirections.push(direction)
            } else if (mirror === '-' && direction === 'D') {
                //split
                direction = 'L'
                newDirections.push('R')
                newSps.push(startingPoint)
                newSps.push(startingPoint)
                newDirections.push(direction)
            } else if (mirror === '-' && direction === 'U') {
                //split
                direction = 'L'
                newDirections.push('R')
                newSps.push(startingPoint)
                newSps.push(startingPoint)
                newDirections.push(direction)
            }else {
                newSps.push(startingPoint)
                newDirections.push(direction)
            }
        }
    })
    
    return [newDirections, newSps]
}



const main = (data: string[], startR: number=0, startC: number = -1, startDir: string = 'R') => {
    //go trough tiles, find how many are visited
    //                  [row, column]
    const visited: Map<string, [string, string[]]> = new Map()
    let directions: string[] = [startDir]
    let startingPoints: Tuple[] = [[startR, startC]]
    visited.set([startR,startC].toString(),['.', [startDir]])
    let newTiles = true //Found new tiles during iteration
    let dupes = 0
    while (newTiles && dupes <= 110) {
        [directions, startingPoints] = getNewDirections(directions, startingPoints, data)
        newTiles = false
        let ind = 0
        let newDirInTiles = false
        for (let startingPoint of startingPoints) {
            if (visited.get(startingPoint.toString()) === undefined) {
                visited.set(startingPoint.toString(), [data[startingPoint[0]][startingPoint[1]], [directions[ind]]])
                newTiles = true
            } 
            ind++
            
        } //Incase current blocks are all visited but next ones are not, itereate once more
        if (newDirInTiles) newTiles = true
        if (!newTiles && dupes === 0) {
            dupes++
            newTiles=true
        } else {
            dupes = 0
        }
    }
    //Subtract the first step (outside of grid)
    return visited.size -1
}

const partTwo = (data: string[]) => {
    console.log(data.length)
    console.log(data[0].length)
    const res: number[] = []
    let prog = 0
    let max = data.length*2 + data[0].length*2
    //Top to bottom
    for (let i = 0; i < data.length; i++){
        res.push(main(data, i, -1, 'R'))
        console.log(((prog / max)*100).toFixed(1))
        prog++
    }
    for (let i = 0; i < data.length; i++){
        res.push(main(data, i, data[0].length, 'L'))
        console.log(((prog / max)*100).toFixed(1))
        prog++
    }
    for (let i = 0; i < data[0].length; i++){
        res.push(main(data, -1, i, 'D'))
        console.log(((prog / max)*100).toFixed(1))
        prog++
    }
    for (let i = 0; i < data[0].length; i++){
        res.push(main(data, data.length, i, 'U'))
        console.log(((prog / max)*100).toFixed(1))
        prog++
    }
    console.log(((prog / max)*100).toFixed(1))
    console.log(res)
    console.log(res.length)
    console.log('Ans: ', Math.max(...res))
}

readFile(`day${day}/input.txt`, "utf8", (err, data) => {
    if (err) console.log(err)
    console.log(main(data.split('\n')))
    //partTwo(data.split('\n'))
})
import { readFile } from 'fs'
const day = 21
const fn = 'input'

type Coord = [number, number]

const findNextSteps = (coord: Coord, data: string[]): Coord[] => {
    let coords: Coord[] = []
    if (coord[0] !== 0 && data[coord[0]-1][coord[1]] !== '#') {
        coords.push([coord[0]-1, coord[1]])
    }
    if (coord[0] !== data.length - 1 && data[coord[0]+1][coord[1]] !== '#') {
        coords.push([coord[0]+1, coord[1]])
    }
    if (coord[1] !== 0 && data[coord[0]][coord[1]-1] !== '#') {
        coords.push([coord[0], coord[1]-1])
    }
    if (coord[1] !== data[0].length - 1 && data[coord[0]][coord[1]+1] !== '#') {
        coords.push([coord[0], coord[1]+1])
    }

    return coords
}

//Every step, calc all previous steps

const main = (data: string[]) => {
    const steps = 64
    let coords: Coord[] = [[0, 0]]
    let index = 0
    while (true) {
        if (data[index].indexOf('S') !== -1) {
            coords[0] = [index, data[index].indexOf('S')]
            break
        }
        index++
    }

    for (let i = 0; i < steps; i++){
        let nextCoords: Coord[] = []
        coords.forEach((coord, j) => {
            let nextSteps = findNextSteps(coord, data)
            nextSteps.forEach(stp => {
                if (nextCoords.findIndex(a => a[0] === stp[0] && a[1] === stp[1]) === -1) nextCoords.push(stp)
            })
        })
        coords = nextCoords
    }

    console.log(coords.length)

}

readFile(`day${day}/${fn}.txt`, "utf8", (err, data) => {
    if (err) console.log(err)
    main(data.split('\n'))
})
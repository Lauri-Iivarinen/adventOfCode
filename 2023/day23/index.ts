import { readFile } from 'fs'
const day = 23
const fn = 'inputt'

type Coord = [number, number]

const possibleSteps = (data: string[], currStep: Coord, prevStep: Coord): Coord[] => {
   
    let steps: Coord[] = []
    if (currStep[0] !== 0 && data[currStep[0]-1][currStep[1]] !== 'v' && data[currStep[0]-1][currStep[1]] !== '#' && [currStep[0]-1, currStep[1]].toString() !== prevStep.toString()) {
        steps.push([currStep[0]-1, currStep[1]])
    }
    if (currStep[0] !== data.length-1 && data[currStep[0]+1][currStep[1]] !== '^' && data[currStep[0]+1][currStep[1]] !== '#' && [currStep[0]+1, currStep[1]].toString() !== prevStep.toString()) {
        steps.push([currStep[0]+1, currStep[1]])
    }
    if (currStep[1] !== 0 && data[currStep[0]][currStep[1]-1] !== '>' && data[currStep[0]][currStep[1]-1] !== '#' && [currStep[0], currStep[1]-1].toString() !== prevStep.toString()) {
        steps.push([currStep[0], currStep[1]-1])
    }
    if (currStep[1] !== data[0].length-1 && data[currStep[0]][currStep[1]+1] !== '<' && data[currStep[0]][currStep[1]+1] !== '#' && [currStep[0], currStep[1]+1].toString() !== prevStep.toString()) {
        steps.push([currStep[0], currStep[1]+1])
    }

    return steps
}

const main = (data: string[]) => {
    const startingPoint: Coord = [0, data[0].indexOf('.')]
    const endingPoint: Coord = [data.length-1, data[data.length-1].indexOf('.')]
    const start = new Map()
    start.set('steps', 0)
    start.set('from', [0, 0])
    start.set('to', startingPoint)
    let paths = [start]
    const pathLengths: number[] = []
    let i = 0
    while (i < paths.length) {
        let a = paths[i]
        let stepCount = 0
        let currStep = a.get('to')
        let prevStep = a.get('from')
        while (currStep.toString() !== endingPoint.toString()) {
            let steps = possibleSteps(data, currStep, prevStep)
            if (steps.length === 1) {
                prevStep = currStep
                currStep = steps[0]
            } else {
                steps.slice(1).forEach(step => {
                    const newCrossing = new Map()
                    //Add 1 becaouse when iterating this path next time the previous step is not accounted
                    newCrossing.set('steps', stepCount + a.get('steps') + 1)
                    newCrossing.set('from', currStep)
                    newCrossing.set('to', step)
                    paths.push(newCrossing)
                    //Add new path from crossing, accounting for already walked steps
                })
                prevStep = currStep
                currStep = steps[0]
            }
            stepCount++
        }
        pathLengths.push(stepCount + a.get('steps'))
        i++
    }


    console.log(Math.max(...pathLengths))
    console.log(pathLengths)
}

readFile(`day${day}/${fn}.txt`, "utf8", (err, data) => {
    if (err) console.log(err)
    main(data.split('\n'))
})
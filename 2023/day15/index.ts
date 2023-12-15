import { readFile } from 'fs'
const day = 15

const main = (data: string[]) => {
    let sum = 0
    data.forEach(row => {
        let currValue = 0
        for (let i = 0; i < row.length; i++){
            currValue = ((currValue + row.charCodeAt(i)) * 17) % 256
        }
        sum += currValue
    })
    console.log(sum)
}

const partTwo = (data: string[]) => {

    let boxes: Map<number, Map <string, number> > = new Map()

    data.forEach(code => {
        let currValue = 0 // Becomes box label
        const action = code.indexOf('=')
        let parse = ''
        if (action !== -1) parse = code.split('=')[0]
        else parse = code.split('-')[0]

        for (let i = 0; i < parse.length; i++){
            currValue = ((currValue + parse.charCodeAt(i)) * 17) % 256
        }

        let box = boxes.get(currValue)
        if (box === undefined) box = new Map()

        if (action !== -1) {// action is =
            let focalLength = parseInt(code.substring(action + 1))
            //replace/add new
            box.set(code.split('=')[0], focalLength)
        } else { //action is -
            let item = box.get(code.substring(0, code.length - 1))
            if (item !== undefined) {
                box.delete(code.substring(0, code.length - 1))
            }
        }
        boxes.set(currValue, box)
    })

    let sum = 0

    //console.log(boxes)
    boxes.forEach((box, index) => {
        let boxI = 0 //Box index -> slot of the lens in box
        box.forEach((lens, slot) => {
            let math = 1 + index
            boxI++
            math = math * boxI * lens
            sum += math
        })
    })

    console.log(sum)
}

readFile(`day${day}/input.txt`, "utf8", (err, data) => {
    if (err) console.log(err)
    //main(data.split(','))
    partTwo(data.split(','))
})
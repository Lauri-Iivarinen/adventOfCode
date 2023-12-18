import { readFile } from 'fs'
const day = 18

type Triple = [string, number, string]

const main = (data: string[]) => {
    let instructions: Triple[] = data.map(row => [row.split(' ')[0], parseInt(row.split(' ')[1]), row.split(' ')[2]])

    let start = [0, 0]
                      //Row           Col
    const digMap: Map<number, Map<number, string> > = new Map()

    instructions.forEach((instruction, index) => {
        //console.log(instruction)
        //console.log(digMap)
        for (let i = 0; i < instruction[1]; i++){
            //console.log('row: ', start[0])
            let row = digMap.get(start[0])
            if (row === undefined) row = new Map
            row.set(start[1], '#')
            digMap.set(start[0],row)
            if (instruction[0] === 'R') start[1]++
            if (instruction[0] === 'L') start[1]--
            if (instruction[0] === 'D') start[0]++
            if (instruction[0] === 'U') start[0]--
        }
    })

    //console.log(Math.min(...digMap.keys()))
    const offset = Math.min(...digMap.keys())
    //console.log(digMap.entries())
    let arr: any = []
    digMap.forEach((val, key) => {
        let vals: number[] = []
        val.forEach((value, k) => vals.push(k-offset))
        arr.push([key-offset, vals])
    })

    arr = arr.sort((a:number[], b: number[]) => a[0] - b[0])
    let keys = arr.map((a: [number, number[]]) => a[0])
    let maxVal = Math.max(...keys)
    const vals: number[][] = arr.map((a: [number, number[]]) => a[1])
    //console.log(maxVal)
    let printArr = []
    for (let i = 0; i < maxVal+1; i++){
        let row = []
        let rowVals = vals[i]
        //console.log(rowVals)
        for (let j = 0; j < maxVal+45; j++){
            if (rowVals.includes(j)) row.push('#')
            else row.push('.')
        }
        printArr.push(row)
    }

    
    let clone:string[][] = []
    
    // Fill from the outside
    printArr.forEach((row, rowI) => {
        let charArr: string[] = []
        let crossed = false
        row.forEach((char, colI) => {
            if (char === '#') {
                crossed = true
                charArr.push(char)
            }
            else if (!crossed) charArr.push('X')
            else if (rowI > 0 && clone[rowI - 1][colI] === 'X') charArr.push('X')
            else charArr.push(char)
        })
        crossed = false
        charArr.reverse().forEach((char, charI)=> {
            if (char === '#') {
                charArr[charI] = '#'
                crossed = true
            }
            else if (!crossed) charArr[charI] = 'X'
            else if (charI > 0 && charArr[charI-1] === 'X') charArr[charI] = 'X'
            else charArr[charI] = char
        })
        //Check right and down
        charArr = charArr.reverse()
        clone.push(charArr)
    })

    let changes = true
    while (changes) {
        changes = false
        for (let ri = clone.length - 1; ri >= 0; ri--){
            let row = clone[ri]
            for (let ci = 0; ci < clone[0].length; ci++){
                if (row[ci] === 'X') {
                    
                }else if (row[ci] === '#') {
                    
                } else if (ci > 0 && row[ci - 1] === 'X') {
                    row[ci] = 'X'
                    changes = true
                }
                else if (ri < clone.length - 1 && clone[ri + 1][ci] === 'X') {
                    changes = true
                    row[ci] = 'X'
                }
            }
            clone[ri] = row
        }
    
        for (let ri = 0; ri < clone.length; ri++){
            let row = clone[ri]
            for (let ci = clone[0].length-1; ci >= 0; ci--){
                if (row[ci] === 'X') {
                    
                }else if (row[ci] === '#') {
                    
                } else if (ci < clone[0].length - 1 && row[ci + 1] === 'X') {
                    row[ci] = 'X'
                    changes = true
                }
                else if (ri > 0 && clone[ri - 1][ci] === 'X') {
                    row[ci] = 'X'
                    changes = true
                }
            }
            clone[ri] = row
        }
    }

    

    clone.forEach(row => console.log(row.join().replaceAll(',', '').replaceAll('.', '#').replaceAll('X', '.')))

    let sum = 0
    clone.forEach(row => {
        row = row.join().replaceAll(',', '').replaceAll('.', '#').replaceAll('X', '.').split('')
        row.forEach(char => {
            if (char === '#') sum++
        })
    })

    console.log(sum)
}

readFile(`day${day}/input.txt`, "utf8", (err, data) => {
    if (err) console.log(err)
    main(data.split('\n'))
})
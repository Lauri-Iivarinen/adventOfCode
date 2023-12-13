import { readFile } from 'fs'
const day = 13

type matchingRows = [string, number, number] | []

interface Reflection{
    rows: matchingRows[]
    cols: matchingRows[]
    reflection: string[]
}

const findPairs = (reflections: string[][]) => {

    let rows:matchingRows[][] =[]
    reflections.forEach(reflection => {
        const matchingRows: matchingRows[] = reflection.map((row, i) => {
            if (row === reflection[i - 1]) return [row, i, i-1]
            return []
        })
        rows.push(matchingRows.filter(arr => arr.length > 0))
    })
    const cols:matchingRows[][] = []
    //Check matching columns
    reflections.forEach((reflection) => {
        let matchingCols:matchingRows[] = []
        let prevCol = ''
        let currCol = ''
        reflection[0].split('').forEach((row, i) => {
            let j = 0; 
            while (j < reflection.length){
                currCol += reflection[j][i]
                j++
            }
            if (currCol === prevCol) {
                //console.log(prevCol)
                //console.log(currCol)
                matchingCols.push([currCol, i, i - 1])
            }
            prevCol = currCol
            currCol = ''
        })
        cols.push(matchingCols)
    })

    let res: Reflection[] = reflections.map((reflection, i) => {
        return {
            rows: rows[i],
            cols: cols[i],
            reflection
        }
    })
    
    return res
}

const main = (data: string[]) => {
    const reflections: string[][] = []
    let set: string[] = []
    data.forEach(row => {
        if (row === '') {
            reflections.push(set)
            set = []
        } else {
            set.push(row)
        }
    })
    reflections.push(set)
    
    //Check matching rows
    //console.log(reflections)
    
    const reflectionMap: Reflection[] = findPairs(reflections)
    //console.log(reflectionMap)
    let colMatches:any[] = []
    let rowMatches: any[] = []
    reflectionMap.forEach(reflection => {
        //Check rows
        reflection.rows.forEach(pattern => {
            let top:number = pattern[2]!
            let bottom: number = pattern[1]!
            let patternMatch = true
            while (top >= 0 && bottom < reflection.reflection.length) {
                if (reflection.reflection[top] !== reflection.reflection[bottom]) {
                    patternMatch = false
                    break
                }
                top--
                bottom++
            }
            if (patternMatch) {
                rowMatches.push(pattern)
            }
        })

        

        reflection.cols.forEach(pattern => {
            let left: number = pattern[2]!
            let right: number = pattern[1]!
            //console.log(left, right)
            
            let leftCol = ''
            let rightCol = ''
            let match = true
            while (left>= 0 && right < reflection.reflection[0].length) {
                for (let i = 0; i < reflection.reflection.length; i++){
                    leftCol += reflection.reflection[i][left]
                    rightCol += reflection.reflection[i][right]
                }
                if (leftCol !== rightCol) {
                    match = false
                    break
                }
                leftCol = ''
                rightCol = ''
                left--
                right++
            }
            if (match) {
                colMatches.push(pattern)
            }
            //*/
        })

    })

    //do math:(
    let sum = 0
    
    colMatches.forEach(match => {
        sum += match[1]
    })

    let rowMatch = 0
    rowMatches.forEach(match => (
        rowMatch += match[1]
    ))

    sum += rowMatch * 100
    
    console.log('ans: ' ,sum)
    
}

readFile(`day${day}/input.txt`, "utf8", (err, data) => {
    if (err) console.log(err)
    main(data.split('\n'))
})
import { readFile } from 'fs'
const day = 14

const moveRocks = (data: string[]) : string[]=> {
    let rolled = false

    for (let row = 0; row < data.length; row++){
        for (let col = 0; col < data[0].length; col++){
            if (data[row][col] === 'O' && row !== 0 && data[row - 1][col] === '.' ) {
                let arr = data[row].split('')
                arr[col] = '.'
                const res = arr.join().replaceAll(',', '')
                arr = data[row-1].split('')
                arr[col] = 'O'
                const resTop = arr.join().replaceAll(',', '')
                data[row] = res
                data[row-1] = resTop
                rolled = true
            }
        }
    }

    if (rolled) return moveRocks(data)
    return data
}

const valueSearch = (val: number, arr: number[]) => {
    if (arr.length === 0 || arr[0] > val) return -1
    if (arr.length === 1) return arr[0]

    let left = 0
    let right = arr.length - 1
    let search = Math.floor(left+(right/2))
    while (left <= right) {
        //console.log(left, right)
        if (arr[search] < val && arr[search + 1] > val) return arr[search]
        else if (arr[search] > val) {
            right = search - 1
            search = Math.floor(left+(right/2))
        } else {
            left = search + 1
            search = Math.floor(left+(right/2))
        }
    }
    return -1
}

const main = (data: string[]) => {
    /*
    for (let a = 0; a < 1000000000; a++){
        //const rolled = moveRocksNorth(data)
        
        console.log(a)
        console.log((a/1000000000).toFixed(3))
        //console.log(data)
    }*/

    data = moveRocks(data)
    
    
    //data.forEach(row => console.log(row))
    let sum = 0
    data.forEach((row, i) => {
        for (let j = 0; j < row.length; j++){
            if (row[j] === 'O') sum += data.length-i
        }
    })
    console.log(sum)
    
}

readFile(`day${day}/input.txt`, "utf8", (err, data) => {
    if (err) console.log(err)
    main(data.split('\n'))
})
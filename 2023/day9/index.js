import { readFile } from 'fs'
const day = 9

const main = (data) => {
    data = data.map(row => row.split(' ').map(num => parseInt(num))).map(row => {
        let tree = [row]
        let currArr = row
        //while (Math.max[...currArr] !== 0) {
        while (currArr.some(e=>e!=0)) {
            let nextRow = []
            for (let i = 0; i < currArr.length - 1; i++){
                nextRow.push(currArr[i+1] - currArr[i])
            }
            tree.push(nextRow)
            currArr = nextRow
        }
        let num = 0
        tree.reverse()
        
        //Part 1
        tree.forEach(val => num = num + val[val.length - 1])
        //Part 2 here:
        //tree.forEach(val => num = val[0]-num)
        return num
    })
    
    console.log(data.reduce((a,b) => a+b))
}

readFile(`day${day}/input.txt`, "utf8", (err, data) => {
    if (err) console.log(err)
    main(data.split('\n'))
})
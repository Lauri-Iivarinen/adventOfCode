import { readFile } from 'fs'
const day = 8

const filterData = (data) => {
    data.splice(1, 1)
    const instructions = data.splice(0, 1)[0].split('')
    data = data.map(row => {
        row = row.replace('(', '').replace(')', '').split(' = ')
        
        row = [row[0], row[1].split(', ')]
        return {key: row[0], L: row[1][0], R: row[1][1]}
    })
    return [instructions, data]
}

const main = (a) => {
    const [instructions, data] = filterData(a)
    let sum = 0
    let index = 0
    let key = 'AAA'
    while (key !== 'ZZZ') {
        let row = data.find(a => a.key === key)
        let dir = instructions[index]
        if (dir === 'L') key = row.L
        else key = row.R
        index = index === (instructions.length-1) ? 0: index+1
        sum++
    }
    console.log(sum)
    
}

//as tipped off in reddit -> LCM
const partTwo = (a) => {
    const [instructions, data] = filterData(a)
    const startingPoints = data.filter(row => row.key[2] === 'A')
    let results = []
    startingPoints.forEach(point => {
        let sum = 0
        let index = 0
        let key = point.key
        while (key[2] !== 'Z') {
            let row = data.find(a => a.key === key)
            let dir = instructions[index]
            if (dir === 'L') key = row.L
            else key = row.R
            index = index === (instructions.length-1) ? 0: index+1
            sum++
        }
        results.push(sum)
        //console.log(sum)
    })

    //https://www.geeksforgeeks.org/lcm-of-given-array-elements/    
    function gcd(a, b) { 
        if (b == 0) 
            return a; 
        return gcd(b, a % b); 
    } 
 
    // Returns LCM of array elements 
    function findlcm(arr, n) { 
        // Initialize result 
        let ans = arr[0]; 
    
        // ans contains LCM of arr[0], ..arr[i] 
        // after i'th iteration, 
        for (let i = 1; i < n; i++) 
            ans = (((arr[i] * ans)) / 
                    (gcd(arr[i], ans))); 
    
        return ans; 
    }
    
    console.log(findlcm(results, results.length))
}

readFile(`day${day}/input.txt`, "utf8", (err, data) => {
    if (err) console.log(err)
    partTwo(data.split('\n'))
})
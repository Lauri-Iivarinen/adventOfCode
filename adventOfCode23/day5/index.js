import { readFile } from 'fs'
const day = 5

const main = (data) => {
    let seeds = data[0].replace('seeds: ', '').split(' ').map(i => parseInt(i))
    let a = []
    
    /*
    PT 2 seed mapping causes size error
    seeds.forEach((seed, index) => {
        if (index % 2 == 1) {
            a.push([seeds[index-1], seeds[index]])
        }
    })
    
    let b = []
    a.forEach(set => {
        let arr = []
        for (let i = 0; i < set[1]; i++){
            arr.push(set[0]+i)
        }
        b = b.concat(arr)
    })
    seeds = b
    */
    
    data = data.slice(1).map(row => {
        if (row.includes(':')) return []
        row = row.split(' ').map(i => parseInt(i))
        return [{start: row[1], next: row[0], range: row[2]}]
    })


    let modified = []
    let input = []
    data.forEach((row, index) => {
        if (index !== 0 && row.length !== 0) input.push(row)
        else if (index !== 0) {
            modified.push(input)
            input = []
        }
    })
    modified.push(input)
    

    const result = seeds.map(seed => {
        modified.forEach(category => {
            category = category.find(set => {
                set = set[0]
                return set.start + set.range - 1 >= seed && seed >= set.start
            })
            if (category !== undefined) {
                let math = category[0].range - (category[0].start + category[0].range - seed)
                seed = category[0].next+math
            }
            
        })
        return seed
    })
    
    console.log(Math.min(...result))
}

readFile(`day${day}/input.txt`, "utf8", (err, data) => {
    if (err) console.log(err)
    main(data.split('\n').filter(row => row !== ''))
})
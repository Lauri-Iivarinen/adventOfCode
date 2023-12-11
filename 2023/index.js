import { readFile } from 'fs'
const day = 1

const main = (data) => {
    
}

readFile(`day${day}/input.txt`, "utf8", (err, data) => {
    if (err) console.log(err)
    main(data.split('\n'))
})
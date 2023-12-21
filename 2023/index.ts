import { readFile } from 'fs'
const day = 1
const fn = 'input'

const main = (data: string[]) => {
    
}

readFile(`day${day}/${fn}.txt`, "utf8", (err, data) => {
    if (err) console.log(err)
    main(data.split('\n'))
})
import { readFile } from 'fs'
const day = 17

const main = (data: string[]) => {
    //yeah no...
}

readFile(`day${day}/input.txt`, "utf8", (err, data) => {
    if (err) console.log(err)
    main(data.split('\n'))
})
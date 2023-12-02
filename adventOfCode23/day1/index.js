import { readFile } from 'fs'

const main = (data) => {
    let sum = 0
    data = data.map(value => {
        let number = ''
        const arr = value.split('')
        number += arr.find(char => '1234567890'.includes(char))

        let reverse = arr.reverse()
        number += reverse.find(char => '1234567890'.includes(char))

        sum += parseInt(number)
        return parseInt(number)
    })
    console.log(data)
    console.log(sum)
}

const getNumber = (string) => {
    //console.log(string)
    switch (string) {
        case 'one':
            return '1'
        case 'two':
            return '2'
        case 'three':
            return '3'
        case 'four':
            return '4'
        case 'five':
            return '5'
        case 'six':
            return '6'
        case 'seven':
            return '7'
        case 'eight':
            return '8'
        case 'nine':
            return '9'
        default:
            return null
    }
}

//Answer is failing even though test data provides correct answer
const partTwo = (data) => {
    //data = data.slice(0,5)
    const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    let res = data.map(row => {
        let string = ''
        
        for (let char of row) {
            if (!'1234567890'.includes(char)) {
                string += char
                const found = numbers.find(num => string.includes(num))
                if (found !== undefined) {
                    row = row.replace(found, getNumber(found)+string)
                    string = ''
                    break
                }
            }
        }
        let reverse = row.split('').reverse()
        for (let char of reverse) {
            if (!'1234567890'.includes(char)) {
                string = char + string
                const found = numbers.find(num => string.includes(num))
                if (found !== undefined) {
                    row = row.replace(found, string+getNumber(found))
                    string = ''
                    break
                }
            }
        }
        return row
    })
    //console.log(res)
    main(res)
}

readFile(`day1/input.txt`, "utf8", (err, data) => {
    if (err) console.log(err)
    partTwo(data.split('\n'))
})

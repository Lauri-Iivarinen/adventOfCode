import { readFile } from 'fs'

const main = (data) => {
    //console.log(data[0])
    let sum = 0
    data = data.map(value => {
        let number = ''
        const arr = value.split('')
        number += arr.find(char => '123456789'.includes(char))

        let reverse = arr.reverse()
        number += reverse.find(char => '123456789'.includes(char))

        sum += parseInt(number)
        return parseInt(number)
    })
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
            if (!'123456789'.includes(char)) {
                string += char
                const found = numbers.find(num => string.toLowerCase().includes(num))
                if (found !== undefined) {
                    row = row.replace(found, string+getNumber(found)+string)
                    string = ''
                    break
                }
            }
        }
        let reverse = row.split('').reverse()
        for (let char of reverse) {
            if (!'123456789'.includes(char)) {
                string = char + string
                const found = numbers.find(num => string.toLowerCase().includes(num))
                if (found !== undefined) {
                    row = row.replace(found, string+getNumber(found)+string)
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
    //data = data.replace('one', 'one1one').replace('two', 'two2two').replace('three', 'three3three').replace('four', 'four4four').replace('five','five5five').replace('six', 'six6six').replace('seven', 'seven7seven').replace('eight', 'eight8eight').replace('nine', 'nine9nine')
    partTwo(data.split('\n'))
})

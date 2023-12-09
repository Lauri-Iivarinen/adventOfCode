import { readFile } from 'fs'
const day = 3
const numbers = '0123456789'
const string = '.0123456789'

const checkConnectivity = (data, startIndex, endIndex, rowIndex) => {
    console.log('')
    //adjust indexes to be 1 larger than number
    startIndex = startIndex > 0 ? startIndex - 1 : 0
    endIndex = endIndex < data[0].length-1 ? endIndex+1 : endIndex
    if (rowIndex > 0) {
        for (let i = startIndex; i <= endIndex; i++){
            if (data[rowIndex - 1][i] !== '.' && !numbers.includes(data[rowIndex - 1][i])) {
                return true
            }
        }
    }
    if (rowIndex < data.length-1) {
        for (let i = startIndex; i <= endIndex; i++){
            if (data[rowIndex + 1][i] !== '.' && !numbers.includes(data[rowIndex + 1][i])) {
                return true
            }
            
        }
    }
    
    if (!string.includes(data[rowIndex][startIndex]) || !string.includes(data[rowIndex][endIndex])) {
        return true
    }
    return false
}

const main = (data) => {
    let sum = 0
    data.forEach((row, rowIndex) => {
        row = row.split('')
        let serial = ''
        let startIndex = 0
        let endIndex = 0
        let collectingNumber = false
        row.forEach((char, charIndex) => {
            if (numbers.includes(char) && !collectingNumber) {
                serial += char
                collectingNumber = true
                startIndex = charIndex
            } else if (numbers.includes(char)) {
                serial += char
            } else if (collectingNumber) {
                endIndex = charIndex > 0 ? charIndex - 1 : 0
                const result = checkConnectivity(data, startIndex, endIndex, rowIndex)
                //do stuff with result
                if (result) {
                    sum += parseFloat(serial)
                }

                serial = ''
                collectingNumber = false
            }
        })
        if (collectingNumber) {
            endIndex = row.length-1
            const result = checkConnectivity(data, startIndex, endIndex, rowIndex)
            //do stuff with result
            if (result) {
                sum += parseFloat(serial)
            }
            serial = ''
            collectingNumber = false
        }
    })

    console.log(sum)

}

const findNumbersNearGear = (data, rowIndex, charIndex) => {
    
    return 0
    //console.log(numberArr)
}

const partTwo = (data) => {
    let sum = 0
    
    data.forEach((row, rowIndex) => {
        let gearIndex = 0
        row = row.split('')
        row.forEach((char, charIndex)=> {
            if (char === '*') {
                //console.log('found * at:', rowIndex, charIndex)
                sum += findNumbersNearGear(data, rowIndex, charIndex)
            }
        })
    })

    console.log(sum)
}

readFile(`day${day}/input.txt`, "utf8", (err, data) => {
    if (err) console.log(err)
    partTwo(data.split('\n'))
})
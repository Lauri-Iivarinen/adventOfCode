import { readFile } from 'fs'
const day = 4
let wonCards = []

const countPoints = (matches) => {
    //console.log(matches)
    if (matches.length <= 1) return matches.length
    let result = 1
    for (let i = 0; i < matches.length - 1; i++){
        result = result * 2
    }
    return result
}

const main = (data) => {
    //console.log(data)
    data = data.map(row => {
        row = row.replace('Card ', '').split(':')
        let [winningNumbers, playerNumbers] = row[1].trim().split(' | ')
        winningNumbers = winningNumbers.split(' ').map(num => parseInt(num))
        playerNumbers = playerNumbers.split(' ').map(num => parseInt(num))
        return {id: parseInt(row[0]), winningNumbers, playerNumbers}
    })
    let sum = 0
    data.forEach(game => {
        const matches = game.playerNumbers.filter(num => game.winningNumbers.includes(num))
        sum += countPoints(matches)
    });
    /*
    data = data.reverse()
    let copy = []
    data.forEach(game => {
        //console.log(game.id)
        const value = game.matches.length > 0 ? countMatches(copy, game.matches, game.id) : 1
        //console.log(value)
        const json = {
            id: game.id,
            winningNumbers: game.winningNumbers,
            playerNumbers: game.playerNumbers,
            matches: game.matches,
            value: value,
        }
        copy.push(json)
    })
    console.log(copy.map(a => a.value))
    let allMatches = []
    let sum = 0
    copy.forEach(game => allMatches = allMatches.concat(game.matches))
    allMatches.forEach(a => {
        sum += copy.find(i => i.id === a).value
    })
    console.log(sum)
*/
    console.log(sum)
    
}

readFile(`day${day}/input.txt`, "utf8", (err, data) => {
    if (err) console.log(err)
    data = data.replaceAll('  ', ' 0')
    main(data.split('\n'))
})
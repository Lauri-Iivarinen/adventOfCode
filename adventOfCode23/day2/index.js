import { readFile } from 'fs'
const day = 2

const modifyData = (data) => {
    data = data.map(row => {
        row = row.split(':')
        const id = parseInt(row[0].split(' ')[1])
        const sets = row[1].split(';').map(set => {
            let blue = 0
            let red = 0
            let green = 0
            set = set.split(',').map(color => {
                const [values, colorStr] = color.trim().split(' ')
                return [values, colorStr]
            })
            set.forEach(color => {
                if (color[1] === 'blue') blue = parseInt(color[0])
                else if (color[1] === 'red') red = parseInt(color[0])
                else green = parseInt(color[0])
            })
            return { red: red, blue: blue, green: green }
            
        })
        return {id: id, sets: sets}
    })
    return data
}

const main = (data) => {
    const red = 12
    const green = 13
    const blue = 14
    data = modifyData(data)
    //Find games that are possible with 12 red, 13 green, 14 blue

    //filter out 'bad' games
    const badData = data.filter(game => {
        return game.sets.find(colors => {
            return colors.red > red || colors.blue > blue || colors.green > green
        })
    })
    data = data.filter(game => {
        return !badData.find(row => row.id === game.id)
    })
    let sum = 0
    data.forEach(game => sum += game.id)
    console.log(data.length)
    console.log(sum)
}

const partTwo = (data) => {
    data = modifyData(data)
    let sum = 0
    data.forEach(game => {
        //minimum needed -> highest(max) found
        let maxRed = 0
        let maxBlue = 0
        let maxGreen = 0
        game.sets.forEach(set => {
            if (set.blue > maxBlue) maxBlue = set.blue
            if (set.red > maxRed) maxRed = set.red
            if (set.green > maxGreen) maxGreen = set.green
        })
        sum += maxBlue*maxGreen*maxRed
    })

    console.log(sum)
}

readFile(`day${day}/input.txt`, "utf8", (err, data) => {
    if (err) console.log(err)
    partTwo(data.split('\n'))
})
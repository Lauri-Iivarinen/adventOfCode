import { readFile } from 'fs'
const day = 11

interface Galaxy{
    code: number
    coords: [number,number]
}

//Replace every expansion point with row/col of X
const expandGalaxyPt2 = (data: string[]) =>{
    let galaxies: string[][] = []
    data.forEach(row => {
        if (!row.includes('#')) {
            galaxies.push(row.replaceAll('.', 'X').split(''))
        } else {
            galaxies.push(row.split(''))
        }
    })
    
    let galaxyFlipped: string[][] = []
    for (let i = 0; i < galaxies[0].length; i++){
        let flippedRow = []
        for (let a = 0; a < galaxies.length; a++){
            flippedRow.push(galaxies[a][i])
        }
        galaxyFlipped.push(flippedRow)
    }
    galaxies = []
    galaxyFlipped.map(row => row.join().replaceAll(',', '')).forEach(row => {
        if (!row.includes('#')) {
            galaxies.push(row.replaceAll('.', 'X').split(''))
        } else {
            galaxies.push(row.split(''))
        }
    })

    return galaxies
}
const expandGalaxy = (data: string[]) => {
    let galaxies: string[][] = []
    data.forEach(row => {
        if (!row.includes('#')) {
            galaxies.push(row.split(''))
        }
        galaxies.push(row.split(''))
    })
    
    let galaxyFlipped: string[][] = []
    for (let i = 0; i < galaxies[0].length; i++){
        let flippedRow = []
        for (let a = 0; a < galaxies.length; a++){
            flippedRow.push(galaxies[a][i])
        }
        galaxyFlipped.push(flippedRow)
    }
    galaxies = []
    galaxyFlipped.map(row => row.join().replaceAll(',', '')).forEach(row => {
        if (!row.includes('#')) {
            galaxies.push(row.split(''))
        }
        galaxies.push(row.split(''))
    })

    return galaxies
    
}

const calcDist = ( galaxyPairs: [Galaxy, Galaxy][]) => {
    let sum = 0
    //calc distance
    galaxyPairs.forEach(pair => {
        let distY = pair[1].coords[0] - pair[0].coords[0]
        let distX = pair[1].coords[1] > pair[0].coords[1] ? pair[1].coords[1] - pair[0].coords[1] : pair[0].coords[1] - pair[1].coords[1]

        sum+= distX+distY
    })
    console.log('pt1: ', sum)
}

const calcDistPt2 = (galaxyMap: string[][], galaxyPairs: [Galaxy, Galaxy][]) => {
    const expansionDist = 1000000
    let sum = 0
    //calc distance
    galaxyPairs.forEach(pair => {
        let expansions = 0
        let distY = pair[1].coords[0] - pair[0].coords[0]
        let distX = pair[1].coords[1] > pair[0].coords[1] ? pair[1].coords[1] - pair[0].coords[1] : pair[0].coords[1] - pair[1].coords[1]
        //Find out how many expanded sections are crossed on both axis
        for (let i = pair[0].coords[0]; i < pair[0].coords[0] + distY; i++){
            if (galaxyMap[i][0] === 'X') {
                expansions++
            }
        }
        let startX = pair[1].coords[1] > pair[0].coords[1] ? pair[0].coords[1] : pair[1].coords[1]
        for (let i = startX; i <= distX+startX; i++){
            if (galaxyMap[0][i] === 'X') {
                expansions++
            }
        }

        sum += distX + distY + (expansions * expansionDist) - expansions
    })
    console.log('pt2: ', sum)
}

const main = (data: string[]) => {
    //Expand universe, find closest distance for each galaxy pair
    //const galaxies = expandGalaxy(data) // <-- For part 1
    const galaxies = expandGalaxyPt2(data)
    //galaxies.forEach(row => console.log(row.join().replaceAll(',', ' ')))
    const galaxyInd: [number,number][] = []
    galaxies.forEach((row, index) => {
        row.forEach((char, charIndex) => {
            if (char === '#') galaxyInd.push([index, charIndex])
        })
    })
    const galaxyMap: Galaxy[] = galaxyInd.map((coords, i) => {
        return {
            code: i + 1,
            coords
        }
    })
    //console.log(galaxyMap)
    const galaxyPairs: [Galaxy, Galaxy][] = []
    let startIndex = 0
    while (startIndex < galaxyMap.length) {
        for (let i = startIndex+1; i < galaxyMap.length; i++){
            galaxyPairs.push([galaxyMap[startIndex], galaxyMap[i]])
        }
        startIndex++
    }
    //calcDist(galaxyPairs)
    calcDistPt2(galaxies, galaxyPairs)
}

readFile(`day${day}/input.txt`, "utf8", (err, data: string) => {
    if (err) console.log(err)
    main(data.split('\n'))
})
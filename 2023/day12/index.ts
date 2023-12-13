import { readFile } from 'fs'
const day = 12


interface Spring {
    spring: string[]
    damages: number[]
    damage_str?: string[]
}

const main = (data: string[]) => {
    const springs: Spring[] = data.map(row => {
        let split = row.split(' ')
        let damages = split[1].split(',').map(a => parseInt(a))
        let spring = split[0].split('.').filter(a => a !== '')
        return {damages,spring}
    })

    const springsWithoutUncertanty = springs.map(spring => {
        const uncertain = spring.spring.filter(a => a.includes('?'))
        let uncertainNums = uncertain.map(a => a.length)
        let uncertainCopy = uncertain
        let certain = spring.spring.filter(a => !a.includes('?')).map(a => a.length)
        const damages = spring.damages.filter(damage => {
            if (certain.includes(damage)) {
                certain.splice(certain.indexOf(damage), 1)
                return false
            } else if (uncertainNums.includes(damage)) {
                uncertainCopy.splice(uncertainNums.indexOf(damage))
                return false
            }
            else return true
        })

        return {spring: uncertainCopy, damages: damages}
    }).filter(a => a.damages.length !== 0)

    //console.log(springsWithoutUncertanty)

}

readFile(`day${day}/input.txt`, "utf8", (err, data) => {
    if (err) console.log(err)
    main(data.split('\n'))
})
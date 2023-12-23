import { readFile } from 'fs'
const day = 22
const fn = 'inputt'

//Axis s (start) e (end)
const parseData = (data: string[]) => data.map((row: any) => {
    const map = new Map()
    row = row.split('~')
    let xs = row[0].split(',')[0]
    let ys = row[0].split(',')[1]
    let zs = row[0].split(',')[2]
    let xe = row[1].split(',')[0]
    let ye = row[1].split(',')[1]
    let ze = row[1].split(',')[2]
    map.set('x-s', parseInt(xs))
    map.set('y-s', parseInt(ys))
    map.set('z-s', parseInt(zs))
    map.set('x-e', parseInt(xe))
    map.set('y-e', parseInt(ye))
    map.set('z-e', parseInt(ze))

    return map
})

const noBrickBelow = (bricks: Map<string, number>[], brick: Map<string, number>): boolean => {
    let i = bricks.indexOf(brick)
    if (brick.get('z-s') === 1 || brick.get('z-e') === 1) return false
    if (i === bricks.length - 1) return false
    let canFall = true
    while (i < bricks.length-1) {
        let brck = bricks[i + 1]
        let rule1 = brck.get('y-e')! <= brick.get('y-s')! || brck.get('y-s')! >= brick.get('y-e')!
        let rule2 = brck.get('x-e')! <= brick.get('x-s')! || brck.get('x-s')! >= brick.get('x-e')!
        if (!rule1 && !rule2) {//Potential empty space below
            if (brck.get('z-e')! + 1 < brick.get('z-s')!) {
                return true
            }
        }
        i++
    }
    return false
}

const main = (data: string[]) => {
    let bricks: Map<string, number>[] = parseData(data).sort((a,b) => a.get('z-s') - b.get('z-s')).reverse()
    
    let falling = true
    while (falling) {
        falling = false
        for (let i = 0; i < bricks.length; i++){
            let brick = bricks[i]
            if (noBrickBelow(bricks, brick)) {
                console.log('')
                console.log("fall", i)
                brick.set('z-s', brick.get('z-s')! - 1)
                brick.set('z-e', brick.get('z-e')! - 1)
                bricks[i] = brick
                falling = true
            }
        }
    }
    console.log(bricks)
}

readFile(`day${day}/${fn}.txt`, "utf8", (err, data) => {
    if (err) console.log(err)
    main(data.split('\n'))
})
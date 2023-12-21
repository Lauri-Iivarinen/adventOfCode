import { readFile } from 'fs'
const day = 20
const fn = 'inputt'

type Signal = 'L' | 'H'

let steps = 0

const getOutSignal = (tar: Map<string, any>, type: Signal, from: string): [Map<string, any>, Signal] => {
    //console.log('getOutSignal')
    //console.log(tar)
    if (tar.get('prefix') === '%') {
        if (type === 'L') {
            tar.set('on', !tar.get('on'))
            if (tar.get('on')) {
                return [tar, 'L']
            } else {
                return [tar, 'H']
            }
        }
    }
    if (tar.get('prefix') === '&') {
        if (tar.get('prevSignal') === undefined) {
            let map = new Map()
            map.set(from, type)
            return [tar, 'H']
        }
        tar.get('prevSignal').forEach((signal: Signal) => {
            if (signal === 'L') {
                return [tar, 'H']
            }
        })
    }
    
    return [tar, 'L']
}

//Flippyfloppy % all of, low pulse turns on/off, turns? on -> high, off -> low
//Conjunction & -> connected targets? if all signals high? send low, send high

const sendPulse = (map: Map<string, Map<string, any>>, target: string, type: Signal, from = ''): Map<string, Map<string, any>> => {
    //console.log('pulseRequest', target)
    steps++
    let targ = map.get(target)
    //console.log(map)
    let [tar, outp] = getOutSignal(targ!, type, from)
    map.set(target, tar)
    tar.get('switches').forEach((sw: string) => {
        let out = target === 'broadcaster' ? type : outp
        return sendPulse(map ,sw, out, target) //Loops infinetly, how to stop??
    })
    return map
}

const main = (data: string[]) => {
    const map = new Map()
    data.forEach(row => {
        let tempMap = new Map()
        let temp = row.split(' -> ')
        let prefix = temp[0] === 'broadcaster'? 'a' : temp[0][0]
        let name = temp[0] === 'broadcaster' ? 'broadcaster' : temp[0].substring(1)
        let switches = temp[1].replaceAll(' ', '').split(',')
        tempMap.set('prefix', prefix)
        tempMap.set('switches', switches)
        tempMap.set('on', false)
        map.set(name, tempMap)
    })
    //console.log(map)
    let res = sendPulse(map, 'broadcaster', 'L')
    console.log(res)
    console.log(steps)

}

readFile(`day${day}/${fn}.txt`, "utf8", (err, data) => {
    if (err) console.log(err)
    main(data.split('\n'))
})
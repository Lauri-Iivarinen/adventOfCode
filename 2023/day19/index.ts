import { readFile } from 'fs'
const day = 19
const fn = 'inputt'

//Transform data
const getWorkflows = (data: string) => {
    const workflows = new Map()
    data.split('\n\n')[0].split('\n').map(row => row.replace('}', '').split('{')).forEach(row => {
        let vals = row[1].split(',').map(ins => {
            const map = new Map()
            let destination = ins
            let passed = true
            if (ins.includes(':')) {
                passed = false
                let str = ins.substring(2).split(':')
                destination = str[1]
                map.set('char', ins[0])
                map.set('comparator', ins[1])
                map.set('count', parseInt(str[0]))
            }
            map.set('destination', destination)
            map.set('passed', passed)
            return map
        })
        //return [row[0], vals]
        workflows.set(row[0], vals)
    })

    return workflows
}

const compareValues = (val: Map<string, any>, partVal: number): boolean => {
    if (val.get('comparator') === '>') return partVal > val.get('count')
    return partVal < val.get('count')
}

const main = (data: string) => {
    const accepted: Map<string, any>[] = [] //Final outcome
    const workflows: Map<string, Map<string, any>> = getWorkflows(data)
    const parts = data.split('\n\n')[1].split('\n').map(row => row.replace('{', '').replace('}', '').split(',').map(items => parseInt(items.substring(2)))).map(row => {
        const map = new Map()
        //[x,m,a,s]
        map.set('x', row[0])
        map.set('m', row[1])
        map.set('a', row[2])
        map.set('s', row[3])
        return map
    })
    
    parts.forEach(part => {
        let workflowId: string = 'in' //firstId debugged this for way too long lmao
        while (true) {
            if (workflowId === 'R') {
                break
            } else if (workflowId === 'A') {
                accepted.push(part)
                break
            }
            let workfl = workflows.get(workflowId)
            let newWf = false //Dont keep running trough workflows if already passed current iteration
            workfl?.forEach((step: Map<string, any>) => {
                if (!newWf) {
                    if (step.get('passed')) {
                        workflowId = step.get('destination')
                        newWf = true
                    } else {
                        let partCode: string = step.get('char')
                        //Compare vals if ok -> new destination
                        if (compareValues(step, part.get(partCode))) {
                            workflowId = step.get('destination')
                            newWf = true
                        }
                    }
                }
            })
        }
    })
    let sum = 0
    accepted.forEach(row => row.forEach(val => sum += val))
    console.log(sum)
}

readFile(`day${day}/${fn}.txt`, "utf8", (err, data) => {
    if (err) console.log(err)
    main(data)
})
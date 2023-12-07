import { readFile } from 'fs'
const day = 7

const convertToNum = (num) => {
    switch (num) {
        case 'A':
            return 14
        case 'K':
            return 13
        case 'Q':
            return 12
        case 'J':
            return 11
        case 'T':
            return 10
        default:
            return parseInt(num)
    }
}

const getPower = (cards) => {
        if (cards.length === 1) return 5            
        if (cards.length === 2 && cards[0].count === 4) return 4
        if (cards.length === 2 && cards[0].count === 3 )return 3.5
        if (cards.length === 3 && cards[0].count === 3 ) return 3
        if (cards.length === 3 && cards[0].count === 2) return 2.5
        if (cards[0].count === 2 ) return 2
        return 1
}

const main = (data) => {
    data = data.map(row => {
        row = row.split(' ')
        const bid = parseInt(row[1])
        let cards = row[0].split('').map(val => convertToNum(val))
        let filter = cards.map(card => {
            const count = cards.filter(a => a === card).length
            return {card, count}
        })
        //cards = cards.map(c)
        return {cards: filter, bid, raw: cards}
    })

    //Get all unique cards in set therefore finding out the counts
    data = data.map(set => {
        const res = set.cards.filter((a, index) => set.raw.indexOf(a.card) === index).sort((a,b) => b.count-a.count)
        //console.log(res)
        const power = getPower(res)
        return {...set, power}
    }).sort((a, b) => {
        if (a.power === b.power) {
            for (let i = 0; i < 5; i++){
                if (a.raw[i] !== b.raw[i]) return a.raw[i]-b.raw[i]
            }
        }

        return a.power - b.power
    })
    
    let sum = 0
    data.forEach((game, index) => sum += (index+1)*game.bid)

    console.log(sum)
}

readFile(`day${day}/input.txt`, "utf8", (err, data) => {
    if (err) console.log(err)
    main(data.split('\n'))
})
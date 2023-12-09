import { readFile } from 'fs'
const day = 6

//How many ways is there to win a race
const main = (data) => {
    //pt1
    /*
    data = data.map(row => row.split(':')[1].trim().split(' ').filter(a => a !== '').map(num => parseInt(num)))
    const times = data[0]
    const distances = data[1]
    console.log(data)
    //*/
    

    //pt2
    
    data = data.map(row => row.split(':')[1].trim().split(' ').filter(a => a !== '')).map(a => parseInt(a.join().replaceAll(',','')))
    console.log(data)
    const times = [data[0]]
    const distances = [data[1]]
    // */
    
    //1 press -> 1 speed
    //3 press -> 3 speed, but also less time for speed
    let winningTimes = times.map((time, index) => {
        let wins = []
        let distanceToBeat = distances[index]
        for (let i = 0; i < time; i++){
            let allowedTimeToTravel = time - i
            let speed = i
            if (allowedTimeToTravel*speed > distanceToBeat) wins.push(i)
        }
        
        return wins.length
    });

    console.log(winningTimes.reduce((a,b) => a*b))
    // */
}

readFile(`day${day}/input.txt`, "utf8", (err, data) => {
    if (err) console.log(err)
    main(data.split('\n'))
})
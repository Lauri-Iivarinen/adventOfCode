"""
Looks like the issue I was having in 1st part was that I was solving it in part2s way all the time...
"""

abc = "abcdefghijklmnopqrstuvwxyz".upper()
array = []
order = {
    '1':[],
    '2':[],
    '3':[],
    '4':[],
    '5':[],
    '6':[],
    '7':[],
    '8':[],
    '9':[],
}

with open('input2.txt') as crates:
    for line in crates:
        txt = line.replace('\n', '')
        index = 0
        for i in range(1,len(txt),4):
            if txt[i] in abc:
                if i == 1:
                    order.get('1').insert(0,txt[i])
                else:
                    order.get(f'{i-index}').insert(0,txt[i])
            index += 3       
crates.close()

with open('input.txt') as input:
    for line in input:
        txt = line.replace('\n','').split(' ')
        task = {
            "move": int(txt[1]),
            "from": int(txt[3]),
            "to": int(txt[5])
        }
        amount = task.get("move")
        where = f'{task.get("from")}'
        to = f'{task.get("to")}'
        boxes = order.get(where)
        boxes = boxes[(len(boxes)-(amount)):]

        for i in range(amount):
            order.get(where).pop()

        for box in boxes:
            order.get(to).append(box)

input.close()

#parse outcome
result = ""
for i in range(1,10):
    crate_stack = order.get(f'{i}')
    result += crate_stack[-1]

print(result)


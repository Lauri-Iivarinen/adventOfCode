abc = "abcdefghijklmnopqrstuvwxyz"
abc = abc.upper()

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

print("----------------------------------------------------------")

with open('input2.txt') as crates:
    for line in crates:
        txt = line.replace('\n', '')
        index = 0
        for i in range(1,len(txt),4):
            if txt[i] in abc:
                if i == 1:
                    order.get('1').insert(0,txt[i])
                    #print(f'1: {txt[i]}')
                else:
                    order.get(f'{i-index}').insert(0,txt[i])
                    #print(f'{i-index}: {txt[i]}')
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
        few_boxes = boxes[(len(boxes)-(amount)):]
        #res = arr[::-1]
        boxes = few_boxes[::-1]
    #print(boxes)
        #print(f"Moving {amount}->{boxes} from {task.get('from')} to {task.get('to')} which is now {order.get(to)}")

        for i in range(amount):
            order.get(where).pop()

        for box in boxes:
            order.get(to).append(box)
        
        #print(f"Moved crates to new tower: {order.get(to)}")
        #print()
input.close()


result = ""

for i in range(1,10):
    tower = order.get(f'{i}')
    result += tower[(len(tower)-1)]
    print(f'{i}: {order.get(f"{i}")}')

print(result)
print(order)

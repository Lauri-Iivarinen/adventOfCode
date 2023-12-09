#[(x,x),(y,y)...]
array = []

with open('input.txt') as text:
    lines = text.readlines()
text.close()

for line in lines:
    txt = line.replace('\n','').replace(' ','')
    tuple = (txt[0],txt[1])
    array.append(tuple)

# x -> rock, 1
# y -> paper, 2
# z -> scissors, 3
# win 6
# draw 3
def points_from_round(tuple):
    input = {
        'X': 1,
        'Y': 2,
        'Z': 3
        }
    opponent = {
        'A': 'X',
        'B': 'Y',
        'C': 'Z'
    }
    if opponent.get(tuple[0]) == tuple[1]:
        return 3+input.get(tuple[1])
    if opponent.get(tuple[0]) == 'X':
        #win
        if tuple[1] == 'Y':
            return 6 + input.get(tuple[1])
        #lose
        return 0 + input.get(tuple[1])
    if opponent.get(tuple[0]) == 'Y':
        if tuple[1] == 'Z':
            return 6 + input.get(tuple[1])
        return 0 + input.get(tuple[1])
    if opponent.get(tuple[0]) == 'Z':
        if tuple[1] == 'X':
            return 6 + input.get(tuple[1])
        return 0 + input.get(tuple[1])

sum = 0
for round in array:
    sum += points_from_round(round)

print(sum)
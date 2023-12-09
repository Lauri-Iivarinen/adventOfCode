#[(x,x),(y,y)...]
array = []

with open('input.txt') as text:
    lines = text.readlines()
text.close()

for line in lines:
    txt = line.replace('\n','').replace(' ','')
    tuple = (txt[0],txt[1])
    array.append(tuple)

# A -> rock, 1
# B -> paper, 2
# C -> scissors, 3
# win 6, Z
# draw 3, Y
# lose 0, X
def points_from_round(tuple):
    #(wins_this, loses_to_this, points)
    points = {
        'A': ('C','B',1),
        'B': ('A','C',2),
        'C': ('B','A',3)
    }
    ##------------------------------opponent-lose-value
    if tuple[1] == 'X':
        return points.get(points.get(tuple[0])[0])[2]
    elif tuple[1] == 'Z':
        opponent = points.get(tuple[0])
        me = opponent[1]
        value = points.get(me)[2]
        return 6 + value
    else:
        return 3 + points.get(tuple[0])[2]

    

sum = 0
for round in array:
    sum += points_from_round(round)

print(sum)

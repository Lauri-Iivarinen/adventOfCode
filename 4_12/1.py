
array = []

with open('input.txt') as input:
    for line in input:
        txt = line.replace('\n','')
        pair = txt.split(',')
        range1 = pair[0].split('-')
        range2 = pair[1].split('-')
        
        #array.append((range(int(range1[0]),int(range1[1])),range(int(range2[0]),int(range2[1]))))
        array.append([(int(range1[0]),int(range1[1])),(int(range2[0]),int(range2[1]))])

input.close()


sum = 0

"""
for pair in array:
    if set((pair[0])).issubset(pair[1]) or set((pair[1])).issubset(pair[0]):
        sum += 1

set((range(0,1))).issubset(range(0,4))
print(range(1,2) in range(0,5))
print('a' in 'abc')

"""


for pair in array:
    if pair[0][0] >= pair[1][0] and pair[0][1] <= pair[1][1]:
        sum += 1
    elif pair[1][0] >= pair[0][0] and pair[1][1] <= pair[0][1]:
        sum += 1



print(sum)
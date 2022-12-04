
array = []

with open('input.txt') as input:
    for line in input:
        txt = line.replace('\n','')
        pair = txt.split(',')
        range1 = pair[0].split('-')
        range2 = pair[1].split('-')

        array.append([(int(range1[0]),int(range1[1])),(int(range2[0]),int(range2[1]))])

input.close()


sum = 0

for pair in array:
    pass
    elf1 = pair[0] #(0,4)
    elf2 = pair[1]

    #(1,8)(2,5) -> 2,3,4,5 -> 4
    #(1,8)(1,4) -> 1,2,3,4 -> 4
    if elf1[0] <= elf2[0] and elf1[1] >= elf2[1]:
        sum += 1
    elif elf2[0] <= elf1[0] and elf2[1] >= elf1[1]: #(1,4)(1,8) -> 1,2,3,4 -> 4
        sum += 1
    elif elf1[0] <= elf2[0] and elf1[1] >= elf2[0]: #(1,5)(2,8) 2,3,4,5 -> 4 ------ #(2,4)(4,6) -> 4 -> 1
        sum += 1
    elif elf2[0] <= elf1[0] and elf2[1] >= elf1[0]: #(2,8)(1,5) 2,3,4,5 -> 4 
        sum += 1

print(sum)
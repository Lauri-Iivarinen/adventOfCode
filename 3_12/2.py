
characters = 'abcdefghijklmnopqrstuvwxyz'
characters += characters.upper()

groups = []

with open('input.txt') as input:
    threestack = []
    index = 0
    for line in input:
        txt = line.replace('\n','')
        n = len(txt)
        string1 = txt[0:n//2]
        string2 = txt[n//2:]
        threestack.append(txt)
        index += 1
        if index == 3:
            index = 0
            groups.append(threestack)
            threestack = []
input.close

duplicates = []
#print(groups)

def getPriority(char):
    prio = characters.split(char)[0]
    return (len(prio) + 1)

for bags in groups:
    for item in bags[0]:
        if item in bags[1] and item in bags[2]:
            duplicates.append(getPriority(item))
            break

print(sum(duplicates))

"""


for rucksack in array:
    for item in rucksack[1]:
        if item in rucksack[0]:
            duplicates.append(getPriority(item))
            break
"""
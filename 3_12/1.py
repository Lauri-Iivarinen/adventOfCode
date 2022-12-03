
characters = 'abcdefghijklmnopqrstuvwxyz'
characters += characters.upper()

array = []

with open('input.txt') as input:
    for line in input:
        txt = line.replace('\n','')
        n = len(txt)
        string1 = txt[0:n//2]
        string2 = txt[n//2:]
        array.append((string1,string2))
input.close

duplicates = []

def getPriority(char):
    prio = characters.split(char)[0]
    return (len(prio) + 1)

for rucksack in array:
    for item in rucksack[1]:
        if item in rucksack[0]:
            duplicates.append(getPriority(item))
            break

print(sum(duplicates))

array=[]

with open('1_input.txt') as text:
    lines = text.readlines()
text.close()

#print(len(lines))

for line in lines:
    txt = line.replace("\n","")
    array.append(txt)

new_array = []
one_elf = []

for i in array:
    if len(i) == 0:
        new_array.append(one_elf)
        one_elf = []
    else:
        one_elf.append(int(i))

max_calories = 0
for elf in new_array:
    if sum(elf) > max_calories:
        max_calories = sum(elf)


print(max_calories)





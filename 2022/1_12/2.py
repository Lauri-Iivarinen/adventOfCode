
array=[]

with open('1_input.txt') as text:
    lines = text.readlines()
text.close()

for line in lines: #remove \n marks
    txt = line.replace("\n","")
    array.append(txt)

new_array = []
one_elf = []
for i in array: #add 1 elfs calories as an array
    if len(i) == 0:
        new_array.append(one_elf)
        one_elf = []
    else:
        one_elf.append(int(i))




three_arrays=[] #3 highest arrays (calories)
sum_of_highest_three = 0
for num in range(3):
    max_calories = 0 #highest calories in main array
    biggest_array = []#array of biggest calories
    for elf in new_array:
        if sum(elf) > max_calories:
            max_calories = sum(elf)
            biggest_array = elf
    sum_of_highest_three += max_calories
    three_arrays.append(biggest_array)
    new_array.remove(biggest_array) #remove highest calorie amount from list

print("arrays:")
print(three_arrays)
print("answer:")
print(sum_of_highest_three)
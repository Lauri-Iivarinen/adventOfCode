
"""

OVERFLOWS

"""

import sys
sys.setrecursionlimit(5000)

f_name = ""
files = [] #('a', [files])


with open('input.txt') as input:

    for line in input:
        command = True
        txt = line.replace('\n','').split(' ')
        if txt[0] == '$': command = True
        if txt[0] == '$' and txt[1] == "cd" and txt[2] != "..": f_name = txt[2]
        if txt[0] != '$':
            command = False
        if not command:
            files.append((f_name,txt))

folders = []

for folder in files:
    if folder[0] not in folders: 
        folders.append((folder[0]))

folders_with_sum = []
for folder in folders:
    item = (folder,[])
    for file in files:
        if folder == file[0]:
            item[1].append(file[1])
    folders_with_sum.append(item)


calculated = []

fail_count = 1
success = False

def find_calculated_folder(folder_name):
    #print("calculated:")
    #print(calculated)
    #print()
    for folder in calculated: 
        if folder.get("folder") == folder_name: return folder


fixed_folders = []

for items in folders_with_sum:
    direcories = []
    raw_files = []
    #print(items)
    for item in items[1]:
        if item[0] == 'dir':
            direcories.append(item)
        else:
            raw_files.append((int(item[0]),item[1]))
    fixed_folders.append((items[0],direcories,raw_files))
print("------------------------------------------")
#print()
#for item in fixed_folders: print(item)
#print()

def get_files_only(folder_name) -> list:
    files = []
    """
    index = 0
    while index < len(fixed_folders):
        if fixed_folders[index][0] == folder_name and len(fixed_folders[index][1]) == 0:
            return fixed_folders[index][2]
        elif fixed_folders[index][0] == folder_name:
            files = fixed_folders[index][2]
            sub_index = 0
            while sub_index < len(fixed_folders[index][1]):
                info = get_files_only(fixed_folders[index][1][sub_index])
                for file in info: files.append(file)
                sub_index += 1
        
            #for dir in fixed_folders[index][1]:
                #info = get_files_only(dir[1])
                #for file in info: files.append(file)
        index += 1

    """
    index = 0
    while index < len(fixed_folders):
        folder = fixed_folders[index]
        if folder[0] == folder_name and len(folder[1]) == 0:
            return folder[2]
        elif folder[0] == folder_name:
            files = folder[2]
            sub_index = 0
            while sub_index < len(folder[1]):
                dir = folder[1][sub_index]
                info = get_files_only(dir[1])
                for file in info: files.append(file)
                sub_index += 1
            """    
            for dir in folder[1]:
                info = get_files_only(dir[1])
                for file in info: files.append(file)
            """
        index += 1
    """
    for folder in fixed_folders:
        if folder[0] == folder_name and len(folder[1]) == 0:
            return folder[2]
        elif folder[0] == folder_name:
            files = folder[2]
            for dir in folder[1]:
                info = get_files_only(dir[1])
                for file in info: files.append(file)
    """
    return files


final_list = []
index = 0
while index < len(fixed_folders):
    list = get_files_only(fixed_folders[index][0])
    final_list.append((fixed_folders[index][0],list))
    index += 1

index = 0
final_final = []

while index < len(final_list):
    items = final_list[index]
    array = []
    for item in items[1]:
        if item not in array:
            array.append(item)
    final_final.append((items[0],array))
    index += 1
"""
for items in final_list:
    array = []
    for item in items[1]:
        if item not in array:
            array.append(item)
    final_final.append((items[0],array))
"""

for i in final_final: print(i)

"""

while index < len(final_list):
    array = []
    for item in final_list[index][1]:
         if item not in array:
            array.append(item)
    final_final.append((items[0],array))
    index += 1


for items in final_list:
    array = []
    for item in items[1]:
        if item not in array:
            array.append(item)
    final_final.append((items[0],array))



final_list = []
for items in fixed_folders:
    list = items[2]
    if len(items[1]) == 0:
        final_list.append((items[0],list))
    else: 
        for dirs in items[1]:
            files_of_dict = get_files_only(dirs[1])
            for item in files_of_dict: list.append(item)
        final_list.append((items[0],list))


        

#for item in fixed_folders: print(item)

print()
final_final = []
for items in final_list:
    list = []
    name_list = []
    for item in items[1]:
        if item[1] not in name_list:
            list.append(item)
            name_list.append(item[1])
    final_final.append((items[0], list))

sums = []
for row in final_final:
    sum = 0
    for item in row[1]:
        sum += item[0]
    if sum <= 100000:
        sums.append(sum)

print(sums)
total_sum = 0
for sum in sums:
    total_sum += sum

print(total_sum)
"""

"""
while fail_count > 0:
    fail_count = 0
    for folder in folders_with_sum:
        sum = 0
        for item in folder[1]:
            try:
                sum += int(item[0])
                success = True
            except:
                #print()
                #print(f"failed to sum {item}")
                try:
                    #print(f"looking for folder {item[1]}")
                    kansio = find_calculated_folder(item[1])
                    #print(f"found {folder}")
                    sum += kansio.get("size")
                    success = True
                except:
                    fail_count += 1
                    break
        if success:
            calculated.append({
                "folder": folder[0],
                "size": sum 
            })

arr = ['a','b','c','d','e','f','g','a','b','c','d','m','s','g']
arr = arr[::-1][:3]
print("----------------------------------------------")

calculated = calculated[::-1][:len(folders)]
summa = 0
for folder in calculated:
    if folder.get("size") <= 100000:
        print(folder.get("size"))
        summa += folder.get("size")

print(summa)
#for folder in folders_with_sum: print(folder)
"""
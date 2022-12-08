
"""

OVERFLOWS

"""

import sys
sys.setrecursionlimit(20000)

arr = []
folder = ""
folders = []
fixed_folders = []

with open("input.txt") as input:
    for line in input:
        arr.append(line.replace('\n','').split(' '))

def get_files(index):
    files = {
        "folder" : folder,
        "items": []
    }
    for i in range((index+1), len(arr)):
        items = []
        if arr[i][0] == "$":
            break
        else:
            files.get("items").append(arr[i])

    return files

def find_folder(f_name):
    files = []
    for folder in folders:
        if folder.get("folder") == f_name:
            #print(f"found folder {f_name}")
            #print(folder)
            #print("items:")
            for item in folder.get("items"):
                #print(item)
                if item[0] == "dir":
                    files.append(find_folder(item[1]))
                else:
                    files.append(item)
            #print()
    return {
        "folder": f_name,
        "items": files
    }

for i in range(len(arr)):
    if arr[i][0] == "$" and arr[i][1] == "cd" and arr[i][2] != "..":
        folder = arr[i][2]
    if arr[i][0] == "$" and arr[i][1] == "ls":
        folders.append(get_files(i))


for folder in folders:
    new_items = []
    for item in folder.get("items"):
        if item[0] == "dir":
            #print(f"LF folder {item[1]}")
            new_items.append(find_folder(item[1]))
        else: new_items.append(item)
    fixed_folders.append({
        "folder": folder.get("folder"),
        "items": new_items
    })
#print()
files = []
for folder in fixed_folders:
    items = folder.get("items")
    for item in items:
        try:
            name = item[1]
            size = int(item[0])
            item = {
                "filename": name,
                "size": size
            }
            files.append(item)
        except:
            pass


def get_file_size(folder):
    sum = 0
    for item in folder.get("items"):
        #print("trying to add to sum item:")
        #print(item)
        try:
            sum+=int(item[0])
        except:
            #print("failed, getting files from folder")
            #print(item)
            sum += get_file_size(item)
            pass
    return sum
    


folders_with_sums = []
sums= []
for folder in fixed_folders:
    sum = 0
    items = folder.get("items")

    for item in items:
        #print("trying to add to sum item:")
        #print(item)
        try:
            sum+=int(item[0])
        except:
            #print("failed, getting files from folder")
            #print(item)
            sum += get_file_size(item)
            pass
    folders_with_sums.append({
        "folder": folder.get("folder"),
        "size": sum
    })
    print()



#for folder in fixed_folders: print(folder)
#print()
#for file in files: print(file)
print()
for folder in folders_with_sums: print(folder)

less_than_100000 = 0
for folder in folders_with_sums:
    if folder.get("size") <= 100_000: less_than_100000+= folder.get("size")

print(less_than_100000)
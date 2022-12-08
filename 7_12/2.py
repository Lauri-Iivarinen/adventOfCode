parent_folders = [] # {f_name, files}
a_index = -1
completed = []

def add_file(txt):
    for items in parent_folders:
        items.get("files").append(txt)

with open('input.txt') as input:
    for line in input:
        txt = line.replace('\n','')
        if "$ cd " in txt and ".." not in txt:
            parent_folders.append({
                "f_name": txt.split(' ')[2],
                "files": []
                })
            a_index += 1
        elif ".." in txt:
            completed.append(parent_folders[a_index])
            parent_folders.pop()
            a_index -= 1
        elif "$ ls" not in txt and "dir" not in txt:
            add_file(txt)

folder_sizes= []
completed += parent_folders

for folder in completed:
    sum = 0
    for file in folder.get("files"):
        #print(file)
        item = int(file.split(' ')[0])
        sum += item
    
    folder_sizes.append(sum)

print(folder_sizes)
folder_sizes.sort()
print(folder_sizes)
total_filesize = folder_sizes[-1]
to_be_freed = 70_000_000 - total_filesize
needed_filesize = 30000000 - to_be_freed
print(to_be_freed)
print(needed_filesize)
curr_file = 70_000_000
for item in folder_sizes:
    if item >= needed_filesize and item < curr_file:
        curr_file = item

print(curr_file)
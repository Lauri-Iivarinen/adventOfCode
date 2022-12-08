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

under_100k = []
completed += parent_folders
for folder in completed:
    sum = 0
    for file in folder.get("files"):
        #print(file)
        item = int(file.split(' ')[0])
        sum += item
    if sum <= 100_000:
        under_100k.append(sum)

total_sum = 0
for summa in under_100k:
    total_sum+= summa

print(total_sum)

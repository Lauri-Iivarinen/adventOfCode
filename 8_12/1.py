
arr = []
with open('input.txt') as input:
    for x in input:
        x_coord = []
        txt = x.replace('\n','')
        for char in txt:
            x_coord.append(int(char))
        arr.append(x_coord)


def isVisible(item,x,y):
    x_row = arr[y]
    y_row = []
    x_left = False #true -> higher tree than item
    x_right = False
    y_top = False
    y_bottom = False
    for tree in arr:
        y_row.append(tree[x])
    #print(f"x_row: {x_row}")
    #print(f"y_row {y_row}")
    #X
    for tree in range(x):
        if x_row[tree] >= item:
            x_left = True
            break
    for tree in range(x+1,len(x_row)):
        if x_row[tree] >= item:
            x_right = True
            break
    #Y
    for tree in range(y):
        if y_row[tree] >= item:
            y_top = True
            break
    for tree in range(y+1,len(y_row)):
        if y_row[tree] >= item:
            y_bottom = True
            break

    if x_left and x_right and y_top and y_bottom:
        return False
    else: return True


visible = []
x = 0
y = 0
while x<len(arr) and y<len(arr):
    #print(f"X: {x}, Y: {y}")
    item = arr[y][x]
    if x == 0 or y == 0 or x == (len(arr)-1) or y == (len(arr)-1):
        visible.append(item)
        #print("item was visible")
    elif isVisible(item,x,y):
        visible.append(item)
    if x == (len(arr)-1):
        y += 1
        x = 0
    else: x += 1


print(visible)
print(len(visible))
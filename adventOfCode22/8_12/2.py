
arr = []
with open('input.txt') as input:
    for x in input:
        x_coord = []
        txt = x.replace('\n','')
        for char in txt:
            x_coord.append(int(char))
        arr.append(x_coord)


def isVisible(item,x,y):
    #print()
    #print(f"for item '{item}' - x:{x} - y:{y}")
    x_row = arr[y]
    y_row = []
    x_scene_l = 0
    x_scene_r = 0
    y_scene_top = 0
    y_scene_bottom = 0
    for tree in arr:
        y_row.append(tree[x])
    #print(f"x_row: {x_row}")
    #print(f"y_row {y_row}")
    #X
    reverse = x_row[:x]
    reverse = reverse[::-1]
    for tree in reverse:
        #print(tree)
        x_scene_l += 1
        if tree >= item:
            #print(f"x <- {x_scene_l}")
            break
    for tree in x_row[(x+1):]:
        x_scene_r += 1
        if tree >= item:
            #print(f"x -> {x_scene_r}")
            break
    #Y
    reverse = y_row[:y]
    reverse = reverse[::-1]
    for tree in reverse:
        y_scene_top += 1
        if tree >= item:
            #print(f"y ^ {y_scene_top}")
            break
    for tree in y_row[(y+1):]:
        y_scene_bottom += 1
        if tree >= item:
            #print(f"y v {y_scene_bottom}")
            break
    """
    print(f"L: {x_scene_l}")
    print(f"R: {x_scene_r}")
    print(f"T: {y_scene_bottom}")
    print(f"B: {y_scene_top}")
    """
    points = x_scene_l * x_scene_r * y_scene_bottom * y_scene_top
    #print(f"points: {points}")
    return points


scenic = []
x = 0
y = 0
while x<len(arr) and y<len(arr):
    #print(f"X: {x}, Y: {y}")
    item = arr[y][x]
    if x == 0 or y == 0 or x == (len(arr)-1) or y == (len(arr)-1):
        pass
        #print("item was visible")
    else:
        scenic.append(isVisible(item,x,y))
    if x == (len(arr)-1):
        y += 1
        x = 0
    else: x += 1

print(max(scenic))
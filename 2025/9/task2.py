from helpers.filehandler import fh
from helpers.visualize_d9 import visualize_d9

def calc_area(x,y,x2,y2):
    width = x - x2 if x > x2 else x2 - x
    height = y - y2 if y > y2 else y2 - y
    return (height + 1) * (width + 1)

def main(run_visuals: bool = True):
    f = fh('input.txt')
    rows = f.get_rows()
    available = []
    pairing = {}
    coords = []

    for row in rows:
        x1,y1 = list(map(int,row.split(',')))
        available.append([x1,y1,0])
        pairing[f'{x1},{y1}'] = []
        coords.append((x1,y1))
    
    search = available.copy()
    while len(search) > 0:
        x,y,connections = search.pop(0)
        potentials = [v for v in search if (v[0] == x or v[1] == y) and v[2] < 2 and [x,y] not in pairing[f'{v[0]},{v[1]}']]

        if len(potentials) == 0:
            break

        potentials = sorted(potentials, key = lambda v: v[0] if v[1] == y else v[1])
        pairing[f'{x},{y}'] = pairing[f'{x},{y}'] + [[potentials[0][0],potentials[0][1]]]
        potentials[0][2] += 1
        connections += 1
        search.append([x,y,connections])
    

    # TRUE PT 2 STARTS HERE
    max_area = 0
    fnd_coords = ((0,0),(0,0))
    counter = 1
    for row in rows:
        print(f'{round((counter / len(rows))*100, 1)} %')
        counter += 1
        x,y = list(map(int,row.split(',')))
        for r in rows:
            x2,y2 = list(map(int,r.split(',')))

            from_x = x
            to_x = x2
            from_y = y
            to_y = y2
            if x > x2:
                from_x = x2
                to_x = x
            if y > y2:
                from_y = y2
                to_y = y

            if x != x2 and y != y2:
                area = calc_area(x,y,x2,y2)
                if area > max_area:
                    invalid = [v for v in coords if v[0] > from_x and v[0] < to_x and v[1] > from_y and v[1] < to_y]
                    if len(invalid) > 0:
                        continue
                    # syntax could not be worse, oh well
                    bad_x_axis = []
                    bad_y_axis = []
                    bad_x_axis = [v for v in coords if v[1] > from_y and v[1] < to_y and ((pairing[f'{v[0]},{v[1]}'][0][0] >= to_x and v[0] <= from_x) or (pairing[f'{v[0]},{v[1]}'][0][0] <= from_x and v[0] >= to_x))]
                    # Running the visualiser tells us that we could drop this alltogether
                    bad_y_axis = [v for v in coords if v[0] > from_x and v[0] < to_x and ((pairing[f'{v[0]},{v[1]}'][0][1] >= to_y and v[1] <= from_y) or (pairing[f'{v[0]},{v[1]}'][0][1] <= from_y and v[1] >= to_y))]
                    if len(bad_x_axis) == 0 and len(bad_y_axis) == 0:
                        max_area = area
                        fnd_coords = ((x,y),(x2,y2))

    # correct: 1351617690
    print()
    print(fnd_coords)
    print(max_area)

    if run_visuals:
        visualize_d9(fnd_coords, pairing)

    

if __name__ == '__main__':
    main(False)
    #main(True)
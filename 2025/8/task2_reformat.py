from helpers.filehandler import fh

def calc_distance(ax,ay,az,bx,by,bz): # result is same even if we dont square this and this is faster
    return (ax-bx)**2 + (ay-by)**2 + (az-bz)**2


def main():
    f = fh('input.txt')
    rows = f.get_rows()

    coords = []
    groups = []

    for row in rows:
        x,y,z = list(map(int,row.split(',')))
        groups.append(row)
        for r in rows:
            x2,y2,z2 = list(map(int,r.split(',')))
            if x != x2 and y != y2 and z != z2:
                coords.append((row,r,calc_distance(x,y,z,x2,y2,z2)))

    coords = sorted(coords, key=lambda x: x[2])
    
    i = 0
    while len(groups) > 1:
        _from, to, _ = coords[i]

        # need to study union find nxt time
        old = next((v for v in groups if _from in v),None)
        groups.remove(old)

        found = False
        for j in range(len(groups)):
            if to in groups[j]:
                groups[j] += old
                found = True

        if not found:
            groups.append(old)
        
        i += 1
    
    print(int(_from.split(',')[0]) * int(to.split(',')[0]))

if __name__ == '__main__':
    main()
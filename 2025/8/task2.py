from helpers.filehandler import fh
from math import sqrt

def calc_distance(ax,ay,az,bx,by,bz): # result is same even if we dont square this and this is faster
    return sqrt((ax-bx)**2 + (ay-by)**2 + (az-bz)**2)

def get_distance(x,y,z,b:str):
    bx,by,bz = b.split(',')
    return calc_distance(int(x),int(y),int(z),int(bx),int(by),int(bz))

def get_pair(value: float, dct: dict[str,float]):
    for k,v in dct.items():
        if v == value:
            return k
    return ""

def hacky_shit(rows: list[str], limiter: int):
    closest = []
    groups: list[list[str]] = []

    for row in rows:
        x,y,z = row.split(',')
        groups.append([row])

        search = rows.copy()
        search.remove(row)

        close = sorted(search, key=lambda b: get_distance(x,y,z,b))
        
        for c in close[0:limiter]:
            dist = get_distance(x,y,z,c)
            if [c,row,dist] not in closest:
                closest.append([row,c,dist])
    
    return closest,groups


def main(limiter):
    f = fh('input.txt')
    rows = f.get_rows()

    closest,groups = hacky_shit(rows,limiter)
    closest = sorted(closest, key=lambda x: x[2])
    _from, to = ["",""]
    i = 0
    while len(groups) > 1:
        _from,to,dst=closest[i]
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
    
    print('fromto', _from, to)
    print(int(_from.split(',')[0]) * int(to.split(',')[0]))

if __name__ == '__main__':
    limiter = 1
    # TURBO hacky solution where we wont need more than 4-5 lowest values from each connector, 
    # trial by error type shit, debugged pt 1 so long that dont really care to optimise this
    while True:
        if limiter > 10:
            print('noob')
            break
        try:
            print(limiter)
            main(limiter)
            break
        except:
            limiter += 1
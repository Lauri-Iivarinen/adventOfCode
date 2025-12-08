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

def main(connections):
    if connections == 10:
        f = fh('inputt.txt')
    else:
        f = fh('input.txt')
    rows = f.get_rows()

    closest = [['','',1000000000000000000000000000] for x in range(connections) ]
    #print(closest)
    #return
    groups: list[list[str]] = []
    recorder_dist = []

    #for i in range(len(rows)):
    for row in rows:
        x,y,z = row.split(',')
        groups.append([row])

        search = rows.copy()
        search.remove(row)

        #closest = sorted(closest, lambda x: x[2])
        close = sorted(search, key=lambda b: get_distance(x,y,z,b))

        for c in close:
            dist = get_distance(x,y,z,c)
            if dist < closest[-1][2] and [c,row,dist] not in closest:
                closest = [[row,c,dist]] + closest[0:len(closest)-1]
                closest = sorted(closest, key=lambda x: x[2])

    #print(len(closest))
    closest = sorted(closest, key=lambda x: x[2])
    #print(closest)
    #for st in closest[0:3]:
        #print(st[2], st[0], st[1])
    #return

    for c in closest:
        pass
        #print(c[2],' - ',c[0],c[1])

    for i in range(connections):
        _from,to,dst=closest[i]

        old = next((v for v in groups if _from in v),None)
        groups.remove(old)

        found = False
        for j in range(len(groups)):
            if to in groups[j]:
                groups[j] += old
                found = True

        if not found:
            #print(_from, to, old)
            groups.append(old)
            #i -= 1 # this would loop infinitely
        #print()
        #print(groups)
    
    
    ans = [] 
    for grp in groups:
        #print(grp)
        ans.append(len(grp))

    #print(sum(ans))
    ans.sort(reverse=True)
    print(ans[0:3])
    res = 1
    for a in ans[0:3]:
        res *= a
    print('ans:',res)

if __name__ == '__main__':
    # wrong 9072
    main(1000)
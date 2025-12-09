from helpers.filehandler import fh

def calc_area(x,y,x2,y2):
    width = x - x2 if x > x2 else x2 - x
    height = y - y2 if y > y2 else y2 - y
    return (height + 1) * (width + 1) # include outer edges

def main():
    f = fh('input.txt')
    rows = f.get_rows()
    max_area = 0
    coords = ((0,0),(0,0))
    for row in rows:
        x,y = list(map(int,row.split(',')))
        for r in rows:
            x2,y2 = list(map(int,r.split(',')))
            if x != x2 and y != y2:
                area = calc_area(x,y,x2,y2)
                if area > max_area:
                    max_area = area
                    coords = ((x,y),(x2,y2))

    print(coords)
    print(max_area)
    

if __name__ == '__main__':
    main()
    #print(calc_area(2,5,11,1))
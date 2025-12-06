from helpers.filehandler import fh

# Initial abysmal solution, i just had to refactor this
# sort low end values, check for overlapping +1 index values
def main():
    f = fh('input.txt')
    input = f.get_str()
    fresh_list, ingredients = input.split('\n\n')
    fresh_list = fresh_list.split('\n')

    vml = {}
    order_list = []
    i = 0
    for _range in fresh_list:
        l,r = _range.split('-')
        #vml[l] = r # debugged this fucking shit for 3 hours because of this row
        vml[i] = r
        order_list.append(l)
        i += 1

    left = list(map(lambda x: int(x),order_list.copy()))
    left.sort()
    left = list(map(lambda x: str(x), left))
    ranges: list[str] = []
    for v in left:
        li = order_list.index(v)
        ranges.append(f'{v}-{vml[li]}')
        order_list[li] = 'none' # criminal

    i = 0
    while i < len(ranges) - 1:
        cl, cr = ranges[i].split('-')
        nl, nr = ranges[i+1].split('-')

        if int(cr) >= int(nl) and int(cr) <= int(nr):
            ranges.pop(i)
            ranges[i] = f'{cl}-{nr}'
        elif int(cr) >= int(nl):
            ranges.pop(i+1)
        else:
            i += 1
    
    val = sum(list(map(lambda x: (int(x.split('-')[1]) - int(x.split('-')[0])) + 1, ranges)))
    print(val)


if __name__ == '__main__':
    main()
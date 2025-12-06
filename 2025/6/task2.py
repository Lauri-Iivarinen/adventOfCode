from helpers.filehandler import fh
import re

# can I do this without rotating?
def main():
    f = fh('input.txt')
    rows = f.get_rows()

    factors = re.sub('\s+',' ',re.sub('^\s+|\s+$', '', rows.pop(-1)))
    factors = factors.split(' ')
    factors.reverse()

    # this is fast on this input but can this be done more smart
    # start from bottom right corner going up and then left
    # rotate table counter clockwise
    inp: list[str] = []
    for i in range(len(rows[0])-1, -1, -1):
        row = ''
        for j in range(len(rows)-1, -1, -1):
            row += rows[j][i]
        inp.append(row[::-1])

    factor_index = 0
    start_new = True
    total = 0
    current = 0
    for v in inp:
        #print(f'val: "{v}"')
        if start_new:
            total += current
            current = int(v.strip())
            start_new = False
        elif len(v.strip()) == 0:
            factor_index += 1
            start_new = True
        elif factors[factor_index] == '+':
            current += int(v.strip())
        else:
            current *= int(v.strip())

    total += current # last iterations 'current' does not get added to total inside loop
    print(total)

if __name__ == '__main__':
    main()
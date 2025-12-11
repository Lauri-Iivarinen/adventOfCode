from functools import cache
from helpers.filehandler import fh

table: dict[str, list[str]] = {}

@cache
def sub_paths(search, dac = False, fft = False):
    if search == 'out':
        if dac and fft:
            return 1
        return 0

    total = 0
    for v in table[search]:
        total += sub_paths(v, dac or v == 'dac', fft or v == 'fft' )
    
    return total
        

def main():
    f = fh('input.txt')
    rows = f.get_rows()
    #table: dict[str,list[str]] = {}
    for row in rows:
        k,v = row.split(': ')
        table[k] = v.split(' ')

    c = sub_paths('svr')
    print(c)

if __name__ == '__main__':
    main()
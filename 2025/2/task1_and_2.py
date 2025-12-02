from helpers.filehandler import fh
import re

def main(pattern):
    f = fh('input.txt')
    input = f.get_str().replace('\n', '').split(',')
    invalid = 0
    for _range in input: # super inefficient, keep it "simple, stupid"
        start,end = _range.split('-')
        for i in range(int(start), int(end)+1):
            v = str(i)
            if (re.match(pattern, v) != None):
                invalid += i
    print(invalid)
    

if __name__ == '__main__':
    #pt1
    main(r'^(\d+)\1$')
    #pt2
    main(r'^(\d+)\1+$') #duhh
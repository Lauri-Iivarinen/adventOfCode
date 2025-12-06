from helpers.filehandler import fh
import re

def main():
    f = fh('input.txt')
    rows = f.get_rows()
    input = list(map(lambda x: re.sub('^\s+|\s+$','', re.sub('\s+', ' ', x)).split(' '), rows))

    #print(input)

    i = 0
    factors = input.pop(-1)
    summed = 0
    for i in range(len(input[0])):
        current = int(input[0][i])
        for j in range(1,len(input)):
            if factors[i] == '+':
                current += int(input[j][i])
            else:
                current *= int(input[j][i])
        summed += current
    
    print(summed)

    

if __name__ == '__main__':
    main()
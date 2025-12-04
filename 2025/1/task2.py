from helpers.filehandler import fh
        

def main():
    f = fh('input.txt')
    rows = f.get_rows()
    pointer = 50
    counter = 0
    for row in rows:
        direction = list(row)[0]
        val = int(''.join(list(row)[1:]))
        leftover = val % 100
        counter += (val - leftover) / 100
        
        if direction == 'L':
            pointer -= leftover
            if pointer < 0:
                counter += 1 if pointer + leftover != 0 and pointer + 100 != 0 else 0 # value does not start from 0 nor does it end at 0
                pointer += 100
        else:
            pointer += leftover
            if pointer > 99:
                counter += 1 if pointer - leftover != 0 and pointer - 100 != 0 else 0
                pointer -= 100
                
        if pointer == 0:
            counter += 1

    print(int(counter))
if __name__ == '__main__':
    main()
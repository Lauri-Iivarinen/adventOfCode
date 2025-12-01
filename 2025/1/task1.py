from helpers.filehandler import fh
        

def main():
    f = fh('input.txt')
    rows = f.get_rows()
    pointer = 50
    counter = 0
    for row in rows:
        direction = list(row)[0]
        val = int(''.join(list(row)[1:]))
        #print(pointer, direction, val)
        if direction == 'L':
            pointer -= val
            while pointer < 0:
                pointer += 100
        else:
            pointer += val
            while pointer > 99:
                pointer -= 100
        if pointer == 0:
            counter += 1
        #print(pointer)
    print(counter)
if __name__ == '__main__':
    main()
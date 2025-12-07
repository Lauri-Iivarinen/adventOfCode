from helpers.filehandler import fh

def main():
    f = fh('input.txt')
    rows = f.get_rows()
    first = list(rows.pop(0))
    counter = 0

    for row in rows:
        for i in range(len(row)):
            if row[i] == '^' and first[i] == 'S':
                # split
                first[i] = '.'
                first[i-1] = 'S'
                first[i+1] = 'S'
                counter += 1
    print(counter)

    

if __name__ == '__main__':
    main()
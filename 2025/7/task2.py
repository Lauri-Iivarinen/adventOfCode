from helpers.filehandler import fh

def main():
    f = fh('input.txt')
    rows = f.get_rows()
    start = [1 for _ in rows[0]]

    # start from bottom and combine timelines, the 1 that strarts from index of S is the real count
    for row in rows[::-1]:
        for i in range(len(row)):
            if row[i] == '^':
                start[i] = start[i-1] + start[i+1]
    
    print(start[rows[0].index('S')])

    

if __name__ == '__main__':
    main()
from helpers.filehandler import fh

def main():
    f = fh('input.txt')
    rows = f.get_rows()
    checker = []
    counter = 0

    for row_ind in range(len(rows)):
        column = list(rows[row_ind])
        for col_ind in range(len(column)):
            if rows[row_ind][col_ind] != '@':
                continue
            col_left = col_ind - 1 if col_ind > 0 else col_ind
            col_right = col_ind + 1 if col_ind < len(rows[0]) - 1 else col_ind
            top = [rows[row_ind-1][col_left : col_right + 1]] if row_ind > 0 else []
            bottom = [rows[row_ind+1][col_left : col_right + 1]] if row_ind + 1 < len(rows) else []
            left = [rows[row_ind][col_left]] if col_left != col_ind else []
            right = [rows[row_ind][col_right]] if col_right != col_ind else []
            array = "".join(top + bottom + left + right)
            if array.count('@') < 4:
                counter += 1
                #checker.append(f'{row_ind},{col_ind}')
    print(counter)
    #print(checker)
            

if __name__ == '__main__':
    main()
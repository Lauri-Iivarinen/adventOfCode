from helpers.filehandler import fh

# somewhat bruteforce but ill take it, takes only .3s to exec so not too terrible
def iterate(rows: list[str], counter: int, changes: list[str], dbg = 0):
    print('iteration', dbg)
    if len(changes) == 0 and counter != -1:
        return counter

    if counter == -1:
        counter = 0
    '''
    else:
        for change in changes:
            r,c = change.split(',')
            row = list(rows[int(r)])
            row[int(c)] = '.'
            rows[int(r)] = "".join(row)
    '''
    #counter = 0
    checker = []
    for row_ind in range(len(rows)):
        # This was also slower than iterating as per usual
        '''
        if re.match(r'^\.+$',rows[row_ind]):
            continue
        '''
        for col_ind in range(len(rows[0])):
            if rows[row_ind][col_ind] != '@':
                continue
            col_left = col_ind - 1 if col_ind > 0 else col_ind
            col_right = col_ind + 1 if col_ind < len(rows[0]) - 1 else col_ind

            # Generate lists of values to be checked ^ v < >
            top = [rows[row_ind-1][col_left : col_right + 1]] if row_ind > 0 else []
            bottom = [rows[row_ind+1][col_left : col_right + 1]] if row_ind + 1 < len(rows) else []
            left = [rows[row_ind][col_left]] if col_left != col_ind else []
            right = [rows[row_ind][col_right]] if col_right != col_ind else []

            checked_locations = "".join(top + bottom + left + right)
            if checked_locations.count('@') < 4:
                counter += 1
                checker.append(f'{row_ind},{col_ind}')

                # ~35% faster if we remove the paper roll here
                row = list(rows[row_ind])
                row[col_ind] = '.'
                rows[row_ind] = "".join(row)

    return iterate(rows, counter, checker, dbg+1)


def main():
    f = fh('input.txt')
    rows = f.get_rows()
    
    counter = iterate(rows, -1, [])

    print()
    print(counter)
            

if __name__ == '__main__':
    main()
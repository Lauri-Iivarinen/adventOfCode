from helpers.filehandler import fh

def sub_paths(table, key, count):
    if key == 'out':
        return count + 1
    for item in table[key]:
        count += sub_paths(table, item, 0)
    return count


def main():
    f = fh('input.txt')
    rows = f.get_rows()
    table = {}
    for row in rows:
        k,v = row.split(': ')
        table[k] = v.split(' ')
    
    count = sub_paths(table, 'you', 0)
    print(count)

    

if __name__ == '__main__':
    main()
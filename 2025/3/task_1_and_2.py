from helpers.filehandler import fh

def get_batteries(bank: list[int], start_ind, backlimit, used: list[int], count): # recurse 12 times find max
    if len(used) == count:
        return used
    high = max(bank[start_ind:backlimit])
    ind = bank[start_ind:backlimit].index(high) + start_ind
    used.append(high)
    return get_batteries(bank, ind + 1, backlimit + 1, used, count)


def main(count):
    f = fh('input.txt')
    rows  = f.get_rows()
    banks = []
    for bank in rows:
        bank = list(map(lambda x: int(x), list(bank)))
        batteries = get_batteries(bank, 0, len(bank) - count + 1, [], count) # 11 batteries remaining after search
        batt_str = list(map(lambda x: str(x), batteries))
        #print("".join(batt_str))
        banks.append(int("".join(batt_str)))

    print(sum(banks))
    

if __name__ == '__main__':
    main(2) # TASK 1
    main(12) # TASK 2
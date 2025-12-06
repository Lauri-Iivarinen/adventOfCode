from helpers.filehandler import fh

def is_in_range(fresh_list: list[str], ingredient):
    for _range in fresh_list:
        l,r = _range.split('-')
        if int(ingredient) in range(int(l), int(r)+1):
            return True
    return False

def main():
    f = fh('input.txt')
    input = f.get_str()
    fresh_list, ingredients = input.split('\n\n')
    fresh_list = fresh_list.split('\n')
    ingredients = ingredients.split('\n')
    #print(fresh_list)
    #print(ingredients)
    count = 0
    for ingredient in ingredients:
        if is_in_range(fresh_list, ingredient):
            count += 1
    print(count)
    

if __name__ == '__main__':
    main()
#Same as part1 but replaced 4 with 14

with open('input.txt') as input:
    text = input.readline()

def check_different_abc(str):
    if len(str) <14: return False
    abc = 'abcdefghijklmnopqrstuvwxyz'
    abc_len = len(abc)
    for char in str:
        if char in abc: abc = abc.replace(char,'')
    
    if abc_len - len(abc) == 14: return True
    else: return False

stream = ""
index = 0
for char in text:
    index += 1
    if len(stream) < 14:
        stream += char
    else:
        stream = stream[1:] + char
    
    if check_different_abc(stream):
        break
    

print(index)
print(stream)
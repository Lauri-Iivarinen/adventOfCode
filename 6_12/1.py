with open('input.txt') as input:
    text = input.readline()

def check_different_abc(str):
    if len(str) <4: return False
    abc = 'abcdefghijklmnopqrstuvwxyz'
    abc_len = len(abc)
    for char in str:
        if char in abc: abc = abc.replace(char,'')
    
    if abc_len - len(abc) == 4: return True
    else: return False

stream = ""
index = 0
for char in text:
    index += 1
    if len(stream) < 4:
        stream += char
    else:
        stream = stream[1:] + char
    
    if check_different_abc(stream):
        break
    

print(index)
print(stream)
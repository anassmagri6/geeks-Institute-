#Challenge 1
number = int(input(" number: "))
length = int(input(" length: "))

multiples = [number * i for i in range(1, length + 1)]
print(multiples)

#Challenge 2

word = input("Enter word: ")

result = ""
for char in word:
    if not result or char != result[-1]:
        result += char

print(result)


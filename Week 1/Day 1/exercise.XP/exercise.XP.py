             #🌟 Exercise 1 : Hello World
print("Hello world\n" * 4, end="")
            #🌟 Exercise 2 : Some Math

result = (99**3) * 8
print(result)
             #🌟 Exercise 3 : What’s your name ?

my_name = "anas"
user_name = input("Enter your name: ")
if user_name.strip().lower() == my_name.lower():
    print("No way! We share the exact same name!")
else:
    print(f"Nice name, {user_name}! But mine is still better")
             #🌟 Exercise 4 : Tall enough to ride a roller coaster

height = int(input("Enter your height in cm: "))
if height > 145:
    print("Great! You are tall enough to ride.")
else:
    print("Sorry, you need to grow a bit more to ride!")
            #🌟 Exercise 5 : Favorite Numbers

my_fav_numbers = {7, 12, 21}

my_fav_numbers.add(99)
my_fav_numbers.add(3)

my_fav_numbers.remove(3)
friend_fav_numbers = {5, 10, 21}

our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)

print("Our favorite numbers:", our_fav_numbers)
               #🌟 Exercise 6: Tuple

tuple = (1,5,8)
#"No, tuples are immutable,"
#" so we cannot add items to them directly."
                #🌟 Exercise 7: List

basket = ["Banana", "Apples", "Oranges", "Blueberries"]

basket.remove('Banana')
basket.remove('Blueberries')

basket.append('kiwi')
basket.insert(0,'Apples')
basket.count("Apples")
#basket.clear()

print(basket)
                   #🌟 Exercise 8 : Sandwich Orders
                   
sandwich_orders = ["Tuna sandwich", "Pastrami sandwich",
 "Avocado sandwich", "Pastrami sandwich"
 , "Egg sandwich", "Chicken sandwich", "Pastrami sandwich"]

name = "Pastrami sandwich"
while name in sandwich_orders:
    sandwich_orders.remove("Pastrami sandwich")

finished_sandwiches = []

while sandwich_orders:
    current_sandwich = sandwich_orders.pop(0)
    finished_sandwiches.append(current_sandwich)

for sandwich in finished_sandwiches:
    print(f"I made your {sandwich.lower()}")








    
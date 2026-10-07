#🌟 Exercise 1 : Convert lists into dictionaries
keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]

result = dict(zip(keys, values))

print(result)

#🌟Exercise 2 : Cinemax 

family = {"rick": 43, "beth": 13, "morty": 5, "summer": 8}
total_cost = 0

for name, age in family.items():
    if age < 3:
        price = 0
    elif 3 <= age <= 12:
        price = 10
    else:
        price = 15
    
    print(f"{name.capitalize()}: ${price}")
    total_cost += price

print(f"Total: ${total_cost}")

# 🌟Exercise 3: Zara
brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {"France": "blue", "Spain": "red", "US": ["pink", "green"]},
}

brand["number_stores"] = 2

print(
    f"Zara's clients are people looking for clothes for {', '.join(brand['type_of_clothes'])}."
)

brand["country_creation"] = "Spain"

if "international_competitors" in brand:
    brand["international_competitors"].append("Desigual")

del brand["creation_date"]

print(brand["international_competitors"][-1])

print(brand["major_color"]["US"])

print(len(brand))

print(list(brand.keys()))

more_on_zara = {"creation_date": 1975, "number_stores": 10000}

brand.update(more_on_zara)

print(brand["number_stores"])

#🌟 Exercise 4: Some Geography
def describe_city(city, country="Iceland"):
    print(f"{city} there {country}")

describe_city("hello")

#🌟 Exercise 5: Random
import random

def check_number(user_num):
    random_num = random.randint(1, 100)
    if user_num == random_num:
        print("Success! Both numbers are equal.")
    else:
        print(f"Fail! Your number: {user_num}, Random number: {random_num}")

check_number(50)


#🌟 Exercise 6: Personalized Shirts
def make_shirt(size="large", text="I love Python"):
    print(f"The size of the shirt is {size} and the text is {text}")
make_shirt()
make_shirt(size="medium")
make_shirt("small", "Custom Text")
make_shirt(text="Keyword Argument", size="XL")

#🌟 Exercise 7 : Temperature Advice

import random
def get_random_temp(season=None):
    if season == "winter":
        return round(random.uniform(-10, 16), 1)
    elif season in ["autumn", "fall"]:
        return round(random.uniform(0, 24), 1)
    elif season == "spring":
        return round(random.uniform(10, 28), 1)
    elif season == "summer":
        return round(random.uniform(24, 40), 1)
    else:
        return round(random.uniform(-10, 40), 1)


def main():
    month = int(
        input(
            "Enter the number of the month (1 = January, 12 = December): "
        )
    )

    if month in [12, 1, 2]:
        season = "winter"
    elif month in [3, 4, 5]:
        season = "spring"
    elif month in [6, 7, 8]:
        season = "summer"
    elif month in [9, 10, 11]:
        season = "autumn"
    else:
        season = None

    temp = get_random_temp(season)
    print(f"The temperature right now is {temp} degrees Celsius.")

    if temp < 0:
        print("Brrr, that's freezing! Wear some extra layers today.")
    elif 0 <= temp < 16:
        print("Quite chilly! Don't forget your coat.")
    elif 16 <= temp <= 23:
        print("Weather is pleasant! Enjoy your day.")
    elif 24 <= temp <= 32:
        print("It's getting warm outside!")
    elif 32 < temp <= 40:
        print("It's hot! Stay hydrated.")


main()





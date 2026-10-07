# 🌟 Exercise 1: Pets

class Pets():
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())


class Cat():
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'


class Siamese(Cat):
    def __init__(self, name, age):
        super().__init__(name, age)


class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'


class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'


all_cats = [
    Bengal("loa", 1),
    Chartreux("lil", 4),
    Siamese("lue", 6)
]

sara_pets = Pets(all_cats)
sara_pets.walk()


# 🌟 Exercise 2: Dogs

class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f"{self.name} is barking"

    def run_speed(self):
        return (self.weight / self.age) * 10

    def fight(self, other_dog):
        dog1 = self.run_speed() * self.weight
        dog2 = other_dog.run_speed() * other_dog.weight

        if dog1 > dog2:
            return f"{self.name} won the fight"
        elif dog2 > dog1:
            return f"{other_dog.name} won the fight"
        else:
            return "It's a tie!"


dog1 = Dog('his', 2, 10)
dog2 = Dog('non', 1, 15)
dog3 = Dog('bir', 5, 9)

print(dog1.bark())
print(dog2.run_speed())
print(dog3.bark())
print(dog1.fight(dog2))


# 🌟 Exercise 3: Family

class Family:
    def __init__(self, members, last_name):
        self.members = members
        self.last_name = last_name

    def born(self, **kwargs):
        self.members.append(kwargs)
        print(f"Congratulations to the {self.last_name} family")

    def is_18(self, name):
        for member in self.members:
            if member['name'] == name:
                return member['age'] >= 18
        return False

    def family_presentation(self):
        print(f"\n--- {self.last_name} Family ---")
        for member in self.members:
            print(member)


initial_members = [
    {
        'name': 'Michael',
        'age': 35,
        'gender': 'Male',
        'is_child': False
    },
    {
        'name': 'Sarah',
        'age': 32,
        'gender': 'Female',
        'is_child': False
    }
]

my_family = Family(
    members=initial_members,
    last_name="AMO"
)

my_family.family_presentation()

my_family.born(
    name='MICHIL',
    age=0,
    gender='Male',
    is_child=True
)

print("Is Michael over 18?", my_family.is_18('Michael'))
print("Is MICHIL over 18?", my_family.is_18('MICHIL'))


# 🌟 Exercise 4: TheIncredibles Family

class TheIncredibles(Family):
    def use_power(self, name):
        for member in self.members:
            if member['name'] == name:
                if self.is_18(name):
                    print(
                        f"{member['incredible_name']} "
                        f"uses power: {member['power']}"
                    )
                else:
                    print(
                        f"{member['name']} is not old enough "
                        f"to use their power!"
                    )
                return
        print(f"Member {name} not found.")

    def incredible_presentation(self):
        print("\n* Here is our powerful family *")
        super().family_presentation()


incredibles_members = [
    {
        'name': 'Michael',
        'age': 35,
        'gender': 'Male',
        'is_child': False,
        'power': 'fly',
        'incredible_name': 'MikeFly'
    },
    {
        'name': 'Sarah',
        'age': 32,
        'gender': 'Female',
        'is_child': False,
        'power': 'read minds',
        'incredible_name': 'SuperWoman'
    }
]

incredibles_family = TheIncredibles(
    members=incredibles_members,
    last_name="Incredibles"
)

incredibles_family.incredible_presentation()

incredibles_family.born(
    name='Baby Jack',
    age=0,
    gender='Male',
    is_child=True,
    power='Unknown Power',
    incredible_name='SuperBaby'
)

incredibles_family.incredible_presentation()
incredibles_family.use_power('Michael')
incredibles_family.use_power('Baby Jack')
# 🌟 Exercise 1: Cats
class Cat:
    def __init__(self, name, age):
        self.name = name
        self.age = age

Cat1 = Cat('melli', 2)
Cat2 = Cat('cheuo', 1)
Cat3 = Cat('amanda', 3)

def find_age(cat1, cat2, cat3):
    if cat1.age > cat2.age and cat1.age > cat3.age:
        return cat1
    if cat2.age > cat1.age and cat2.age > cat3.age:
        return cat2
    else:
        return cat3

oldest_cat = find_age(Cat1, Cat2, Cat3)
print(f"The oldest cat is {oldest_cat.name}, and is {oldest_cat.age} years old.")


# 🌟 Exercise 2 : Dogs
class Dog:
    def __init__(self, name, height):
        self.name = name 
        self.height = height

    def bark(self):
        print(f"{self.name} goes woof!")

    def jump(self):
        x = self.height * 2
        print(f"{self.name} jumps {x} cm high!")  

davids_dog = Dog('Rex', 50)  

print(davids_dog.name, davids_dog.height)
davids_dog.bark()
davids_dog.jump()

sarahs_dog=Dog('Teacup',20)
sarahs_dog.name
sarahs_dog.height

print(sarahs_dog.name , sarahs_dog.height  )

def biggerdog (davids_dog,sarahs_dog):
    if davids_dog.height > sarahs_dog.height :
        print(f"the bigger dog is {davids_dog.name} {davids_dog.height}cm")
    else:
        print(f"the bigger dog is {sarahs_dog.name} {sarahs_dog.height}cm")  


#🌟 Exercise 3 : Who’s the song producer?

class Song :
    def __init__(self,lyrics):
     self.lyrics=lyrics

    def sing_me_a_song(self):
     for lin in self.lyrics :
         print(lin)
stairway= Song(["There’s a lady who's sure","all that glitters is gold",
                 "and she’s buying a stairway to heaven"])   
stairway.sing_me_a_song()

#Exercise 4 : Afternoon at the Zoo

class Zoo:
 def __init__(self,zoo_name):
  self.name = zoo_name
  self.animals = []

def add_animal(self, new_animal):
        if new_animal not in self.animals:
            self.animals.append(new_animal)  

def get_animals(self):
        print(f"Animals in {self.name}:")
        for animal in self.animals:
            print(animal)  
def sort_animals(self):
        self.animals.sort()
        sorted_dict = {}
        for animal in self.animals:
            first_letter = animal[0].upper()
            if first_letter not in sorted_dict:
                sorted_dict[first_letter] = animal
            else:
                if isinstance(sorted_dict[first_letter], list):
                    sorted_dict[first_letter].append(animal)
                else:
                    sorted_dict[first_letter] = [sorted_dict[first_letter], animal]
        return sorted_dict

def get_groups(self):
        groups = self.sort_animals()
        for letter, animal_list in groups.items():
            print(f"{letter}: {animal_list}")

ramat_gan = Zoo("Ramat Gan Safari")

ramat_gan.add_animal("Giraffe")
ramat_gan.add_animal("Ape")
ramat_gan.add_animal("Bear")
ramat_gan.add_animal("Baboon")
ramat_gan.add_animal("Cat")

ramat_gan.get_animals()
ramat_gan.sell_animal("Bear")
ramat_gan.get_groups()
                       
  
# 🌟 Exercise 1 : Dunder Methods

class PrintList():

    def __init__(self, my_list):
        self.my_list = my_list

    def __repr__(self):
        return str(self.my_list)


print_list_instance = PrintList(["a", "b", "c"])
print(print_list_instance.__repr__())  # النتيجة: ['a', 'b', 'c']


# 🌟 Exercise 2 : Exceptions


my_list = [2, 3, 1, 2, "four", 42, 1, 5, 3, "imanumber"]


def sum_numbers(lst):
    total = 0
    for item in lst:
        try:
            total += item
        except TypeError:
            continue
    return total


print(sum_numbers(my_list)) 



"""
def addOperator(x, y):
    return x + y

def divideOperator(x, y):
    if y != 0:
        return x / y
    return "It cannot be divided by zero.
"""


#  Method 1: Importing the entire unit\
import operators


print(operators.addOperator(10, 5))
print(operators.divideOperator(10, 2))

# Method 2: Importing the entire unit
from operators import addOperator, divideOperator

print(addOperator(20, 4))
print(divideOperator(20, 5))

#🌟 Exercise 3 : Writing Our Own Modules
import operators as op

print(op.addOperator(30, 10))
print(op.divideOperator(30, 3))


#🌟 Exercise 4 : Dogs Domesticated

import random

from dog_file import Dog 


class PetDog(Dog):

    def __init__(self, name, age, weight):
        super().__init__(name, age, weight)
        self.trained = False

    def train(self):
        print(self.bark())
        self.trained = True

    def play(self, *dog_names):
        names = ", ".join(dog_names)
        print(f"{self.name}, {names} all play together")

    def do_a_trick(self):
        if self.trained:
            tricks = [
                f"{self.name} does a barrel roll",
                f"{self.name} stands on his back legs",
                f"{self.name} shakes your hand",
                f"{self.name} plays dead",
            ]
            print(random.choice(tricks))
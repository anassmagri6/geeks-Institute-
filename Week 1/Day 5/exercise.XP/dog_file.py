class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f"{self.name}  barking"

    def run_speed(self):
        return self.weight / self.age * 10

    def fight(self, other_dog):
        if (self.run_speed() * self.weight) > (other_dog.run_speed() * other_dog.weight):
            return f"{self.name} won the fight"
        else:
            return f"{other_dog.name} won the fight"
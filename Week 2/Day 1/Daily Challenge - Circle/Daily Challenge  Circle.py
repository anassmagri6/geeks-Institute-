import math


class Circle:

    def __init__(self, radius=None, diameter=None):
        if radius is not None:
            self.radius = radius
            self.diameter = radius * 2
        elif diameter is not None:
            self.diameter = diameter
            self.radius = diameter / 2

    def area(self):
        return math.pi * (self.radius**2)

    def __str__(self):
        return f"Circle with radius: {self.radius}"

    def __repr__(self):
        return f"Circle({self.radius})"

    def __add__(self, other):
        return Circle(radius=self.radius + other.radius)

    def __gt__(self, other):
        return self.radius > other.radius

    def __eq__(self, other):
        return self.radius == other.radius


c1 = Circle(radius=5)
c2 = Circle(diameter=12)

print(c1)
print(f"Area of c1: {c1.area():.2f}")

c3 = c1 + c2
print(f"c3 radius: {c3.radius}")

print(c1 > c2)
print(c1 == Circle(radius=5))

circles_list = [Circle(radius=10), Circle(radius=3), Circle(radius=7)]
sorted_circles = sorted(circles_list)
print(sorted_circles)
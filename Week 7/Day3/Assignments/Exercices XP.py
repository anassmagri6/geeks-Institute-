                               ##🌟 Exercise 1: Understanding Data Visualization
##Task: Explain why data visualization is important in data analysis : Data visualization is important because it helps us understand data easily,
#  identify patterns, compare values, and find trends 
##Task: Describe the purpose of a line graph in data visualization : A line graph is used to show changes and trends over time. For example
# , it can show how sales change each month.

                            ##🌟 Exercise 2: Creating a Line Plot for Temperature Variation
import matplotlib.pyplot as plt

days  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
temperatures = [72, 74, 76, 80, 82, 78, 75]
plt.plot(days, temperatures, marker='o')
plt.xlabel('Days')
plt.ylabel('Temperature (°F)')
plt.title('Temperature Variation Over a Week')
plt.show()
                       #🌟 Exercise 2: Creating a Line Plot for Temperature Variation
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
from pathlib import Path

days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
temperatures = [72, 74, 76, 80, 82, 78, 75]

plt.plot(days, temperatures, marker="o")
plt.xlabel("Days")
plt.ylabel("Temperature (°F)")
plt.title("Temperature Variation Over a Week")
plt.show()


                        # 🌟Exercise 3: Visualizing Monthly Sales with a Bar Chart
months = ["Jan", "Feb", "Mar", "Apr", "May"]
sales = [5000, 5500, 6200, 7000, 7500]

plt.bar(months, sales)
plt.xlabel("Months")
plt.ylabel("Sales Amount ($)")
plt.title("Monthly Sales")
plt.show()


csv_path = Path(__file__).with_name("Student Mental health.csv")
df = pd.read_csv(csv_path)


                         # 🌟Exercise 4: Visualizing the Distribution of CGPA
sns.set_theme(style="whitegrid")

plt.figure(figsize=(8, 6))
sns.countplot(data=df, x="What is your CGPA?", color="skyblue")
plt.title("Distribution of CGPA")
plt.xlabel("CGPA")
plt.ylabel("Count")
plt.xticks(rotation=45, ha="right")
plt.tight_layout()
plt.show()


                         # 🌟Exercise 5: Comparing Anxiety Levels Across Different Genders
plt.figure(figsize=(8, 6))
sns.countplot(
    data=df,
    x="Choose your gender",
    hue="Do you have Anxiety?",
    palette="Set2",
)
plt.title("Anxiety Levels Across Different Genders")
plt.xlabel("Gender")
plt.ylabel("Count")
plt.tight_layout()
plt.show()
                          ##🌟 Exercise 6: Exploring the Relationship Between Age and Panic Attacks
sns.set_theme(style="whitegrid")
plt.figure(figsize=(8, 6))
sns.boxplot(data=df, x='Do you have Panic attack?', y='Age', palette='Set2')
plt.title('Relationship Between Age and Panic Attacks')
plt.xlabel('Do you have Panic attack?')
plt.ylabel('Age')
plt.show()







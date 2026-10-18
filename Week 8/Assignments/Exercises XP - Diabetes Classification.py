import pandas as pd
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt

# Load the dataset
df = pd.read_csv("diabetes.csv")

# Explore the data
print(df.head())
print(df.shape)
print(df.info())
print(df.isnull().sum())

# Count positive and negative cases
print(df["diabetes"].value_counts())

# Separate features (X) and target (y)
X = df.drop("diabetes", axis=1)
y = df["diabetes"]

# Split the data
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("Training set:", X_train.shape)
print("Testing set:", X_test.shape)
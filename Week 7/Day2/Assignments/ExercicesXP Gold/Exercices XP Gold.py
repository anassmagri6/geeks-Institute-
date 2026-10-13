                               ##🌟 Exercise 1: Duplicate Detection and Removal
import pandas as pd
df = pd.read_csv('train.csv')

duplicates_count = df.duplicated().sum()
print("Number of duplicate rows:", duplicates_count )

df = df.drop_duplicates()
print('Number of rows after removing duplicates:', df.shape[0])

                                ##🌟 Exercise 2: Handling Missing Values
miss_value = df.isnull().sum()
print("Number of missing values:", miss_value)
print(miss_value[miss_value > 0])

df['Embarked']=df['Embarked'].fillna(df['Embarked'].mode()[0])
df['age']=df['age'].fillna(df['age'].median())
df = df.drop(columns=['Cabin'])
print("\nRemaining missing values after treatment:")
print(df.isnull().sum()[['Age', 'Embarked', 'Cabin']])

                             ##🌟 Exercise 3: Feature Engineering
df['FamilySize'] = df['SibSp']+df['Parch']
df['title'] =df['Name'].str.extract(' ([A-Za-z]+)\.', expand=False)

df['Title'] = df['Title'].replace('Mlle', 'Miss')
df['Title'] = df['Title'].replace('Ms', 'Miss')
df['Title'] = df['Title'].replace('Mr', 'Mr')

df = pd.get_dummies(df, columns=['Title'], drop_first=True)
print("Columns after feature engineering:")
print(df[['Name', 'FamilySize']].head())

                             ##🌟 Exercise 4: Outlier Detection and Handling
import numpy as np

q1 = df['fare'].quantile(0.25)
q2 = df['Fare'].quantile(0.75)
iqr = q2 - q1

lower_bound = q1  - 1.5 *iqr 
upper_bound =  q2  + 1.5 *iqr 
print(f"Fare Outliers bounds: Lower = {lower_bound}, Upper = {upper_bound}")

fare_cap = df['Fare'].quantile(0.98)
df['Fare'] = np.where(df['Fare'] > fare_cap,
                     fare_cap, df['Fare'])

age_cap = df['Age'].quantile(0.99)
df['Age'] = np.where(df['Age'] > age_cap, 
                     age_cap, df['Age'])

print("Dataset shape after outlier handling:", df.shape)
print("Maximum Fare after capping:", df['Fare'].max())

                               ##🌟 Exercise 5: Data Standardization and Normalization

from sklearn.preprocessing import StandardScaler, MinMaxScaler
standard_scaler = StandardScaler()
min_max_scaler = MinMaxScaler()

df['Age'] = df['Age'].fillna(df['Age'].median())
df['Age_Scaled'] = standard_scaler.fit_transform(df[['Age']])

df['Fare'] = df['Fare'].fillna(df['Fare'].median())
df['Fare_Normalized'] = min_max_scaler.fit_transform(df[['Fare']])

print("Scaled features preview:")
print(df[['Age', 'Age_Scaled', 'Fare', 'Fare_Normalized']].head())

                                ##🌟 Exercise 6: Feature Encoding

categorical = ['Sex', 'Embarked']
df_encoded = pd.get_dummies(df, columns=categorical,drop_first=True)
print("Encoded columns preview:")
print(df_encoded.filter(regex='Sex_|Embarked_').head())

                            ##🌟 Exercise 7: Data Transformation for Age Feature
df['Age'] = df['Age'].fillna(df['Age'].median())
bins=[0, 12, 18, 60, 100]
labels = ['Child', 'Teenager', 'Adult', 'Senior', 'Older']

df['AgeGroup'] = pd.cut(df['Age'], bins=bins, labels=labels, right=True)
df = pd.get_dummies(df, columns=['AgeGroup'], drop_first=True)

print("Age group transformation preview:")
print(df[['Age', 'AgeGroup_Teen', 'AgeGroup_Adult', 'AgeGroup_Senior']].head())




    
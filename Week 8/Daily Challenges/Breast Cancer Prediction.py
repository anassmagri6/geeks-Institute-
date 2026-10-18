import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('data.csv')

df.head()
df.info()
df.describe()
df.isnull().sum()


df = df.drop(columns=['id', 'Unnamed: 32',],errors='ignore')


plt.title('Diagnosis Distribution')
plt.show()  

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler  ##standardize
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier##A classification model based on a set of decision trees.
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score##Calculate the percentage of correct predictions.


print(df['diagnosis'].value_counts())

df['diagnosis']= df['diagnosis'].map({'M':1,'B':0})

x  = df.drop(columns=['diagnosis'],errors='ignore')
y  = df['diagnosis']

X_train, X_test, y_train, y_test = train_test_split(x, y, test_size= 0.2, random_state=42)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)#It learns from training data and then applies standardization to it
X_test_scaled = scaler.transform(X_test)#Unification is applied in the same way as learned from training data.

model = LogisticRegression(random_state=42)

model.fit(X_train_scaled, y_train)#Train the model using (training data) and( correct answers.)

predict = model.predict(X_test_scaled)#Make the model predict the results of test data..

model__acc =accuracy_score(y_test, model.predict(X_test_scaled))#Compare the model's predictions with the correct answers
#and calculate the percentage of correct predictions

print(f"Logistic Regression Accuracy: {model__acc:.4f}")

svm  = SVC(random_state=42)
svm.fit(X_train_scaled, y_train)
svm_acc = accuracy_score(y_test, svm.predict(X_test_scaled))#Calculate the percentage of correct predictions for the model.
print(f"Support Vector Machines (SVM) Accuracy: {svm_acc:.4f}")
















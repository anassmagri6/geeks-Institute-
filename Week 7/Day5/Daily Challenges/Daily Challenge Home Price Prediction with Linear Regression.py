import pandas as pd
import numpy as np
import re
import pickle
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_absolute_error, root_mean_squared_error

# 1. Load and Inspect
DATA_PATH = r"C:\Users\anas1\Desktop\geeks-Institute-\Week 7\Day5\Daily Challenges\file_1791938376200_HomePricesData.csv"
df = pd.read_csv(DATA_PATH)

df = df.copy()
df.info()
df.isnull().sum()


def parse_area(value):
    if pd.isna(value): return np.nan
    val_str = str(value).strip().lower().replace(',', '')       ## str  it converts  to string
    try:
        if 'm2' in val_str or 'sqm' in val_str:
            nun = float(re.findall(r'\d+\.\d+|\d+', val_str)[0])             ##float Converts the number into a decimal value(3.5)
            return nun * 10.7639 if nun > 0 else np.nan
    except: return np.nan

# 2. Parsing Functions
def parse_bedrooms(value):
    if pd.isna(value): return np.nan
    val_str = str(value).strip().lower()
    word_map = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5 , 'six' : 6}
    if val_str in word_map: return float(word_map[val_str]) ##word_map["three" :3]
    try:
        nun = float(val_str)             ##float(4)If the value is not a word like three,
        return nun if nun > 0 else np.nan
    except: return np.nan

def parse_age(value):
    if pd.isna(value): return np.nan
    val_str = str(value).strip().lower().replace('years','').replace('year','')  ## str  it converts  to string
    try:
        num  = float(val_str)
        return num if num > 0 else np.nan
    except: return np.nan


def parse_price(value):
   if pd.isna(value): return np.nan
   val_str = str(value).strip().lower().replace('$','').replace('usd','').replace(',','')
   try:
     if 'k' in val_str:
         nun = float(val_str.replace('k',''))*1000
         return nun if nun > 0 else np.nan
     num = float(val_str)
     return num if num > 0 else np.nan
   except: return np.nan


# 3. Create Numeric Dataset
df['new_area'] = df['area'].apply(parse_area)
df['new_price'] = df['price'].apply(parse_price)
df['new_age'] = df['age'].apply(parse_age)
df['new_bedrooms'] = df['bedrooms'].apply(parse_bedrooms)

# 4. Handle Missing Values
df_clean =df.dropna(subset=['price_num']).copy()           ##Remove all rows in the dataset  that contain missing values.
for x in ['area_num','new_age','new_bedrooms']:
   df_clean[x]=df_clean[x].fillna(df_clean[x].median())   ##Fill missing values with median.
    ##df_clean[x]:Because we want to modify the column within the spreadsheet itself.
 
# 5. Handle Outliers (IQR Method)
for x in ['price_num','new_area']:
    q1 = df_clean[x].quantile(0.25)
    q3 = df_clean[x].quantile(0.75)
    iqr = q3 - q1
    df_clean = df_clean[
    (df_clean[x] >= q1 - 1.5 * iqr) &
    (df_clean[x] <= q3+ 1.5 * iqr)
]

# 6. Prepare Model Data
X = df_clean[['area_num', 'bedrooms_num', 'age_num']]
y  = df_clean['price_num']

X_train, X_test, y_train, y_test = train_test_split(   ##Dividing the data into two groups
X , y , test_sizz = 0.2 , random_state = 42
)  

# 7. Train Model
model = LinearRegression()   ## model: A variable in which we store the model.
model.fit(X_train , y_train)   ##fit: A function It means training the model.

# 8. Evaluate Model
y_pred  = model.predict(X_test)   ##predict(X_test) :(R² Score) Measures the extent to which the model can explain price changes. 
#The result may be negative.

print("R2 Score:", r2_score(y_test, y_pred))  ##r2_score(y_test, preds):(MAE) Calculates the average error size between the real and expected price, 
#without paying attention to the error signal.

print("RMSE:", root_mean_squared_error(y_test, y_pred))##root_mean_squared_error(y_test, y_pred) : (RMSE)It also measures forecast error,
#but is more affected by large errors.
    
# 9. Save forms
with open('model.pkl', 'wb') as f:
    pickle.dump(model, f) 
with open('student_train_columns.pkl', 'wb') as f:
    pickle.dump(list(X.columns), f)

print("Workflow completed successfully and models saved!")























     
   


    





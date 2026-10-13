                            # Exercise 1: Introduction to Data Analysis
# What is data analysis: The systematic process of inspecting, cleaning, transforming, 
# and modeling data to discover useful information and support decision-making.
# Why it is important: Enables organizations to transform raw data into actionable insights 
# and make data-driven decisions rather than relying on intuition.
# Three application areas: Finance (risk assessment), Healthcare (patient diagnostics), 
# and E-commerce (consumer behavior analysis).

                            # Exercise 2: Dataset Loading and Initial Analysis
import pandas as pd
df = pd.read_csv('dataset_path.csv')
print(df.head())
print(df.info())

                            # Exercise 3: Identifying Data Types
# Categorization of dataset columns:
# - Quantitative (Numerical): Continuous or discrete values like age, sleep hours, or income.
# - Qualitative (Categorical): Descriptive groups or names like gender, blood type, or status.

                            # Exercise 4: Exploring Data Types (Iris Dataset)

# - sepal_length: Quantitative (continuous numerical measurement in cm)
# - sepal_width: Quantitative (continuous numerical measurement in cm)
# - petal_length: Quantitative (continuous numerical measurement in cm)
# - petal_width: Quantitative (continuous numerical measurement in cm)
# - species: Qualitative (categorical name representing the flower type)

                            # Exercise 5: Basic Observation Skills
# Columns selected for analysis: Sleep duration and stress levels.
# Reason: Useful for trend analysis and comparing groups to find correlations between rest and daily stress.

                            # Exercise 6: Identifying Data Types (Structured vs Unstructured)
# - Financial reports in Excel: Structured data
# - Photographs on social media: Unstructured data
# - News articles on a website: Unstructured data
# - Inventory data in relational database: Structured data
# - Recorded interviews from market research: Unstructured data

                           # Exercise 7: Transformation Exercise (Unstructured to Structured)
# - Blog posts: Extracting keywords, sentiment, and word counts into a tabular format.
# - Audio recordings: Transcribing speech to text and using NLP to extract key tags.
# - Handwritten notes: Digitizing text via OCR and categorizing key bullet points.
# - Video tutorials: Segmenting timestamps, extracting tags, and logging transcript metadata.

                            # Exercise 8: Import a file from Kaggle/GitHub
from pathlib import Path

import pandas as pd

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR
OUTPUT_DIR = BASE_DIR / 'outputs'
OUTPUT_DIR.mkdir(exist_ok=True)

df_train = pd.read_csv(DATA_DIR / 'train.csv')
print(df_train.head())

                            # Exercise 9: Export a DataFrame to Excel and JSON
import pandas as pd
data = {'Name': ['Alice', 'Bob'], 'Age': [25, 30]}
df = pd.DataFrame(data)
df.to_excel(OUTPUT_DIR / 'output.xlsx', index=False)
df.to_json(OUTPUT_DIR / 'output.json', orient='records')

                            # Exercise 10: Reading JSON Data
import pandas as pd
posts_file = DATA_DIR / 'posts.json'
df_json = pd.read_json(posts_file)
print(df_json.head(5))

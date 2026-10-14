                   ##🌟 Exercise 1 : Defining the Problem and Data Collection for Loan Default Prediction

# Loan Default Prediction: Problem Definition and Data Collection

# 1. Prediction Objective
# The objective is to build a machine learning model that predicts whether a
# loan applicant will default, helping financial institutions assess credit risk.

# 2. Types of Data to Collect

# Applicant Information:
# Age, employment status, and income help assess financial stability.

# Loan Information:
# Loan amount, interest rate, and loan term help evaluate repayment difficulty.

# Credit History:
# Credit scores and previous defaults help identify repayment risk.

# Financial Information:
# Existing debts and monthly expenses help evaluate the ability to repay.

# Repayment History:
# Previous payments and late payments help identify default patterns.

# Target Variable:
# Loan Default indicates whether the borrower failed to meet repayment obligations.

# 3. Data Sources and Collection Methods

# Internal Bank Records:
# Extract historical loan applications and repayment records from bank databases.

# Credit Bureaus:
# Obtain authorized credit reports and repayment histories.

# Customer Applications:
# Collect income, employment, and financial information through application forms.

# Public Datasets:
# Download suitable datasets from reliable research platforms for practice and testing.

# 4. Risks and Constraints

# Privacy and Regulation:
# Protect personal information and comply with applicable laws.

# Data Quality:
# Check for missing values, duplicates, and incorrect information.

# Sampling Bias:
# Ensure the dataset represents different types of loan applicants fairly.

# Governance:
# Monitor model accuracy, assess fairness, prevent data leakage, and maintain human oversight.

                                     ##🌟 Exercise 2 : Feature Selection and Model Choice for Loan Default Prediction


# This piece of code is already prefilled, run it to execute it and see the results.
# It provides a simple template you can modify while writing your justification.

# Selected Features:
# credit_score, annual_income, debt_to_income, loan_amount,
# interest_rate, employment_length, num_delinquencies, total_utilization.

# Justification:
# credit_score: A low score may indicate higher credit risk.
# annual_income: Helps assess the ability to repay the loan.
# debt_to_income: A high ratio may indicate financial pressure.
# loan_amount: A large loan increases repayment obligations.
# interest_rate: A high rate increases borrowing costs.
# employment_length: Helps assess income stability.
# num_delinquencies: Previous late payments may predict future defaults.
# total_utilization: High utilization may indicate financial difficulties.

# Excluded Features:
# zip_code and state: May introduce geographic bias.
# age: Use only if legally permitted and justified.

# Encoding:
# Use One-Hot Encoding for categorical features such as home_ownership
# and purpose.

# Missing Values:
# Use the median for numerical data and the most frequent category
# for categorical data, based on training data only.

# Summary:
# Select relevant features, justify choices, encode categorical data,
# and handle missing values.

                                ##🌟 Exercise 3 : Training, Evaluating, and Optimizing the Model
### 1. Model Selection
#Logistic Regression serves as a simple baseline, while Random Forest handles complex feature interactions.

### 2. Model Evaluation
#Data is split 80/20 with stratification, using 5-fold cross-validation on the training set. Reported metrics include Precision, Recall
# , F1-score, ROC-AUC, and PR-AUC.

### 3. Class Imbalance & Threshold
#Class imbalance is managed via stratified splits and class weights, with decision thresholds tuned on validation data.

### 4. Hyperparameter Optimization
#Hyperparameters are tuned using GridSearchCV or RandomizedSearchCV, 
# fitting preprocessing steps strictly on training folds to prevent data leakage.

                             ##🌟 Exercise 4 : Designing Machine Learning Solutions for Specific Problems
                    
# 1. Predicting Stock Prices — Supervised Learning
# Input: The model receives historical stock prices and other relevant data.
# Output: The model predicts the future stock price.
# Learning objective: The model learns from historical data with known prices to minimize prediction errors.


# 2. Organizing a Library of Books — Unsupervised Learning
# Input: The model receives book features such as titles, topics, and keywords.
# Output: The model groups similar books into clusters without predefined categories.
# Learning objective: The model discovers hidden patterns and similarities between books.


# 3. Robot Navigating a Maze — Reinforcement Learning
# Input: The robot receives information about its current position and the maze.
# Output: The robot chooses actions to reach the destination.
# Learning objective: The robot learns through rewards and penalties to find an efficient path.
#(Supervised: Learn from known answers.)
#(Unsupervised: Discover hidden patterns.)
#(Reinforcement: Learn through actions and rewards.)

                            ##🌟 Exercise 5 : Designing an Evaluation Strategy for Different ML Models
# 1. Supervised Learning
# Model: Logistic Regression.
# I will split the dataset into training and testing sets and use cross-validation.
# I will evaluate the model using Accuracy, Precision, Recall, F1-score, ROC-AUC, and PR-AUC.
# I can use ROC curves to study the model's ability to distinguish between classes.
# Challenge: Accuracy can be misleading when the dataset is imbalanced.


# 2. Unsupervised Learning
# Model: K-Means Clustering.
# I will use the Silhouette Score to measure how well the clusters are separated.
# I will use the Elbow Method to help choose the number of clusters.
# I will use plots to visualize the clusters and identify possible problems.
# Challenge: There are no predefined labels, so it is difficult to know the correct clusters.


# 3. Reinforcement Learning
# Model: Q-Learning.
# I will track cumulative rewards over multiple episodes to measure performance.
# I will check whether rewards become stable to assess convergence.
# I will balance exploration, trying new actions, with exploitation, choosing known good actions.
# Challenge: Results can vary between runs, and learning may require many interactions.









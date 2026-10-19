                                                    ##🌟 Exercise 1 : Small Quizz
#What is the key difference between traditional machine learning and deep learning?: the key difference is the traditional machine learning oftern requires humans to select
#important features from the data, while deep learning uses multi-layer neural networks to automatically identify patterns in the data.

#How do artificial neural networks (ANNs) mimic the human brain? : artificial neural networks (ANNs) mimic the human brain by interconnected artificial neurons 
# that process information and learn patterns from the data.

#Why does deep learning perform better on large datasets compared to traditional machine learning? : it can learn complex patterns and automatically extract ussful 
# features from large amount of data.

#What are some challenges of deep learning, and how can they be addressed? : Large amounts of data: deep learning requires a large amount of data to train effectively.
#Solution: Collect more data or use data augmentation. 

#What is feature engineering, and why is it not needed in deep learning? : Feature engineering is the process of selecting creating or  transforming input features to help 
# machine learning modle learn better.
# in traditional machine learning  feature engineering if often important because humans may need to prepare  the most useful features manually. 
# in deep learning feature engineering is not needed because deep learning models can automatically identify patterns in the data. 

#What role do hidden layers play in a deep learning model? : Hidden layers process input data and learn complex patterns and relationships.
# Each layer can learn different levels of features, helping the neural network make accurate predictions.
#The more layers a neural network has, the more complex patterns it may learn, provided it is trained properly.

#In an artificial neural network (ANN), what is the function of an activation function? : An activation function introduces non-linearity into an artificial neural network. 
# It determines the output of a neuron based on its input, allowing the network to learn complex patterns and relationships.

                                       #🌟 Exercise 2 : Building a Simple Perceptron Decision System
Temperature_weight = 0.6
Rain_weight = 0.4
Bias = 2

def perceptron (temperature, rain):
    prediction = (Temperature_weight * temperature) +( Rain_weight * rain) + Bias
    if prediction > 20:
     output = 1
    if prediction <= 20:
     output = 0
    return output, prediction

sum_1, out_1 = perceptron(70, 0)
print(f"Case 1 - Weighted Sum: {sum_1}, Decision: {out_1}")
sum_2, out_2 = perceptron(50, 1)
print(f"Case 2 - Weighted Sum: {sum_2}, Decision: {out_2}")

                                    #🌟 Exercise 3 : Building a Simple Neural Network with TensorFlow/Keras

import tensorflow as tf    #A library for building and training deep learning models.

from tensorflow.keras import layers, models #keras:An interface that makes it easy to build neural networks using TensorFlow.
#layers: Tools for creating neural network layers.
#models: Tools for creating the model and assembling its layers.

from tensorflow.keras.utils import to_categorical #Convert classifications to vectors such as [0,0,1,0]


# 2. Load the MNIST Dataset
(X_train, y_train), (X_test, y_test) = tf.keras.datasets.mnist.load_data()

# 3. Normalize the Data (Scale to [0, 1])
X_train = X_train /255.0
X_test = X_test /255.0

# 4. One-Hot Encode the Labels
y_train_encoded = to_categorical(y_train, 10)
y_test_encoded = to_categorical(y_test, 10)

# 5. Build the Neural Network Model
model = models.Sequential(([  
   layers.Flatten(input_shape=(28,28)),#Flatten : Convert image from \(28×28\) to 784 values.

   layers.Dense(128,activation='relu'),# Dense(128) : Hidden Layer: Contains 128 neurons that learn patterns using Weights and Bias.
#relu : An activation machine that helps the hidden layer learn patterns.

   layers.Dense(10,activation='softmax')#Convert results into probabilities for each number.                         
]))             

# 6. Compile the Model : (Prepare a model training method.)
model.compile(optimizer='adam',#The model helps adjust its weights to reduce error during training.
               loss='categorical_crossentropy',#Measures how well a model's predictions differ from the correct answers.
               matrix='accuracy') #Accuracy: Measures the percentage of correct expectations.

# 7. Train and Evaluate the Model
model.fit(X_train, y_train_encoded, epochs=5, batch_size=32)
test_loss, test_acc = model.evaluate(X_test, y_test_encoded)
print(f"Test Accuracy: {test_acc:.4f}")

                                    #🌟 Exercise 4 : Forward Propagation Calculation

import numpy as np

# Input Values
x1 = 2000  # Square Footage
x2 = 3     # Number of Bedrooms
x = np.array([x1, x2])

# Initial Weights and Bias
w1 = 0.5   # Weight for Square Footage
w2 = 0.7   # Weight for Bedrooms
w = np.array([w1, w2])
b = 50000  # Bias

# 1. Calculate the output value "z" before activation (Weighted Sum)
z = np.dot(x, w) + b

# 2. Apply the ReLU function to compute the final prediction
y_pred = max(0, z)

# 3. Print Results
print("Weighted Sum (z):", z)
print("Predicted House Price:", y_pred)

                                    #🌟 Exercise 5(optional) : Implementing Forward and Backward Propagation in Python
import numpy as np

# Initialize input data (features)
x = np.array([4, 80])  # 4 hours studied, previous test score: 80

# Initialize weights and bias
w = np.array([0.6, 0.3])  # Initial weights
b = 10  # Initial bias

# Forward Propagation
def forward_propagation(x, w, b):
    z = np.dot(x, w) + b  # Weighted sum
    return z  # Linear activation (No ReLU here, it's a regression task)

# Compute prediction
y_pred = forward_propagation(x, w, b)
y_true = 85  # Actual exam score

# Compute Loss (Mean Squared Error)
loss = 0.5 * (y_true - y_pred) ** 2

# Compute Gradients
grad_w = -(y_true - y_pred) * x  # Partial derivatives with respect to weights
grad_b = -(y_true - y_pred)  # Partial derivative with respect to bias

# Update Weights and Bias
learning_rate = 0.01
w_new = w - learning_rate * grad_w
b_new = b - learning_rate * grad_b

# Print Results
print("Initial Prediction:", y_pred)
print("Loss:", loss)
print("Updated Weights:", w_new)
print("Updated Bias:", b_new)


                                    #🌟 Exercise 6(optional) : Visualizing Predictions on the MNIST Dataset
import matplotlib.pyplot as plt
import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.datasets import mnist


# 1. Load the MNIST dataset
(X_train, y_train), (X_test, y_test) = mnist.load_data()

# 2. Normalize the data:(Convert pixel values from 0–255 to 0–1 for easier training.)
X_train = X_train / 255.0
X_test = X_test / 255.0

# 3. One-hot encode the labels:(Convert the number 3, for example, to a list of 10 digits )
X_train_encoded = tf.keras.utils.to_categorical(y_train, 10)
X_test_encoded = tf.keras.utils.to_categorical(y_test,10)

# 4. Build the model:(Building a neural network)
model = models.Sequential(([
   layers.Flatten(input_shape=(28, 28)),
   layers.Dense(128, activation='relu '),
   layers.Dense(10, activation='softmax')
]))

# 5. Compile the model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])


# 6. Fit the model on the training data
model.fit(X_train, y_train_encoded,#(X_train: The images he will learn from)(y_train_encoded: The correct answers associated with these images.)
           epochs=5,# The model goes through the entire training data five times.
             batch_size=32)#Process 32 images in each training batch

# 7. Make predictions
predictions = model.predict(X_test)#The model gives probabilities for each number.
predicted_labels = np.argmax(predictions, axis=1)# The highest probability per image, which is the number the model expects. (np have (argmax))

# 8. Visualize some predictions
plt.figure(figsize=(10, 5))
for i in range(10):
    plt.subplot(2, 5, i + 1)
    plt.imshow(X_test[i], cmap="gray")
    plt.title(f"Pred: {predicted_labels[i]}")
    plt.axis("off")
plt.tight_layout()
plt.show()


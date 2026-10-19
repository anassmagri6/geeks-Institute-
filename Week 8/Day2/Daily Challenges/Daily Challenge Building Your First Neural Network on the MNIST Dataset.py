import tensorflow as tf
import numpy as np
from tensorflow.keras import datasets, layers, models
import matplotlib.pyplot as plt

(X_train , y_train), (X_test, y_test) = datasets.mnist.load_data()

X_train = X_train /255
X_test = X_test /255

y_train_encoded = tf.keras.utils.to_categorical(y_train,10)
y_test_encoded = tf.keras.utils.to_categorical(y_test,10)


model = models.Sequential(([
    layers.Flatten(input_shape=(28,28)),
    layers.Dense(128, activation='relu'),
    layers.Dense(64, activation='relu'),
    layers.Dense(10, activation='softmax')
]))


model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              maetrics=['accuracy'])

history = model.fit(X_train, y_train_encoded, epochs=10,validation_split=0.2, batch_size=32 )

test_loss, test_acc = model.evaluate(X_test, y_test_encoded)
print('Test accuracy:', test_acc)

y_pred = model.predict(X_test)
y_pred_classes = np.argmax(y_pred, axis=1)
cm = confusion_matrix(y_test, y_pred_classes)

# Plot confusion matrix
disp = ConfusionMatrixDisplay(confusion_matrix=cm)
disp.plot(cmap=plt.cm.Blues)
plt.title("MNIST Confusion Matrix")
plt.show()



                    
#IMPORTING THE REQUIRED LIBRARIES
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import missingno as msno
import matplotlib.pyplot as plt
import json

# loading the csv data 
heart_data = pd.read_csv('heart_disease_data.csv')

# print first 5 rows of the dataset
#heart_data.head()

# print last 5 rows of the dataset
#heart_data.tail()

# number of rows and columns in the dataset
#heart_data.shape

# getting some info about the data
#heart_data.info()

# Getting the staticstics about the different data
#heart_data.describe().transpose()

# checking for missing values
#heart_data.isnull().sum()

# statistical measures about the data
#heart_data.describe()

# checking the distribution of Target Variable
#heart_data['target'].value_counts()

X = heart_data.drop(columns='target', axis=1)
Y = heart_data['target']

#print(X)

#print(Y)

# Checking what data should be discarded using not null sum
#msno.bar(heart_data)
#plt.show()
#Checking which columns to drop using bar charts
#msno.matrix(heart_data)
#msno.heatmap(df)
#plt.show()


#Drop the columns if the missing values are more than 10%
heart_data = heart_data.dropna()

#Checking for duplicates
#heart_data.duplicated().sum()
#Dropping all the duplicates
heart_data = heart_data.drop_duplicates()

#Checking how many have got heart failures
#heart_data['target'].value_counts(normalize=True).plot(kind = 'pie')

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.5, stratify=Y, random_state=2)

#print(X.shape, X_train.shape, X_test.shape)

model = LogisticRegression()

# training the LogisticRegression model with Training data
model.fit(X_train, Y_train)

# accuracy on training data
X_train_prediction = model.predict(X_train)
training_data_accuracy = accuracy_score(X_train_prediction, Y_train)

#print('Accuracy on Training data : ', training_data_accuracy)

# accuracy on test data
X_test_prediction = model.predict(X_test)
test_data_accuracy = accuracy_score(X_test_prediction, Y_test)

#print('Accuracy on Test data : ', test_data_accuracy)

# input_data=[]
# # Load the JSON file containing input data
# with open('data.json', 'r') as file:
#     data = json.load(file)

#     for i in data['data']:
#         input_data.append(data['data'][i])


# input_data_as_numpy_array= np.asarray(input_data)
# print(input_data_as_numpy_array)
# #reshape the numpy array as we are predicting for only on instance
# input_data_reshaped = input_data_as_numpy_array.reshape(1,-1)

# prediction = model.predict(input_data_reshaped)
# print(prediction)

# if (prediction[0]== 0):
    
#     print('The Person does not have a Heart Disease')
# else:
#     print('The Person has Heart Disease')


def testing_prediction(input):
    # Load the JSON file containing input data
    #with open('data.json', 'r') as file:
        #data = json.load(file)
    
       # for i in data['data']:
          #  input_data.append(data['data'][i])

    input_data_as_numpy_array= np.asarray(input)
    #print(input_data_as_numpy_array)
    #reshape the numpy array as we are predicting for only on instance
    input_data_reshaped = input_data_as_numpy_array.reshape(1,-1)
    
    prediction = model.predict(input_data_reshaped)
    print("Prediction: " , prediction)

    result = 'The Person has the possibility to have a Heart Disease' if prediction[0] == 1 else 'The Person does not have a Heart Disease'
    dataset = {
        'Result': result,
        'Accuracy on Training data': f'{round(training_data_accuracy * 100, 2)}%',
        'Accuracy on Test data': f'{round(test_data_accuracy * 100, 2)}%'
    }
    return dataset
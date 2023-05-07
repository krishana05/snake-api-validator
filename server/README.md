## This is a Node with Express application for Snake API Validation
This has two end points:

1. /new?w=[width]&h=[height] : To start a new game which will return a new game state
example: {"data":{"GameID":"49af9882-264c-4678-a578-bfee4814f1e9","Width":10,"Height":20,"Score":0,"Fruit":{"X":5,"Y":3},"Snake":{"X":0,"Y":0,"VelX":1,"VelY":0}}}

2. /validate: To Validate the state with snake ticks
example: {
    "GameID": "2fe78bd1-bcb8-4f38-a8f6-bf2d61a13730",
    "Width": 10,
    "Height": 20,
    "Score": 0,
    "Fruit": {
        "X": 3,
        "Y": 6
    },
    "Snake": {
        "X": 2,
        "Y": 6,
        "VelX": 1,
        "VelY": 0
    },
    "ticks": [
        {
         "VelX": 1,
         "VelY": 0
        }
    ]
}

## For the validate, please refer validation.md

## Steps to run the application
1. cd server
2. npm i
3. npm run dev
4. open http://localhost:5000/ and hit the respective endpoints
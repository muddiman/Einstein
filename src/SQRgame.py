#############################################################
#                                                           #
#                   The SQUARE ROOT GAME                    #
#                       By: .muddicode                      #
#                                                           #
#############################################################

from random import randint

def getAnswer():
    # Returns a random integer number between 10 & 100
    return randint(11, 99)

def squareIt(number):
    #square the value
    return number * number

def getUsersGuess():
    # take input from the user
    print('your_guess, por favor:')
    return input('-->')

def isCorrect(answer, guess):
    # compares users guess to the real answer
    if answer == guess:
        return True
    else:
        return False

def testCode():
    # code snippets to run specific modules 
    pass

# Main Testing Program 
the_answer = getAnswer()
print('What is the square root of ', squareIt(the_answer))
if isCorrect(the_answer, int(getUsersGuess())):
    print('Congratulations, You have an exceptionally high IQ!!!')
else:
    print('NO YUH WRONG! \n Yuh Dunce!!')
    print(the_answer)



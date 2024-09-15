# create a greeting
# create your word list
# randomly choose a word from the list you have created
# ask the user to guess a letter
# bonus make the program take the input from the user and make it lowercase
# check if the letter is in the word
import random
print("Welcome To Hangman\n")

list1=["hacking","bounty","gamer"]
choice=random.choice(list1)
print("You get 5 guesses \n")
list2=[]
# make the list2 element underscore

for i in choice:
        list2+="_"
print(list2)
num=0

game_over=False
while not  game_over:
  guess=input("Guess a letter ").lower()
  for i in range(len(choice)):
        letter=choice[i]
        if letter==guess:
                list2[i]=letter
  # if u guess wrong then it will run 
  if guess not in choice:
        num+=1
        Guess_left=5-num
        print("Guesses left \n",Guess_left)
        if num>=5:
              print("You Loser ")
              game_over=True
  print(list2)

  if "_" not in list2:
        print("You Win")
        game_over=True
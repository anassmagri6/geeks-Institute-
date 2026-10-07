                     #Part II - rock-paper-scissors.py
from game import Game

def get_user_menu_choice():
    users = input('Play a new game or Show scores or Quit: ').strip()
    if users in ['Play a new game', 'Show scores', 'Quit']:
        return users
    else:
        return False   

def print_results(results):
    print("Wins:", results['win'])
    print("Losses:", results['loss'])   
    print("Draws:", results['draw'])    
    print("Thank you for playing!")

def main():
    results = {'win': 0, 'loss': 0, 'draw': 0}
    
    while True:
        choice = get_user_menu_choice()
        
        if choice == 'Play a new game':
            game = Game()
            result = game.play()
            if result in results:
                results[result] += 1
                
        elif choice == 'Show scores':
            print_results(results)
            
        elif choice == 'Quit':
            print_results(results)
            break
            
        else:
            print("Invalid choice, please try again.")

if __name__ == "__main__":
    main()

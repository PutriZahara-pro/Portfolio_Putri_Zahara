# The script of the game goes in this file.

# Declare characters used by this game. The color argument colorizes the
# name of the character.
define e = Character("Ethan", color="#3498db", image="ethan")
define s = Character("Sara", color="#e74c3c", image="sara")
define m = Character("Mira", color="#9b59b6", image="mira")

# Declare images used in the game
image bg forest = "images/backgrounds/forest.jpg"
image bg castle = "images/backgrounds/castle.jpg"
image bg battle = "images/backgrounds/battle.jpg"

# Ethan sprites
image ethan neutral = "images/characters/ethan_neutral.png"
image ethan happy = "images/characters/ethan_happy.png"
image ethan battle = "images/characters/ethan_battle.png"

# Sara sprites
image sara neutral = "images/characters/sara_neutral.png"
image sara happy = "images/characters/sara_happy.png"
image sara battle = "images/characters/sara_battle.png"

# Mira sprites
image mira neutral = "images/characters/mira_neutral.png"
image mira happy = "images/characters/mira_happy.png"
image mira battle = "images/characters/mira_battle.png"

# The game starts here.
label start:
    
    # Variables for battle system
    $ player_health = 100
    $ enemy_health = 100

    # Show a background
    scene bg forest
    with fade

    "Bienvenue dans The Ethians Redeemed."

    # Show a character
    show ethan neutral at left
    with dissolve

    e "Je suis Ethan, un des Ethians. Notre monde est en danger."

    show sara neutral at right
    with dissolve

    s "Et je suis Sara. Nous devons agir rapidement pour sauver notre peuple."

    # Example dialogue and choices
    menu:
        "Que voulez-vous faire?"

        "Explorer la forêt":
            jump explore_forest
        
        "Aller au château":
            jump go_to_castle
        
        "Se préparer au combat":
            jump prepare_for_battle

label explore_forest:
    scene bg forest
    with fade
    
    show ethan happy at center
    with dissolve
    
    e "La forêt cache de nombreux secrets."
    
    "Vous explorez la forêt et trouvez des ressources précieuses."
    
    jump story_continuation

label go_to_castle:
    scene bg castle
    with fade
    
    show sara happy at center
    with dissolve
    
    s "Le château pourrait nous offrir protection et refuge."
    
    "Vous vous dirigez vers le château majestueux au loin."
    
    jump story_continuation

label prepare_for_battle:
    scene bg battle
    with fade
    
    show ethan battle at left
    show sara battle at right
    with dissolve
    
    e "Préparons-nous au combat!"
    s "Je suis prête à me battre!"
    
    call battle_system
    
    jump story_continuation

label battle_system:
    $ enemy_name = "Shadow Fiend"
    
    "Un combat commence contre [enemy_name]!"
    
    while player_health > 0 and enemy_health > 0:
        menu:
            "Choisissez votre action"
            
            "Attaquer":
                $ damage = renpy.random.randint(10, 20)
                $ enemy_health -= damage
                "Vous attaquez et infligez [damage] points de dégâts!"
                
                if enemy_health <= 0:
                    "Vous avez vaincu [enemy_name]!"
                    return
            
            "Défendre":
                $ defense_bonus = renpy.random.randint(5, 15)
                "Vous vous préparez à défendre, réduisant les dégâts de [defense_bonus]!"
            
            "Utiliser une potion":
                $ heal_amount = renpy.random.randint(15, 25)
                $ player_health = min(player_health + heal_amount, 100)
                "Vous utilisez une potion et récupérez [heal_amount] points de vie!"
        
        # Enemy's turn
        $ enemy_damage = renpy.random.randint(5, 15)
        $ player_health -= enemy_damage
        "[enemy_name] vous attaque et inflige [enemy_damage] points de dégâts!"
        
        if player_health <= 0:
            "Vous avez été vaincu..."
            "Mais ce n'est pas la fin. Vous vous réveillez, prêt à réessayer."
            $ player_health = 100
            return
    
    return

label story_continuation:
    scene bg forest
    with fade
    
    show ethan neutral at left
    show sara neutral at right
    show mira neutral at center
    with dissolve
    
    m "Nous devons continuer notre quête pour sauver notre monde."
    
    "À suivre..."
    
    return

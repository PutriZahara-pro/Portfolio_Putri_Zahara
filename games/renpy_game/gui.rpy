## Customized GUI configuration for "The Ethians Redeemed"
## This includes the preferences with rounded elements and neon effects

init python:
    # Couleurs principales avec effet néon subtil
    gui.accent_color = "#10b981"  # Vert néon comme dans le portfolio
    gui.idle_color = "#6c7280"
    gui.hover_color = "#10b981"  # Vert néon au survol
    gui.selected_color = "#10b981"
    gui.insensitive_color = "#4b5563"
    
    gui.interface_text_color = "#f3f4f6"
    gui.button_text_idle_color = "#f3f4f6"
    gui.button_text_hover_color = "#ffffff"
    gui.button_text_selected_color = "#ffffff"
    
    # Polices
    gui.text_font = "DejaVuSans.ttf"
    gui.interface_text_font = "DejaVuSans.ttf"
    gui.name_text_font = "DejaVuSans.ttf"
    gui.text_size = 22
    gui.name_text_size = 30
    
    # Bordures très arrondies pour les éléments
    gui.button_radius = 15  # rounded-xl
    gui.frame_radius = 15   # coins arrondis pour les boîtes de dialogue

    # Taille et espacement des boutons
    gui.button_width = 300
    gui.button_height = 50
    
    # Boîte de dialogue
    gui.dialogue_width = 740
    gui.dialogue_height = 180
    gui.dialogue_xpos = 250
    gui.dialogue_ypos = 50
    
    # Couleur de fond pour les différents éléments
    gui.frame_color = "#1f2937"  # Fond sombre pour les boîtes
    gui.confirm_frame_color = "#1f2937"
    
    # Paramètres pour la barre de vie (style néon moderne)
    gui.bar_borders = Borders(2, 2, 2, 2)
    gui.bar_color = "#374151"  # Fond de la barre
    gui.bar_unscrollable = "#374151"
    gui.bar_invert = False
    
    # Couleur de la barre de remplissage (santé, etc.)
    gui.bar_fill_color = "#10b981"  # Vert néon
    
    # Bordure avec effet néon pour les éléments survolés
    gui.hover_glow = True  # Activer l'effet de lueur

    # Effets de survol personnalisés
    def neon_hover_effect(st, at):
        # Cette fonction permettra d'ajouter un effet néon subtil au survol
        return Transform(glow=(0.5, 0.5, 0.5, 1.0)), None

## Configuration des images de fond pour le menu principal
define gui.main_menu_background = "gui/main_menu.png"
define gui.game_menu_background = "gui/game_menu.png"

## Configuration des barres de vie stylisées
define gui.bar_tile = False
define gui.bar_height = 30
define gui.slider_height = 24
define gui.slider_thumb = "gui/slider/horizontal_thumb.png"

## Configuration des portraits de personnages
define gui.name_xpos = 240
define gui.name_ypos = 10
define gui.name_xalign = 0.0
define gui.namebox_width = 230
define gui.namebox_height = 42
define gui.namebox_borders = Borders(5, 5, 5, 5)
define gui.namebox_background = Frame("gui/namebox.png", 10, 10)

## Configuration des boutons très arrondis
define gui.button_borders = Borders(8, 8, 8, 8)
define gui.button_background = Frame("gui/button/idle.png", 10, 10)
define gui.button_hover_background = Frame("gui/button/hover.png", 10, 10)
define gui.button_selected_background = Frame("gui/button/selected.png", 10, 10)

## Configuration des dialogues et textes
define gui.dialogue_text_outlines = [(2, "#1f2937", 0, 0)]  # Contour du texte pour meilleure lisibilité
define gui.dialogue_text_xalign = 0.0
define gui.dialogue_text_yalign = 0.0

## Configuration du menu principal
define gui.main_menu_text_xalign = 0.5
define gui.main_menu_text_yalign = 0.5

## Effet de néon pour les éléments interactifs
style button_text:
    hover_outlines [(2, "#10b981", 0, 0)]  # Contour néon au survol
    selected_outlines [(2, "#10b981", 0, 0)]

import json, os
from PIL import Image
import numpy as np

videos = {
    "light" : "https://www.youtube.com/watch?v=9HcjlZrroAs",
    "dark" : "https://www.youtube.com/watch?v=vIBKSmWAdIA",
    "midnight" : "https://www.youtube.com/watch?v=6BaeHKM8q18"
}


def classify_image(image_path, thresholds=(60, 100)):
    image = Image.open(image_path).convert('L')
    pixels = np.array(image)
    average = np.mean(pixels)

    lower, upper = sorted(thresholds)

    if average <= lower:
        return "dark"
    elif average <= upper:
        return "midnight"
    else:
        return "light"


def get_basename(img_name:str):
    basename = img_name.split('.')[0].replace('_', ' ').replace('-', ' ')
    capitalize = basename.capitalize()
    return capitalize

class Wallpaper:
    name:str
    path:str
    style: str
    video: str
    def __init__(self,path:str):
        self.name = get_basename(path)
        self.path = "/wallpapers/" + path
        self.style = classify_image(f'wallpapers/{path}')
        self.video = videos[self.style]

wallpapers = []
for dir in os.listdir('wallpapers'):
    wp = Wallpaper(dir)
    wallpapers.append(wp)

with open('wallpapers.json', 'w') as f:
    json.dump([wp.__dict__ for wp in wallpapers], f)

dark_count = 0
light_count =0
midnight_count=0
for wp in wallpapers:
    if wp.style == "dark":
        dark_count += 1
    elif wp.style == "light":
        light_count += 1
    else:
        midnight_count += 1

print(f"Dark: {dark_count}\nLight: {light_count}\nMidnight: {midnight_count}")



    
    

    
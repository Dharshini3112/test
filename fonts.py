from fontTools.ttLib import TTFont
import os

font_dir = r"C:\Windows\Fonts"

font_families = set()

for file in os.listdir(font_dir):
    if file.endswith(('.ttf', '.otf', '.ttc')):
        try:
            font = TTFont(os.path.join(font_dir, file))
            for record in font['name'].names:
                if record.nameID == 1:  # Font Family Name
                    name = record.string.decode('utf-8', errors='ignore')
                    font_families.add(name)
        except:
            pass

for font in sorted(font_families):
    print(font)

print("\nTotal Font Families:", len(font_families))
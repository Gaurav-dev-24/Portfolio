from PIL import Image, ImageDraw

def round_corners(image_path, output_path):
    img = Image.open(image_path).convert("RGBA")
    
    # Create the same size image but transparent
    mask = Image.new("L", img.size, 0)
    draw = ImageDraw.Draw(mask)
    
    # Draw a white circle
    draw.ellipse((0, 0, img.size[0], img.size[1]), fill=255)
    
    # Apply the mask to the image
    img.putalpha(mask)
    
    # Save the output
    img.save(output_path)

round_corners("public/image.png", "public/image.png")
print("Rounded corners successfully")

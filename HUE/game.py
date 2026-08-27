from sense_hat import sense_hat
import time
import random
sense = SenseHat()

w = [150, 150, 150]
g = [0, 255, 0]
r = [255, 0, 0]
e = [0, 0, 0]

arrow = [e,e,e,w,w,e,e,e,
        e,e,w,w,w,w,e,e,
        e,w,e,w,w,e,w,e,
        w,e,e,w,w,e,e,w,
        e,e,e,w,w,e,e,e,
        e,e,e,w,w,e,e,e,
        e,e,e,w,w,e,e,e,
        e,e,e,w,w,e,e,e]

arrow_red = [e,e,e,r,r,e,e,e,
            e,e,r,r,r,r,e,e,
            e,r,e,r,r,e,r,e,
            r,e,e,r,r,e,e,r,
            e,e,e,r,r,e,e,e,
            e,e,e,r,r,e,e,e,
            e,e,e,r,r,e,e,e,
            e,e,e,r,r,e,e,e]

arrow_green = [e,e,e,g,g,e,e,e,
            e,e,g,g,g,g,e,e,
            e,g,e,g,g,e,g,e,
            g,e,e,g,g,e,e,g,
            e,e,e,g,g,e,e,e,
            e,e,e,g,g,e,e,e,
            e,e,e,g,g,e,e,e,
            e,e,e,g,g,e,e,e]

pause = 3
score = 0
angle = 0
play = True

sense.show_message("Keep the arrow pointing up", r, [0, 0, 0])

while play == True:
    last_angle = angle
    while angle == last_angle:
        angle = random.choice([0, 90, 180, 270])
    sense.setRotation(angle)
    sense.set_pixels(arrow)
    time.sleep(pause)

    accel = sense.get_acceleration_raw()
    x = round(accel['x'], 0)
    y = round(accel['y'], 0)

    if y == -1 and angle == 180:
        sense.set_pixels(arrow_green)
        score = score + 1
    elif y == 1 and angle == 0:
        sense.set_pixels(arrow_green)
        score = score + 1
    elif x == -1 and angle == 90:
        sense.set_pixels(arrow_green)
        score = score + 1
    elif x == 1 and angle == 270:
        sense.set_pixels(arrow_green)
        score = score + 1
    else:
        sense.set_pixels(arrow_red)
        play = False

    pause = pause * 0.95
    time.sleep(0.5)

msg = "Your score was %s" % (score)
sense.show_message(msg, 0.05, g, [0, 0, 0])
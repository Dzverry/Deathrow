input.onButtonPressed(Button.A, function () {
    player.change(LedSpriteProperty.X, -1)
})
input.onButtonPressed(Button.AB, function () {
    if (freepass > 0) {
        while (row_of_death.length > 0) {
            row_of_death.removeAt(0).delete()
        }
    }
    freepass += -1
})
input.onButtonPressed(Button.B, function () {
    player.change(LedSpriteProperty.X, 1)
})
let dot_of_not_death = 0
let death_sequence = 0
let freepass = 0
let row_of_death: game.LedSprite[] = []
let player: game.LedSprite = null
player = game.createSprite(2, 4)
player.set(LedSpriteProperty.Blink, 250)
row_of_death = []
let speed = 1000
freepass = 3
basic.forever(function () {
    while (row_of_death.length > 0 && row_of_death[0].get(LedSpriteProperty.Y) == 4) {
        row_of_death.removeAt(0).delete()
    }
    for (let dot_of_death of row_of_death) {
        dot_of_death.change(LedSpriteProperty.Y, 1)
    }
    if (death_sequence % 3 == 0) {
        dot_of_not_death = randint(0, 4)
        for (let index = 0; index <= 4; index++) {
            if (index != dot_of_not_death) {
                row_of_death.push(game.createSprite(index, 0))
            }
        }
    }
    for (let dot_of_death of row_of_death) {
        if (dot_of_death.isTouching(player)) {
            game.gameOver()
        }
    }
    basic.pause(speed)
    death_sequence += 1
    if (speed > 500) {
        speed += -50
    }
})

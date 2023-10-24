class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    preload() {
        this.load.spritesheet('character', './assets/spritesheets/Character_002.png', {
            frameWidth: 48
        });
    }

    create() {
        this.cameras.main.setBackgroundColor(0xDDDDDD);

        this.player = this.physics.add.sprite(width / 2, height / 2, 'character', 1).setScale(2);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setSize(32, 32).setOffset(8, 16);

        this.PLAYER_VELOCITY = 350;

        cursors = this.input.keyboard.createCursorKeys();

        this.anims.create({
            key: 'idle-down',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 1,
                end: 1
            })
        });

        this.anims.create({
            key: 'walk-down',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 0,
                end: 2
            })
        });
    }

    update() {
        let playerVector = new Phaser.Math.Vector2(0, 0);

        if (cursors.left.isDown) {
            playerVector.x = -1;
        }
        else if (cursors.right.isDown) {
            playerVector.x = 1;
        }

        if (cursors.up.isDown) {
            playerVector.y = -1;
        }
        else if (cursors.down.isDown) {
            playerVector.y = 1;
        }

        playerVector.normalize();

        if (playerVector.equals(Phaser.Math.Vector2.ZERO)) {
            this.player.play('idle-down', true)
        } else {
            this.player.play('walk-down', true)
        }

        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y);

    }
}
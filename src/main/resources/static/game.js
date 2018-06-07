var config = {
    type: Phaser.AUTO,
    width: 1137,
    height: 640,
    input: {
        gamepad: true
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 600},
            debug: false
        }
    }
};

var goIntoState;
var gamepad;
var states;
var fallBuffert;
var cursors;
var player;
var playerDeads = false;
var weapon;
var weaponHitBox;
var score;
var coins;
var coinBags;
var value;
var potions;
var health;
var enemyHealth = 20;
var yetiHealth = 200;
var zirla;
var zirlaHealth = 100;
var zirlaDeads = false;
var orb;
var orbActive = false;
var map;
var level1 = false;
var level2 = false;
var level3 = false;
var level4 = false;
var level;
var spacefield;
var timedEvent;
var innKeeper;
var textActive = false;
var textBox;
var portal;
var portal1;
var portal2;
var portal3;
var portal4;
var game = new Phaser.Game(config);
var stamina;
var shopActive;
var musicTheme;
var music2;
var music4;

function preload() {
    this.load.image('bkGround', '/sprites/Background.png');
    this.load.image('devil', '/sprites/FrozenDevil.png');
    //Player sprites
    this.load.spritesheet('playerRun', '/sprites/PlayerRun.png',
        {frameWidth: 128, frameHeight: 140});
    this.load.spritesheet('playerIdle', '/sprites/PlayerIdle.png',
        {frameWidth: 128, frameHeight: 140});
    this.load.spritesheet('playerHeavyAttack', '/sprites/PlayerHeavyAtk.png',
        {frameWidth: 217, frameHeight: 187});
    this.load.spritesheet('playerLightAttack', '/sprites/PlayerLightAttack.png',
        {frameWidth: 216, frameHeight: 135});
    this.load.spritesheet('playerGlide', '/sprites/PlayerGlide.png', //PlayerGlide.png
        {frameWidth: 199, frameHeight: 168});
    this.load.spritesheet('playerJump', '/sprites/PlayerJump.png',
        {frameWidth: 128, frameHeight: 140});
    this.load.spritesheet('playerFall', '/sprites/PlayerFall.png',
        {frameWidth: 128, frameHeight: 150});
    this.load.spritesheet('playerWallGlide', '/sprites/PlayerWallGlide.png',
        {frameWidth: 129, frameHeight: 210});
    this.load.spritesheet('playerHurt', '/sprites/PlayerHurt.png',
        {frameWidth: 128, frameHeight: 140});
    this.load.spritesheet('playerDead', '/sprites/PlayerDead.png',
        {frameWidth: 140, frameHeight: 153});

    //Enemy sprites
    this.load.spritesheet('enemyFlurry', '/sprites/EnemyFlurry.png',
        {frameWidth: 44, frameHeight: 40});
    this.load.spritesheet('enemyGhost', '/sprites/EnemyGhost.png',
        {frameWidth: 64, frameHeight: 100});
    this.load.spritesheet('enemyImp', '/sprites/EnemyImp.png',
        {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('enemyWraith', '/sprites/EnemyWraith.png',
        {frameWidth: 83, frameHeight: 164});
    this.load.spritesheet('enemyYeti', '/sprites/EnemyYeti.png',
        {frameWidth: 232, frameHeight: 236});
    this.load.spritesheet('enemyZombie', '/sprites/EnemyZombie.png',
        {frameWidth: 64, frameHeight: 128});

    //Zirla sprites
    this.load.spritesheet('zirlaMoving', '/sprites/ZirlaMoving.png',
        {frameWidth: 256, frameHeight: 256});
    this.load.spritesheet('zirlaGlobeGlow', '/sprites/ZirlaGlobeGlow.png',
        {frameWidth: 256, frameHeight: 256});
    this.load.spritesheet('zirlaHandRaise', '/sprites/ZirlaHandRaise.png',
        {frameWidth: 256, frameHeight: 256});
    this.load.spritesheet('zirlaHit', '/sprites/ZirlaHit.png',
        {frameWidth: 256, frameHeight: 256});
    this.load.spritesheet('zirlaDefeated', '/sprites/ZirlaDefeated.png',
        {frameWidth: 256, frameHeight: 256});
    this.load.image('orb', '/sprites/Orb.png');

    //Npc Sprites
    this.load.spritesheet('innKeeper', '/sprites/InnKeeper.png',
        {frameWidth: 384, frameHeight: 256});
    this.load.image('shopWindow', '/sprites/ShopWindow.png');
    this.load.image('shopPointer', '/sprites/ShopPointer.png');
    this.load.image('coin', '/sprites/Coins.png');
    this.load.spritesheet('potionWindow', '/sprites/PotionWindow.png',
        {frameWidth: 64, frameHeight: 64});
    this.load.image('textBox', '/sprites/TextBox.png')

    this.load.image('background', '/sprites/testBackground.png');
    //LOAD TERRAIN
    this.load.image('tiles', '/sprites/TileSetComplete.png');
    this.load.tilemapCSV('map', '/maps/World.csv');
    this.load.image('portalTest', '/sprites/WeaponHitboxTest.png');

    //Weapon hitbox
    this.load.image('weaponHitBox', '/sprites/WeaponHitBox.png');
    this.load.image('portalTest', '/sprites/WeaponHitboxTest.png');

    //Music
    this.load.audio('musicTheme', [
        '/HubMusic.mp3'
    ]);

    this.load.audio('level2Music', [
        '/Level2Music.mp3'
    ]);

    this.load.audio('level4Music', [
        '/Level4Music.mp3'
    ]);

    //Portals
    this.load.spritesheet('portals', '/sprites/Port.png',
        {frameWidth: 192, frameHeight: 256});
}

function create() {
    spacefield = this.add.image(0, 0, 'bkGround');
    $.ajax({
        type: "GET",
        url: "/getPlayerStats", //which is mapped to its partner function on our controller class
        success: function (result) {
            coins = parseInt(result["coins"]);
            health = parseInt(result["health"]);
            score = parseInt(result["score"]);
            level = parseInt(result["map"]);
            potions = parseInt(result["potions"]);
            weapon = parseInt(result["weapon"]);
        }
    });

    //Background
    snowfield = this.add.tileSprite(0, 0, 1137, 640, 'background');

    //FloorCounter
    fallBuffert = 25;

    //Creating Map and tile collision
    map = this.make.tilemap({key: 'map', tileWidth: 64, tileHeight: 64});
    var tileset = map.addTilesetImage('tiles');
    var layer = map.createStaticLayer(0, tileset, 0, -50);
    map.setCollision([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14]);

    weaponHitBox = this.physics.add.staticGroup();
    devil = this.physics.add.sprite(67136, 2560, 'devil');


    //Portal
    portalHub = this.physics.add.sprite(10816, 1550, 'portals');
    portalHub1 = this.physics.add.sprite(20704, 1856, 'portals');
    portalHub2 = this.physics.add.sprite(45088, 320, 'portals');
    portalHub3 = this.physics.add.sprite(62816, 2600, 'portals');
    portalHub4 = this.physics.add.sprite(65024, 1024, 'portals');

    portal = this.physics.add.sprite(1750, 320, 'portals');
    portal1 = this.physics.add.sprite(2166, 320, 'portals');
    portal2 = this.physics.add.sprite(2582, 320, 'portals');
    portal3 = this.physics.add.sprite(2998, 320, 'portals');
    portal4 = this.physics.add.sprite(3414, 320, 'portals');


    //Create Innkeeper and Coins
    innKeeper = this.physics.add.sprite(1200, 340, 'innKeeper');
    coinBags = this.physics.add.group();
    potionWindow = this.add.sprite(1089, 48, 'potionWindow').setScrollFactor(0);

    //Create Zirla
    zirla = this.physics.add.sprite(67600, 2450, 'zirlaMoving');
    zirla.body.setSize(100, 256);
    orb = this.physics.add.group();

    //Create Enemies
    ghostEnemies = this.physics.add.group();
    flurryEnemies = this.physics.add.group();
    impEnemies = this.physics.add.group();
    wraithEnemies = this.physics.add.group();
    yetiEnemies = this.physics.add.group();
    zombieEnemies = this.physics.add.group();


    var enemiesArray = [impEnemies, ghostEnemies, flurryEnemies,
        zombieEnemies, yetiEnemies, wraithEnemies];
    var enemyIndex = 15;
    var enemyName;
    for (enemyType of enemiesArray) {
        switch (enemyIndex) {
            case 15:
                enemyName = 'enemyImp'
                break;
            case 16:
                enemyName = 'enemyGhost'
                break;
            case 17:
                enemyName = 'enemyFlurry'
                break;
            case 18:
                enemyName = 'enemyZombie'
                break;
            case 19:
                enemyName = 'enemyYeti'
                break;
            case 20:
                enemyName = 'enemyWraith'
                break;
        }
        var enemyTypeSpawn = [];
        var lastEnemyTypeSpawn = {
            x: map.findByIndex(enemyIndex, 0, true).x * 64,
            y: map.findByIndex(enemyIndex, 0, true).y * 64
        }
        var currentEnemyTypeSpawn;
        var j = 0;
        do {
            enemyTypeSpawn.push({x: map.findByIndex(enemyIndex, j).x * 64, y: map.findByIndex(enemyIndex, j).y * 64});
            currentEnemyTypeSpawn = {
                x: map.findByIndex(enemyIndex, j).x * 64,
                y: map.findByIndex(enemyIndex, j).y * 64
            };
            j++;
        } while (lastEnemyTypeSpawn.x != currentEnemyTypeSpawn.x && lastEnemyTypeSpawn.y != currentEnemyTypeSpawn.y)
        for (spawn of enemyTypeSpawn) {
            enemyType.create(spawn.x, spawn.y, enemyName);
        }
        enemyIndex++;
    }

    //Make player a phys object and player/platforms/ghostEnemies collide
    player = this.physics.add.sprite(800, 320, 'playerRun');
    player.body.setSize(64, 138);
    stamina = 80;

    //Colliders
    this.physics.add.collider(player, layer);
    this.physics.add.collider(coinBags, layer);
    this.physics.add.collider(flurryEnemies, layer);
    this.physics.add.collider(impEnemies, layer);
    this.physics.add.collider(impEnemies, impEnemies);
    this.physics.add.collider(zombieEnemies, layer);
    this.physics.add.collider(zombieEnemies, zombieEnemies);
    this.physics.add.collider(wraithEnemies, layer);
    this.physics.add.collider(yetiEnemies, layer);
    this.physics.add.collider(zirla, layer);
    this.physics.add.collider(devil, layer);
    this.physics.add.collider(innKeeper, layer);
    this.physics.add.collider(portalHub, layer);
    this.physics.add.collider(portalHub1, layer);
    this.physics.add.collider(portalHub2, layer);
    this.physics.add.collider(portalHub3, layer);
    this.physics.add.collider(portalHub4, layer);
    this.physics.add.collider(portal, layer);
    this.physics.add.collider(portal1, layer);
    this.physics.add.collider(portal2, layer);
    this.physics.add.collider(portal3, layer);
    this.physics.add.collider(portal4, layer);


    //CHECKING FOR SHOP AND COINS
    shopActive = false;
    this.physics.add.overlap(player, innKeeper, checkOverlapInnkeeper, null, this);
    this.physics.add.overlap(player, coinBags, checkOverlapCoinBags, null, this);

    //Damage
    this.physics.add.overlap(player, ghostEnemies, checkOverlapPlayer, null, this);
    this.physics.add.overlap(player, impEnemies, checkOverlapPlayer, null, this);
    this.physics.add.overlap(player, wraithEnemies, checkOverlapPlayer, null, this);
    this.physics.add.overlap(player, yetiEnemies, checkOverlapPlayer, null, this);
    this.physics.add.overlap(player, zombieEnemies, checkOverlapPlayer, null, this);
    this.physics.add.overlap(player, zirla, checkOverlapPlayer, null, this);
    this.physics.add.overlap(player, orb, checkOverlapOrb, null, this);

    //Hitbox/kill-able
    this.physics.add.overlap(weaponHitBox, ghostEnemies, checkOverlapHitBox, null, this);
    this.physics.add.overlap(weaponHitBox, impEnemies, checkOverlapHitBox, null, this);
    this.physics.add.overlap(weaponHitBox, wraithEnemies, checkOverlapHitBox, null, this);
    this.physics.add.overlap(weaponHitBox, yetiEnemies, checkOverlapHitBoxYeti, null, this);
    this.physics.add.overlap(weaponHitBox, zombieEnemies, checkOverlapHitBox, null, this);
    this.physics.add.overlap(weaponHitBox, zirla, checkOverlapHitBoxZirla, null, this);
    this.physics.add.overlap(player, portalHub, checkOverlapPortalHub, null, this);
    this.physics.add.overlap(player, portalHub1, checkOverlapPortalHub, null, this);
    this.physics.add.overlap(player, portalHub2, checkOverlapPortalHub, null, this);
    this.physics.add.overlap(player, portalHub3, checkOverlapPortalHub, null, this);
    this.physics.add.overlap(player, portalHub4, checkOverlapPortalHub, null, this);
    this.physics.add.overlap(player, portal, checkOverlapPortal, null, this);
    this.physics.add.overlap(player, portal1, checkOverlapPortal1, null, this);
    this.physics.add.overlap(player, portal2, checkOverlapPortal2, null, this);
    this.physics.add.overlap(player, portal3, checkOverlapPortal3, null, this);
    this.physics.add.overlap(player, portal4, checkOverlapPortal4, null, this);


    //"Key listener"
    cursors = game.input.keyboard.createCursorKeys();
    key_X = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    key_Z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    key_jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //Shopcontrols
    key_BUY = this.input.keyboard.on('keydown_SPACE', function (event) {
        if (shopActive) {
            if (shopPointer.y == 231 && coins >= 20 && potions < 5) {
                coins -= 20;
                potions += 1;
            }
            else if (shopPointer.y == 279 && weapon == 1 && coins >= 140) {
                coins -= 140;
                weapon += 1;
            }
            else if (shopActive && shopPointer.y == 311 && weapon == 2 && coins >= 620) {
                coins -= 620;
                weapon += 1;
            }
            else if (shopActive && shopPointer.y == 343)
                console.log('Goto gem shop')
            else if (shopPointer.y == 375) {
                shopActive = false;
                shopPointer.destroy();
                shop.destroy();
                $.ajax({
                    type: "POST",
                    data: {
                        //Add outfit: outfit, later
                        coins: coins,
                        weapon: weapon,
                        potions: potions
                    },
                    url: "/saveStateAfterPurchase" //which is mapped to its partner function on our controller class
                });
            }

        }
    });
    key_UP = this.input.keyboard.on('keydown_UP', function (event) {
        if (shopActive && shopPointer.y == 279)
            shopPointer.y -= 48;
        else if (shopActive && shopPointer.y != 231) {
            shopPointer.y -= 32;
        }
    });
    key_DOWN = this.input.keyboard.on('keydown_DOWN', function (event) {
        if (shopActive && shopPointer.y == 231)
            shopPointer.y += 48;
        else if (shopActive && shopPointer.y != 375) {
            shopPointer.y += 32;
        }
    });
    key_drinkPotion = this.input.keyboard.on('keydown_C', function (event) {
        if (potions > 0 && health < 100) {
            potions -= 1;
            if (health <= 75)
                health += 25;
            else
                health = 100;
        }
    })

    //Camera
    this.cameras.main.setSize(1137, 640);
    this.cameras.main.startFollow(player);

    //Animations for potions
    this.anims.create({
        key: 'potion0',
        frames: this.anims.generateFrameNumbers('potionWindow', {start: 0, end: 0}),
        frameRate: 20,
        repeat: 1
    });
    this.anims.create({
        key: 'potion1',
        frames: this.anims.generateFrameNumbers('potionWindow', {start: 1, end: 1}),
        frameRate: 20,
        repeat: 1
    });
    this.anims.create({
        key: 'potion2',
        frames: this.anims.generateFrameNumbers('potionWindow', {start: 2, end: 2}),
        frameRate: 20,
        repeat: 1
    });
    this.anims.create({
        key: 'potion3',
        frames: this.anims.generateFrameNumbers('potionWindow', {start: 3, end: 3}),
        frameRate: 20,
        repeat: 1
    });
    this.anims.create({
        key: 'potion4',
        frames: this.anims.generateFrameNumbers('potionWindow', {start: 4, end: 4}),
        frameRate: 20,
        repeat: 1
    });
    this.anims.create({
        key: 'potion5',
        frames: this.anims.generateFrameNumbers('potionWindow', {start: 5, end: 5}),
        frameRate: 20,
        repeat: 1
    });
    //Animations for player
    this.anims.create({
        key: 'lightAttack',
        frames: this.anims.generateFrameNumbers('playerLightAttack', {start: 0, end: 9}),
        frameRate: 20,
        repeat: 1
    });

    this.anims.create({
        key: 'heavyAttack',
        frames: this.anims.generateFrameNumbers('playerHeavyAttack', {start: 0, end: 9}),
        frameRate: 20,
        repeat: 1
    });

    this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('playerRun', {start: 0, end: 19}),
        frameRate: 20,
        repeat: 1
    });

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('playerIdle', {start: 0, end: 19}),
        frameRate: 20,
        repeat: 1
    });

    this.anims.create({
        key: 'glide',
        frames: this.anims.generateFrameNumbers('playerGlide', {start: 0, end: 4}),
        frameRate: 20,
        repeat: 1
    });

    this.anims.create({
        key: 'wallGlide',
        frames: this.anims.generateFrameNumbers('playerWallGlide', {start: 0, end: 4}),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('playerJump', {start: 0, end: 1}),
        frameRate: 20,
        repeat: 1
    });

    this.anims.create({
        key: 'fall',
        frames: this.anims.generateFrameNumbers('playerFall', {start: 0, end: 1}),
        frameRate: 20,
        repeat: 1
    });

    this.anims.create({
        key: 'hurt',
        frames: this.anims.generateFrameNumbers('playerHurt', {start: 0, end: 6}),
        frameRate: 60,
        repeat: 0
    });

    this.anims.create({
        key: 'dead',
        frames: this.anims.generateFrameNumbers('playerDead', {start: 0, end: 1}),
        frameRate: 60,
        repeat: 0
    });

    //Animations for ghostEnemies
    this.anims.create({
        key: 'ghost',
        frames: this.anims.generateFrameNumbers('enemyGhost', {start: 0, end: 15}),
        frameRate: 20,
        repeat: 1
    });

    //Animations for flurryEnemies
    this.anims.create({
        key: 'flurry',
        frames: this.anims.generateFrameNumbers('enemyFlurry', {start: 0, end: 21}),
        frameRate: 20,
        repeat: 1
    });

    //Animations for impEnemies
    this.anims.create({
        key: 'imp',
        frames: this.anims.generateFrameNumbers('enemyImp', {start: 0, end: 10}),
        frameRate: 20,
        repeat: 1
    });

    //Animations for wraithEnemies
    this.anims.create({
        key: 'wraith',
        frames: this.anims.generateFrameNumbers('enemyWraith', {start: 0, end: 19}),
        frameRate: 20,
        repeat: 1
    });

    //Animations for yetiEnemies
    this.anims.create({
        key: 'yeti',
        frames: this.anims.generateFrameNumbers('enemyYeti', {start: 0, end: 14}),
        frameRate: 20,
        repeat: 1
    });

    //Animations for zombieEnemies
    this.anims.create({
        key: 'zombie',
        frames: this.anims.generateFrameNumbers('enemyZombie', {start: 0, end: 11}),
        frameRate: 20,
        repeat: 1
    });

    //Animation for NPCs
    this.anims.create({
        key: 'keeper',
        frames: this.anims.generateFrameNumbers('innKeeper', {start: 0, end: 9}),
        frameRate: 8,
        repeat: 1
    });

    //Portals
    this.anims.create({
        key: 'portalHub',
        frames: this.anims.generateFrameNumbers('portals', {start: 5, end: 5}),
        frameRate: 8,
        repeat: 1
    });
    this.anims.create({
        key: 'portal1',
        frames: this.anims.generateFrameNumbers('portals', {start: 0, end: 0}),
        frameRate: 8,
        repeat: 1
    });
    this.anims.create({
        key: 'portal2',
        frames: this.anims.generateFrameNumbers('portals', {start: 1, end: 1}),
        frameRate: 8,
        repeat: 1
    });
    this.anims.create({
        key: 'portal3',
        frames: this.anims.generateFrameNumbers('portals', {start: 2, end: 2}),
        frameRate: 8,
        repeat: 1
    });
    this.anims.create({
        key: 'portal4',
        frames: this.anims.generateFrameNumbers('portals', {start: 3, end: 3}),
        frameRate: 8,
        repeat: 1
    });
    this.anims.create({
        key: 'portal5',
        frames: this.anims.generateFrameNumbers('portals', {start: 4, end: 4}),
        frameRate: 8,
        repeat: 1
    });

    //Zirla
    this.anims.create({
        key: 'zirlaMove',
        frames: this.anims.generateFrameNumbers('zirlaMoving', {start: 0, end: 15}),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: 'zirlaGlobe',
        frames: this.anims.generateFrameNumbers('zirlaGlobeGlow', {start: 0, end: 14}),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: 'zirlaHand',
        frames: this.anims.generateFrameNumbers('zirlaHandRaise', {start: 0, end: 15}),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: 'zirlaHurt',
        frames: this.anims.generateFrameNumbers('zirlaHit', {start: 0, end: 2}),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: 'zirlaDead',
        frames: this.anims.generateFrameNumbers('zirlaDefeated', {start: 0, end: 1}),
        frameRate: 20,
        repeat: 0
    });

    //GAMEPAD ENABLEING
    config = Phaser.Input.Gamepad.Configs.DUALSHOCK_4;
    this.input.gamepad.on('down', function (pad, button, value, data) {
        gamepad = pad;
        switch (button.index) {
            case config.UP:
                if (shopActive && shopPointer.y == 279)
                    shopPointer.y -= 48;
                else if (shopActive && shopPointer.y != 231) {
                    shopPointer.y -= 32;
                }
                break;

            case config.DOWN:
                if (shopActive && shopPointer.y == 231)
                    shopPointer.y += 48;
                else if (shopActive && shopPointer.y != 375) {
                    shopPointer.y += 32;
                }
                break;
            case config.X:
                if (shopActive && shopPointer.y == 231 && coins >= 20 && potions < 5) {
                    coins -= 20;
                    potions += 1;
                }
                else if (shopActive && shopPointer.y == 279 && weapon == 1 && coins >= 140) {
                    coins -= 140;
                    weapon += 1;
                }
                else if (shopActive && shopPointer.y == 311 && weapon == 2 && coins >= 620) {
                    coins -= 620;
                    weapon += 1;
                }
                else if (shopActive && shopPointer.y == 343)
                    console.log('Goto gem shop')
                else if (shopActive && shopPointer.y == 375) {
                    shopActive = false;
                    shopPointer.destroy();
                    shop.destroy();
                    $.ajax({
                        type: "POST",
                        data: {
                            //Add outfit: outfit, later
                            coins: coins,
                            weapon: weapon,
                            potions: potions
                        },
                        url: "/saveStateAfterPurchase" //which is mapped to its partner function on our controller class
                    });
                }
                break;
            case config.CIRCLE:
                if (potions > 0 && health < 100) {
                    potions -= 1;
                    if (health <= 75)
                        health += 25;
                    else
                        health = 100;
                }
                break;
        }
    });


    //Music
    musicTheme = this.sound.add('musicTheme');
    music2 = this.sound.add('level2Music');
    music4 = this.sound.add('level4Music');
    musicTheme.play({loop: true});
    music2.play({loop: true});
    music4.play({loop: true});
    musicTheme.pause();
    music2.pause();
    music4.pause();

}

function update() {
    switch (potions) {
        case 0:
            potionWindow.anims.play('potion0', true);
            break;
        case 1:
            potionWindow.anims.play('potion1', true);
            break;
        case 2:
            potionWindow.anims.play('potion2', true);
            break;
        case 3:
            potionWindow.anims.play('potion3', true);
            break;
        case 4:
            potionWindow.anims.play('potion4', true);
            break;
        case 5:
            potionWindow.anims.play('potion5', true);
            break;
    }

    innKeeper.anims.play('keeper', true);
    zirla.anims.play('zirlaMove', true);
    portalHub.anims.play('portalHub', true);
    portalHub1.anims.play('portalHub', true);
    portalHub2.anims.play('portalHub', true);
    portalHub3.anims.play('portalHub', true);
    portalHub4.anims.play('portalHub', true);
    portal.anims.play('portal1', true);
    portal1.anims.play('portal2', true);
    portal2.anims.play('portal3', true);
    portal3.anims.play('portal4', true);
    portal4.anims.play('portal5', true);

    if (stamina < 80)
        stamina++;

    //Limit fall speed
    if (player.body.velocity.y > 900)
        player.body.velocity.y = 900;
    //Falling = death
    if (player.body.y >= 3200) {
        health = 0;
        player.disableBody(true, true);
    }

    innKeeper.anims.play('keeper', true);
    if (textActive) {
        setTimeout(function () {
            textActive = false;
            textBox.destroy();
        }, 1000);
    }

    spacefield.x = player.x;
    snowfield.x = player.x;
    snowfield.y = player.y;
    snowfield.tilePositionY -= 2;

    document.getElementById('Health').innerHTML = 'Health: ' + health;
    document.getElementById('Score').innerHTML = 'Score: ' + score;
    document.getElementById('Coins').innerHTML = 'Coins: ' + coins;

    if (!player.body.onFloor()) {
        fallBuffert--;
    } else if (player.body.onFloor()) {
        fallBuffert = 25;
    }


    //Plays animation
    switch (states) {
        case 'glide':
            player.anims.play('glide', true);
            player.originX = 0.8;
            player.originY = 0.58;
            break;
        case 'wallGlide':
            player.anims.play('wallGlide', true);
            break;
        case 'run':
            player.anims.play('run', true);
            player.originX = 0.5;
            player.originY = 0.5;
            break;
        case 'lightAttack':
            player.anims.play('lightAttack', true);
            break;
        case 'heavyAttack':
            player.anims.play('heavyAttack', true);
            break;
        case 'jump':
            player.anims.play('jump', true);
            player.originX = 0.5;
            break;
        case 'fall':
            player.anims.play('fall', true);
            break;
        case 'hurt':
            player.anims.play('hurt', true);
            break;
        default:
            player.anims.play('idle', true);
    }

    //Enemy animations and movement
    var orbs = orb.getChildren();
    for (child of orbs) {
        if (child.x > player.body.x) {
            child.x -= 5;
        } else if (child.x < player.body.x) {
            child.x += 5;
        }
        if (child.y > player.body.y) {
            child.y -= 5;
        } else if (child.y < player.body.y) {
            child.y += 5;
        }
    }

    //Flurry
    var flurryEnemy = flurryEnemies.getChildren();
    for (child of flurryEnemy) {
        child.anims.play('flurry', true);
        var distanceY = child.body.y + 500;
        var distanceX = child.body.x - player.body.x;
        if (Math.abs(distanceX) < 650 && player.body.x < child.body.x && distanceY > player.body.y) {
            child.flipX = false;
            child.setVelocityX(-75);
        }
        else if (Math.abs(distanceX) < 650 && player.body.x > child.body.x && distanceY > player.body.y) {
            child.flipX = true;
            child.setVelocityX(75);
        }
        else child.setVelocityX(0);

    }

    //Ghost
    var ghostEnemy = ghostEnemies.getChildren();
    for (child of ghostEnemy) {
        child.anims.play('ghost', true);
        if (child.body.x > player.body.x) {
            if (child.body.x - 300 < player.body.x) {
                if (child.body.y > player.body.y) {
                    child.setVelocityY(-100);
                } else if (child.body.y < player.body.y) {
                    child.setVelocityY(100);
                }
                child.setVelocityX(-180);
            }
            else {
                child.setVelocityX(0);
                child.setVelocityY(-10);
            }

        } else {
            if (child.body.x + 300 > player.body.x) {
                if (child.body.y > player.body.y) {
                    child.setVelocityY(-100);
                } else if (child.body.y < player.body.y) {
                    child.setVelocityY(100);
                }
                child.setVelocityX(180);
            }
            else {
                child.setVelocityX(0);
                child.setVelocityY(-10);
            }

        }
    }

    //Imp
    var impEnemy = impEnemies.getChildren();
    for (child of impEnemy) {
        child.anims.play('imp', true);
        var distanceY = child.body.y + 500;
        var distanceX = child.body.x - player.body.x;
        if (Math.abs(distanceX) < 650 && player.body.x < child.body.x && distanceY > player.body.y) {
            child.flipX = true;
            child.setVelocityX(-90);
        }
        else if (Math.abs(distanceX) < 650 && player.body.x > child.body.x && distanceY > player.body.y) {
            child.flipX = false;
            child.setVelocityX(90);
        }
        else child.setVelocityX(0);
    }

    //Wraith
    var wraithEnemy = wraithEnemies.getChildren();
    for (child of wraithEnemy) {
        child.anims.play('wraith', true);
        var distanceY = child.body.y + 500;
        var distanceX = child.body.x - player.body.x;
        if (Math.abs(distanceX) < 650 && player.body.x < child.body.x && distanceY > player.body.y) {
            child.flipX = true;
            child.setVelocityX(-175);
        }
        else if (Math.abs(distanceX) < 650 && player.body.x > child.body.x && distanceY > player.body.y) {
            child.flipX = false;
            child.setVelocityX(175);
        }
        else child.setVelocityX(0);

    }

    //Yeti
    var yetiEnemy = yetiEnemies.getChildren();
    for (child of yetiEnemy) {
        child.anims.play('yeti', true);
        var distanceY = child.body.y - 500;
        var distanceX = child.body.x - player.body.x;
        if (Math.abs(distanceX) < 1500 && player.body.x < child.body.x && distanceY < player.body.y) {
            child.flipX = false;
            child.setVelocityX(-450);
        }
        else if (Math.abs(distanceX) < 1500 && player.body.x > child.body.x && distanceY < player.body.y) {
            child.flipX = true;
            child.setVelocityX(450);
        }
        else child.setVelocityX(0);

    }

    //Zombie
    var zombieEnemy = zombieEnemies.getChildren();
    for (child of zombieEnemy) {
        child.anims.play('zombie', true);
        var distanceY = child.body.y + 500;
        var distanceX = child.body.x - player.body.x;
        if (Math.abs(distanceX) < 650 && player.body.x < child.body.x && distanceY > player.body.y) {
            child.flipX = false;
            child.setVelocityX(-120);
        }
        else if (Math.abs(distanceX) < 650 && player.body.x > child.body.x && distanceY > player.body.y) {
            child.flipX = true;
            child.setVelocityX(120);
        }
        else child.setVelocityX(0);

    }

    //Zirla
    if (zirla.body.x > player.body.x) {
        zirla.flipX = false;
        if (zirla.body.y > player.body.y) {
            zirla.setVelocityY(-20);
        } else if (zirla.body.y < player.body.y) {
            zirla.setVelocityY(20);
        }
        zirla.setVelocityX(-20);
    }
    else {
        zirla.setVelocityY(-10);
    }
    if (zirla.body.x - 300 < player.body.x && orbActive == false) {
        if (zirlaDeads == false) {
            orb.create(zirla.body.x + 150, zirla.body.y + 20, 'orb');
            orbActive = true;
            setTimeout(function () {
                orbActive = false;
            }, 1500);
        }


    }
    if (zirla.body.x < player.body.x) {
        zirla.flipX = true;
        if (zirla.body.y > player.body.y) {
            zirla.setVelocityY(-20);
        } else if (zirla.body.y < player.body.y) {
            zirla.setVelocityY(20);
        }
        zirla.setVelocityX(20);
    }
    else {
        zirla.setVelocityY(-10);
    }
    if (zirla.body.x + 300 > player.body.x && orbActive == false) {
        orb.create(zirla.body.x + 150, zirla.body.y + 20, 'orb');
        orbActive = true;
        setTimeout(function () {
            orbActive = false;
        }, 1500);


    }


    //CONTROLS
    if (!shopActive) {
        if (cursors.down.isDown && fallBuffert > 0 && stamina >= 60 && weapon > 1) {
            if (player.flipX) {
                checkAttackState('glide', 0.2, 0.58);
                player.setVelocityX(-650)
            } else {
                checkAttackState('glide', 0.8, 0.58);
                player.setVelocityX(650)
            }

        } else if (cursors.left.isDown) {
            player.setVelocityX(-260);
            player.flipX = true;
            if (player.body.onFloor()) {
                checkAttackState('run', 0.5, 0.5);
            }
        } else if (cursors.right.isDown) {
            player.setVelocityX(260);
            player.flipX = false;
            if (player.body.onFloor()) {
                checkAttackState('run', 0.5, 0.5);
            }

        } else {
            checkAttackState('idle', 0.5, 0.5);
            player.setVelocityX(0);
        }
        if (key_Z.isDown && !cursors.down.isDown && stamina >= 40) {
            stamina -= 41;
            if (player.flipX) {
                checkAttackState('lightAttack', 0.7, 0.5);
            } else {
                checkAttackState('lightAttack', 0.3, 0.5);
            }
            timedEvent = this.time.addEvent({
                delay: 0, callback: onEvent,
                callbackScope: this, repeat: 0, startAt: 0
            });
        }

        if (key_X.isDown && !cursors.down.isDown && stamina >= 80) {
            stamina -= 50;
            if (player.flipX) {
                checkAttackState('heavyAttack', 0.7, 0.62);
            } else {
                checkAttackState('heavyAttack', 0.3, 0.62);
            }
            timedEvent = this.time.addEvent({
                delay: 0, callback: onEvent,
                callbackScope: this, repeat: 0, startAt: 0
            });
        }

        if (key_jump.isDown && player.body.onFloor()) {
            player.setVelocityY(-400);
            if (player.body.velocity.y < 0 && player.body.velocity.x != 0)
                checkAttackState('jump', 0.5, 0.5);
            fallBuffert = 0;
        }

        if (player.body.velocity.y > 0) {
            checkAttackState('fall', 0.5, 0.5);
        }
        if (player.body.velocity.y < 0) {
            checkAttackState('jump', 0.5, 0.5);
        }
        if (cursors.up.isDown && player.body.onWall() && weapon > 2) {
            if (player.flipX) {
                checkAttackState('wallGlide', 0.3, 0.5);
            } else {
                checkAttackState('wallGlide', 0.7, 0.5);
            }
            if (states != 'lightAttack' && states != 'heavyAttack')
                player.setVelocityY(-400);
        }
        //GAMEPAD CONTROLS
        if (gamepad) {
            if (gamepad.buttons[config.R1].pressed && fallBuffert > 0 && weapon > 1) {
                if (player.flipX) {
                    checkAttackState('glide', 0.2, 0.58);
                    player.setVelocityX(-650)
                } else {
                    checkAttackState('glide', 0.8, 0.58);
                    player.setVelocityX(650)
                }

            } else if (gamepad.buttons[config.LEFT].pressed) {
                player.setVelocityX(-260);
                player.flipX = true;
                if (player.body.onFloor()) {
                    checkAttackState('run', 0.5, 0.5);
                }
            } else if (gamepad.buttons[config.RIGHT].pressed) {
                player.setVelocityX(260);
                player.flipX = false;
                if (player.body.onFloor()) {
                    checkAttackState('run', 0.5, 0.5);
                }
            } else {
                checkAttackState('idle', 0.5, 0.5);
                player.setVelocityX(0);
            }
            if (gamepad.buttons[config.SQUARE].pressed && !gamepad.buttons[config.R1].pressed && stamina >= 40) {
                stamina -= 41;
                if (player.flipX) {
                    checkAttackState('lightAttack', 0.7, 0.5);
                } else {
                    checkAttackState('lightAttack', 0.3, 0.5);
                }
                timedEvent = this.time.addEvent({
                    delay: 0, callback: onEvent,
                    callbackScope: this, repeat: 0, startAt: 0
                });
            }

            if (gamepad.buttons[config.TRIANGLE].pressed && !gamepad.buttons[config.R1].pressed && stamina >= 80) {
                stamina -= 50;
                if (player.flipX) {
                    checkAttackState('heavyAttack', 0.7, 0.62);
                } else {
                    checkAttackState('heavyAttack', 0.3, 0.62);
                }
                timedEvent = this.time.addEvent({
                    delay: 0, callback: onEvent,
                    callbackScope: this, repeat: 0, startAt: 0
                });
            }

            if (gamepad.buttons[config.X].pressed && player.body.onFloor()) {
                player.setVelocityY(-400);
                if (player.body.velocity.y < 0 && player.body.velocity.x != 0)
                    checkAttackState('jump', 0.5, 0.5);
                fallBuffert = 0;
            }

            if (player.body.velocity.y > 0 && !gamepad.buttons[config.TRIANGLE].pressed && !gamepad.buttons[config.SQUARE].pressed) {
                checkAttackState('fall', 0.5, 0.5);
            }
            if (player.body.velocity.y < 0) {
                checkAttackState('jump', 0.5, 0.5);
            }
            if (gamepad.buttons[config.UP].pressed && gamepad.buttons[config.R1].pressed && player.body.onWall() && weapon > 2) {
                if (player.flipX) {
                    checkAttackState('wallGlide', 0.3, 0.5);
                    player.setVelocityX(-10)
                } else {
                    checkAttackState('wallGlide', 0.7, 0.5);
                    player.setVelocityX(10)
                }
                if (states != 'lightAttack' && states != 'heavyAttack')
                    player.setVelocityY(-400);
            }
        }
    } else {

    }

    if (cursors.right.isDown)
        gamepad = false;
    //CONTROL END
    if (health <= 0 && !playerDeads) {
        playerDeads = true;
        score += potions * 200;
        score += coins * 2;

        //set highscore
        $.ajax({
            type: "POST",
            data: {
                score: score
            },
            url: "/setHighscore" //which is mapped to its partner function on our controller class
        });
        //create new player
        $.ajax({
            type: "GET",
            url: "/resetPlayer" //which is mapped to its partner function on our controller class
        });
        health = -1;
        setTimeout(function () {
            location.reload();
        }, 1000);

    }


    //Music Changer
    var songs = [
        musicTheme,
        music2,
        music4
    ];

    if (player.body.x > 64 && player.body.x < 850) {
        for (song of songs) {
            music2.pause();
            music4.pause();
            musicTheme.resume({loop: true});
        }
    }
    else if (player.body.x > 7650 && player.body.x < 7700) {
        for (song of songs) {
            musicTheme.pause();
            music2.resume({loop: true});
        }
    }
    else if (player.body.x > 13100 && player.body.x < 13140) {
        for (song of songs) {
            musicTheme.pause();
            music2.resume({loop: true});
        }
    }
    else if (player.body.x > 27320 && player.body.x < 27340) {
        for (song of songs) {
            song.pause();

            music4.resume({loop: true});
        }
    }
    else if (player.body.x > 48310 && player.body.x < 48330) {
        for (song of songs) {
            song.pause();

            music4.resume({loop: true});
        }
    }
    else if (player.body.x > 66880 && player.body.x < 67328 && player.body.y > 1400 && player.body.y < 1420) {
        for (song of songs) {
            song.pause();
            music4.resume({loop: true});
        }
    }
    if (zirlaHealth <= 0) {
        if (zirla.body.x > player.body.x) {
            zirla.flipX = true;
        }
        else {
            zirla.flipX = false;
        }

        zirla.anims.play('zirlaDead', true);
        zirla.setVelocityX(0);
        zirla.disableBody(true, false);

        if (!zirlaDeads) {
            zirlaDeads = true;
            score += health * 20;
            score += potions * 40;
            score += coins * 2;

            $.ajax({
                type: "POST",
                data: {
                    score: score
                },
                url: "/setHighscore" //which is mapped to its partner function on our controller class
            });
            //create new player
            $.ajax({
                type: "GET",
                url: "/resetPlayer" //which is mapped to its partner function on our controller class
            });
            setTimeout(function () {
                location.reload();
            }, 5000);
        }
    }
}

function onEvent() {
    if (states == 'lightAttack') {
        if (player.flipX) {
            setTimeout(function () {
                weaponHitBox.create(player.body.x - 40, player.body.y + 110, 'weaponHitBox');
            }, 100);
            setTimeout(function () {
                weaponHitBox.create(player.body.x - 65, player.body.y + 65, 'weaponHitBox');
            }, 160);
            setTimeout(function () {
                weaponHitBox.clear(true);
            }, 250);

        } else {
            setTimeout(function () {
                weaponHitBox.create(player.body.x + 105, player.body.y + 110, 'weaponHitBox');
            }, 100);
            setTimeout(function () {
                weaponHitBox.create(player.body.x + 130, player.body.y + 65, 'weaponHitBox');
            }, 160);
            setTimeout(function () {
                weaponHitBox.clear(true);
            }, 250);
        }


    }
    if (states == 'heavyAttack') {
        if (player.flipX) {
            setTimeout(function () {
                weaponHitBox.create(player.body.x - 25, player.body.y - 20, 'weaponHitBox');
            }, 200);
            setTimeout(function () {
                weaponHitBox.create(player.body.x - 50, player.body.y + 22, 'weaponHitBox');
            }, 260);
            setTimeout(function () {
                weaponHitBox.create(player.body.x - 65, player.body.y + 65, 'weaponHitBox');
            }, 320);
            setTimeout(function () {
                weaponHitBox.clear(true);
            }, 350);

        } else {
            setTimeout(function () {
                weaponHitBox.create(player.body.x + 90, player.body.y - 20, 'weaponHitBox');
            }, 200);
            setTimeout(function () {
                weaponHitBox.create(player.body.x + 115, player.body.y + 22, 'weaponHitBox');
            }, 260);
            setTimeout(function () {
                weaponHitBox.create(player.body.x + 130, player.body.y + 65, 'weaponHitBox');
            }, 320);
            setTimeout(function () {
                weaponHitBox.clear(true);
            }, 350);

        }

    }


}

//Portal overlaps
function checkOverlapPortalHub(player, hubPortal) {
    if (cursors.up.isDown && !gamepad) {
        player.body.x = 800;
        player.body.y = 300;
        if (level == 1 && hubPortal.x == 10816) {
            level = 2;
            level1 = true
        }
        else if (level == 2 && hubPortal.x == 20704) {
            level = 3;
            level2 = true
        }
        else if (level == 3 && hubPortal.x == 45088) {
            level = 4;
            level3 = true
        }
        else if (level == 4 && hubPortal.x == 62816) {
            level = 5;
            level4 = true
        }
        $.ajax({
            type: "POST",
            data: {
                score: score,
                coins: coins,
                health: health,
                map: level,
                potions: potions
            },
            url: "/saveStateAfterClearingMap" //which is mapped to its partner function on our controller class
        });
    }
    else if (gamepad && gamepad.buttons[config.UP].pressed) {
        player.body.x = 800;
        player.body.y = 300;
        if (level == 1 && hubPortal.x == 10816) {
            level = 2;
            level1 = true
        }
        else if (level == 2 && hubPortal.x == 20704) {
            level = 3;
            level2 = true
        }
        else if (level == 3 && hubPortal.x == 45088) {
            level = 4;
            level3 = true
        }
        else if (level == 4 && hubPortal.x == 62816) {
            level = 5;
            level4 = true
        }
        $.ajax({
            type: "POST",
            data: {
                score: score,
                coins: coins,
                health: health,
                map: level,
                potions: potions
            },
            url: "/saveStateAfterClearingMap" //which is mapped to its partner function on our controller class
        });
    }
}

function checkOverlapPortal(player, portal) {
    if (cursors.up.isDown && !gamepad) {
        player.body.x = 7680;
        player.body.y = 120;
    }
    else if (gamepad && gamepad.buttons[config.UP].pressed) {
        player.body.x = 7680;
        player.body.y = 120;
    }
}

function checkOverlapPortal1(player, portal1) {
    if (cursors.up.isDown && !gamepad && weapon > 1 && level > 1) {
        player.body.x = 13120;
        player.body.y = 250;
    }
    else if (gamepad && gamepad.buttons[config.UP].pressed && weapon > 1 && level > 1) {
        player.body.x = 13120;
        player.body.y = 250;
    }
}

function checkOverlapPortal2(player, portal2) {
    if (cursors.up.isDown && !gamepad && level > 2 && weapon > 2) {
        player.body.x = 27328;
        player.body.y = 380;
    }
    else if (gamepad && gamepad.buttons[config.UP].pressed && level > 2 && weapon > 2) {
        player.body.x = 27328;
        player.body.y = 380;
    }
}

function checkOverlapPortal3(player, portal3) {

    if (cursors.up.isDown && !gamepad && level > 3 && weapon > 2) {
        player.body.x = 48320;
        player.body.y = 120;
    }
    else if (gamepad && gamepad.buttons[config.UP].pressed && level > 3 && weapon > 2) {
        player.body.x = 48320;
        player.body.y = 120;
    }
}

function checkOverlapPortal4(player, portal4) {

    if (cursors.up.isDown && !gamepad && level > 4 && weapon > 2) {
        player.body.x = 64832;
        player.body.y = 768;
    }
    else if (gamepad && gamepad.buttons[config.UP].pressed && level > 4 && weapon > 2) {
        player.body.x = 64832;
        player.body.y = 768;
    }
}

//Hitbox overlap
function checkOverlapHitBoxZirla(weaponHitBox, zirla) {
    if (states == 'lightAttack') {
        zirlaHealth -= 1;
    } else if (states == 'heavyAttack') {
        zirlaHealth -= 3;
    }

}

function checkOverlapOrb(player, childOrb) {
    health -= 5;
    childOrb.destroy();

}


function checkOverlapHitBoxYeti(weaponHitBox, yetiEnemies) {
    if (states == 'lightAttack') {
        yetiHealth -= 1;
    } else if (states == 'heavyAttack') {
        yetiHealth -= 3;
    }
    if (yetiHealth <= 0) {
        yetiEnemies.disableBody(true, true);
        value = setCoinValue(yetiEnemies);
        points = setPointValue(yetiEnemies);
        score += points;
        coinBags.create(yetiEnemies.x, yetiEnemies.y, 'coin');
        yetiHealth = 200;
    }

}

function checkOverlapHitBox(weaponHitBox, enemy) {
    if (states == 'lightAttack') {
        enemyHealth -= 1;
    } else if (states == 'heavyAttack') {
        enemyHealth -= 3;
    }
    if (enemyHealth <= 0) {
        enemy.disableBody(true, true);
        value = setCoinValue(enemy);
        points = setPointValue(enemy);
        score += points;
        coinBags.create(enemy.x, enemy.y, 'coin');
        enemyHealth = 20;
    }

}

function setPointValue(enemy) {
    var enemyType = enemy.anims.currentAnim.key
    switch (enemyType) {
        case 'imp':
            return 50;
            break;
        case 'ghost':
            return 70;
            break;
        case 'zombie':
            return 100;
            break;
        case 'yeti':
            return 500;
            break;
        case 'wraith':
            return 100;
            break;
    }
}

function setCoinValue(enemy) {
    var enemyType = enemy.anims.currentAnim.key
    switch (enemyType) {
        case 'imp':
            return 20;
            break;
        case 'ghost':
            return 20;
            break;
        case 'zombie':
            return 40;
            break;
        case 'yeti':
            return 100;
            break;
        case 'wraith':
            return 40;
            break;
    }
}

//Enemy player overlap
function checkOverlapPlayer(player, enemy) {

    states = 'hurt';
    player.setVelocityX(100);
    health -= 1;
    setTimeout(function () {
    }, 3500);
    if (health <= 0) {
        player.disableBody(true, true);
    }
}

function checkOverlapInnkeeper(player, Innkeeper) {
    if (!shopActive && !textActive) {
        textBox = this.add.image(innKeeper.x - 150, innKeeper.y - 150, 'textBox')
        textActive = true;
    }
    if (cursors.up.isDown && !shopActive && !gamepad) {
        states = 'idle';
        player.setVelocityX(0);
        shopActive = true;
        shop = this.add.image(innKeeper.x, innKeeper.y, 'shopWindow');
        shopPointer = this.add.image(shop.x + 200, shop.y - 103, 'shopPointer');
    }
    else if (gamepad && gamepad.buttons[config.UP].pressed && !shopActive) {
        states = 'idle';
        player.setVelocityX(0);
        shopActive = true;
        shop = this.add.image(innKeeper.x, innKeeper.y, 'shopWindow');
        shopPointer = this.add.image(shop.x + 200, shop.y - 103, 'shopPointer');
    }
}

function checkOverlapCoinBags(player, coinbag) {
    coinbag.disableBody(true, true);
    coins += value;
}

function checkAttackState(newState, xOrigin, yOrigin) {
    goIntoState = newState
    if (states == 'lightAttack' && goIntoState != 'lightAttack') {
        setTimeout(function () {
            player.originX = xOrigin;
            player.originY = yOrigin;
            states = goIntoState;
        }, 200);
    }
    else if (states == 'heavyAttack' && goIntoState != 'heavyAttack') {
        setTimeout(function () {
            player.originX = xOrigin;
            player.originY = yOrigin;
            states = goIntoState;
        }, 350);
    }
    else {
        player.originX = xOrigin;
        player.originY = yOrigin;
        states = goIntoState;
    }

}
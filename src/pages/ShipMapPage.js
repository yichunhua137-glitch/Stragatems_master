import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const MAP_XML_URL = `${process.env.PUBLIC_URL || ''}/map%20test/ship_deck.tmx`;
const MAP_DIR_URL = `${process.env.PUBLIC_URL || ''}/map%20test/`;

const NPCS = [
  {
    id: 'captain',
    name: 'Captain',
    targetPage: 'challenge',
    targetLabel: 'Challenge',
    position: { x: 380, y: 240 },
    frames: [
      '/animation/idle/captain idle/Sprite-0004.png',
      '/animation/idle/captain idle/Sprite-0005.png',
      '/animation/idle/captain idle/Sprite-0006.png',
    ],
  },
  {
    id: 'democracy-officer',
    name: 'Democracy Officer',
    targetPage: 'random',
    targetLabel: 'Random Code',
    position: { x: 760, y: 250 },
    frames: [
      '/animation/idle/democracy officer idle/Sprite-0001.png',
      '/animation/idle/democracy officer idle/Sprite-0002.png',
      '/animation/idle/democracy officer idle/Sprite-0003.png',
    ],
  },
  {
    id: 'general',
    name: 'General',
    targetPage: 'challenge-interference',
    targetLabel: 'Interference',
    position: { x: 1130, y: 250 },
    frames: [
      '/animation/idle/general idle/Sprite-0002.png',
      '/animation/idle/general idle/Sprite-0003.png',
      '/animation/idle/general idle/Sprite-0004.png',
    ],
  },
  {
    id: 'miss-eagle',
    name: 'Miss Eagle',
    targetPage: 'weapon',
    targetLabel: 'Weapon Wiki',
    position: { x: 380, y: 630 },
    frames: [
      '/animation/idle/miss eagle idle/5f358c2e-68d1-4778-9957-72f7f902770c - Copy1.png',
      '/animation/idle/miss eagle idle/5f358c2e-68d1-4778-9957-72f7f902770c - Copy2.png',
      '/animation/idle/miss eagle idle/5f358c2e-68d1-4778-9957-72f7f902770c - Copy3.png',
    ],
  },
  {
    id: 'mission-controller',
    name: 'Mission Controller',
    targetPage: 'wiki',
    targetLabel: 'Wiki',
    position: { x: 760, y: 630 },
    frames: [
      '/animation/idle/mission controller idle/Sprite-0002.png',
      '/animation/idle/mission controller idle/Sprite-0003.png',
      '/animation/idle/mission controller idle/Sprite-0004.png',
    ],
  },
  {
    id: 'seaf',
    name: 'SEAF',
    targetPage: 'loadout',
    targetLabel: 'Random Loadout',
    position: { x: 1130, y: 630 },
    frames: [
      '/animation/idle/seaf idle/Sprite-0003.png',
      '/animation/idle/seaf idle/Sprite-0004.png',
      '/animation/idle/seaf idle/Sprite-0005.png',
    ],
  },
];

const PLAYER_FRAMES = [
  '/animation/movement/helldiver walking/Sprite-0001.png',
  '/animation/movement/helldiver walking/Sprite-0002.png',
  '/animation/movement/helldiver walking/Sprite-0003.png',
  '/animation/movement/helldiver walking/Sprite-0004.png',
];

const FALLBACK_PAGE_MAP = {
  terminal: 'challenge',
  captain: 'challenge',
  officer: 'random',
  general: 'challenge-interference',
  eagle: 'weapon',
  mission: 'wiki',
  seaf: 'loadout',
};

const parseNumber = (value, fallback = 0) => {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : fallback;
};

const parseCsvLayer = (csvText, width, height) => {
  const numbers = csvText
    .split(',')
    .map((entry) => Number.parseInt(entry.trim(), 10))
    .filter((entry) => Number.isFinite(entry));

  if (!numbers.length) return [];

  const result = [];
  for (let y = 0; y < height; y += 1) {
    const row = [];
    for (let x = 0; x < width; x += 1) {
      row.push(numbers[y * width + x] || 0);
    }
    result.push(row);
  }
  return result;
};

const parseProperties = (objectNode) => {
  const props = {};
  const propertyNodes = objectNode.querySelectorAll('properties > property');
  propertyNodes.forEach((prop) => {
    const name = prop.getAttribute('name');
    const value = prop.getAttribute('value') || prop.textContent || '';
    if (name) props[name] = value;
  });
  return props;
};

const getFallbackTargetPage = (name = '') => {
  const lower = name.toLowerCase();
  const key = Object.keys(FALLBACK_PAGE_MAP).find((token) => lower.includes(token));
  return key ? FALLBACK_PAGE_MAP[key] : 'challenge';
};

const parseMapXml = (xmlDoc) => {
  const mapNode = xmlDoc.querySelector('map');
  if (!mapNode) return null;

  const mapWidth = parseNumber(mapNode.getAttribute('width'), 100);
  const mapHeight = parseNumber(mapNode.getAttribute('height'), 50);
  const tileWidth = parseNumber(mapNode.getAttribute('tilewidth'), 32);
  const tileHeight = parseNumber(mapNode.getAttribute('tileheight'), 32);

  const imageNode = xmlDoc.querySelector('tileset image');
  const imageSource = imageNode?.getAttribute('source') || 'Sprite-0001.png';
  const imageWidth = parseNumber(imageNode?.getAttribute('width'), tileWidth);
  const imageHeight = parseNumber(imageNode?.getAttribute('height'), tileHeight);

  const floorNode =
    xmlDoc.querySelector('layer[name="floor"] data') || xmlDoc.querySelector('layer data');
  const floorGrid = parseCsvLayer(
    floorNode?.textContent || '',
    mapWidth,
    mapHeight
  );

  const collisionNodes = xmlDoc.querySelectorAll('objectgroup[name="collision"] > object');
  const collisionRects = [];
  collisionNodes.forEach((node) => {
    const width = parseNumber(node.getAttribute('width'));
    const height = parseNumber(node.getAttribute('height'));
    if (width > 0 && height > 0) {
      collisionRects.push({
        x: parseNumber(node.getAttribute('x')),
        y: parseNumber(node.getAttribute('y')),
        width,
        height,
      });
    }
  });

  const spawnNode =
    xmlDoc.querySelector('objectgroup[name="spawn"] > object[name="spawn_main"]') ||
    xmlDoc.querySelector('objectgroup[name="spawn"] > object');

  const spawn = {
    x: parseNumber(spawnNode?.getAttribute('x'), tileWidth * 3),
    y: parseNumber(spawnNode?.getAttribute('y'), tileHeight * 3),
  };

  const interactNodes = xmlDoc.querySelectorAll('objectgroup[name="interact"] > object');
  const interactZones = [];
  interactNodes.forEach((node) => {
    const width = parseNumber(node.getAttribute('width'));
    const height = parseNumber(node.getAttribute('height'));
    if (width <= 0 || height <= 0) return;

    const name = node.getAttribute('name') || 'Terminal';
    const props = parseProperties(node);
    interactZones.push({
      name,
      label: props.label || name,
      targetPage: props.targetPage || getFallbackTargetPage(name),
      targetLabel: props.targetLabel || props.label || name,
      x: parseNumber(node.getAttribute('x')),
      y: parseNumber(node.getAttribute('y')),
      width,
      height,
    });
  });

  return {
    mapWidth,
    mapHeight,
    tileWidth,
    tileHeight,
    floorGrid,
    collisionRects,
    spawn,
    interactZones,
    tileset: {
      imageSource,
      imageWidth,
      imageHeight,
    },
  };
};

function ShipMapPage({ onOpenPage }) {
  const mountRef = useRef(null);
  const gameRef = useRef(null);
  const onOpenPageRef = useRef(onOpenPage);

  useEffect(() => {
    onOpenPageRef.current = onOpenPage;
  }, [onOpenPage]);

  useEffect(() => {
    if (!mountRef.current || gameRef.current) return undefined;

    const width = 1440;
    const height = 900;
    const publicUrl = process.env.PUBLIC_URL || '';

    let interactLockUntil = 0;

    const config = {
      type: Phaser.AUTO,
      width,
      height,
      parent: mountRef.current,
      backgroundColor: '#05070a',
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      scene: {
        preload() {
          this.load.xml('ship-map-xml', MAP_XML_URL);

          PLAYER_FRAMES.forEach((src, index) => {
            this.load.image(`player-${index}`, `${publicUrl}${src}`);
          });

          NPCS.forEach((npc) => {
            npc.frames.forEach((src, index) => {
              this.load.image(`${npc.id}-${index}`, `${publicUrl}${src}`);
            });
          });
        },
        create() {
          const scene = this;

          const xmlValue = scene.cache.xml.get('ship-map-xml');
          const xmlDoc =
            xmlValue instanceof XMLDocument
              ? xmlValue
              : new DOMParser().parseFromString(String(xmlValue || ''), 'text/xml');

          const mapData = parseMapXml(xmlDoc);

          if (!mapData) {
            scene.add
              .text(40, 40, 'Map load failed: /public/map test/ship_deck.tmx', {
                color: '#ff5252',
                fontSize: '22px',
                fontFamily: 'Arial',
              })
              .setScrollFactor(0);
            return;
          }

          scene.mapData = mapData;

          const imageUrl = encodeURI(`${MAP_DIR_URL}${mapData.tileset.imageSource}`);
          const frameWidth = mapData.tileWidth;
          const frameHeight = mapData.tileHeight;

          scene.load.spritesheet('ship-map-tiles', imageUrl, {
            frameWidth,
            frameHeight,
          });

          scene.load.once('complete', () => {
            const mapPixelWidth = mapData.mapWidth * mapData.tileWidth;
            const mapPixelHeight = mapData.mapHeight * mapData.tileHeight;

            scene.add.rectangle(
              mapPixelWidth / 2,
              mapPixelHeight / 2,
              mapPixelWidth,
              mapPixelHeight,
              0x070b0f,
              1
            );

            const floorBlitter = scene.add.blitter(0, 0, 'ship-map-tiles');
            mapData.floorGrid.forEach((row, y) => {
              row.forEach((gid, x) => {
                if (gid > 0) {
                  floorBlitter.create(
                    x * mapData.tileWidth,
                    y * mapData.tileHeight,
                    gid - 1
                  );
                }
              });
            });

            const player = scene.physics.add.sprite(
              mapData.spawn.x,
              mapData.spawn.y,
              'player-0'
            );
            player.setScale(0.75);
            player.setCollideWorldBounds(true);
            player.body.setSize(player.width * 0.48, player.height * 0.64, true);
            scene.player = player;

            scene.anims.create({
              key: 'player-walk',
              frames: PLAYER_FRAMES.map((_, index) => ({ key: `player-${index}` })),
              frameRate: 12,
              repeat: -1,
            });

            const colliders = mapData.collisionRects.map((rect) => {
              const zone = scene.add.zone(
                rect.x + rect.width / 2,
                rect.y + rect.height / 2,
                rect.width,
                rect.height
              );
              scene.physics.add.existing(zone, true);
              return zone;
            });

            colliders.forEach((wall) => {
              scene.physics.add.collider(player, wall);
            });

            scene.npcs = NPCS.map((npc) => {
              const animKey = `${npc.id}-idle`;
              scene.anims.create({
                key: animKey,
                frames: npc.frames.map((_, index) => ({ key: `${npc.id}-${index}` })),
                frameRate: 2,
                repeat: -1,
              });

              const sprite = scene.add.sprite(npc.position.x, npc.position.y, `${npc.id}-0`);
              sprite.setScale(1.45);
              sprite.play(animKey);

              scene.add
                .text(npc.position.x, npc.position.y + 68, npc.name, {
                  color: '#9ca4ad',
                  fontSize: '14px',
                  fontFamily: 'Arial',
                })
                .setOrigin(0.5);

              return { ...npc, sprite, type: 'npc' };
            });

            scene.terminals = mapData.interactZones.map((zone) => ({
              ...zone,
              centerX: zone.x + zone.width / 2,
              centerY: zone.y + zone.height / 2,
              type: 'terminal',
            }));

            scene.cameras.main.startFollow(player, true, 0.08, 0.08);
            scene.cameras.main.setBounds(0, 0, mapPixelWidth, mapPixelHeight);

            scene.keys = scene.input.keyboard.addKeys({
              w: Phaser.Input.Keyboard.KeyCodes.W,
              a: Phaser.Input.Keyboard.KeyCodes.A,
              s: Phaser.Input.Keyboard.KeyCodes.S,
              d: Phaser.Input.Keyboard.KeyCodes.D,
              up: Phaser.Input.Keyboard.KeyCodes.UP,
              left: Phaser.Input.Keyboard.KeyCodes.LEFT,
              down: Phaser.Input.Keyboard.KeyCodes.DOWN,
              right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
              e: Phaser.Input.Keyboard.KeyCodes.E,
            });

            scene.promptText = scene.add
              .text(width / 2, height - 32, '', {
                color: '#f2d638',
                fontSize: '18px',
                fontFamily: 'Arial',
                backgroundColor: 'rgba(0,0,0,0.6)',
                padding: { x: 10, y: 6 },
              })
              .setOrigin(0.5)
              .setScrollFactor(0)
              .setDepth(20);

            scene.helpText = scene.add
              .text(24, 24, 'WASD to move, E to interact', {
                color: '#9ca4ad',
                fontSize: '16px',
                fontFamily: 'Arial',
                backgroundColor: 'rgba(0,0,0,0.45)',
                padding: { x: 8, y: 5 },
              })
              .setScrollFactor(0)
              .setDepth(20);
          });

          scene.load.start();
        },
        update(time) {
          const scene = this;
          const { player, keys, promptText } = scene;
          if (!player || !keys || !promptText) return;

          const speed = 210;
          let vx = 0;
          let vy = 0;

          if (keys.a.isDown || keys.left.isDown) vx -= speed;
          if (keys.d.isDown || keys.right.isDown) vx += speed;
          if (keys.w.isDown || keys.up.isDown) vy -= speed;
          if (keys.s.isDown || keys.down.isDown) vy += speed;

          if (vx !== 0 && vy !== 0) {
            vx *= 0.707;
            vy *= 0.707;
          }

          player.body.setVelocity(vx, vy);

          if (vx < 0) {
            player.setFlipX(true);
          } else if (vx > 0) {
            player.setFlipX(false);
          }

          if (vx !== 0 || vy !== 0) {
            player.anims.play('player-walk', true);
          } else {
            player.anims.stop();
            player.setTexture('player-0');
          }

          const targets = [];
          if (Array.isArray(scene.npcs)) {
            scene.npcs.forEach((npc) => {
              targets.push({
                name: npc.name,
                targetPage: npc.targetPage,
                targetLabel: npc.targetLabel,
                x: npc.sprite.x,
                y: npc.sprite.y,
                range: 110,
              });
            });
          }
          if (Array.isArray(scene.terminals)) {
            scene.terminals.forEach((terminal) => {
              targets.push({
                name: terminal.label,
                targetPage: terminal.targetPage,
                targetLabel: terminal.targetLabel,
                x: terminal.centerX,
                y: terminal.centerY,
                range: 160,
              });
            });
          }

          let nearest = null;
          let nearestDistance = Number.POSITIVE_INFINITY;
          targets.forEach((target) => {
            const distance = Phaser.Math.Distance.Between(
              player.x,
              player.y,
              target.x,
              target.y
            );
            if (distance < nearestDistance) {
              nearestDistance = distance;
              nearest = target;
            }
          });

          if (!nearest || nearestDistance > nearest.range) {
            promptText.setText('');
            return;
          }

          promptText.setText(`[E] ${nearest.name} -> ${nearest.targetLabel}`);

          if (
            Phaser.Input.Keyboard.JustDown(keys.e) &&
            time >= interactLockUntil &&
            onOpenPageRef.current
          ) {
            interactLockUntil = time + 350;
            onOpenPageRef.current(nearest.targetPage);
          }
        },
      },
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <section className="section page-shell ship-map-section">
      <div className="section-title">
        <span>08</span>
        <h2>Super Destroyer Deck</h2>
        <p>Walk to NPCs and terminals. Press E to interact.</p>
      </div>

      <div className="ship-map-panel">
        <div className="ship-map-canvas" ref={mountRef} />
      </div>
    </section>
  );
}

export default ShipMapPage;

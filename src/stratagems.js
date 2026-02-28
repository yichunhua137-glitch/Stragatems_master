const stratagemSections = [
  {
    "name": "Patriotic Administration Center",
    "items": [
      {
        "id": "mg-43-machine-gun",
        "name": "MG-43 Machine Gun",
        "icon": "120px-Machine_Gun_Stratagem_Icon.png",
        "code": [
          "down",
          "left",
          "down",
          "up",
          "right"
        ],
        "cooldown": "480 sec",
        "unlock": "Free",
        "description": "A machine gun designed for stationary use. Trades higher power for increased recoil and reduced accuracy.",
        "tag": "Patriotic Administration Center"
      },
      {
        "id": "apw-1-anti-materiel-rifle",
        "name": "APW-1 Anti-Materiel Rifle",
        "icon": "120px-Anti-Materiel_Rifle_Stratagem_Icon.png",
        "code": [
          "down",
          "left",
          "right",
          "up",
          "down"
        ],
        "cooldown": "480 sec",
        "unlock": "Requisition Slips 5,000",
        "description": "A high-caliber sniper rifle effective over long distances against light vehicle armor. This rifle must be aimed downscope.",
        "tag": "Patriotic Administration Center"
      },
      {
        "id": "m-105-stalwart",
        "name": "M-105 Stalwart",
        "icon": "120px-Stalwart_Stratagem_Icon.png",
        "code": [
          "down",
          "left",
          "down",
          "up",
          "up",
          "left"
        ],
        "cooldown": "480 sec",
        "unlock": "Requisition Slips 3,500",
        "description": "A compact, low caliber machine gun. Trades power for ease of use, with faster reloading than heavier machine guns.",
        "tag": "Patriotic Administration Center"
      },
      {
        "id": "eat-17-expendable-anti-tank",
        "name": "EAT-17 Expendable Anti-Tank",
        "icon": "120px-Expendable_Anti-Tank_Stratagem_Icon.png",
        "code": [
          "down",
          "down",
          "left",
          "up",
          "right"
        ],
        "cooldown": "70 sec",
        "unlock": "Requisition Slips 3,000",
        "description": "A single-use weapon specialized for damaging vehicle armor. Discarded after every use.",
        "tag": "Patriotic Administration Center"
      },
      {
        "id": "gr-8-recoilless-rifle",
        "name": "GR-8 Recoilless Rifle",
        "icon": "120px-Recoilless_Rifle_Stratagem_Icon.png",
        "code": [
          "down",
          "left",
          "right",
          "right",
          "left"
        ],
        "cooldown": "480 sec",
        "unlock": "Requisition Slips 6,000",
        "description": "A recoilless rifle effective against vehicle armor. Includes support backpack required for reloading.",
        "tag": "Patriotic Administration Center"
      },
      {
        "id": "flam-40-flamethrower",
        "name": "FLAM-40 Flamethrower",
        "icon": "120px-Flamethrower_Stratagem_Icon.png",
        "code": [
          "down",
          "left",
          "up",
          "down",
          "up"
        ],
        "cooldown": "480 sec",
        "unlock": "Requisition Slips 6,000",
        "description": "An incendiary weapon for close range. Will ignite targets, terrain, and any flammable teammates.",
        "tag": "Patriotic Administration Center"
      },
      {
        "id": "ac-8-autocannon",
        "name": "AC-8 Autocannon",
        "icon": "120px-Autocannon_Stratagem_Icon.png",
        "code": [
          "down",
          "left",
          "down",
          "up",
          "up",
          "right"
        ],
        "cooldown": "480 sec",
        "unlock": "Requisition Slips 7,000",
        "description": "A fully-automatic cannon effective against light vehicle armor. Includes support backpack required for reloading.",
        "tag": "Patriotic Administration Center"
      },
      {
        "id": "mg-206-heavy-machine-gun",
        "name": "MG-206 Heavy Machine Gun",
        "icon": "120px-Heavy_Machine_Gun_Stratagem_Icon.png",
        "code": [
          "down",
          "left",
          "up",
          "down",
          "down"
        ],
        "cooldown": "480 sec",
        "unlock": "Requisition Slips 6,000",
        "description": "A very powerful but difficult-to-wield machine gun with intense recoil.",
        "tag": "Patriotic Administration Center"
      },
      {
        "id": "rl-77-airburst-rocket-launcher",
        "name": "RL-77 Airburst Rocket Launcher",
        "icon": "120px-RL-77_Airburst_Rocket_Launcher_Stratagem_Icon.png",
        "code": [
          "down",
          "up",
          "up",
          "left",
          "right"
        ],
        "cooldown": "480 sec",
        "unlock": "Requisition Slips 8,000",
        "description": "Fires a rocket that detonates within proximity of a target, and deploys a cluster of explosive bomblets.",
        "tag": "Patriotic Administration Center"
      },
      {
        "id": "mls-4x-commando",
        "name": "MLS-4X Commando",
        "icon": "120px-Commando_Stratagem_Icon.png",
        "code": [
          "down",
          "left",
          "up",
          "down",
          "right"
        ],
        "cooldown": "120 sec",
        "unlock": "Requisition Slips 8,000",
        "description": "An expendable missile launcher equipped with four laser-guided missiles.",
        "tag": "Patriotic Administration Center"
      },
      {
        "id": "rs-422-railgun",
        "name": "RS-422 Railgun",
        "icon": "120px-Railgun_Stratagem_Icon.png",
        "code": [
          "down",
          "right",
          "down",
          "up",
          "left",
          "right"
        ],
        "cooldown": "480 sec",
        "unlock": "Requisition Slips 10,000",
        "description": "An experimental weapon which prioritizes armor penetration. Must be charged between shots - choose targets carefully.",
        "tag": "Patriotic Administration Center"
      },
      {
        "id": "faf-14-spear",
        "name": "FAF-14 Spear",
        "icon": "120px-Spear_Stratagem_Icon.png",
        "code": [
          "down",
          "down",
          "up",
          "down",
          "down"
        ],
        "cooldown": "480 sec",
        "unlock": "Requisition Slips 9,000",
        "description": "An anti-tank homing missile which must lock onto its target before launch. Effective against large and armored enemies.",
        "tag": "Patriotic Administration Center"
      },
      {
        "id": "sta-x3-w-a-s-p-launcher",
        "name": "StA-X3 W.A.S.P. Launcher",
        "icon": "120px-StA-X3_W.png",
        "code": [
          "down",
          "down",
          "up",
          "down",
          "right"
        ],
        "cooldown": "480 sec",
        "unlock": "Requisition Slips 12,000",
        "description": "A versatile missile launcher loaded with seven lock-on homing missiles. These can either be fired from the launcher directly or as an airburst. Includes support backpack required for reloading. Produced by Stål Arms.",
        "tag": "Patriotic Administration Center"
      }
    ]
  },
  {
    "name": "Orbital Cannons",
    "items": [
      {
        "id": "orbital-gatling-barrage",
        "name": "Orbital Gatling Barrage",
        "icon": "120px-Orbital_Gatling_Barrage_Stratagem_Icon.png",
        "code": [
          "right",
          "down",
          "left",
          "up",
          "up"
        ],
        "cooldown": "70 sec",
        "unlock": "Requisition Slips 1,500",
        "description": "A barrage of high explosive rounds, fired from the Destroyer's high speed rotary autocannons.",
        "tag": "Orbital Cannons"
      },
      {
        "id": "orbital-airburst-strike",
        "name": "Orbital Airburst Strike",
        "icon": "120px-Orbital_Airburst_Strike_Stratagem_Icon.png",
        "code": [
          "right",
          "right",
          "right"
        ],
        "cooldown": "100 sec",
        "unlock": "Requisition Slips 4,000",
        "description": "A projectile which explodes while airborne, creating a deadly rain of shrapnel. Not effective against heavy armor.",
        "tag": "Orbital Cannons"
      },
      {
        "id": "orbital-120mm-he-barrage",
        "name": "Orbital 120mm HE Barrage",
        "icon": "120px-Orbital_120mm_HE_Barrage_Stratagem_Icon.png",
        "code": [
          "right",
          "right",
          "down",
          "left",
          "right",
          "down"
        ],
        "cooldown": "180 sec",
        "unlock": "Requisition Slips 4,000",
        "description": "A precision artillery salvo over a small area, perfect for taking out concentrated enemy units.",
        "tag": "Orbital Cannons"
      },
      {
        "id": "orbital-380mm-he-barrage",
        "name": "Orbital 380mm HE Barrage",
        "icon": "120px-Orbital_380mm_HE_Barrage_Stratagem_Icon.png",
        "code": [
          "right",
          "down",
          "up",
          "up",
          "left",
          "down",
          "down"
        ],
        "cooldown": "240 sec",
        "unlock": "Requisition Slips 7,500",
        "description": "A prolonged barrage, wreaking extended destruction over a large area. Communication with teammates is advised.",
        "tag": "Orbital Cannons"
      },
      {
        "id": "orbital-walking-barrage",
        "name": "Orbital Walking Barrage",
        "icon": "120px-Orbital_Walking_Barrage_Stratagem_Icon.png",
        "code": [
          "right",
          "down",
          "right",
          "down",
          "right",
          "down"
        ],
        "cooldown": "240 sec",
        "unlock": "Requisition Slips 7,500",
        "description": "A linear artillery barrage which moves at intervals, driving the enemy out from cover while allowing an advance.",
        "tag": "Orbital Cannons"
      },
      {
        "id": "orbital-laser",
        "name": "Orbital Laser",
        "icon": "120px-Orbital_Laser_Stratagem_Icon.png",
        "code": [
          "right",
          "down",
          "up",
          "right",
          "down"
        ],
        "cooldown": "300 sec",
        "unlock": "Requisition Slips 10,000",
        "description": "The Destroyer's laser cannon will sweep over the designated area, vaporizing all targets within the effective radius.",
        "tag": "Orbital Cannons"
      },
      {
        "id": "orbital-napalm-barrage",
        "name": "Orbital Napalm Barrage",
        "icon": "120px-Orbital_Napalm_Barrage_Stratagem_Icon.png",
        "code": [
          "right",
          "right",
          "down",
          "left",
          "right",
          "up"
        ],
        "cooldown": "240 sec",
        "unlock": "Requisition 10,000",
        "description": "Launches a prolonged barrage of napalm shells over a wide area, setting a swath of land ablaze in mere moments.",
        "tag": "Orbital Cannons"
      },
      {
        "id": "orbital-railcannon-strike",
        "name": "Orbital Railcannon Strike",
        "icon": "120px-Orbital_Railcannon_Strike_Stratagem_Icon.png",
        "code": [
          "right",
          "up",
          "down",
          "down",
          "right"
        ],
        "cooldown": "180 sec",
        "unlock": "Requisition Slips 10,000",
        "description": "A high-velocity railcannon round fired at the largest target in close proximity to the beacon. Targeting is automatic.",
        "tag": "Orbital Cannons"
      }
    ]
  },
  {
    "name": "Hangar",
    "items": [
      {
        "id": "eagle-strafing-run",
        "name": "Eagle Strafing Run",
        "icon": "120px-Eagle_Strafing_Run_Stratagem_Icon.png",
        "code": [
          "up",
          "right",
          "right"
        ],
        "cooldown": "8 sec",
        "unlock": "Requisition Slips 1,500",
        "description": "A strafing run of the battlefield to clear small targets, delivered almost instantly. When called, the strike will start from the beacon and go away from the direction you were facing when thrown.",
        "tag": "Hangar"
      },
      {
        "id": "eagle-airstrike",
        "name": "Eagle Airstrike",
        "icon": "120px-Eagle_Airstrike_Stratagem_Icon.png",
        "code": [
          "up",
          "right",
          "down",
          "right"
        ],
        "cooldown": "8 sec",
        "unlock": "Requisition Slips 4,000",
        "description": "A barrage of bombs creating a non-targeted carpet of explosions. When called, the strike will be perpendicular from the direction you were facing when thrown.",
        "tag": "Hangar"
      },
      {
        "id": "eagle-cluster-bomb",
        "name": "Eagle Cluster Bomb",
        "icon": "120px-Eagle_Cluster_Bomb_Stratagem_Icon.png",
        "code": [
          "up",
          "right",
          "down",
          "down",
          "right"
        ],
        "cooldown": "8 sec",
        "unlock": "Requisition Slips 4,000",
        "description": "A targeted air strike unable to destroy buildings, but efficient at clearing smaller targets. When called, the strike will be perpendicular from the direction you were facing when thrown.",
        "tag": "Hangar"
      },
      {
        "id": "eagle-napalm-airstrike",
        "name": "Eagle Napalm Airstrike",
        "icon": "120px-Eagle_Napalm_Airstrike_Stratagem_Icon.png",
        "code": [
          "up",
          "right",
          "down",
          "up"
        ],
        "cooldown": "8 sec",
        "unlock": "Requisition Slips 5,000",
        "description": "A barrage of napalm bombs, creating a wall of fire which will stop the enemy in their tracks. When called, the strike will be perpendicular from the direction you were facing when thrown.",
        "tag": "Hangar"
      },
      {
        "id": "lift-850-jump-pack",
        "name": "LIFT-850 Jump Pack",
        "icon": "120px-Jump_Pack_Stratagem_Icon.png",
        "code": [
          "down",
          "up",
          "up",
          "down",
          "up"
        ],
        "cooldown": "480 sec",
        "unlock": "Requisition Slips 6,000",
        "description": "Enables the user to jump higher than 'gravity' and 'safety' would normally allow. Must be charged before use.",
        "tag": "Hangar"
      },
      {
        "id": "eagle-smoke-strike",
        "name": "Eagle Smoke Strike",
        "icon": "120px-Eagle_Smoke_Strike_Stratagem_Icon.png",
        "code": [
          "up",
          "right",
          "up",
          "down"
        ],
        "cooldown": "8 sec",
        "unlock": "Requisition Slips 4,000",
        "description": "A barrage of smoke grenades, creating a thick smoke screen to block enemies' line of sight. When called the strike will be Perpendicular from the direction you were facing when thrown.",
        "tag": "Hangar"
      },
      {
        "id": "eagle-110mm-rocket-pods",
        "name": "Eagle 110mm Rocket Pods",
        "icon": "120px-Eagle_110mm_Rocket_Pods_Stratagem_Icon.png",
        "code": [
          "up",
          "right",
          "up",
          "left"
        ],
        "cooldown": "8 sec",
        "unlock": "Requisition Slips 7,500",
        "description": "A barrage of rocket pods, which the Eagle pilot will release on the largest target near the stratagem beacon.",
        "tag": "Hangar"
      },
      {
        "id": "eagle-500kg-bomb",
        "name": "Eagle 500kg Bomb",
        "icon": "120px-Eagle_500kg_Bomb_Stratagem_Icon.png",
        "code": [
          "up",
          "right",
          "down",
          "down",
          "down"
        ],
        "cooldown": "8 sec",
        "unlock": "Requisition Slips 10,000",
        "description": "A large bomb obliterating almost any target close to impact. Make sure to clear the area.",
        "tag": "Hangar"
      },
      {
        "id": "m-102-fast-recon-vehicle",
        "name": "M-102 Fast Recon Vehicle",
        "icon": "120px-M-102_Fast_Recon_Vehicle_Stratagem_Icon.png",
        "code": [
          "left",
          "down",
          "right",
          "down",
          "right",
          "down",
          "up"
        ],
        "cooldown": "480 sec",
        "unlock": "Requisition 25,000",
        "description": "A lightly-armored reconnaissance vehicle mounted with a heavy machinegun.",
        "tag": "Hangar"
      }
    ]
  },
  {
    "name": "Bridge",
    "items": [
      {
        "id": "orbital-precision-strike",
        "name": "Orbital Precision Strike",
        "icon": "120px-Orbital_Precision_Strike_Stratagem_Icon.png",
        "code": [
          "right",
          "right",
          "up"
        ],
        "cooldown": "90 sec",
        "unlock": "Free",
        "description": "A single precision shot from the Destroyer's 'ATLAS' cannon.",
        "tag": "Bridge"
      },
      {
        "id": "orbital-gas-strike",
        "name": "Orbital Gas Strike",
        "icon": "120px-Orbital_Gas_Strike_Stratagem_Icon.png",
        "code": [
          "right",
          "right",
          "down",
          "right"
        ],
        "cooldown": "75 sec",
        "unlock": "Requisition Slips 4,000",
        "description": "A projectile which releases a cloud of corrosive gas, harmful to both organic and robotic lifeforms.",
        "tag": "Bridge"
      },
      {
        "id": "orbital-ems-strike",
        "name": "Orbital EMS Strike",
        "icon": "120px-Orbital_EMS_Strike_Stratagem_Icon.png",
        "code": [
          "right",
          "right",
          "left",
          "down"
        ],
        "cooldown": "75 sec",
        "unlock": "Requisition Slips 6,000",
        "description": "A \"compliance weapon\" to modify enemy behavior. The projectile temporarily stuns all targets within the strike radius.",
        "tag": "Bridge"
      },
      {
        "id": "orbital-smoke-strike",
        "name": "Orbital Smoke Strike",
        "icon": "120px-Orbital_Smoke_Strike_Stratagem_Icon.png",
        "code": [
          "right",
          "right",
          "down",
          "up"
        ],
        "cooldown": "100 sec",
        "unlock": "Requisition Slips 4,000",
        "description": "Creates a large, thick smoke screen to block targets' line of sight.",
        "tag": "Bridge"
      },
      {
        "id": "e-mg-101-hmg-emplacement",
        "name": "E/MG-101 HMG Emplacement",
        "icon": "120px-HMG_Emplacement_Stratagem_Icon.png",
        "code": [
          "down",
          "up",
          "left",
          "right",
          "right",
          "left"
        ],
        "cooldown": "180 sec",
        "unlock": "Requisition Slips 10,000",
        "description": "A manned fortification offering superior firepower against lightly armored targets. Slow to turn, so place it wisely.",
        "tag": "Bridge"
      },
      {
        "id": "fx-12-shield-generator-relay",
        "name": "FX-12 Shield Generator Relay",
        "icon": "120px-Shield_Generator_Relay_Stratagem_Icon.png",
        "code": [
          "down",
          "down",
          "left",
          "right",
          "left",
          "right"
        ],
        "cooldown": "90 sec",
        "unlock": "Requisition Slips 9,000",
        "description": "A stationary energy shield which provides cover against projectiles. Has a limited lifetime once deployed.",
        "tag": "Bridge"
      },
      {
        "id": "a-arc-3-tesla-tower",
        "name": "A/ARC-3 Tesla Tower",
        "icon": "120px-Tesla_Tower_Stratagem_Icon.png",
        "code": [
          "down",
          "up",
          "right",
          "up",
          "left",
          "right"
        ],
        "cooldown": "120 sec",
        "unlock": "Requisition Slips 8,000",
        "description": "A turret which fires electrical charges at targets in close range. To avoid friendly fire, remain prone.",
        "tag": "Bridge"
      },
      {
        "id": "e-gl-21-grenadier-battlement",
        "name": "E/GL-21 Grenadier Battlement",
        "icon": "120px-GL-21_Grenadier_Battlement_Stratagem_Icon.png",
        "code": [
          "down",
          "right",
          "down",
          "left",
          "right"
        ],
        "cooldown": "120 sec",
        "unlock": "Requisition Slips 10,000",
        "description": "A stationary ballistic cover with a mounted grenade launcher. Can protect multiple Helldivers from small arms fire.",
        "tag": "Bridge"
      }
    ]
  },
  {
    "name": "Engineering Bay",
    "items": [
      {
        "id": "md-6-anti-personnel-minefield",
        "name": "MD-6 Anti-Personnel Minefield",
        "icon": "120px-Anti-Personnel_Minefield_Stratagem_Icon.png",
        "code": [
          "down",
          "left",
          "up",
          "right"
        ],
        "cooldown": "120 sec",
        "unlock": "Requisition Slips 1,500",
        "description": "Deploys a defensive anti-personnel minefield, to halt enemy advance.",
        "tag": "Engineering Bay"
      },
      {
        "id": "b-1-supply-pack",
        "name": "B-1 Supply Pack",
        "icon": "120px-Supply_Pack_Stratagem_Icon.png",
        "code": [
          "down",
          "left",
          "down",
          "up",
          "up",
          "down"
        ],
        "cooldown": "480 sec",
        "unlock": "Requisition Slips 4,000",
        "description": "Supply boxes containing ammunition, with a backpack that allows the user to distribute boxes to fellow Helldivers.",
        "tag": "Engineering Bay"
      },
      {
        "id": "gl-21-grenade-launcher",
        "name": "GL-21 Grenade Launcher",
        "icon": "120px-Grenade_Launcher_Stratagem_Icon.png",
        "code": [
          "down",
          "left",
          "up",
          "left",
          "down"
        ],
        "cooldown": "480 sec",
        "unlock": "Requisition Slips 6,000",
        "description": "A grenade launcher effective against armored infantry. Not intended for use against vehicle armor or fortified buildings.",
        "tag": "Engineering Bay"
      },
      {
        "id": "las-98-laser-cannon",
        "name": "LAS-98 Laser Cannon",
        "icon": "120px-Laser_Cannon_Stratagem_Icon.png",
        "code": [
          "down",
          "left",
          "down",
          "up",
          "left"
        ],
        "cooldown": "480 sec",
        "unlock": "Requisition Slips 4,000",
        "description": "A laser weapon firing a continuous beam. Doesn't require ammunition, but will need heat sink replaced if it overheats.",
        "tag": "Engineering Bay"
      },
      {
        "id": "md-i4-incendiary-mines",
        "name": "MD-I4 Incendiary Mines",
        "icon": "120px-Incendiary_Mines_Stratagem_Icon.png",
        "code": [
          "down",
          "left",
          "left",
          "down"
        ],
        "cooldown": "120 sec",
        "unlock": "Requisition Slips 4,000",
        "description": "Deploys a defensive incendiary minefield, which will set both terrain and targets alight when triggered.",
        "tag": "Engineering Bay"
      },
      {
        "id": "ax-las-5-guard-dog-rover",
        "name": "AX/LAS-5 \"Guard Dog\" Rover",
        "icon": "120px-Guard_Dog_Rover_Stratagem_Icon.png",
        "code": [
          "down",
          "up",
          "left",
          "up",
          "right",
          "right"
        ],
        "cooldown": "480 sec",
        "unlock": "Requisition Slips 7,500",
        "description": "An autonomous drone equipped with a laser rifle, providing 360� cover. Returns to backpack to cool down.",
        "tag": "Engineering Bay"
      },
      {
        "id": "sh-20-ballistic-shield-backpack",
        "name": "SH-20 Ballistic Shield Backpack",
        "icon": "120px-Ballistic_Shield_Backpack_Stratagem_Icon.png",
        "code": [
          "down",
          "left",
          "down",
          "down",
          "up",
          "left"
        ],
        "cooldown": "300 sec",
        "unlock": "Requisition Slips 6,000",
        "description": "A backpack which can be wielded as a one-handed ballistic shield, protecting against small arms fire.",
        "tag": "Engineering Bay"
      },
      {
        "id": "arc-3-arc-thrower",
        "name": "ARC-3 Arc Thrower",
        "icon": "120px-Arc_Thrower_Stratagem_Icon.png",
        "code": [
          "down",
          "right",
          "down",
          "up",
          "left",
          "left"
        ],
        "cooldown": "480 sec",
        "unlock": "Requisition Slips 7,000",
        "description": "Projects an arc of lightning at close range. Charges up to project bolts, and may discharge through multiple targets.",
        "tag": "Engineering Bay"
      },
      {
        "id": "md-17-anti-tank-mines",
        "name": "MD-17 Anti-Tank Mines",
        "icon": "120px-MD-17_Anti-Tank_Mines_Stratagem_Icon.png",
        "code": [
          "down",
          "left",
          "up",
          "up"
        ],
        "cooldown": "120 sec",
        "unlock": "Requisition Slips 7,000",
        "description": "Scatters powerful anti-tank mines that deal heavy, armor-penetrating damage. Minefield is less densely packed relative to smaller mines.",
        "tag": "Engineering Bay"
      },
      {
        "id": "las-99-quasar-cannon",
        "name": "LAS-99 Quasar Cannon",
        "icon": "120px-Quasar_Cannon_Stratagem_Icon.png",
        "code": [
          "down",
          "down",
          "up",
          "left",
          "right"
        ],
        "cooldown": "480 sec",
        "unlock": "Requisition Slips 7,500",
        "description": "Charges up to fire a powerful, explosive energy burst. Has a long cooldown period after firing.",
        "tag": "Engineering Bay"
      },
      {
        "id": "sh-32-shield-generator-pack",
        "name": "SH-32 Shield Generator Pack",
        "icon": "120px-Shield_Generator_Pack_Stratagem_Icon.png",
        "code": [
          "down",
          "up",
          "left",
          "right",
          "left",
          "right"
        ],
        "cooldown": "480 sec",
        "unlock": "Requisition Slips 10,000",
        "description": "Encloses the wearer in a spherical shield which blocks high-speed projectiles. Has a limited lifetime once deployed.",
        "tag": "Engineering Bay"
      },
      {
        "id": "md-8-gas-mines",
        "name": "MD-8 Gas Mines",
        "icon": "120px-Gas_Minefield_Stratagem_Icon.png",
        "code": [
          "down",
          "left",
          "left",
          "right"
        ],
        "cooldown": "120 sec",
        "unlock": "Requisition Slips 12,000",
        "description": "Deploys mines that release gas on activation, temporarily blinding and slowing most enemies.",
        "tag": "Engineering Bay"
      }
    ]
  },
  {
    "name": "Robotics Workshop",
    "items": [
      {
        "id": "a-mg-43-machine-gun-sentry",
        "name": "A/MG-43 Machine Gun Sentry",
        "icon": "120px-Machine_Gun_Sentry_Stratagem_Icon.png",
        "code": [
          "down",
          "up",
          "right",
          "right",
          "up"
        ],
        "cooldown": "90 sec",
        "unlock": "Requisition Slips 1,500",
        "description": "An agile automated machine gun turret. Will fire at targets even if Helldivers will be caught in the crossfire.",
        "tag": "Robotics Workshop"
      },
      {
        "id": "a-g-16-gatling-sentry",
        "name": "A/G-16 Gatling Sentry",
        "icon": "120px-Gatling_Sentry_Stratagem_Icon.png",
        "code": [
          "down",
          "up",
          "right",
          "left"
        ],
        "cooldown": "150 sec",
        "unlock": "Requisition Slips 4,000",
        "description": "An automated turret with an extremely high rate of fire. Caution: does not check if friendly units are in line of fire.",
        "tag": "Robotics Workshop"
      },
      {
        "id": "a-m-12-mortar-sentry",
        "name": "A/M-12 Mortar Sentry",
        "icon": "120px-Mortar_Sentry_Stratagem_Icon.png",
        "code": [
          "down",
          "up",
          "right",
          "right",
          "down"
        ],
        "cooldown": "180 sec",
        "unlock": "Requisition Slips 7,000",
        "description": "A turret firing powerful shells in a high arc. Effective at long ranges, and able to strike at targets behind cover.",
        "tag": "Robotics Workshop"
      },
      {
        "id": "ax-ar-23-guard-dog",
        "name": "AX/AR-23 \"Guard Dog\"",
        "icon": "120px-Guard_Dog_Stratagem_Icon.png",
        "code": [
          "down",
          "up",
          "left",
          "up",
          "right",
          "down"
        ],
        "cooldown": "480 sec",
        "unlock": "Requisition Slips 7,500",
        "description": "An autonomous drone equipped with a Liberator Penetrator assault rifle, providing 360� cover. Returns to backpack to rearm.",
        "tag": "Robotics Workshop"
      },
      {
        "id": "a-ac-8-autocannon-sentry",
        "name": "A/AC-8 Autocannon Sentry",
        "icon": "120px-Autocannon_Sentry_Stratagem_Icon.png",
        "code": [
          "down",
          "up",
          "right",
          "up",
          "left",
          "up"
        ],
        "cooldown": "150 sec",
        "unlock": "Requisition Slips 6,000",
        "description": "An automated cannon turret firing anti-tank ammunition over long ranges. Sacrifices agility for range and power.",
        "tag": "Robotics Workshop"
      },
      {
        "id": "a-mls-4x-rocket-sentry",
        "name": "A/MLS-4X Rocket Sentry",
        "icon": "120px-Rocket_Sentry_Stratagem_Icon.png",
        "code": [
          "down",
          "up",
          "right",
          "right",
          "left"
        ],
        "cooldown": "150 sec",
        "unlock": "Requisition Slips 7,500",
        "description": "A powerful automated turret, effective against armored targets. The turret will primarily aim at larger enemies.",
        "tag": "Robotics Workshop"
      },
      {
        "id": "a-m-23-ems-mortar-sentry",
        "name": "A/M-23 EMS Mortar Sentry",
        "icon": "120px-AM-23_EMS_Mortar_Sentry_Stratagem_Icon.png",
        "code": [
          "down",
          "up",
          "right",
          "down",
          "right"
        ],
        "cooldown": "180 sec",
        "unlock": "Requisition Slips 8,000",
        "description": "A turret firing static field generators that slow the advance of enemies.",
        "tag": "Robotics Workshop"
      },
      {
        "id": "exo-45-patriot-exosuit",
        "name": "EXO-45 Patriot Exosuit",
        "icon": "120px-EXO-45_Patriot_Exosuit_Stratagem_Icon.png",
        "code": [
          "left",
          "down",
          "right",
          "up",
          "left",
          "down",
          "down"
        ],
        "cooldown": "600 sec",
        "unlock": "Requisition Slips 20,000",
        "description": "The EXO-45 Patriot Exosuit is a heavily armored walking exosuit, equipped with fourteen rockets and a mini-gun preloaded with 1000 ammo.",
        "tag": "Robotics Workshop"
      },
      {
        "id": "exo-49-emancipator-exosuit",
        "name": "EXO-49 Emancipator Exosuit",
        "icon": "120px-EXO-49_Emancipator_Exosuit_Stratagem_Icon.png",
        "code": [
          "left",
          "down",
          "right",
          "up",
          "left",
          "down",
          "up"
        ],
        "cooldown": "600 sec",
        "unlock": "Requisition Slips 20,000",
        "description": "The EXO-49 Emancipator Exosuit is a heavily armored walking exosuit, equipped with dual autocannons preloaded with 100 rounds each.",
        "tag": "Robotics Workshop"
      }
    ]
  },
  {
    "name": "Warbonds",
    "items": [
      {
        "id": "tx-41-sterilizer",
        "name": "TX-41 Sterilizer",
        "icon": "120px-Sterilizer_Stratagem_Icon.png",
        "code": [
          "down",
          "left",
          "up",
          "down",
          "left"
        ],
        "cooldown": "480 sec",
        "unlock": "Medals 85",
        "description": "Atomizes caustic chemicals into a fine mist that liquifies sensitive electronics and tissues. Blinds and slows most enemies.",
        "tag": "Warbonds"
      },
      {
        "id": "ax-tx-13-guard-dog-dog-breath",
        "name": "AX/TX-13 \"Guard Dog\" Dog Breath",
        "icon": "120px-Guard_Dog_Dog_Breath_Stratagem_Icon.png",
        "code": [
          "down",
          "up",
          "left",
          "up",
          "right",
          "up"
        ],
        "cooldown": "480 sec",
        "unlock": "Medals 110",
        "description": "A drone that defends its user by firing caustic gas at nearby enemies. Returns to backpack to refill.",
        "tag": "Warbonds"
      },
      {
        "id": "sh-51-directional-shield",
        "name": "SH-51 Directional Shield",
        "icon": "120px-SH-51_Directional_Shield_Stratagem_Icon.png",
        "code": [
          "down",
          "up",
          "left",
          "right",
          "up",
          "up"
        ],
        "cooldown": "300 sec",
        "unlock": "Medals 75",
        "description": "A one-handed device that deploys a wide energy barrier in front of the user. The barrier is semipermeable and blocks high-speed projectiles from the outside only, leaving the user free to shoot through it.",
        "tag": "Warbonds"
      },
      {
        "id": "e-at-12-anti-tank-emplacement",
        "name": "E/AT-12 Anti-Tank Emplacement",
        "icon": "120px-E_AT-12_Anti-Tank_Emplacement_Stratagem_Icon.png",
        "code": [
          "down",
          "up",
          "left",
          "right",
          "right",
          "right"
        ],
        "cooldown": "180 sec",
        "unlock": "Medals 110",
        "description": "A powerful manned gun emplacement, capable of taking out armored targets at long ranges.",
        "tag": "Warbonds"
      },
      {
        "id": "a-flam-40-flame-sentry",
        "name": "A/FLAM-40 Flame Sentry",
        "icon": "120px-A_FLAM-40_Flame_Sentry_Stratagem_Icon.png",
        "code": [
          "down",
          "up",
          "right",
          "down",
          "up",
          "up"
        ],
        "cooldown": "100 sec",
        "unlock": "Medals 85",
        "description": "An automated flamethrower turret. Warning: fuel canister prone to explosion when ruptured.",
        "tag": "Warbonds"
      },
      {
        "id": "b-100-portable-hellbomb",
        "name": "B-100 Portable Hellbomb",
        "icon": "120px-Portable_Hellbomb_Stratagem_Icon.png",
        "code": [
          "down",
          "right",
          "up",
          "up",
          "up"
        ],
        "cooldown": "300 sec",
        "unlock": "Medals 110",
        "description": "A backpack-mounted Hellbomb that can be armed by the wearer or an ally, starting a countdown. Users are recommended to remove the backpack before the countdown reaches zero.",
        "tag": "Warbonds"
      },
      {
        "id": "lift-860-hover-pack",
        "name": "LIFT-860 Hover Pack",
        "icon": "Hover_Pack_Stratagem_Icon.png",
        "code": [
          "down",
          "up",
          "up",
          "down",
          "left",
          "right"
        ],
        "cooldown": "480 sec",
        "unlock": "Medals 110",
        "description": "Offers its user brief fixed-height flight, stable enough for pinpoint marksmanship.",
        "tag": "Warbonds"
      },
      {
        "id": "cqc-1-one-true-flag",
        "name": "CQC-1 One True Flag",
        "icon": "120px-CQC-1_One_True_Flag_Stratagem_Icon.png",
        "code": [
          "down",
          "left",
          "right",
          "right",
          "up"
        ],
        "cooldown": "480 sec",
        "unlock": "Medals 110",
        "description": "The eternal colors of Super Earth can never be tainted. Only quenched, by the blood of its enemies.",
        "tag": "Warbonds"
      },
      {
        "id": "gl-52-de-escalator",
        "name": "GL-52 De-Escalator",
        "icon": "GL-52_De-Escalator_Stratagem_Icon.png",
        "code": [
          "down",
          "right",
          "up",
          "left",
          "right"
        ],
        "cooldown": "480 sec",
        "unlock": "Medals 85",
        "description": "A humane grenade launcher firing high-powered arc grenades.",
        "tag": "Warbonds"
      },
      {
        "id": "ax-arc-3-guard-dog-k-9",
        "name": "AX/ARC-3 \"Guard Dog\" K-9",
        "icon": "AX_ARC-3__Guard_Dog__K-9_Stratagem_Icon.png",
        "code": [
          "down",
          "up",
          "left",
          "up",
          "right",
          "left"
        ],
        "cooldown": "480 sec",
        "unlock": "Medals 110",
        "description": "A humane, autonomous drone equipped with a modified Arc Thrower. Capable of projecting arcs of lightning through multiple targets. Does not need to recharge between shots.",
        "tag": "Warbonds"
      },
      {
        "id": "plas-45-epoch",
        "name": "PLAS-45 Epoch",
        "icon": "PLAS-45_Epoch_Stratagem_Icon.png",
        "code": [
          "down",
          "left",
          "up",
          "left",
          "right"
        ],
        "cooldown": "480 sec",
        "unlock": "Medals 75",
        "description": "A powerful plasma weapon that fires one blast at a time, each blast exploding on impact. Must be charged to fire. Warning: do not overcharge.",
        "tag": "Warbonds"
      },
      {
        "id": "a-las-98-laser-sentry",
        "name": "A/LAS-98 Laser Sentry",
        "icon": "120px-A_LAS-98_Laser_Sentry_Stratagem_Icon.png",
        "code": [
          "down",
          "up",
          "right",
          "down",
          "up",
          "right"
        ],
        "cooldown": "150 sec",
        "unlock": "medals 85",
        "description": "A turret firing powerful and precise laser beams. Warning: overloading heat sink may cause adverse effects.",
        "tag": "Warbonds"
      },
      {
        "id": "lift-182-warp-pack",
        "name": "LIFT-182 Warp Pack",
        "icon": "LIFT-182_Warp_Pack_Stratagem_Icon.png",
        "code": [
          "down",
          "left",
          "right",
          "down",
          "left",
          "right"
        ],
        "cooldown": "480 sec",
        "unlock": "Medals 110",
        "description": "A Dark Fluid-powered backpack that generates a portable micro-wormhole. This safe and well-understood technology allows the wearer to warp short distances. Warning: do not use while pack is overloaded.",
        "tag": "Warbonds"
      },
      {
        "id": "s-11-speargun",
        "name": "S-11 Speargun",
        "icon": "120px-S-11_Speargun_Stratagem_Icon.png",
        "code": [
          "down",
          "right",
          "down",
          "left",
          "up",
          "right"
        ],
        "cooldown": "480 sec",
        "unlock": "Medals 85",
        "description": "A speargun firing heavy-duty projectiles. These projectiles release a cloud of gas on impact, and must be carefully loaded one at a time.",
        "tag": "Warbonds"
      },
      {
        "id": "eat-700-expendable-napalm",
        "name": "EAT-700 Expendable Napalm",
        "icon": "120px-EAT-700_Expendable_Napalm_Stratagem_Icon.png",
        "code": [
          "down",
          "down",
          "left",
          "up",
          "left"
        ],
        "cooldown": "140 sec",
        "unlock": "Medals 85",
        "description": "A single-use weapon that fires a missile containing napalm cluster bombs that release upon impact.",
        "tag": "Warbonds"
      },
      {
        "id": "ms-11-solo-silo",
        "name": "MS-11 Solo Silo",
        "icon": "120px-MS-11_Stratagem_Icon.png",
        "code": [
          "down",
          "up",
          "right",
          "down",
          "down"
        ],
        "cooldown": "180 sec",
        "unlock": "Medals 110",
        "description": "A silo that fit one single, powerful missile. Comes with a handheld targeting remote.",
        "tag": "Warbonds"
      },
      {
        "id": "m-1000-maxigun",
        "name": "M-1000 Maxigun",
        "icon": "M-1000_Maxigun_Stratagem_Icon.png",
        "code": [
          "down",
          "left",
          "right",
          "down",
          "up",
          "up"
        ],
        "cooldown": "480 sec",
        "unlock": "Medals 110",
        "description": "A belt-fed minigun with an exceptional ammo capacity. Cannot be reloaded with standard non-belted munitions.",
        "tag": "Warbonds"
      },
      {
        "id": "cqc-9-defoliation-tool",
        "name": "CQC-9 Defoliation Tool",
        "icon": "CQC-9_Defoliation_Tool_Stratagem_Icon.png",
        "code": [
          "down",
          "left",
          "right",
          "right",
          "down"
        ],
        "cooldown": "480 sec",
        "unlock": "Medals 85",
        "description": "A useful field-clearing tool for removing trees, obstacles, and unlucky foes.",
        "tag": "Warbonds"
      },
      {
        "id": "ax-flam-75-guard-dog-hot-dog",
        "name": "AX/FLAM-75 \"Guard Dog\" Hot Dog",
        "icon": "AX_FLAM-75_“Guard_Dog”_Hot_Dog_Stratagem_Icon.png",
        "code": [
          "down",
          "up",
          "left",
          "up",
          "left",
          "left"
        ],
        "cooldown": "480 sec",
        "unlock": "Medals 75",
        "description": "An autonomous drone equipped with a flamethrower. Returns to pack to refill fuel canisters.",
        "tag": "Warbonds"
      },
      {
        "id": "b-md-c4-pack",
        "name": "B/MD C4 Pack",
        "icon": "120px-B-MD_C4_Pack_Stratagem_Icon.png",
        "code": [
          "down",
          "right",
          "up",
          "up",
          "right",
          "up"
        ],
        "cooldown": "480 sec",
        "unlock": "Medals 110",
        "description": "A backpack with six adhesive C4 charges and a wireless detonator set up for either individual or simultaneous detonation.",
        "tag": "Warbonds"
      }
    ]
  },
  {
    "name": "Mission Stratagems",
    "items": [
      {
        "id": "reinforce",
        "name": "Reinforce",
        "icon": "120px-Reinforce_Stratagem_Icon.png",
        "code": [
          "up",
          "down",
          "right",
          "left",
          "up"
        ],
        "cooldown": "-",
        "unlock": "Common",
        "description": "Used to call in a Helldiver if they have perished.",
        "tag": "Mission Stratagems"
      },
      {
        "id": "sos-beacon",
        "name": "SoS Beacon",
        "icon": "120px-SOS_Beacon_Stratagem_Icon.png",
        "code": [
          "up",
          "down",
          "right",
          "up"
        ],
        "cooldown": "-",
        "unlock": "Common",
        "description": "Used to get priority on the mission select screen to increase the chances of Helldivers joining and sets the lobby's visibility to public for the rest of the dive. Only usable by the host if there are 3 or less Helldivers present in the dive.",
        "tag": "Mission Stratagems"
      },
      {
        "id": "resupply",
        "name": "Resupply",
        "icon": "120px-Resupply_Stratagem_Icon.png",
        "code": [
          "down",
          "down",
          "up",
          "right"
        ],
        "cooldown": "-",
        "unlock": "Common",
        "description": "Used to call in a Resupply.",
        "tag": "Mission Stratagems"
      },
      {
        "id": "eagle-rearm",
        "name": "Eagle Rearm",
        "icon": "120px-Eagle_Rearm_Stratagem_Icon.png",
        "code": [
          "up",
          "up",
          "left",
          "up",
          "right"
        ],
        "cooldown": "-",
        "unlock": "Common",
        "description": "Used to send Eagle 1 back to the Super Destroyer Ship to resupply. Disabled if Eagle 1 has no expended any payloads or if no eagle stratagems were selected",
        "tag": "Mission Stratagems"
      },
      {
        "id": "sssd-delivery",
        "name": "SSSD Delivery",
        "icon": "Start_Upload_Stratagem_Icon.png",
        "code": [
          "down",
          "down",
          "down",
          "up",
          "up"
        ],
        "cooldown": "-",
        "unlock": "Objectives",
        "description": "Used to deliver the SSSD Hard Drive.",
        "tag": "Mission Stratagems"
      },
      {
        "id": "prospecting-drill",
        "name": "Prospecting Drill",
        "icon": "120px-Prospecting_Drill_Stratagem_Icon.png",
        "code": [
          "down",
          "down",
          "left",
          "right",
          "down",
          "down"
        ],
        "cooldown": "-",
        "unlock": "Objectives",
        "description": "Used to start the Main Objective of the Conduct Geological Survey Mission.",
        "tag": "Mission Stratagems"
      },
      {
        "id": "super-earth-flag",
        "name": "Super Earth Flag",
        "icon": "120px-Super_Earth_Flag_Stratagem_Icon.png",
        "code": [
          "down",
          "up",
          "down",
          "up"
        ],
        "cooldown": "-",
        "unlock": "Objectives",
        "description": "Used to start the Main Objective: Raise Super Earth Flag Mission.",
        "tag": "Mission Stratagems"
      },
      {
        "id": "hellbomb",
        "name": "Hellbomb",
        "icon": "120px-Hellbomb_Stratagem_Icon.png",
        "code": [
          "down",
          "up",
          "left",
          "down",
          "up",
          "right",
          "down",
          "up"
        ],
        "cooldown": "-",
        "unlock": "Objectives",
        "description": "Used to call in a Hellbomb.",
        "tag": "Mission Stratagems"
      },
      {
        "id": "upload-data",
        "name": "Upload Data",
        "icon": "Start_Upload_Stratagem_Icon.png",
        "code": [
          "left",
          "right",
          "up",
          "up",
          "up"
        ],
        "cooldown": "-",
        "unlock": "Objectives",
        "description": "Used to start the Side Objective: Upload Escape Pod Data.",
        "tag": "Mission Stratagems"
      },
      {
        "id": "seismic-probe",
        "name": "Seismic Probe",
        "icon": "120px-Seismic_Probe_Stratagem_Icon.png",
        "code": [
          "up",
          "up",
          "left",
          "right",
          "down",
          "down"
        ],
        "cooldown": "-",
        "unlock": "Objectives",
        "description": "Used to start the Side Objective: Conduct Geological Survey.",
        "tag": "Mission Stratagems"
      },
      {
        "id": "orbital-illumination-flare",
        "name": "Orbital Illumination Flare",
        "icon": "120px-Orbital_Illumination_Flare_Stratagem_Icon.png",
        "code": [
          "right",
          "right",
          "left",
          "left"
        ],
        "cooldown": "-",
        "unlock": "Objectives",
        "description": "Only found in the Stratagem Hero Game onboard the Super Destroyer.",
        "tag": "Mission Stratagems"
      },
      {
        "id": "seaf-artillery",
        "name": "SEAF Artillery",
        "icon": "120px-SEAF_Artillery_Stratagem_Icon.png",
        "code": [
          "right",
          "up",
          "up",
          "down"
        ],
        "cooldown": "-",
        "unlock": "Objectives",
        "description": "Unlocked after completing the SEAF Artillery Side Objective. Used to call in an Artillery Strike. Damage and Effect of the strike depends on which Shells were loaded during the Side Objective.",
        "tag": "Mission Stratagems"
      },
      {
        "id": "dark-fluid-vessel",
        "name": "Dark Fluid Vessel",
        "icon": "120px-Dark_Fluid_Vessel_Stratagem_Icon.png",
        "code": [
          "up",
          "left",
          "right",
          "down",
          "up",
          "up"
        ],
        "cooldown": "-",
        "unlock": "Objectives",
        "description": "Event-exclusive stratagem for the Deploy Dark Fluid mission. Deploys a backpack full of Dark Fluid that acts as a more powerful Jump Pack when worn. Must be inserted into the Tectonic Drill.",
        "tag": "Mission Stratagems"
      },
      {
        "id": "tectonic-drill",
        "name": "Tectonic Drill",
        "icon": "120px-Prospecting_Drill_Stratagem_Icon.png",
        "code": [
          "up",
          "down",
          "up",
          "down",
          "up",
          "down"
        ],
        "cooldown": "-",
        "unlock": "Objectives",
        "description": "Event-exclusive stratagem for the Deploy Dark Fluid mission. Deploys a drill to the surface which must be loaded with a Dark Fluid Vessel and then defended.",
        "tag": "Mission Stratagems"
      },
      {
        "id": "hive-breaker-drill",
        "name": "Hive Breaker Drill",
        "icon": "120px-Prospecting_Drill_Stratagem_Icon.png",
        "code": [
          "left",
          "up",
          "down",
          "right",
          "down",
          "down"
        ],
        "cooldown": "-",
        "unlock": "Objectives",
        "description": "Used to start the Main Objective of the Nuke Nursery Mission.",
        "tag": "Mission Stratagems"
      },
      {
        "id": "cargo-container",
        "name": "Cargo Container",
        "icon": "Cargo_Container_Stratagem_Icon.png",
        "code": [
          "up",
          "up",
          "down",
          "down",
          "right",
          "down"
        ],
        "cooldown": "-",
        "unlock": "Objectives",
        "description": "Used to contain Fusion Batteries and High-Grade Platinum in the Confiscate Assets and Rapid Acquisition Missions.",
        "tag": "Mission Stratagems"
      }
    ]
  }
];

const flattenStratagems = (sections) =>
  sections.flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      section: section.name,
    }))
  );

export { stratagemSections, flattenStratagems };

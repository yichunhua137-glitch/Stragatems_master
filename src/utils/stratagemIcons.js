const STRATAGEM_ICON_ALIAS_MAP = {
  '120px-a_flam-40_flame_sentry_stratagem_icon': 'Flame_Sentry_Stratagem_Icon.svg',
  '120px-a_las-98_laser_sentry_stratagem_icon': 'Laser_Sentry_Stratagem_Icon.svg',
  '120px-am-23_ems_mortar_sentry_stratagem_icon': 'EMS_Mortar_Sentry_Stratagem_Icon.svg',
  '120px-b-md_c4_pack_stratagem_icon': 'C4_Pack_Stratagem_Icon.svg',
  '120px-cqc-1_one_true_flag_stratagem_icon': 'One_True_Flag_Stratagem_Icon.svg',
  '120px-e_at-12_anti-tank_emplacement_stratagem_icon':
    'Anti-Tank_Emplacement_Stratagem_Icon.svg',
  '120px-eat-700_expendable_napalm_stratagem_icon':
    'Expendable_Napalm_Stratagem_Icon.svg',
  '120px-exo-45_patriot_exosuit_stratagem_icon': 'Patriot_Exosuit_Stratagem_Icon.svg',
  '120px-exo-49_emancipator_exosuit_stratagem_icon':
    'Emancipator_Exosuit_Stratagem_Icon.svg',
  '120px-gas_minefield_stratagem_icon': 'Gas_Mines_Stratagem_Icon.svg',
  '120px-gl-21_grenadier_battlement_stratagem_icon':
    'Grenadier_Battlement_Stratagem_Icon.svg',
  '120px-guard_dog_dog_breath_stratagem_icon': 'Dog_Breath_Stratagem_Icon.svg',
  '120px-guard_dog_rover_stratagem_icon': 'Rover_Stratagem_Icon.svg',
  '120px-md-17_anti-tank_mines_stratagem_icon': 'Anti-Tank_Mines_Stratagem_Icon.svg',
  '120px-m-102_fast_recon_vehicle_stratagem_icon':
    'Fast_Recon_Vehicle_Stratagem_Icon.svg',
  '120px-ms-11_stratagem_icon': 'Solo_Silo_Stratagem_Icon.svg',
  '120px-rl-77_airburst_rocket_launcher_stratagem_icon':
    'Airburst_Rocket_Launcher_Stratagem_Icon.svg',
  '120px-s-11_speargun_stratagem_icon': 'Speargun_Stratagem_Icon.svg',
  '120px-sh-51_directional_shield_stratagem_icon':
    'Directional_Shield_Stratagem_Icon.svg',
  '120px-sta-x3_w': 'W.A.S.P._Launcher_Stratagem_Icon.svg',
  'ax_arc-3__guard_dog__k-9_stratagem_icon': 'K-9_Stratagem_Icon.svg',
  'ax_flam-75__guard_dog__hot_dog_stratagem_icon': 'Hot_Dog_Stratagem_Icon.svg',
  'ax_flam-75_guard_dog_hot_dog_stratagem_icon': 'Hot_Dog_Stratagem_Icon.svg',
  'cqc-9_defoliation_tool_stratagem_icon': 'Defoliation_Tool_Stratagem_Icon.svg',
  'gl-52_de-escalator_stratagem_icon': 'De-Escalator_Stratagem_Icon.svg',
  'lift-182_warp_pack_stratagem_icon': 'Warp_Pack_Stratagem_Icon.svg',
  'm-1000_maxigun_stratagem_icon': 'Maxigun_Stratagem_Icon.svg',
  'plas-45_epoch_stratagem_icon': 'Epoch_Stratagem_Icon.svg',
};

const normalizeIconKey = (iconName) =>
  String(iconName || '')
    .trim()
    .replace(/[“”]/g, '_')
    .replace(/\.(png|webp|svg)$/i, '')
    .replace(/\s+/g, '_')
    .toLowerCase();

export function resolveStratagemIcon(iconName) {
  if (!iconName) return null;

  if (/\.svg$/i.test(iconName)) {
    return iconName;
  }

  const normalized = normalizeIconKey(iconName);
  const aliased = STRATAGEM_ICON_ALIAS_MAP[normalized];
  if (aliased) {
    return aliased;
  }

  return iconName
    .replace(/^120px-/i, '')
    .replace(/\.(png|webp)$/i, '.svg');
}

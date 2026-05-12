import { useCallback, useMemo } from 'react';
import { resolveStratagemIcon } from '../utils/stratagemIcons';

const useAssetUrls = () => {
  const splashLogoUrl = `${process.env.PUBLIC_URL}/Helldiver_welcom_logo.png`;
  const stratagemLogoBase = `${process.env.PUBLIC_URL}/stratagems logo`;
  const weaponLogoBase = `${process.env.PUBLIC_URL}/weapons`;
  const apLogoBase = `${process.env.PUBLIC_URL}/APs`;

  const getStratagemLogo = useCallback(
    (iconName) => {
      if (!iconName) return null;
      return `${stratagemLogoBase}/${encodeURIComponent(
        resolveStratagemIcon(iconName)
      )}`;
    },
    [stratagemLogoBase]
  );

  const apIconMap = useMemo(
    () => ({
      2: 'Armor_AP2_Icon.webp',
      3: 'Armor_AP3_Icon.png',
      4: 'Armor_AP4_Icon.webp',
      5: 'Armor_AP5_Icon.webp',
      6: 'Armor_AP6_Icon.webp',
      7: 'Armor_AP7_Icon.webp',
    }),
    []
  );

  const weaponImageOverrides = useMemo(
    () => ({
      'TED-63_Dynamite_Throwable_Render.png':
        'TED-63_Dynamite_Throwable_Render.webp',
      'G-6_Frag_Throwable_Render.png': 'G-6_Frag_Throwable_Render.webp',
      'G-12_High_Explosive_Throwable_Render.png':
        'G-12_High_Explosive_Throwable_Render.webp',
      'G-10_Incendiary_Throwable_Render.png':
        'G-10_Incendiary_Throwable_Render.webp',
      'G-7_Pineapple_Throwable_Render.png':
        'G-7_Pineapple_Throwable_Render.webp',
      'G-16_Impact_Throwable_Render.png': 'G-16_Impact_Throwable_Render.webp',
      'G-13_Incendiary_Impact_Throwable_Render.png':
        'G-13_Incendiary_Impact_Throwable_Render.webp',
      'G-23_Stun_Throwable_Render.png': 'G-23_Stun_Throwable_Render.webp',
      'G-4_Gas_Throwable_Render.png': 'G-4_Gas_Throwable_Render.webp',
      'G-50_Seeker_Throwable_Render.png': 'G-50_Seeker_Throwable_Render.webp',
      'G-3_Smoke_Throwable_Render.png': 'G-3_Smoke_Throwable_Render.webp',
      'G-123_Thermite_Throwable_Render.png':
        'G-123_Thermite_Throwable_Render.webp',
      'K-2_Throwing_Knife_Throwable_Render.png':
        'K-2_Throwing_Knife_Throwable_Render.webp',
      'G-142_Pyrotech_Throwable_Render.png':
        'G-142_Pyrotech_Throwable_Render.webp',
      'G-109_Urchin_Throwable_Render.png': 'G-109_Urchin_Throwable_Render.webp',
      'G-31_ARC_Throwable_Render.png': 'G-31_ARC_Throwable_Render.webp',
      'TM-1_Lure_Mine_Throwable_Render.png':
        'TM-1_Lure_Mine_Throwable_Render.webp',
      'G-89_Smokescreen_Throwable_Render.png':
        'G-89_Smokescreen_Throwable_Render.webp',
      'RL-77_Airburst_Rocket_Launcher_Support_Render.png':
        'RL-77_Airburst_Rocket_Launcher_Support_Render.webp',
      'StA-X3_W.A.S.P._Launcher_Support_Render.png': 'StA-X3_W.png',
      'Entrenchment_Tool_Support_Render.png':
        'Entrenchment_Tool_Support_Render.webp',
      'CQC-1_One_True_Flag_Support_Render.png':
        'CQC-1_One_True_Flag_Support_Render.webp',
    }),
    []
  );

  const getWeaponImage = useCallback(
    (filename) => {
      if (!filename) return null;
      const normalized = filename.replace(/\s+/g, '_');
      const resolved = weaponImageOverrides[normalized] || normalized;
      return `${weaponLogoBase}/${encodeURIComponent(resolved)}`;
    },
    [weaponLogoBase, weaponImageOverrides]
  );

  const getApIcon = useCallback(
    (value) => {
      const numeric = Number.parseInt(value, 10);
      if (!Number.isFinite(numeric)) return null;
      const filename = apIconMap[numeric];
      return filename ? `${apLogoBase}/${filename}` : null;
    },
    [apIconMap, apLogoBase]
  );

  return {
    getApIcon,
    getStratagemLogo,
    getWeaponImage,
    splashLogoUrl,
  };
};

export default useAssetUrls;

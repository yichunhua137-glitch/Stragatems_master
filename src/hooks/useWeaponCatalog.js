import { useMemo } from 'react';
import weaponJson from '../weapon.json';

const useWeaponCatalog = ({ weaponCategory, weaponQuery, weaponSlot }) => {
  const weaponData = weaponJson;

  const weaponSlots = useMemo(() => {
    const unique = new Set(weaponData.weapons.map((item) => item.slot));
    return Array.from(unique).sort();
  }, [weaponData.weapons]);

  const weaponCategories = useMemo(() => {
    const unique = new Set(
      weaponData.weapons
        .filter((item) => weaponSlot === 'all' || item.slot === weaponSlot)
        .map((item) => item.category)
    );
    return Array.from(unique).sort();
  }, [weaponData.weapons, weaponSlot]);

  const weaponResults = useMemo(() => {
    const query = weaponQuery.trim().toLowerCase();
    return weaponData.weapons.filter((item) => {
      if (weaponSlot !== 'all' && item.slot !== weaponSlot) return false;
      if (weaponCategory !== 'all' && item.category !== weaponCategory)
        return false;
      if (!query) return true;
      return (
        item.name.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query)
      );
    });
  }, [weaponCategory, weaponData.weapons, weaponQuery, weaponSlot]);

  const primaryWeapons = useMemo(
    () =>
      weaponData.weapons.filter((item) => {
        const image = item.image || '';
        const isPrimaryRender = image.includes('Primary Render');
        const isSidearmType =
          item.category === 'Pistol' || item.category === 'Melee';
        return isPrimaryRender && !isSidearmType;
      }),
    [weaponData.weapons]
  );

  const secondaryWeapons = useMemo(
    () =>
      weaponData.weapons.filter((item) => {
        const image = item.image || '';
        return image.includes('Secondary Render') || item.slot === 'Secondary';
      }),
    [weaponData.weapons]
  );

  const grenadeWeapons = useMemo(
    () =>
      weaponData.weapons.filter(
        (item) => item.slot === 'Slot 4' && item.category === 'Grenade'
      ),
    [weaponData.weapons]
  );

  return {
    grenadeWeapons,
    primaryWeapons,
    secondaryWeapons,
    weaponCategories,
    weaponData,
    weaponResults,
    weaponSlots,
  };
};

export default useWeaponCatalog;

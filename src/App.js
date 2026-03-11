
import './App.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { flattenStratagems, stratagemSections } from './stratagems';
import weaponJson from './weapon.json';
import SplashScreen from './components/SplashScreen';
import TopBar from './components/TopBar';
import HoverTooltip from './components/HoverTooltip';
import SettingsDock from './components/SettingsDock';
import TrainingPage from './pages/TrainingPage';
import RandomPage from './pages/RandomPage';
import WikiPage from './pages/WikiPage';
import LoadoutPage from './pages/LoadoutPage';
import ChallengePage from './pages/ChallengePage';
import ChallengeInterferencePage from './pages/ChallengeInterferencePage';
import SignalHijackPage from './pages/SignalHijackPage';
import AnimationTestPage from './pages/AnimationTestPage';
import ShipMapPage from './pages/ShipMapPage';
import WeaponPage from './pages/WeaponPage';
import WeaponRandomPage from './pages/WeaponRandomPage';
import QuizInputPage from './pages/QuizInputPage';
import QuizLogoPage from './pages/QuizLogoPage';
import ArmorPage from './pages/ArmorPage';
import RandomArmorPage from './pages/RandomArmorPage';

// Fisher-Yates shuffle helper used across random generators.
const shufflePick = (items, count) => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(count, copy.length));
};
const RANDOM_DIRS = ['up', 'down', 'left', 'right'];

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [controlMode, setControlMode] = useState(null);
  const [showModePicker, setShowModePicker] = useState(false);
  const [page, setPage] = useState('training');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [openMenuGroup, setOpenMenuGroup] = useState(null);
  const allStratagems = useMemo(() => flattenStratagems(stratagemSections), []);
  const [selectedIds, setSelectedIds] = useState(() =>
    allStratagems.map((item) => item.id)
  );
  const [trainCount, setTrainCount] = useState(3);
  const [trainingSet, setTrainingSet] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inputSeq, setInputSeq] = useState([]);
  const [status, setStatus] = useState('Awaiting WASD input');
  const [errorFlash, setErrorFlash] = useState(false);
  const [pauseEnabled, setPauseEnabled] = useState(false);
  const [pauseMs, setPauseMs] = useState(600);
  const [endlessMode, setEndlessMode] = useState(false);
  const [trainingDone, setTrainingDone] = useState(false);
  const [keysPerSec, setKeysPerSec] = useState(0);
  const [sessionStartMs, setSessionStartMs] = useState(null);
  const keyCountRef = useRef(0);
  const [randomLength, setRandomLength] = useState(6);
  const [randomSequence, setRandomSequence] = useState([]);
  const [randomInput, setRandomInput] = useState([]);
  const [randomStatus, setRandomStatus] = useState('Awaiting WASD input');
  const [randomErrorFlash, setRandomErrorFlash] = useState(false);
  const [randomElapsed, setRandomElapsed] = useState(0);
  const randomStartRef = useRef(null);
  const [stratagemStats, setStratagemStats] = useState({});
  const activeStartRef = useRef(null);
  const [wikiQuery, setWikiQuery] = useState('');
  const [wikiSection, setWikiSection] = useState('all');
  const [loadoutCount, setLoadoutCount] = useState(4);
  const [loadoutSet, setLoadoutSet] = useState([]);
  const [challengeMode, setChallengeMode] = useState('count');
  const [challengeLevel, setChallengeLevel] = useState(1);
  const [challengeScore, setChallengeScore] = useState(0);
  const [challengeHighScore, setChallengeHighScore] = useState(0);
  const [challengeTimeLeft, setChallengeTimeLeft] = useState(0);
  const [challengeSet, setChallengeSet] = useState([]);
  const [challengeActiveIndex, setChallengeActiveIndex] = useState(0);
  const [challengeInputSeq, setChallengeInputSeq] = useState([]);
  const [challengeStatus, setChallengeStatus] = useState('Awaiting WASD input');
  const [challengeErrorFlash, setChallengeErrorFlash] = useState(false);
  const [challengeCompleted, setChallengeCompleted] = useState(0);
  const [challengeFailed, setChallengeFailed] = useState(false);
  const [challengeLevelComplete, setChallengeLevelComplete] = useState(false);
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [challengeStreak, setChallengeStreak] = useState(0);
  const [challengeBestStreak, setChallengeBestStreak] = useState(0);
  const [challengeRetries, setChallengeRetries] = useState(0);
  const [challengeSessionStartMs, setChallengeSessionStartMs] = useState(null);
  const [challengeInterferenceEnabled, setChallengeInterferenceEnabled] =
    useState(false);
  const [challengeInterferenceMs, setChallengeInterferenceMs] = useState(6000);
  const [challengeInterferenceLeftMs, setChallengeInterferenceLeftMs] =
    useState(0);
  const challengeActiveStartRef = useRef(null);
  const challengeEndRef = useRef(null);
  const challengeMistakesRef = useRef(0);
  const challengeInterferenceNextRef = useRef(null);
  const [weaponData] = useState(weaponJson);
  const [weaponQuery, setWeaponQuery] = useState('');
  const [weaponSlot, setWeaponSlot] = useState('all');
  const [weaponCategory, setWeaponCategory] = useState('all');
  const [randomWeaponCount, setRandomWeaponCount] = useState(1);
  const [randomWeaponSet, setRandomWeaponSet] = useState({
    primary: [],
    secondary: [],
    grenade: [],
  });
  const [keyBindings, setKeyBindings] = useState({
    up: 'w',
    left: 'a',
    down: 's',
    right: 'd',
  });
  const [bindingTarget, setBindingTarget] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const touchStartRef = useRef(null);
  const [showRotateHint, setShowRotateHint] = useState(false);
  const [isTouchGameplayPage, setIsTouchGameplayPage] = useState(false);
  const [trainingMobileStep, setTrainingMobileStep] = useState('play');
  const isChallengeRoute =
    page === 'challenge' || page === 'challenge-interference';
  const isInterferenceRoute = page === 'challenge-interference';
  const isTrainingMobileSetup =
    page === 'training' && isTouchGameplayPage && trainingMobileStep === 'setup';
  const isTrainingMobilePlay =
    page === 'training' && isTouchGameplayPage && trainingMobileStep === 'play';
  const splashLogoUrl = `${process.env.PUBLIC_URL}/Helldiver_welcom_logo.png`;
  const stratagemLogoBase = `${process.env.PUBLIC_URL}/stratagems logo`;
  const weaponLogoBase = `${process.env.PUBLIC_URL}/weapons`;
  const apLogoBase = `${process.env.PUBLIC_URL}/APs`;

  const availableStratagems = useMemo(
    () => allStratagems.filter((item) => selectedIds.includes(item.id)),
    [allStratagems, selectedIds]
  );
  const wikiSections = useMemo(
    () => stratagemSections.map((section) => section.name),
    []
  );
  const wikiResults = useMemo(() => {
    const query = wikiQuery.trim().toLowerCase();
    return allStratagems.filter((item) => {
      if (wikiSection !== 'all' && item.section !== wikiSection) return false;
      if (!query) return true;
      return (
        item.name.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query)
      );
    });
  }, [allStratagems, wikiQuery, wikiSection]);
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
  }, [weaponData.weapons, weaponQuery, weaponSlot, weaponCategory]);
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

  const activeStratagem = trainingSet[activeIndex];
  const keyToDir = useMemo(() => {
    const mapping = {};
    Object.entries(keyBindings).forEach(([dir, key]) => {
      if (key) mapping[key.toLowerCase()] = dir;
    });
    return mapping;
  }, [keyBindings]);

  const getStratagemLogo = useCallback(
    (iconName) => {
      if (!iconName) return null;
      return `${stratagemLogoBase}/${encodeURIComponent(iconName)}`;
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
    [apLogoBase, apIconMap]
  );

  const rollRandomWeapons = useCallback(() => {
    const pickSet = (list) => {
      const count = Math.max(1, Math.min(5, randomWeaponCount));
      if (!list.length) return [];
      if (list.length === 1) {
        return Array.from({ length: count }, () => list[0]);
      }
      if (count > list.length) {
        return Array.from({ length: count }, () => {
          const pick = list[Math.floor(Math.random() * list.length)];
          return pick;
        });
      }
      return shufflePick(list, count);
    };
    setRandomWeaponSet({
      primary: pickSet(primaryWeapons),
      secondary: pickSet(secondaryWeapons),
      grenade: pickSet(grenadeWeapons),
    });
  }, [primaryWeapons, secondaryWeapons, grenadeWeapons, randomWeaponCount]);

  const getChallengeTargetCount = useCallback(
    (level) => Math.min(10, Math.max(4, 3 + level)),
    []
  );

  const getChallengeDurationMs = useCallback((mode, level) => {
    if (mode === 'timed') {
      return 60000 + Math.max(0, level - 1) * 15000;
    }
    return 45000 + Math.max(0, level - 1) * 8000;
  }, []);

  const requestLandscapeLock = useCallback(async () => {
    if (!isTouchGameplayPage) return;
    if (!window.screen?.orientation?.lock) return;
    try {
      await window.screen.orientation.lock('landscape');
    } catch (error) {
      // Ignore lock failures and keep using rotate hint + input lock fallback.
    }
  }, [isTouchGameplayPage]);

  const beginChallengeRun = useCallback(
    (overrideLevel = challengeLevel, overrideMode = challengeMode) => {
      requestLandscapeLock();
      const durationMs = getChallengeDurationMs(overrideMode, overrideLevel);
      challengeEndRef.current = Date.now() + durationMs;
      if (isInterferenceRoute) {
        challengeInterferenceNextRef.current = Date.now() + challengeInterferenceMs;
        setChallengeInterferenceLeftMs(challengeInterferenceMs);
      } else {
        challengeInterferenceNextRef.current = null;
        setChallengeInterferenceLeftMs(0);
      }
      setChallengeTimeLeft(durationMs);
      setChallengeStarted(true);
      setChallengeStatus('Awaiting WASD input');
    },
    [
      challengeLevel,
      challengeMode,
      getChallengeDurationMs,
      isInterferenceRoute,
      challengeInterferenceMs,
      requestLandscapeLock,
    ]
  );
  const refreshTrainingSet = useCallback(() => {
    const pool = availableStratagems.length ? availableStratagems : allStratagems;
    let next = [];
    const targetCount = trainCount || 1;
    if (pool.length === 1) {
      next = Array.from({ length: targetCount }, () => pool[0]);
    } else if (targetCount > pool.length) {
      next = Array.from({ length: targetCount }, () => {
        const pick = pool[Math.floor(Math.random() * pool.length)];
        return pick;
      });
    } else {
      next = shufflePick(pool, targetCount);
    }
    setTrainingSet(next);
    setActiveIndex(0);
    setInputSeq([]);
    setStatus('Awaiting WASD input');
    setTrainingDone(false);
    setSessionStartMs(null);
    setKeysPerSec(0);
    keyCountRef.current = 0;
  }, [availableStratagems, trainCount, allStratagems]);

  const refreshRandomSequence = useCallback(() => {
    const dirs = ['up', 'down', 'left', 'right'];
    const next = Array.from({ length: Math.max(1, randomLength) }, () =>
      dirs[Math.floor(Math.random() * dirs.length)]
    );
    setRandomSequence(next);
    setRandomInput([]);
    setRandomStatus('Awaiting WASD input');
    setRandomErrorFlash(false);
    randomStartRef.current = Date.now();
    setRandomElapsed(0);
  }, [randomLength]);

  const refreshLoadoutSet = useCallback(() => {
    const basePool = availableStratagems.length ? availableStratagems : allStratagems;
    const pool = basePool.filter((item) => item.section !== 'Mission Stratagems');
    const targetCount = Math.min(10, Math.max(4, loadoutCount || 4));
    let next = [];
    if (!pool.length) {
      next = [];
    } else if (pool.length === 1) {
      next = Array.from({ length: targetCount }, () => pool[0]);
    } else if (targetCount > pool.length) {
      next = Array.from({ length: targetCount }, () => {
        const pick = pool[Math.floor(Math.random() * pool.length)];
        return pick;
      });
    } else {
      next = shufflePick(pool, targetCount);
    }
    setLoadoutSet(next);
  }, [availableStratagems, allStratagems, loadoutCount]);

  const startChallengeLevel = useCallback(
    (overrideLevel = challengeLevel, overrideMode = challengeMode) => {
      const pool = availableStratagems.length ? availableStratagems : allStratagems;
      const targetCount = getChallengeTargetCount(overrideLevel);
      const durationMs = getChallengeDurationMs(overrideMode, overrideLevel);
      const nextSet =
        overrideMode === 'count'
          ? pool.length
            ? shufflePick(pool, targetCount)
            : []
          : pool.length
          ? [pool[Math.floor(Math.random() * pool.length)]]
          : [];
      setChallengeSet(nextSet);
      setChallengeActiveIndex(0);
      setChallengeInputSeq([]);
      setChallengeStatus('Awaiting WASD input');
      setChallengeErrorFlash(false);
      setChallengeCompleted(0);
      setChallengeFailed(false);
      setChallengeLevelComplete(false);
      setChallengeStarted(false);
      setChallengeStreak(0);
      setChallengeBestStreak(0);
      setChallengeSessionStartMs(null);
      challengeActiveStartRef.current = null;
      challengeMistakesRef.current = 0;
      challengeEndRef.current = null;
      challengeInterferenceNextRef.current = null;
      setChallengeInterferenceLeftMs(0);
      setChallengeTimeLeft(durationMs);
    },
    [
      availableStratagems,
      allStratagems,
      challengeLevel,
      challengeMode,
      getChallengeDurationMs,
      getChallengeTargetCount,
    ]
  );

  const scrambleChallengeCodes = useCallback(() => {
    setChallengeSet((prev) =>
      prev.map((item) => ({
        ...item,
        code: item.code.map(
          () => RANDOM_DIRS[Math.floor(Math.random() * RANDOM_DIRS.length)]
        ),
      }))
    );
    setChallengeInputSeq([]);
    challengeActiveStartRef.current = null;
    setChallengeStatus('Interference detected! Code shifted, restart command.');
  }, []);

  useEffect(() => {
    setChallengeHighScore((prev) => Math.max(prev, challengeScore));
  }, [challengeScore]);

  useEffect(() => {
    refreshTrainingSet();
  }, [refreshTrainingSet]);

  useEffect(() => {
    if (page === 'random') {
      refreshRandomSequence();
    }
  }, [page, refreshRandomSequence]);

  useEffect(() => {
    if (page === 'weapon-random') {
      rollRandomWeapons();
    }
  }, [page, rollRandomWeapons]);

  useEffect(() => {
    if (isInterferenceRoute) {
      setChallengeInterferenceEnabled(true);
    } else {
      setChallengeInterferenceEnabled(false);
    }
  }, [isInterferenceRoute]);

  useEffect(() => {
    if (page === 'loadout') {
      refreshLoadoutSet();
    }
  }, [page, refreshLoadoutSet]);

  useEffect(() => {
    if (isChallengeRoute) {
      setChallengeRetries(0);
      if (isInterferenceRoute) {
        setChallengeMode('count');
        startChallengeLevel(challengeLevel, 'count');
      } else {
        startChallengeLevel();
      }
    }
  }, [isChallengeRoute, isInterferenceRoute, startChallengeLevel, challengeLevel]);

  useEffect(() => {
    if (!isChallengeRoute || challengeFailed || challengeLevelComplete) return;
    if (!challengeStarted || !challengeEndRef.current) return;
    const timer = setInterval(() => {
      const remaining = Math.max(0, challengeEndRef.current - Date.now());
      setChallengeTimeLeft(remaining);
      if (remaining <= 0) {
        setChallengeFailed(true);
        setChallengeStatus('Time is up! Retry required.');
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [isChallengeRoute, challengeFailed, challengeLevelComplete, challengeStarted]);

  useEffect(() => {
    if (!isInterferenceRoute) return undefined;
    if (!challengeInterferenceEnabled || !challengeStarted) {
      challengeInterferenceNextRef.current = null;
      setChallengeInterferenceLeftMs(0);
      return undefined;
    }
    if (challengeFailed || challengeLevelComplete || !challengeSet.length) {
      challengeInterferenceNextRef.current = null;
      setChallengeInterferenceLeftMs(0);
      return undefined;
    }
    if (!challengeInterferenceNextRef.current) {
      challengeInterferenceNextRef.current = Date.now() + challengeInterferenceMs;
    }
    const timer = setInterval(() => {
      if (!challengeInterferenceNextRef.current) return;
      const remaining = challengeInterferenceNextRef.current - Date.now();
      if (remaining <= 0) {
        scrambleChallengeCodes();
        challengeInterferenceNextRef.current = Date.now() + challengeInterferenceMs;
        setChallengeInterferenceLeftMs(challengeInterferenceMs);
        return;
      }
      setChallengeInterferenceLeftMs(remaining);
    }, 100);
    return () => clearInterval(timer);
  }, [
    isInterferenceRoute,
    challengeInterferenceEnabled,
    challengeStarted,
    challengeFailed,
    challengeLevelComplete,
    challengeSet.length,
    challengeInterferenceMs,
    scrambleChallengeCodes,
  ]);

  useEffect(() => {
    if (page !== 'random' || !randomStartRef.current) return undefined;
    const timer = setInterval(() => {
      setRandomElapsed(Date.now() - randomStartRef.current);
    }, 100);
    return () => clearInterval(timer);
  }, [page, controlMode]);

  useEffect(() => {
    if (!activeStratagem || trainingDone) {
      activeStartRef.current = null;
      return;
    }
    activeStartRef.current = null;
  }, [activeStratagem, trainingDone]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSection = (section) => {
    const sectionIds = section.items.map((item) => item.id);
    const allSelected = sectionIds.every((id) => selectedIds.includes(id));
    setSelectedIds((prev) => {
      if (allSelected) {
        return prev.filter((id) => !sectionIds.includes(id));
      }
      const next = new Set(prev);
      sectionIds.forEach((id) => next.add(id));
      return Array.from(next);
    });
  };

  const toggleAllSelections = useCallback(() => {
    setSelectedIds((prev) => {
      if (prev.length === allStratagems.length) return [];
      return allStratagems.map((item) => item.id);
    });
  }, [allStratagems]);

  const handleKey = useCallback(
    (event) => {
      if (showSplash) return;
      if (showModePicker) return;
      const tag = event.target?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      const pressedKey = event.key?.toLowerCase();
      const wasdPages = new Set([
        'training',
        'random',
        'challenge',
        'challenge-interference',
        'quiz-input',
      ]);
      if (showRotateHint && wasdPages.has(page)) {
        event.preventDefault();
        return;
      }
      if (isTrainingMobileSetup && page === 'training') {
        event.preventDefault();
        return;
      }
      if (page === 'training' && (pressedKey === ' ' || pressedKey === 'enter')) {
        event.preventDefault();
        refreshTrainingSet();
        return;
      }
      if (page === 'random' && (pressedKey === ' ' || pressedKey === 'enter')) {
        event.preventDefault();
        refreshRandomSequence();
        return;
      }
      if (page === 'loadout' && (pressedKey === ' ' || pressedKey === 'enter')) {
        event.preventDefault();
        refreshLoadoutSet();
        return;
      }
      if (
        (page === 'challenge' || page === 'challenge-interference') &&
        (pressedKey === ' ' || pressedKey === 'enter')
      ) {
        event.preventDefault();
        if (!challengeStarted) {
          beginChallengeRun();
        }
        return;
      }
      if (trainingDone && page === 'training') return;
      if (settingsOpen && bindingTarget) {
        event.preventDefault();
        if (!pressedKey || pressedKey.length > 1) return;
        setKeyBindings((prev) => {
          const next = { ...prev };
          Object.keys(next).forEach((dir) => {
            if (next[dir] === pressedKey) {
              next[dir] = '';
            }
          });
          next[bindingTarget] = pressedKey;
          return next;
        });
        setBindingTarget(null);
        return;
      }
      if (
        page !== 'training' &&
        page !== 'random' &&
        page !== 'challenge' &&
        page !== 'challenge-interference'
      )
        return;
      const dir = keyToDir[pressedKey];
      if (!dir) return;
      event.preventDefault();
      if (page === 'training') {
        if (!activeStratagem) return;
        if (!sessionStartMs) {
          setSessionStartMs(Date.now());
        }
        if (!activeStartRef.current && inputSeq.length === 0) {
          activeStartRef.current = Date.now();
        }
        keyCountRef.current += 1;
        const nextInput = [...inputSeq, dir];
        const expected = activeStratagem.code;
        const isMatch = expected[nextInput.length - 1] === dir;
        if (!isMatch) {
          setStatus('Incorrect input, reset');
          setErrorFlash(true);
          setTimeout(() => setErrorFlash(false), 600);
          setInputSeq([]);
          return;
        }
        setInputSeq(nextInput);
        if (nextInput.length === expected.length) {
          setStatus('Command complete! Next item');
          const delay = pauseEnabled ? Math.max(0, pauseMs) : 0;
          setTimeout(() => {
            const endTime = Date.now();
            if (activeStratagem && activeStartRef.current) {
              const elapsed = endTime - activeStartRef.current;
              setStratagemStats((prev) => {
                const current = prev[activeStratagem.id] || {};
                const best =
                  typeof current.bestMs === 'number'
                    ? Math.min(current.bestMs, elapsed)
                    : elapsed;
                return {
                  ...prev,
                  [activeStratagem.id]: {
                    bestMs: best,
                    lastMs: elapsed,
                  },
                };
              });
            }
            setInputSeq([]);
            const isLastItem = activeIndex + 1 >= trainingSet.length;
            if (trainingSet.length && (endlessMode || !isLastItem)) {
              const pool = availableStratagems.length
                ? availableStratagems
                : allStratagems;
              const currentId = trainingSet[activeIndex]?.id;
              const candidates = pool.filter((item) => item.id !== currentId);
              const replacement =
                candidates[Math.floor(Math.random() * candidates.length)] ||
                pool[Math.floor(Math.random() * pool.length)];
              if (replacement) {
                setTrainingSet((prev) => {
                  const next = [...prev];
                  next[activeIndex] = replacement;
                  return next;
                });
              }
            }
            setActiveIndex((idx) => {
              if (idx + 1 < trainingSet.length) return idx + 1;
              return endlessMode ? 0 : idx;
            });
            if (!endlessMode && isLastItem) {
              setTrainingDone(true);
              if (sessionStartMs) {
                const durationSec = Math.max(0.001, (Date.now() - sessionStartMs) / 1000);
                setKeysPerSec(Number((keyCountRef.current / durationSec).toFixed(2)));
              }
              setStatus('Training complete');
            } else {
              setStatus('Awaiting WASD input');
            }
          }, delay);
        } else {
          setStatus('Correct input, continue');
        }
      } else if (page === 'random') {
        if (!randomSequence.length) return;
        const nextInput = [...randomInput, dir];
        const expected = randomSequence;
        const isMatch = expected[nextInput.length - 1] === dir;
        if (!isMatch) {
          setRandomStatus('Incorrect input, reset');
          setRandomErrorFlash(true);
          setTimeout(() => setRandomErrorFlash(false), 600);
          setRandomInput([]);
          return;
        }
        setRandomInput(nextInput);
        if (nextInput.length === expected.length) {
          setRandomStatus('Command complete! New sequence');
          setTimeout(() => {
            refreshRandomSequence();
          }, 200);
        } else {
          setRandomStatus('Correct input, continue');
        }
      } else if (page === 'challenge' || page === 'challenge-interference') {
        if (!challengeStarted) return;
        if (challengeFailed || challengeLevelComplete) return;
        const activeMode = page === 'challenge-interference' ? 'count' : challengeMode;
        const targetCount = getChallengeTargetCount(challengeLevel);
        const activeItem =
          activeMode === 'count'
            ? challengeSet[challengeActiveIndex]
            : challengeSet[0];
        if (!activeItem) return;
        if (!challengeSessionStartMs) {
          setChallengeSessionStartMs(Date.now());
        }
        if (!challengeActiveStartRef.current && challengeInputSeq.length === 0) {
          challengeActiveStartRef.current = Date.now();
        }
        const nextInput = [...challengeInputSeq, dir];
        const expected = activeItem.code;
        const isMatch = expected[nextInput.length - 1] === dir;
        if (!isMatch) {
          setChallengeStatus('Incorrect input, reset');
          setChallengeErrorFlash(true);
          setTimeout(() => setChallengeErrorFlash(false), 600);
          setChallengeInputSeq([]);
          challengeActiveStartRef.current = null;
          challengeMistakesRef.current += 1;
          setChallengeStreak(0);
          return;
        }
        setChallengeInputSeq(nextInput);
        if (nextInput.length === expected.length) {
          const endTime = Date.now();
          const elapsed = challengeActiveStartRef.current
            ? endTime - challengeActiveStartRef.current
            : 0;
          const flawless = challengeMistakesRef.current === 0;
          const nextStreak = flawless ? challengeStreak + 1 : 0;
          setChallengeStreak(nextStreak);
          setChallengeBestStreak((prev) => Math.max(prev, nextStreak));
          const speedScore = Math.max(0, Math.round(200 - elapsed / 10));
          const accuracyScore = Math.max(0, 80 - challengeMistakesRef.current * 20);
          const streakScore = nextStreak * 25;
          const flawlessScore = flawless ? 75 : 0;
          const earned = Math.max(
            0,
            100 + speedScore + accuracyScore + streakScore + flawlessScore
          );
          setChallengeScore((prev) => prev + earned);
          setChallengeCompleted((prev) => prev + 1);
          setChallengeStatus('Command complete!');
          setChallengeInputSeq([]);
          challengeMistakesRef.current = 0;
          challengeActiveStartRef.current = null;
          if (activeMode === 'count') {
            const isLastItem = challengeActiveIndex + 1 >= targetCount;
            if (isLastItem) {
              setChallengeLevelComplete(true);
              setChallengeStatus('Level complete!');
              return;
            }
            setChallengeActiveIndex((idx) => idx + 1);
            return;
          }
          const pool = availableStratagems.length ? availableStratagems : allStratagems;
          const replacement = pool[Math.floor(Math.random() * pool.length)] || activeItem;
          setChallengeSet([replacement]);
        } else {
          setChallengeStatus('Correct input, continue');
        }
      }
    },
    [
      activeStratagem,
      bindingTarget,
      inputSeq,
      keyToDir,
      pauseEnabled,
      pauseMs,
      endlessMode,
      trainingDone,
      page,
      refreshTrainingSet,
      settingsOpen,
      showSplash,
      showModePicker,
      trainingSet,
      availableStratagems,
      allStratagems,
      activeIndex,
      randomInput,
      randomSequence,
      refreshRandomSequence,
      refreshLoadoutSet,
      challengeFailed,
      challengeStarted,
      challengeLevelComplete,
      challengeLevel,
      challengeMode,
      challengeSet,
      challengeActiveIndex,
      challengeInputSeq,
      challengeSessionStartMs,
      challengeStreak,
      beginChallengeRun,
      getChallengeTargetCount,
      sessionStartMs,
      showRotateHint,
      isTrainingMobileSetup,
    ]
  );

  useEffect(() => {
    if (trainingDone && sessionStartMs) {
      const durationSec = Math.max(0.001, (Date.now() - sessionStartMs) / 1000);
      setKeysPerSec(Number((keyCountRef.current / durationSec).toFixed(2)));
    }
  }, [trainingDone, sessionStartMs]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (showSplash) return undefined;
    const swipeEnabledPages = new Set([
      'training',
      'random',
      'challenge',
      'challenge-interference',
      'quiz-input',
    ]);
    if (!swipeEnabledPages.has(page)) return undefined;

    const keyForDir = {
      up: (keyBindings.up || 'w').toLowerCase(),
      down: (keyBindings.down || 's').toLowerCase(),
      left: (keyBindings.left || 'a').toLowerCase(),
      right: (keyBindings.right || 'd').toLowerCase(),
    };

    const onTouchStart = (event) => {
      if (event.touches.length !== 1) return;
      const touch = event.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        t: Date.now(),
      };
    };

    const onTouchEnd = (event) => {
      if (!touchStartRef.current) return;
      if (event.changedTouches.length !== 1) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      const elapsed = Date.now() - touchStartRef.current.t;
      touchStartRef.current = null;

      const minDistance = 36;
      const maxDuration = 700;
      if (elapsed > maxDuration) return;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < minDistance) return;

      const dir =
        Math.abs(dx) > Math.abs(dy)
          ? dx > 0
            ? 'right'
            : 'left'
          : dy > 0
          ? 'down'
          : 'up';
      const key = keyForDir[dir];
      if (!key) return;
      window.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [page, keyBindings, showSplash]);

  useEffect(() => {
    const swipeEnabledPages = new Set([
      'training',
      'random',
      'challenge',
      'challenge-interference',
      'quiz-input',
    ]);
    const update = () => {
      const isMobileLike = window.innerWidth <= 980;
      const onGameplayPage =
        controlMode === 'mobile' && isMobileLike && swipeEnabledPages.has(page);
      setIsTouchGameplayPage(onGameplayPage);
      if (!onGameplayPage) {
        setShowRotateHint(false);
        return;
      }
      const isPortrait = window.innerHeight > window.innerWidth;
      setShowRotateHint(isPortrait);
    };

    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, [page, controlMode]);

  useEffect(() => {
    if (page === 'training' && controlMode === 'mobile') {
      setTrainingMobileStep('setup');
      return;
    }
    setTrainingMobileStep('play');
  }, [page, controlMode]);

  useEffect(() => {
    if (showSplash) {
      setShowModePicker(false);
      setControlMode(null);
    }
  }, [showSplash]);

  const enterTrainingMobilePlay = useCallback(async () => {
    await requestLandscapeLock();
    if (showRotateHint) return;
    refreshTrainingSet();
    setTrainingMobileStep('play');
    setSettingsOpen(false);
  }, [requestLandscapeLock, showRotateHint, refreshTrainingSet]);

  const exitTrainingMobilePlay = useCallback(() => {
    setTrainingMobileStep('setup');
  }, []);

  useEffect(() => {
    if (!isTrainingMobilePlay) {
      document.body.classList.remove('touch-play-lock');
      return undefined;
    }
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    const saved = {
      htmlOverflow: htmlEl.style.overflow,
      bodyOverflow: bodyEl.style.overflow,
      bodyPosition: bodyEl.style.position,
      bodyTop: bodyEl.style.top,
      bodyWidth: bodyEl.style.width,
      bodyHeight: bodyEl.style.height,
    };
    const scrollY = window.scrollY || 0;

    htmlEl.style.overflow = 'hidden';
    bodyEl.style.overflow = 'hidden';
    bodyEl.style.position = 'fixed';
    bodyEl.style.top = `-${scrollY}px`;
    bodyEl.style.width = '100%';
    bodyEl.style.height = '100vh';
    document.body.classList.add('touch-play-lock');
    const preventScroll = (event) => event.preventDefault();
    const preventScrollKeys = (event) => {
      const key = (event.key || '').toLowerCase();
      if (
        key === ' ' ||
        key === 'arrowup' ||
        key === 'arrowdown' ||
        key === 'pageup' ||
        key === 'pagedown' ||
        key === 'home' ||
        key === 'end'
      ) {
        event.preventDefault();
      }
    };
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('keydown', preventScrollKeys, { passive: false });
    return () => {
      document.body.classList.remove('touch-play-lock');
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('keydown', preventScrollKeys);
      htmlEl.style.overflow = saved.htmlOverflow;
      bodyEl.style.overflow = saved.bodyOverflow;
      bodyEl.style.position = saved.bodyPosition;
      bodyEl.style.top = saved.bodyTop;
      bodyEl.style.width = saved.bodyWidth;
      bodyEl.style.height = saved.bodyHeight;
      window.scrollTo(0, scrollY);
    };
  }, [isTrainingMobilePlay]);

  const startButtonHandler = () => {
    if (showModePicker) return;
    if (page === 'training') {
      if (isTrainingMobileSetup) {
        enterTrainingMobilePlay();
        return;
      }
      requestLandscapeLock();
      refreshTrainingSet();
      return;
    }
    requestLandscapeLock();
    refreshRandomSequence();
  };

  const setChallengeLevelAndStartNext = useCallback(() => {
    setChallengeLevel((prev) => {
      const next = prev + 1;
      setChallengeRetries(0);
      const mode = isInterferenceRoute ? 'count' : challengeMode;
      startChallengeLevel(next, mode);
      beginChallengeRun(next, mode);
      return next;
    });
  }, [
    challengeMode,
    isInterferenceRoute,
    beginChallengeRun,
    startChallengeLevel,
  ]);

  const handleSplashClose = () => {
    setShowSplash(false);
    setShowModePicker(true);
  };

  const handleSelectControlMode = (mode) => {
    setControlMode(mode);
    setShowModePicker(false);
    setSettingsOpen(false);
  };

  return (
    <div
      className={`app ${isTrainingMobilePlay ? 'mobile-training-play' : ''} ${
        isTrainingMobileSetup ? 'mobile-training-setup' : ''
      }`}
    >
      {showSplash && (
        <SplashScreen splashLogoUrl={splashLogoUrl} onClose={handleSplashClose} />
      )}

      {!showSplash && !isTrainingMobilePlay && (
        <>
          <TopBar
            openMenuGroup={openMenuGroup}
            page={page}
            setShowSplash={setShowSplash}
            onOpenMenu={(groupId) => setOpenMenuGroup(groupId)}
            onCloseMenu={() => setOpenMenuGroup(null)}
            onSelectPage={(nextPage) => {
              setPage(nextPage);
              setOpenMenuGroup(null);
            }}
          />
        </>
      )}

      {!showSplash && showModePicker && (
        <div className="mode-picker-overlay">
          <div className="mode-picker-card">
            <strong>Select Control Mode</strong>
            <span>Choose the mode for this session.</span>
            <div className="mode-picker-actions">
              <button
                type="button"
                className="primary"
                onClick={() => handleSelectControlMode('desktop')}
              >
                Desktop Mode
              </button>
              <button
                type="button"
                className="primary ghost"
                onClick={() => handleSelectControlMode('mobile')}
              >
                Mobile Mode
              </button>
            </div>
          </div>
        </div>
      )}

      <main>
        {showRotateHint && (
          <div className="rotate-hint">
            Swipe controls work best in landscape mode. Rotate your phone.
          </div>
        )}
        {page === 'training' && (
          <TrainingPage
            selectedIds={selectedIds}
            allStratagems={allStratagems}
            stratagemSections={stratagemSections}
            onToggleAll={toggleAllSelections}
            onToggleSection={toggleSection}
            onToggleSelect={toggleSelect}
            onHoverInfo={setHoverInfo}
            onHoverPos={setHoverPos}
            onHoverClear={() => setHoverInfo(null)}
            getStratagemLogo={getStratagemLogo}
            stratagemStats={stratagemStats}
            activeStratagem={activeStratagem}
            activeIndex={activeIndex}
            trainingSet={trainingSet}
            trainingDone={trainingDone}
            setActiveIndex={setActiveIndex}
            setInputSeq={setInputSeq}
            setStatus={setStatus}
            errorFlash={errorFlash}
            inputSeq={inputSeq}
            status={status}
            keysPerSec={keysPerSec}
            mobileGameplay={isTouchGameplayPage}
            controlsLocked={showRotateHint}
            mobileStep={isTrainingMobileSetup ? 'setup' : 'play'}
            onEnterMobilePlay={enterTrainingMobilePlay}
            onExitMobilePlay={exitTrainingMobilePlay}
            onRestartTraining={refreshTrainingSet}
          />
        )}

        {page === 'random' && (
          <RandomPage
            randomErrorFlash={randomErrorFlash}
            randomSequence={randomSequence}
            randomInput={randomInput}
            randomStatus={randomStatus}
            randomElapsed={randomElapsed}
          />
        )}

        {page === 'wiki' && (
          <WikiPage
            wikiQuery={wikiQuery}
            setWikiQuery={setWikiQuery}
            wikiSection={wikiSection}
            setWikiSection={setWikiSection}
            wikiSections={wikiSections}
            wikiResults={wikiResults}
            getStratagemLogo={getStratagemLogo}
          />
        )}

        {page === 'loadout' && (
          <LoadoutPage
            selectedIds={selectedIds}
            allStratagems={allStratagems}
            stratagemSections={stratagemSections}
            onToggleAll={toggleAllSelections}
            onToggleSection={toggleSection}
            onToggleSelect={toggleSelect}
            onHoverInfo={setHoverInfo}
            onHoverPos={setHoverPos}
            onHoverClear={() => setHoverInfo(null)}
            getStratagemLogo={getStratagemLogo}
            loadoutCount={loadoutCount}
            setLoadoutCount={setLoadoutCount}
            refreshLoadoutSet={refreshLoadoutSet}
            loadoutSet={loadoutSet}
          />
        )}

        {page === 'challenge' && (
          <ChallengePage
            selectedIds={selectedIds}
            allStratagems={allStratagems}
            stratagemSections={stratagemSections}
            onToggleAll={toggleAllSelections}
            onToggleSection={toggleSection}
            onToggleSelect={toggleSelect}
            onHoverInfo={setHoverInfo}
            onHoverPos={setHoverPos}
            onHoverClear={() => setHoverInfo(null)}
            getStratagemLogo={getStratagemLogo}
            challengeMode={challengeMode}
            setChallengeMode={setChallengeMode}
            challengeLevel={challengeLevel}
            setChallengeLevel={setChallengeLevel}
            challengeScore={challengeScore}
            challengeHighScore={challengeHighScore}
            challengeTimeLeft={challengeTimeLeft}
            challengeStreak={challengeStreak}
            challengeBestStreak={challengeBestStreak}
            challengeFailed={challengeFailed}
            setChallengeScore={setChallengeScore}
            setChallengeRetries={setChallengeRetries}
            startChallengeLevel={startChallengeLevel}
            getChallengeDurationMs={getChallengeDurationMs}
            beginChallengeRun={beginChallengeRun}
            challengeLevelComplete={challengeLevelComplete}
            challengeRetries={challengeRetries}
            getChallengeTargetCount={getChallengeTargetCount}
            challengeSet={challengeSet}
            challengeActiveIndex={challengeActiveIndex}
            challengeStarted={challengeStarted}
            challengeErrorFlash={challengeErrorFlash}
            challengeInputSeq={challengeInputSeq}
            challengeStatus={challengeStatus}
            challengeCompleted={challengeCompleted}
            setChallengeLevelAndStartNext={setChallengeLevelAndStartNext}
            mobileGameplay={isTouchGameplayPage}
            controlsLocked={showRotateHint}
          />
        )}

        {page === 'challenge-interference' && (
          <ChallengeInterferencePage
            selectedIds={selectedIds}
            allStratagems={allStratagems}
            stratagemSections={stratagemSections}
            onToggleAll={toggleAllSelections}
            onToggleSection={toggleSection}
            onToggleSelect={toggleSelect}
            onHoverInfo={setHoverInfo}
            onHoverPos={setHoverPos}
            onHoverClear={() => setHoverInfo(null)}
            getStratagemLogo={getStratagemLogo}
            challengeLevel={challengeLevel}
            setChallengeLevel={setChallengeLevel}
            challengeScore={challengeScore}
            challengeHighScore={challengeHighScore}
            challengeTimeLeft={challengeTimeLeft}
            challengeStreak={challengeStreak}
            challengeBestStreak={challengeBestStreak}
            challengeFailed={challengeFailed}
            setChallengeScore={setChallengeScore}
            setChallengeRetries={setChallengeRetries}
            startChallengeLevel={startChallengeLevel}
            beginChallengeRun={beginChallengeRun}
            challengeLevelComplete={challengeLevelComplete}
            challengeRetries={challengeRetries}
            getChallengeTargetCount={getChallengeTargetCount}
            challengeSet={challengeSet}
            challengeActiveIndex={challengeActiveIndex}
            challengeStarted={challengeStarted}
            challengeErrorFlash={challengeErrorFlash}
            challengeInputSeq={challengeInputSeq}
            challengeStatus={challengeStatus}
            challengeCompleted={challengeCompleted}
            setChallengeLevelAndStartNext={setChallengeLevelAndStartNext}
            challengeInterferenceMs={challengeInterferenceMs}
            setChallengeInterferenceMs={setChallengeInterferenceMs}
            challengeInterferenceLeftMs={challengeInterferenceLeftMs}
            mobileGameplay={isTouchGameplayPage}
            controlsLocked={showRotateHint}
          />
        )}

        {page === 'signal-hijack' && <SignalHijackPage />}
        {page === 'quiz-input' && (
          <QuizInputPage
            allStratagems={allStratagems}
            getStratagemLogo={getStratagemLogo}
            keyToDir={keyToDir}
            controlsLocked={showRotateHint}
          />
        )}
        {page === 'quiz-logo' && (
          <QuizLogoPage
            allStratagems={allStratagems}
            getStratagemLogo={getStratagemLogo}
          />
        )}
        {page === 'animation-test' && <AnimationTestPage />}
        {page === 'ship-map' && <ShipMapPage onOpenPage={setPage} />}

        {page === 'weapon' && (
          <WeaponPage
            weaponQuery={weaponQuery}
            setWeaponQuery={setWeaponQuery}
            weaponSlot={weaponSlot}
            setWeaponSlot={setWeaponSlot}
            weaponCategory={weaponCategory}
            setWeaponCategory={setWeaponCategory}
            weaponSlots={weaponSlots}
            weaponCategories={weaponCategories}
            weaponResults={weaponResults}
            getWeaponImage={getWeaponImage}
            getApIcon={getApIcon}
          />
        )}

        {page === 'weapon-random' && (
          <WeaponRandomPage
            randomWeaponCount={randomWeaponCount}
            setRandomWeaponCount={setRandomWeaponCount}
            rollRandomWeapons={rollRandomWeapons}
            randomWeaponSet={randomWeaponSet}
            getWeaponImage={getWeaponImage}
            getApIcon={getApIcon}
          />
        )}

        {page === 'armor' && <ArmorPage />}

        {page === 'armor-random' && <RandomArmorPage />}
      </main>

      <HoverTooltip hoverInfo={hoverInfo} hoverPos={hoverPos} />

      {!(page === 'training' && isTrainingMobilePlay) && (
        <SettingsDock
          page={page}
          settingsOpen={settingsOpen}
          onToggleSettings={() => setSettingsOpen((open) => !open)}
          onStart={startButtonHandler}
          trainCount={trainCount}
          setTrainCount={setTrainCount}
          randomLength={randomLength}
          setRandomLength={setRandomLength}
          endlessMode={endlessMode}
          setEndlessMode={setEndlessMode}
          pauseEnabled={pauseEnabled}
          setPauseEnabled={setPauseEnabled}
          pauseMs={pauseMs}
          setPauseMs={setPauseMs}
          bindingTarget={bindingTarget}
          setBindingTarget={setBindingTarget}
          keyBindings={keyBindings}
        />
      )}
    </div>
  );
}

export default App;


import './App.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { flattenStratagems, stratagemSections } from './stratagems';
import SplashScreen from './components/SplashScreen';
import TopBar from './components/TopBar';
import HoverTooltip from './components/HoverTooltip';
import AppPageContent from './components/AppPageContent';
import SettingsDock from './components/SettingsDock';
import useAuthController from './hooks/useAuthController';
import useAssetUrls from './hooks/useAssetUrls';
import useHoverTooltip from './hooks/useHoverTooltip';
import useStratagemCatalog from './hooks/useStratagemCatalog';
import useStratagemCloudRecords from './hooks/useStratagemCloudRecords';
import useStratagemStats from './hooks/useStratagemStats';
import useWeaponCatalog from './hooks/useWeaponCatalog';
import { hasSupabaseConfig } from './lib/supabase';
import { formatKeyLabel } from './utils/keyboard';

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
  const {
    authReady,
    needsUsername,
    profile,
    saveUsername,
    session,
    signIn,
    signOut,
    signUp,
  } = useAuthController();
  const [showSplash, setShowSplash] = useState(true);
  const [authReturnPage, setAuthReturnPage] = useState('training');
  const [controlMode, setControlMode] = useState('desktop');
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
  const [endlessMode, setEndlessMode] = useState(true);
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
  const [randomMobileStarted, setRandomMobileStarted] = useState(false);
  const [isFullscreenMode, setIsFullscreenMode] = useState(false);
  const [isSafariMobileBrowser, setIsSafariMobileBrowser] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
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
  const touchStartRef = useRef(null);
  const [showRotateHint, setShowRotateHint] = useState(false);
  const [isTouchGameplayPage, setIsTouchGameplayPage] = useState(false);
  const [trainingMobileStep, setTrainingMobileStep] = useState('play');
  const {
    availableStratagems,
    wikiResults,
    wikiSections,
  } = useStratagemCatalog({
    allStratagems,
    selectedIds,
    stratagemSections,
    wikiQuery,
    wikiSection,
  });
  const { getApIcon, getStratagemLogo, getWeaponImage, splashLogoUrl } =
    useAssetUrls();
  const { stratagemStats, setStratagemStats } = useStratagemStats();
  const {
    grenadeWeapons,
    primaryWeapons,
    secondaryWeapons,
    weaponCategories,
    weaponResults,
    weaponSlots,
  } = useWeaponCatalog({
    weaponCategory,
    weaponQuery,
    weaponSlot,
  });
  const isChallengeRoute =
    page === 'challenge' || page === 'challenge-interference';
  const isInterferenceRoute = page === 'challenge-interference';
  const isTrainingMobileSetup =
    page === 'training' && isTouchGameplayPage && trainingMobileStep === 'setup';
  const isTrainingMobilePlay =
    page === 'training' && isTouchGameplayPage && trainingMobileStep === 'play';
  const isChallengeMobilePlay =
    isTouchGameplayPage &&
    (page === 'challenge' || page === 'challenge-interference') &&
    challengeStarted;
  const isRandomMobilePlay =
    page === 'random' && isTouchGameplayPage && randomMobileStarted;
  const isMobilePlayLocked =
    isTrainingMobilePlay || isChallengeMobilePlay || isRandomMobilePlay;
  const fullscreenButtonLabel =
    isSafariMobileBrowser && isTouchGameplayPage
      ? isFocusMode
        ? 'Exit'
        : 'Focus'
      : isFullscreenMode
      ? '[]'
      : '[ ]';
  const fullscreenAriaLabel =
    isSafariMobileBrowser && isTouchGameplayPage
      ? isFocusMode
        ? 'Exit focus mode'
        : 'Enter focus mode'
      : isFullscreenMode
      ? 'Exit fullscreen mode'
      : 'Enter fullscreen mode';
  const {
    globalRecords,
    personalRecords,
    personalCloudReady,
    cloudSyncStatus,
    submitCloudStratagemRecord,
  } = useStratagemCloudRecords({
    needsUsername,
    profile,
    session,
  });
  const { clearHoverInfo, handleHoverInfo, hoverInfo, hoverPos, setHoverPos } =
    useHoverTooltip(globalRecords);

  const activeStratagem = trainingSet[activeIndex];
  const keyToDir = useMemo(() => {
    const mapping = {};
    Object.entries(keyBindings).forEach(([dir, key]) => {
      if (key) mapping[key.toLowerCase()] = dir;
    });
    return mapping;
  }, [keyBindings]);

  useEffect(() => {
    if (needsUsername && page !== 'auth') {
      setAuthReturnPage((current) => (page === 'auth' ? current : page));
      setPage('auth');
    }
  }, [needsUsername, page]);

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
      if (settingsOpen && bindingTarget) {
        event.preventDefault();
        if (!pressedKey) return;
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
        if (isTouchGameplayPage) {
          setRandomMobileStarted(true);
        }
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
              submitCloudStratagemRecord(activeStratagem.id, elapsed);
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
      trainingSet,
      availableStratagems,
      allStratagems,
      activeIndex,
      randomInput,
      randomSequence,
      refreshRandomSequence,
      isTouchGameplayPage,
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
      setStratagemStats,
      showRotateHint,
      submitCloudStratagemRecord,
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
    if (page !== 'random' || controlMode !== 'mobile') {
      setRandomMobileStarted(false);
    }
  }, [page, controlMode]);

  useEffect(() => {
    if (showSplash) {
      setControlMode(null);
    }
  }, [showSplash]);

  useEffect(() => {
    const ua = navigator.userAgent || '';
    const isSafariEngine =
      /Safari/i.test(ua) &&
      !/CriOS|Chrome|FxiOS|Firefox|EdgiOS|EdgA|OPiOS|OPR|SamsungBrowser/i.test(ua);
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(ua);
    setIsSafariMobileBrowser(isSafariEngine && isMobileDevice);
  }, []);

  useEffect(() => {
    const syncFullscreen = () => {
      setIsFullscreenMode(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', syncFullscreen);
    syncFullscreen();
    return () => document.removeEventListener('fullscreenchange', syncFullscreen);
  }, []);

  const enterTrainingMobilePlay = useCallback(async () => {
    await requestLandscapeLock();
    if (showRotateHint) return;
    refreshTrainingSet();
    setTrainingMobileStep('play');
    setSettingsOpen(false);
  }, [requestLandscapeLock, showRotateHint, refreshTrainingSet]);

  const exitTrainingMobilePlay = useCallback(() => {
    setTrainingMobileStep('setup');
    setIsFocusMode(false);
  }, []);

  const toggleFullscreenMode = useCallback(async () => {
    if (isSafariMobileBrowser && isTouchGameplayPage) {
      setIsFocusMode((prev) => !prev);
      return;
    }
    const root = document.documentElement;
    if (!document.fullscreenElement) {
      try {
        await root.requestFullscreen();
      } catch (error) {
        if (isTouchGameplayPage) {
          setIsFocusMode(true);
        }
      }
      return;
    }
    try {
      await document.exitFullscreen();
    } catch (error) {
      // Ignore failed exits and leave state synced from fullscreenchange.
    }
  }, [isSafariMobileBrowser, isTouchGameplayPage]);

  useEffect(() => {
    if (!isMobilePlayLocked) {
      setIsFocusMode(false);
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
  }, [isMobilePlayLocked]);

  const startButtonHandler = () => {
    if (page === 'training') {
      if (isTrainingMobileSetup) {
        enterTrainingMobilePlay();
        return;
      }
      requestLandscapeLock();
      refreshTrainingSet();
      return;
    }
    if (page === 'random') {
      requestLandscapeLock();
      if (isTouchGameplayPage) {
        setRandomMobileStarted(true);
      }
      refreshRandomSequence();
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
    setSettingsOpen(false);
    setControlMode('desktop');
  };
  const openAuthPage = useCallback(() => {
    if (page !== 'auth') {
      setAuthReturnPage(page);
    }
    setPage('auth');
    setOpenMenuGroup(null);
  }, [page]);
  const handleAuthSuccess = useCallback(() => {
    setPage(authReturnPage || 'training');
  }, [authReturnPage]);

  return (
    <div
      className={`app ${isMobilePlayLocked ? 'mobile-training-play' : ''} ${
        isFocusMode ? 'mobile-focus-mode' : ''
      } ${isSafariMobileBrowser ? 'mobile-safari-browser' : ''} ${
        isTrainingMobileSetup ? 'mobile-training-setup' : ''
      }`}
    >
      {showSplash && (
        <SplashScreen splashLogoUrl={splashLogoUrl} onClose={handleSplashClose} />
      )}

      {!showSplash && (
        <>
          <TopBar
            authReady={authReady}
            currentUsername={profile?.username || null}
            needsUsername={needsUsername}
            openMenuGroup={openMenuGroup}
            authConfigured={hasSupabaseConfig}
            onOpenAuth={openAuthPage}
            page={page}
            session={session}
            setShowSplash={setShowSplash}
            onSignOut={() => {
              signOut().catch((error) => {
                console.error('Failed to sign out', error);
              });
            }}
            onOpenMenu={(groupId) => setOpenMenuGroup(groupId)}
            onCloseMenu={() => setOpenMenuGroup(null)}
            onSelectPage={(nextPage) => {
              setPage(nextPage);
              setOpenMenuGroup(null);
            }}
          />
        </>
      )}

      <main>
        <AppPageContent
          page={page}
          setPage={setPage}
          authProps={{
            authConfigured: hasSupabaseConfig,
            needsUsername,
            onAuthSuccess: handleAuthSuccess,
            onSaveUsername: saveUsername,
            onSignIn: signIn,
            onSignUp: signUp,
            profile,
            session,
          }}
          profileProps={{
            allStratagems,
            authConfigured: hasSupabaseConfig,
            globalRecords,
            needsUsername,
            onOpenAuth: openAuthPage,
            onOpenHonorBoard: () => setPage('honor-board'),
            personalCloudReady,
            personalRecords,
            profile,
            session,
          }}
          trainingProps={{
            selectedIds,
            allStratagems,
            stratagemSections,
            onToggleAll: toggleAllSelections,
            onToggleSection: toggleSection,
            onToggleSelect: toggleSelect,
            onHoverInfo: handleHoverInfo,
            onHoverPos: setHoverPos,
            onHoverClear: clearHoverInfo,
            getStratagemLogo,
            globalRecords,
            stratagemStats,
            activeStratagem,
            activeIndex,
            trainingSet,
            trainingDone,
            setActiveIndex,
            setInputSeq,
            setStatus,
            errorFlash,
            inputSeq,
            status,
            keysPerSec,
            trainCount,
            setTrainCount,
            endlessMode,
            setEndlessMode,
            mobileGameplay: isTouchGameplayPage,
            controlsLocked: showRotateHint,
            mobileStep: isTrainingMobileSetup ? 'setup' : 'play',
            onEnterMobilePlay: enterTrainingMobilePlay,
            onExitMobilePlay: exitTrainingMobilePlay,
            onRestartTraining: refreshTrainingSet,
            onToggleFullscreen: toggleFullscreenMode,
            isFullscreenMode,
            fullscreenButtonLabel,
            fullscreenAriaLabel,
            globalRecord: activeStratagem ? globalRecords[activeStratagem.id] : null,
            isAuthenticated: Boolean(session && profile),
            needsUsername,
            cloudSyncStatus,
          }}
          randomProps={{
            randomErrorFlash,
            randomSequence,
            randomInput,
            randomStatus,
            randomElapsed,
            mobileGameplay: isTouchGameplayPage,
            mobileStarted: isRandomMobilePlay,
            onExitMobilePlay: () => {
              setRandomMobileStarted(false);
              setIsFocusMode(false);
            },
            onToggleFullscreen: toggleFullscreenMode,
            isFullscreenMode,
            fullscreenButtonLabel,
            fullscreenAriaLabel,
          }}
          wikiProps={{
            wikiQuery,
            setWikiQuery,
            wikiSection,
            setWikiSection,
            wikiSections,
            wikiResults,
            getStratagemLogo,
          }}
          loadoutProps={{
            selectedIds,
            allStratagems,
            stratagemSections,
            onToggleAll: toggleAllSelections,
            onToggleSection: toggleSection,
            onToggleSelect: toggleSelect,
            onHoverInfo: handleHoverInfo,
            onHoverPos: setHoverPos,
            onHoverClear: clearHoverInfo,
            getStratagemLogo,
            globalRecords,
            loadoutCount,
            setLoadoutCount,
            refreshLoadoutSet,
            loadoutSet,
          }}
          challengeProps={{
            selectedIds,
            allStratagems,
            stratagemSections,
            onToggleAll: toggleAllSelections,
            onToggleSection: toggleSection,
            onToggleSelect: toggleSelect,
            onHoverInfo: handleHoverInfo,
            onHoverPos: setHoverPos,
            onHoverClear: clearHoverInfo,
            getStratagemLogo,
            globalRecords,
            challengeMode,
            setChallengeMode,
            challengeLevel,
            setChallengeLevel,
            challengeScore,
            challengeHighScore,
            challengeTimeLeft,
            challengeStreak,
            challengeBestStreak,
            challengeFailed,
            setChallengeScore,
            setChallengeRetries,
            startChallengeLevel,
            getChallengeDurationMs,
            beginChallengeRun,
            challengeLevelComplete,
            challengeRetries,
            getChallengeTargetCount,
            challengeSet,
            challengeActiveIndex,
            challengeStarted,
            challengeErrorFlash,
            challengeInputSeq,
            challengeStatus,
            challengeCompleted,
            setChallengeLevelAndStartNext,
            mobileGameplay: isTouchGameplayPage,
            controlsLocked: showRotateHint,
            onExitMobilePlay: () => {
              setChallengeStarted(false);
              setIsFocusMode(false);
            },
            onToggleFullscreen: toggleFullscreenMode,
            isFullscreenMode,
            fullscreenButtonLabel,
            fullscreenAriaLabel,
          }}
          honorProps={{
            allStratagems,
            authConfigured: hasSupabaseConfig,
            globalRecords,
            onOpenAuth: openAuthPage,
            personalCloudReady,
            personalRecords,
            profile,
            session,
            getStratagemLogo,
          }}
          challengeInterferenceProps={{
            selectedIds,
            allStratagems,
            stratagemSections,
            onToggleAll: toggleAllSelections,
            onToggleSection: toggleSection,
            onToggleSelect: toggleSelect,
            onHoverInfo: handleHoverInfo,
            onHoverPos: setHoverPos,
            onHoverClear: clearHoverInfo,
            getStratagemLogo,
            globalRecords,
            challengeLevel,
            setChallengeLevel,
            challengeScore,
            challengeHighScore,
            challengeTimeLeft,
            challengeStreak,
            challengeBestStreak,
            challengeFailed,
            setChallengeScore,
            setChallengeRetries,
            startChallengeLevel,
            beginChallengeRun,
            challengeLevelComplete,
            challengeRetries,
            getChallengeTargetCount,
            challengeSet,
            challengeActiveIndex,
            challengeStarted,
            challengeErrorFlash,
            challengeInputSeq,
            challengeStatus,
            challengeCompleted,
            setChallengeLevelAndStartNext,
            challengeInterferenceMs,
            setChallengeInterferenceMs,
            challengeInterferenceLeftMs,
            mobileGameplay: isTouchGameplayPage,
            controlsLocked: showRotateHint,
            onExitMobilePlay: () => {
              setChallengeStarted(false);
              setIsFocusMode(false);
            },
            onToggleFullscreen: toggleFullscreenMode,
            isFullscreenMode,
            fullscreenButtonLabel,
            fullscreenAriaLabel,
          }}
          quizInputProps={{
            allStratagems,
            getStratagemLogo,
            keyToDir,
            controlsLocked: showRotateHint,
          }}
          quizLogoProps={{
            allStratagems,
            getStratagemLogo,
          }}
          weaponProps={{
            weaponQuery,
            setWeaponQuery,
            weaponSlot,
            setWeaponSlot,
            weaponCategory,
            setWeaponCategory,
            weaponSlots,
            weaponCategories,
            weaponResults,
            getWeaponImage,
            getApIcon,
          }}
          weaponRandomProps={{
            randomWeaponCount,
            setRandomWeaponCount,
            rollRandomWeapons,
            randomWeaponSet,
            getWeaponImage,
            getApIcon,
          }}
        />
      </main>

      <HoverTooltip hoverInfo={hoverInfo} hoverPos={hoverPos} />

      {
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
          formatKeyLabel={formatKeyLabel}
        />
      }
    </div>
  );
}

export default App;

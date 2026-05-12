import React, { Suspense, lazy } from 'react';
import TrainingPage from '../pages/TrainingPage';
import AuthPage from '../pages/AuthPage';
import HonorBoardPage from '../pages/HonorBoardPage';
import ProfilePage from '../pages/ProfilePage';

const RandomPage = lazy(() => import('../pages/RandomPage'));
const WikiPage = lazy(() => import('../pages/WikiPage'));
const LoadoutPage = lazy(() => import('../pages/LoadoutPage'));
const ChallengePage = lazy(() => import('../pages/ChallengePage'));
const ChallengeInterferencePage = lazy(
  () => import('../pages/ChallengeInterferencePage')
);
const SignalHijackPage = lazy(() => import('../pages/SignalHijackPage'));
const AnimationTestPage = lazy(() => import('../pages/AnimationTestPage'));
const ShipMapPage = lazy(() => import('../pages/ShipMapPage'));
const WeaponPage = lazy(() => import('../pages/WeaponPage'));
const WeaponRandomPage = lazy(() => import('../pages/WeaponRandomPage'));
const QuizInputPage = lazy(() => import('../pages/QuizInputPage'));
const QuizLogoPage = lazy(() => import('../pages/QuizLogoPage'));
const ArmorPage = lazy(() => import('../pages/ArmorPage'));
const RandomArmorPage = lazy(() => import('../pages/RandomArmorPage'));

function PageLoadingFallback() {
  return <div className="page-placeholder">Loading section...</div>;
}

function AppPageContent({
  page,
  setPage,
  trainingProps,
  randomProps,
  wikiProps,
  loadoutProps,
  challengeProps,
  challengeInterferenceProps,
  authProps,
  profileProps,
  quizInputProps,
  quizLogoProps,
  weaponProps,
  weaponRandomProps,
  honorProps,
}) {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      {page === 'training' && <TrainingPage {...trainingProps} />}
      {page === 'auth' && <AuthPage {...authProps} />}
      {page === 'profile' && <ProfilePage {...profileProps} />}
      {page === 'honor-board' && <HonorBoardPage {...honorProps} />}
      {page === 'random' && <RandomPage {...randomProps} />}
      {page === 'wiki' && <WikiPage {...wikiProps} />}
      {page === 'loadout' && <LoadoutPage {...loadoutProps} />}
      {page === 'challenge' && <ChallengePage {...challengeProps} />}
      {page === 'challenge-interference' && (
        <ChallengeInterferencePage {...challengeInterferenceProps} />
      )}
      {page === 'signal-hijack' && <SignalHijackPage />}
      {page === 'quiz-input' && <QuizInputPage {...quizInputProps} />}
      {page === 'quiz-logo' && <QuizLogoPage {...quizLogoProps} />}
      {page === 'animation-test' && <AnimationTestPage />}
      {page === 'ship-map' && <ShipMapPage onOpenPage={setPage} />}
      {page === 'weapon' && <WeaponPage {...weaponProps} />}
      {page === 'weapon-random' && <WeaponRandomPage {...weaponRandomProps} />}
      {page === 'armor' && <ArmorPage />}
      {page === 'armor-random' && <RandomArmorPage />}
    </Suspense>
  );
}

export default AppPageContent;

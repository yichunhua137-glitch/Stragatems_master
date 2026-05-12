import React, { useEffect, useMemo, useState } from 'react';

const PASSWORD_RULES = [
  {
    id: 'length',
    label: 'At least 8 characters',
    test: (value) => value.length >= 8,
  },
  {
    id: 'uppercase',
    label: 'At least 1 uppercase letter',
    test: (value) => /[A-Z]/.test(value),
  },
  {
    id: 'lowercase',
    label: 'At least 1 lowercase letter',
    test: (value) => /[a-z]/.test(value),
  },
  {
    id: 'number',
    label: 'At least 1 number',
    test: (value) => /\d/.test(value),
  },
];

function AuthPage({
  authConfigured,
  needsUsername,
  onAuthSuccess,
  onSaveUsername,
  onSignIn,
  onSignUp,
  profile,
  session,
}) {
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState(session?.user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState(
    profile?.username || session?.user?.user_metadata?.username || ''
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [logoTilt, setLogoTilt] = useState({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    if (needsUsername) {
      setMode('username');
      setUsername(profile?.username || session?.user?.user_metadata?.username || '');
    }
  }, [needsUsername, profile, session]);

  const passwordChecks = useMemo(
    () =>
      PASSWORD_RULES.map((rule) => ({
        ...rule,
        passed: rule.test(password),
      })),
    [password]
  );

  const passwordValid = passwordChecks.every((rule) => rule.passed);
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;

  const handleLogoMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    setLogoTilt({
      rotateX: (0.5 - y) * 18,
      rotateY: (x - 0.5) * 18,
    });
  };

  const resetLogoTilt = () => {
    setLogoTilt({ rotateX: 0, rotateY: 0 });
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    setNotice('');
    try {
      await onSignIn(email.trim(), password);
      onAuthSuccess();
    } catch (submitError) {
      setError(submitError.message || 'Failed to sign in.');
    } finally {
      setBusy(false);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (!passwordValid) {
      setError('Password does not meet the minimum rules.');
      return;
    }
    if (!passwordsMatch) {
      setError('Passwords do not match.');
      return;
    }
    if (!username.trim()) {
      setError('Username is required.');
      return;
    }

    setBusy(true);
    setError('');
    setNotice('');
    try {
      const result = await onSignUp(email.trim(), password, username.trim());
      if (!result?.session) {
        setNotice(
          'Account created. Check your email to confirm, then sign in to finish setup.'
        );
        return;
      }
      onAuthSuccess();
    } catch (submitError) {
      setError(submitError.message || 'Failed to create account.');
    } finally {
      setBusy(false);
    }
  };

  const handleSaveUsername = async (event) => {
    event.preventDefault();
    if (!username.trim()) {
      setError('Username is required.');
      return;
    }

    setBusy(true);
    setError('');
    setNotice('');
    try {
      await onSaveUsername(username.trim());
      onAuthSuccess();
    } catch (submitError) {
      setError(submitError.message || 'Failed to save username.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="section auth-page-section">
      <div className="auth-page-shell">
        <div
          className="auth-hero-panel auth-hero-panel-logo"
          onMouseMove={handleLogoMove}
          onMouseLeave={resetLogoTilt}
        >
          <div className="auth-hero-logo-wrap auth-hero-logo-wrap-tilt">
            <div
              className="auth-hero-logo-card"
              style={{
                transform: `rotateX(${logoTilt.rotateX}deg) rotateY(${logoTilt.rotateY}deg)`,
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/Helldiver_welcom_logo.png`}
                alt="Helldiver insignia"
                className="auth-hero-logo"
              />
            </div>
          </div>
        </div>

        <div className="auth-panel">
          <div className="auth-panel-inner">
            {!authConfigured && (
              <div className="auth-feedback error">
                Supabase env vars are missing. Restart the dev server after saving
                `.env.local`.
              </div>
            )}

            <div className="auth-panel-topline">
              <span className="auth-panel-kicker">Secure Access</span>
              {mode !== 'username' && (
                <div className="auth-tabs auth-tabs-page">
                  <button
                    type="button"
                    className={`toggle-chip ${mode === 'signin' ? 'active' : ''}`}
                    onClick={() => setMode('signin')}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    className={`toggle-chip ${mode === 'signup' ? 'active' : ''}`}
                    onClick={() => setMode('signup')}
                  >
                    Create Account
                  </button>
                </div>
              )}
            </div>

            {mode === 'username' ? (
              <form className="auth-form auth-form-page" onSubmit={handleSaveUsername}>
                <div className="auth-page-headline">
                  <strong>Set Username</strong>
                  <span>
                    Logged in as {session?.user?.email || 'user'}. This name is shown on
                    world-record ownership.
                  </span>
                </div>
                <label className="auth-field">
                  <span>Username</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Helldiver tag"
                    maxLength={32}
                    required
                  />
                </label>
                {error && <div className="auth-feedback error">{error}</div>}
                {notice && <div className="auth-feedback">{notice}</div>}
                <div className="auth-actions auth-actions-page">
                  <button type="submit" className="primary" disabled={busy}>
                    {busy ? 'Saving...' : 'Save Username'}
                  </button>
                </div>
              </form>
            ) : mode === 'signin' ? (
              <form className="auth-form auth-form-page" onSubmit={handleSignIn}>
                <div className="auth-page-headline">
                  <strong>Sign In</strong>
                  <span>Access your profile and claim world records under your username.</span>
                </div>
                <div className="auth-quick-grid">
                  <div className="auth-quick-card">
                    <strong>Guest</strong>
                    <span>All training modes stay playable without login.</span>
                  </div>
                  <div className="auth-quick-card">
                    <strong>Cloud</strong>
                    <span>Only signed-in users can own global stratagem records.</span>
                  </div>
                </div>
                <label className="auth-field">
                  <span>Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="helldiver@super.earth"
                    required
                  />
                </label>
                <label className="auth-field">
                  <span>Password</span>
                  <div className="auth-input-row">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter password"
                      minLength={6}
                      required
                    />
                    <button
                      type="button"
                      className="auth-visibility-btn"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </label>
                {error && <div className="auth-feedback error">{error}</div>}
                {notice && <div className="auth-feedback">{notice}</div>}
                <div className="auth-actions auth-actions-page">
                  <button type="submit" className="primary" disabled={busy}>
                    {busy ? 'Signing In...' : 'Sign In'}
                  </button>
                </div>
              </form>
            ) : (
              <form className="auth-form auth-form-page" onSubmit={handleSignUp}>
                <div className="auth-page-headline">
                  <strong>Create Account</strong>
                  <span>Build a profile with a public username and persistent record ownership.</span>
                </div>
                <div className="auth-field-grid">
                  <label className="auth-field">
                    <span>Username</span>
                    <input
                      type="text"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      placeholder="Helldiver tag"
                      maxLength={32}
                      required
                    />
                  </label>
                  <label className="auth-field">
                    <span>Email</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="helldiver@super.earth"
                      required
                    />
                  </label>
                </div>
                <label className="auth-field">
                  <span>Password</span>
                  <div className="auth-input-row">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Choose password"
                      required
                    />
                    <button
                      type="button"
                      className="auth-visibility-btn"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </label>
                <label className="auth-field">
                  <span>Confirm Password</span>
                  <div className="auth-input-row">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      placeholder="Repeat password"
                      required
                    />
                    <button
                      type="button"
                      className="auth-visibility-btn"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </label>

                <div className="password-rules">
                  {passwordChecks.map((rule) => (
                    <div
                      key={rule.id}
                      className={`password-rule ${rule.passed ? 'passed' : ''}`}
                    >
                      <span>{rule.passed ? 'OK' : '...'}</span>
                      <span>{rule.label}</span>
                    </div>
                  ))}
                  <div className={`password-rule ${passwordsMatch ? 'passed' : ''}`}>
                    <span>{passwordsMatch ? 'OK' : '...'}</span>
                    <span>Passwords match</span>
                  </div>
                </div>

                {error && <div className="auth-feedback error">{error}</div>}
                {notice && <div className="auth-feedback">{notice}</div>}
                <div className="auth-actions auth-actions-page">
                  <button type="submit" className="primary" disabled={busy}>
                    {busy ? 'Creating...' : 'Create Account'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthPage;

import emailjs from '@emailjs/browser';
import React, { useEffect, useMemo, useState } from 'react';

const CONTACT_EMAIL = 'yichunhua137@gmail.com';
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

function ProfilePage({
  allStratagems,
  authConfigured,
  globalRecords,
  needsUsername,
  onOpenAuth,
  onOpenHonorBoard,
  personalCloudReady,
  personalRecords,
  profile,
  session,
}) {
  const [contactName, setContactName] = useState(
    profile?.username || session?.user?.email || ''
  );
  const [contactEmail, setContactEmail] = useState(session?.user?.email || '');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactBusy, setContactBusy] = useState(false);
  const [contactFeedback, setContactFeedback] = useState(null);
  const personalBestCount = Object.keys(personalRecords).length;

  const claimedWorldRecords = useMemo(
    () =>
      Object.values(globalRecords).filter(
        (record) => profile?.username && record.username === profile.username
      ).length,
    [globalRecords, profile]
  );

  const fastestPersonal = useMemo(() => {
    const entries = Object.entries(personalRecords);
    if (!entries.length) return null;

    const [slug, record] = entries.reduce((best, current) =>
      !best || current[1].bestMs < best[1].bestMs ? current : best
    , null);

    const matched = allStratagems.find((item) => item.id === slug);
    return {
      itemName: matched?.name || slug,
      ...record,
    };
  }, [allStratagems, personalRecords]);

  const averagePersonal = useMemo(() => {
    const records = Object.values(personalRecords);
    if (!records.length) return null;
    const total = records.reduce((sum, item) => sum + item.bestMs, 0);
    return total / records.length;
  }, [personalRecords]);

  useEffect(() => {
    setContactName((current) =>
      current || profile?.username || session?.user?.email || ''
    );
    setContactEmail((current) => current || session?.user?.email || '');
  }, [profile, session]);

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    const trimmedName = contactName.trim();
    const trimmedEmail = contactEmail.trim();
    const trimmedSubject = contactSubject.trim();
    const trimmedMessage = contactMessage.trim();

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setContactFeedback({
        text: 'Email service is not configured yet. Restart after updating .env.local.',
        tone: 'error',
      });
      return;
    }

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      setContactFeedback({
        text: 'Name, email, subject, and message are all required.',
        tone: 'error',
      });
      return;
    }

    setContactBusy(true);
    setContactFeedback(null);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          email: trimmedEmail,
          message: trimmedMessage,
          name: trimmedName,
          title: trimmedSubject,
        },
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        }
      );

      setContactFeedback({
        text: 'Message sent successfully.',
        tone: 'success',
      });
      setContactSubject('');
      setContactMessage('');
    } catch (error) {
      setContactFeedback({
        text:
          error?.text ||
          error?.message ||
          'Failed to send message. Check EmailJS service and template settings.',
        tone: 'error',
      });
    } finally {
      setContactBusy(false);
    }
  };

  return (
    <section className="section honor-section profile-section">
      <div className="section-title">
        <h2>Personal Home</h2>
        <p>
          Review your pilot identity, cloud record status, and personal performance
          summary in one place.
        </p>
      </div>

      {!authConfigured && (
        <div className="page-placeholder">
          Supabase is not configured for this build, so account and cloud profile
          features are unavailable.
        </div>
      )}

      {authConfigured && !session && (
        <div className="honor-login-shell">
          <div className="page-placeholder honor-login-card">
            <strong>Sign in required</strong>
            <span>
              Log in to unlock a persistent pilot profile, personal best tracking, and
              world record ownership.
            </span>
            <button type="button" className="primary" onClick={onOpenAuth}>
              Open Login
            </button>
          </div>
        </div>
      )}

      {authConfigured && session && (
        <>
          <div className="profile-overview-grid">
            <div className="profile-overview-card">
              <span>Pilot</span>
              <strong>{profile?.username || session?.user?.email || 'Guest'}</strong>
            </div>
            <div className="profile-overview-card">
              <span>World Records Held</span>
              <strong>{claimedWorldRecords}</strong>
            </div>
            <div className="profile-overview-card">
              <span>Personal Bests</span>
              <strong>{personalBestCount}</strong>
            </div>
            <div className="profile-overview-card">
              <span>Cloud Sync</span>
              <strong>
                {!authConfigured
                  ? 'Offline'
                  : !session
                  ? 'Sign In Required'
                  : personalCloudReady
                  ? 'Active'
                  : 'Setup Required'}
              </strong>
            </div>
          </div>

          <div className="profile-layout">
            <div className="profile-main-column">
              <article className="profile-panel profile-panel-identity">
                <div className="profile-panel-head">
                  <strong>Account Identity</strong>
                  <span>Primary pilot information</span>
                </div>

                <div className="profile-detail-list">
                  <div className="profile-detail-row">
                    <span>Username</span>
                    <strong>{profile?.username || 'Not set'}</strong>
                  </div>
                  <div className="profile-detail-row">
                    <span>Email</span>
                    <strong>{session.user?.email || '--'}</strong>
                  </div>
                  <div className="profile-detail-row profile-detail-row-stack">
                    <span>User ID</span>
                    <strong>{session.user?.id || '--'}</strong>
                  </div>
                </div>

                <div className="profile-actions">
                  <button type="button" className="primary" onClick={onOpenAuth}>
                    {needsUsername ? 'Set Username' : 'Manage Account'}
                  </button>
                  <button
                    type="button"
                    className="secondary"
                    onClick={onOpenHonorBoard}
                  >
                    Open Honor Board
                  </button>
                </div>
              </article>

              <article className="profile-panel profile-panel-contact">
                <div className="profile-panel-head">
                  <strong>Contact Me</strong>
                  <span>Send feedback or report issues directly</span>
                </div>

                <div className="profile-contact-address">
                  <span>Contact Email</span>
                  <strong>{CONTACT_EMAIL}</strong>
                </div>

                <form className="profile-contact-form" onSubmit={handleContactSubmit}>
                  <div className="profile-contact-grid">
                    <label className="profile-contact-field">
                      <span>Name</span>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(event) => setContactName(event.target.value)}
                        placeholder="Your name"
                      />
                    </label>

                    <label className="profile-contact-field">
                      <span>Reply Email</span>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(event) => setContactEmail(event.target.value)}
                        placeholder="your@email.com"
                      />
                    </label>
                  </div>

                  <label className="profile-contact-field">
                    <span>Subject</span>
                    <input
                      type="text"
                      value={contactSubject}
                      onChange={(event) => setContactSubject(event.target.value)}
                      placeholder="Message subject"
                    />
                  </label>

                  <label className="profile-contact-field">
                    <span>Message</span>
                    <textarea
                      value={contactMessage}
                      onChange={(event) => setContactMessage(event.target.value)}
                      placeholder="Write your message here"
                      rows={6}
                    />
                  </label>

                  {contactFeedback && (
                    <div
                      className={`profile-contact-feedback ${contactFeedback.tone || ''}`}
                    >
                      {contactFeedback.text}
                    </div>
                  )}

                  <div className="profile-actions">
                    <button type="submit" className="primary" disabled={contactBusy}>
                      {contactBusy ? 'Sending...' : 'Send Email'}
                    </button>
                  </div>
                </form>
              </article>
            </div>

            <div className="profile-side-column">
              <article className="profile-panel">
                <div className="profile-panel-head">
                  <strong>Performance Snapshot</strong>
                  <span>Your current personal summary</span>
                </div>

                <div className="profile-metric-grid">
                  <div className="profile-metric-card">
                    <span>Fastest Personal</span>
                    <strong>
                      {fastestPersonal
                        ? `${(fastestPersonal.bestMs / 1000).toFixed(2)}s`
                        : '--'}
                    </strong>
                  </div>
                  <div className="profile-metric-card">
                    <span>Average Personal</span>
                    <strong>
                      {averagePersonal ? `${(averagePersonal / 1000).toFixed(2)}s` : '--'}
                    </strong>
                  </div>
                  <div className="profile-metric-card">
                    <span>Tracked Stratagems</span>
                    <strong>{personalBestCount}</strong>
                  </div>
                  <div className="profile-metric-card">
                    <span>World Records</span>
                    <strong>{claimedWorldRecords}</strong>
                  </div>
                </div>

                <div className="profile-highlight">
                  <span>Best Entry</span>
                  <strong>{fastestPersonal?.itemName || 'No cloud runs yet'}</strong>
                </div>
              </article>

              <article className="profile-panel">
                <div className="profile-panel-head">
                  <strong>Cloud Status</strong>
                  <span>Supabase and personal best tracking</span>
                </div>

                <div className="profile-detail-list">
                  <div className="profile-detail-row">
                    <span>Auth Session</span>
                    <strong>{session ? 'Connected' : 'Offline'}</strong>
                  </div>
                  <div className="profile-detail-row">
                    <span>Username State</span>
                    <strong>{needsUsername ? 'Needs Setup' : 'Ready'}</strong>
                  </div>
                  <div className="profile-detail-row">
                    <span>Personal Best Table</span>
                    <strong>{personalCloudReady ? 'Enabled' : 'Missing'}</strong>
                  </div>
                </div>

                {!personalCloudReady && (
                  <div className="page-placeholder honor-empty">
                    Run <code>supabase/personal_bests.sql</code> to enable personal cloud
                    bests for this account.
                  </div>
                )}
              </article>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default ProfilePage;

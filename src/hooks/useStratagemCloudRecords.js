import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const useStratagemCloudRecords = ({ needsUsername, profile, session }) => {
  const [globalRecords, setGlobalRecords] = useState({});
  const [personalRecords, setPersonalRecords] = useState({});
  const [personalCloudReady, setPersonalCloudReady] = useState(true);
  const [cloudSyncStatus, setCloudSyncStatus] = useState(null);

  const fetchGlobalRecords = useCallback(async () => {
    if (!supabase) return;

    const { data, error } = await supabase
      .from('stratagem_records')
      .select('best_ms, achieved_at, profiles(username), stratagems(slug)');

    if (error) {
      console.error('Failed to load cloud records', error);
      return;
    }

    const nextRecords = {};
    (data || []).forEach((row) => {
      const stratagemSlug = Array.isArray(row.stratagems)
        ? row.stratagems[0]?.slug
        : row.stratagems?.slug;
      const username = Array.isArray(row.profiles)
        ? row.profiles[0]?.username
        : row.profiles?.username;

      if (!stratagemSlug) return;

      nextRecords[stratagemSlug] = {
        achievedAt: row.achieved_at,
        bestMs: row.best_ms,
        username: username || 'Unknown',
      };
    });

    setGlobalRecords(nextRecords);
  }, []);

  const fetchPersonalRecords = useCallback(async () => {
    if (!supabase || !session?.user?.id) {
      setPersonalRecords({});
      setPersonalCloudReady(true);
      return;
    }

    const { data, error } = await supabase
      .from('stratagem_personal_bests')
      .select('best_ms, achieved_at, stratagems(slug)')
      .eq('user_id', session.user.id);

    if (error) {
      if (error.code === '42P01' || error.code === 'PGRST205') {
        setPersonalCloudReady(false);
        setPersonalRecords({});
        return;
      }
      console.error('Failed to load personal cloud records', error);
      return;
    }

    setPersonalCloudReady(true);
    const nextRecords = {};
    (data || []).forEach((row) => {
      const stratagemSlug = Array.isArray(row.stratagems)
        ? row.stratagems[0]?.slug
        : row.stratagems?.slug;

      if (!stratagemSlug) return;

      nextRecords[stratagemSlug] = {
        achievedAt: row.achieved_at,
        bestMs: row.best_ms,
      };
    });

    setPersonalRecords(nextRecords);
  }, [session]);

  const submitCloudStratagemRecord = useCallback(
    async (stratagemSlug, elapsed) => {
      if (!supabase || !session || !profile || needsUsername) return;

      const { error } = await supabase.rpc('submit_stratagem_record', {
        p_best_ms: elapsed,
        p_stratagem_slug: stratagemSlug,
      });

      if (error) {
        console.error('Failed to submit cloud record', error);
        setCloudSyncStatus({
          text: `World record sync failed: ${error.message}`,
          tone: 'error',
        });
      }

      const currentGlobal = globalRecords[stratagemSlug];
      if (!currentGlobal || elapsed < currentGlobal.bestMs) {
        fetchGlobalRecords();
      }

      const currentPersonal = personalRecords[stratagemSlug];
      if (
        personalCloudReady &&
        (!currentPersonal || elapsed < currentPersonal.bestMs)
      ) {
        const { data: stratagemRow, error: stratagemError } = await supabase
          .from('stratagems')
          .select('id')
          .eq('slug', stratagemSlug)
          .maybeSingle();

        if (stratagemError || !stratagemRow?.id) {
          console.error(
            'Failed to resolve stratagem for personal cloud record',
            stratagemError
          );
          setCloudSyncStatus({
            text:
              'Cloud sync could not find this stratagem in Supabase. Import supabase/seed_stratagems.sql into the public.stratagems table.',
            tone: 'error',
          });
          return;
        }

        const achievedAt = new Date().toISOString();
        const { error: personalError } = await supabase
          .from('stratagem_personal_bests')
          .upsert(
            {
              achieved_at: achievedAt,
              best_ms: elapsed,
              stratagem_id: stratagemRow.id,
              user_id: session.user.id,
            },
            { onConflict: 'user_id,stratagem_id' }
          );

        if (personalError) {
          if (personalError.code === '42P01' || personalError.code === 'PGRST205') {
            setPersonalCloudReady(false);
            return;
          }
          console.error('Failed to submit personal cloud record', personalError);
          setCloudSyncStatus({
            text: `Personal record sync failed: ${personalError.message}`,
            tone: 'error',
          });
          return;
        }

        setPersonalRecords((current) => ({
          ...current,
          [stratagemSlug]: {
            achievedAt,
            bestMs: elapsed,
          },
        }));
      }

      if (!error) {
        setCloudSyncStatus({
          text: 'Cloud record synced.',
          tone: 'success',
        });
      }
    },
    [
      fetchGlobalRecords,
      globalRecords,
      needsUsername,
      personalRecords,
      personalCloudReady,
      profile,
      session,
    ]
  );

  useEffect(() => {
    fetchGlobalRecords();
  }, [fetchGlobalRecords]);

  useEffect(() => {
    fetchPersonalRecords();
  }, [fetchPersonalRecords]);

  return {
    cloudSyncStatus,
    globalRecords,
    personalCloudReady,
    personalRecords,
    submitCloudStratagemRecord,
  };
};

export default useStratagemCloudRecords;

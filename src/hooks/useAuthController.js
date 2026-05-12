import { useCallback, useEffect, useState } from 'react';
import { hasSupabaseConfig, supabase } from '../lib/supabase';

function useAuthController() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [needsUsername, setNeedsUsername] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  const refreshProfile = useCallback(async (userId) => {
    if (!supabase) {
      setProfile(null);
      setNeedsUsername(false);
      return null;
    }

    if (!userId) {
      setProfile(null);
      setNeedsUsername(false);
      return null;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('id, username')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      setProfile(null);
      setNeedsUsername(true);
      return null;
    }

    setProfile(data);
    setNeedsUsername(false);
    return data;
  }, []);

  useEffect(() => {
    let isMounted = true;

    const syncSession = async () => {
      if (!supabase) {
        if (isMounted) {
          setSession(null);
          setProfile(null);
          setNeedsUsername(false);
          setAuthReady(true);
        }
        return;
      }

      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      if (!isMounted) return;

      setSession(currentSession);
      if (currentSession?.user?.id) {
        try {
          await refreshProfile(currentSession.user.id);
        } catch (error) {
          if (!isMounted) return;
          setProfile(null);
          setNeedsUsername(false);
        }
      } else {
        setProfile(null);
        setNeedsUsername(false);
      }

      if (isMounted) {
        setAuthReady(true);
      }
    };

    syncSession();

    if (!supabase) {
      return () => {
        isMounted = false;
      };
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (!nextSession?.user?.id) {
        setProfile(null);
        setNeedsUsername(false);
        return;
      }

      refreshProfile(nextSession.user.id).catch(() => {
        setProfile(null);
        setNeedsUsername(false);
      });
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [refreshProfile]);

  const signIn = useCallback(async (email, password) => {
    if (!supabase || !hasSupabaseConfig) {
      throw new Error('Supabase auth is not configured.');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  }, []);

  const signUp = useCallback(async (email, password, username) => {
    if (!supabase || !hasSupabaseConfig) {
      throw new Error('Supabase auth is not configured.');
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username?.trim() || '',
        },
      },
    });

    if (error) throw error;
    if (data?.session?.user?.id && username?.trim()) {
      const userId = data.session.user.id;
      const { error: profileError } = await supabase.from('profiles').insert({
        id: userId,
        username: username.trim(),
      });

      if (profileError) throw profileError;
      await refreshProfile(userId);
    }
    return data;
  }, [refreshProfile]);

  const signOut = useCallback(async () => {
    if (!supabase || !hasSupabaseConfig) {
      throw new Error('Supabase auth is not configured.');
    }

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, []);

  const saveUsername = useCallback(
    async (username) => {
      const userId = session?.user?.id;
      if (!userId) {
        throw new Error('Not authenticated');
      }
      if (!supabase || !hasSupabaseConfig) {
        throw new Error('Supabase auth is not configured.');
      }

      const cleanUsername = username.trim();
      if (!cleanUsername) {
        throw new Error('Username is required');
      }

      const { error } = await supabase.from('profiles').upsert({
        id: userId,
        username: cleanUsername,
      });

      if (error) throw error;
      await refreshProfile(userId);
    },
    [refreshProfile, session]
  );

  return {
    authReady,
    needsUsername,
    profile,
    refreshProfile,
    saveUsername,
    session,
    signIn,
    signOut,
    signUp,
  };
}

export default useAuthController;

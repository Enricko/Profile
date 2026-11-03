import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { loadProfileVisits } from '../lib/profileVisits';
import './ProfileVisits.css';

/**
 * The profile visit total for the hero meta row: a dash while it loads, the
 * genuine count once it arrives (zero until the first visit is counted), and
 * "Unavailable" when the counter can't be reached. Never an estimate.
 */
export default function ProfileVisits() {
  const [visits, setVisits] = useState({ status: 'loading', count: null });

  useEffect(() => {
    // Unmounting only ignores the result; the shared request (and the visit it
    // may be counting) carries on, so a remount reuses it instead of re-counting.
    let cancelled = false;
    loadProfileVisits()
      .then((count) => {
        if (!cancelled) setVisits({ status: 'ready', count });
      })
      .catch((err) => {
        console.warn('Profile visits: counter unavailable:', err.message);
        if (!cancelled) setVisits({ status: 'error', count: null });
      });
    return () => { cancelled = true; };
  }, []);

  const { status, count } = visits;
  return (
    <span className="profile-visits" aria-live="polite" aria-atomic="true">
      <Eye size={14} aria-hidden="true" />
      Profile visits
      <span
        className={`profile-visits-value is-${status}`}
        title={status === 'error' ? 'The visit counter could not be reached right now' : undefined}
      >
        {status === 'ready' && count.toLocaleString()}
        {status === 'error' && 'Unavailable'}
        {status === 'loading' && (
          <>
            <span aria-hidden="true">—</span>
            <span className="profile-visits-sr">loading</span>
          </>
        )}
      </span>
    </span>
  );
}

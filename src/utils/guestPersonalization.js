/**
 * Guest Personalization Utility
 * Safely parses, decodes, and formats personalized invitation guest names
 * from URL query parameters (e.g. ?guest=Kushal%20%26%20Family or ?to=...).
 */

/**
 * Extracts and safely sanitizes the guest parameter from the current URL
 * @param {string} [searchString] - Optional search string (defaults to window.location.search)
 * @returns {string} Clean, decoded plain-text guest name or empty string
 */
export function getGuestFromUrl(searchString) {
  if (typeof window === 'undefined') return '';

  try {
    const search = searchString !== undefined ? searchString : window.location.search;
    const params = new URLSearchParams(search);
    const rawGuest = params.get('guest') || params.get('to') || params.get('name') || '';

    if (!rawGuest) return '';

    // Decode and sanitize: strictly plain text, trim, remove dangerous characters
    const decoded = decodeURIComponent(rawGuest.replace(/\+/g, ' ')).trim();
    // Strip any HTML tags or script injection attempts
    const sanitized = decoded.replace(/<[^>]*>?/gm, '').replace(/[<>{}[\]]/g, '');

    // Limit length to 60 characters to fit mobile displays cleanly
    return sanitized.slice(0, 60);
  } catch (e) {
    return '';
  }
}

/**
 * Formats the personalized greeting based on user input
 * @param {string} rawGuest - Raw or sanitized guest string
 * @returns {{ label: string, greeting: string, fullTitle: string, subtitle: string, isPersonalized: boolean }}
 */
export function formatGuestGreeting(rawGuest) {
  let guest = (rawGuest || '').trim();

  // Normalize common casing like "Kushal & FAMILY" -> "Kushal & Family"
  if (guest) {
    guest = guest.replace(/\bFAMILY\b/gi, 'Family');
  }

  if (!guest) {
    return {
      label: 'WITH LOVE, WE WELCOME',
      greeting: 'Dear Family & Friends',
      fullTitle: 'With Love, We Welcome Dear Family & Friends',
      subtitle: 'You are a cherished part of our celebration.',
      isPersonalized: false,
    };
  }

  return {
    label: 'WITH LOVE, WE WELCOME',
    greeting: guest,
    fullTitle: `With Love, We Welcome ${guest}`,
    subtitle: 'You are a cherished part of our celebration.',
    isPersonalized: true,
  };
}

/**
 * Generates a shareable personalized link for a specific guest
 * @param {string} baseUrl - Base origin or site URL
 * @param {string} guestName - Guest or family name
 * @returns {string} Full personalized invitation URL
 */
export function createPersonalizedLink(baseUrl, guestName) {
  const cleanName = (guestName || '').trim();
  const cleanBase = (baseUrl || (typeof window !== 'undefined' ? window.location.origin : '')).replace(/\/$/, '');
  if (!cleanName) return cleanBase;
  return `${cleanBase}/?guest=${encodeURIComponent(cleanName)}`;
}

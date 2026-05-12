const KEY_DISPLAY_LABELS = {
  ' ': 'Space',
  arrowup: 'Arrow Up',
  arrowdown: 'Arrow Down',
  arrowleft: 'Arrow Left',
  arrowright: 'Arrow Right',
  control: 'Ctrl',
  escape: 'Esc',
  meta: 'Meta',
  capslock: 'Caps Lock',
  pageup: 'Page Up',
  pagedown: 'Page Down',
  numlock: 'Num Lock',
  scrolllock: 'Scroll Lock',
  printscreen: 'Print Screen',
};

export const formatKeyLabel = (key) => {
  if (!key) return '-';
  const normalized = key.toLowerCase();
  if (KEY_DISPLAY_LABELS[normalized]) return KEY_DISPLAY_LABELS[normalized];
  if (/^f\d{1,2}$/i.test(normalized)) {
    return normalized.toUpperCase();
  }
  if (normalized.length === 1) return normalized.toUpperCase();
  return normalized.replace(/\b\w/g, (char) => char.toUpperCase());
};

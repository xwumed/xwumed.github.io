(() => {
  'use strict';
  const root = document.documentElement;
  root.classList.add('js');
  const themeButton = document.querySelector('.theme-toggle');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  const links = [...navigation.querySelectorAll('a')];
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  let savedTheme = null;
  try { savedTheme = localStorage.getItem('xw-theme'); } catch (_) { /* Storage may be blocked. */ }
  const setTheme = (theme) => {
    root.dataset.theme = theme;
    themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  };
  setTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : preference.matches ? 'dark' : 'light');
  themeButton.hidden = false;
  menuButton.hidden = false;
  themeButton.addEventListener('click', () => {
    savedTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(savedTheme);
    try { localStorage.setItem('xw-theme', savedTheme); } catch (_) { /* Keep the session choice. */ }
  });
  preference.addEventListener('change', (event) => { if (!savedTheme) setTheme(event.matches ? 'dark' : 'light'); });
  const closeMenu = () => { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); };
  menuButton.addEventListener('click', () => {
    const open = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  navigation.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closeMenu(); menuButton.focus(); } });
  const activate = (id) => links.forEach((link) => {
    const active = link.hash === `#${id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  });
  links.forEach((link) => link.addEventListener('click', () => { activate(link.hash.slice(1)); closeMenu(); }));
  let scheduled = false;
  const updateActive = () => {
    const sections = [...document.querySelectorAll('main section[id]')];
    let current = sections[0];
    for (const section of sections) if (section.getBoundingClientRect().top <= 150) current = section;
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5) current = sections[sections.length - 1];
    activate(current.id);
    scheduled = false;
  };
  window.addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateActive); } }, {passive: true});
  const magnifier = document.querySelector('#paper-magnifier');
  const enlargedPage = magnifier.querySelector('img');
  const canHover = window.matchMedia('(hover: hover)');
  let previewButton = null;
  const closePreview = () => {
    magnifier.hidden = true;
    if (previewButton) previewButton.setAttribute('aria-expanded', 'false');
    previewButton = null;
  };
  const showPreview = (button) => {
    if (previewButton && previewButton !== button) previewButton.setAttribute('aria-expanded', 'false');
    previewButton = button;
    enlargedPage.src = button.querySelector('img').src;
    magnifier.hidden = false;
    button.setAttribute('aria-expanded', 'true');
  };
  document.querySelectorAll('.paper-preview').forEach((button) => {
    button.addEventListener('pointerenter', () => { if (canHover.matches) showPreview(button); });
    button.addEventListener('pointerleave', () => { if (canHover.matches) closePreview(); });
    button.addEventListener('focus', () => showPreview(button));
    button.addEventListener('blur', closePreview);
    button.addEventListener('click', () => showPreview(button));
  });
  magnifier.addEventListener('click', closePreview);
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closePreview(); });
  document.addEventListener('pointerdown', (event) => {
    if (previewButton && !previewButton.contains(event.target)) closePreview();
  });
  window.addEventListener('scroll', closePreview, {passive: true});
  window.addEventListener('resize', closePreview);
  document.querySelector('#year').textContent = String(new Date().getFullYear());
  updateActive();
})();

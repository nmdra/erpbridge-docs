import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  const LLMS_LINK_CLASS = 'llms-txt-link';

  const getBaseUrl = () => {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const parts = new URL(canonical.href).pathname.split('/').filter(Boolean);
      const rootIndex = parts.findIndex((segment) =>
        ['docs', 'blog', 'tags'].includes(segment)
      );
      if (rootIndex >= 0) {
        return `/${parts.slice(0, rootIndex).join('/')}/`;
      }
    }
    return '/';
  };

  const makeLink = () => {
    const anchor = document.createElement('a');
    anchor.className = LLMS_LINK_CLASS;
    anchor.href = `${getBaseUrl()}llms.txt`;
    anchor.title = 'llms.txt — full documentation index (llmstxt.org)';
    anchor.textContent = 'llms.txt';
    anchor.setAttribute('aria-label', 'Open the llms.txt documentation index');
    return anchor;
  };

  const ensureLink = () => {
    const container = document.getElementById('copy-page-button-container');
    if (!container) {
      return;
    }
    if (container.querySelector(`.${LLMS_LINK_CLASS}`)) {
      return;
    }
    const buttonSlot = container.querySelector('.copyPageContainer');
    const link = makeLink();
    if (buttonSlot && buttonSlot.nextSibling) {
      container.insertBefore(link, buttonSlot.nextSibling);
    } else {
      container.appendChild(link);
    }
  };

  const start = () => {
    ensureLink();
    const observer = new MutationObserver(ensureLink);
    observer.observe(document.body, {childList: true, subtree: true});
    setInterval(ensureLink, 1500);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
}
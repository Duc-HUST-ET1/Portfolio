import { SiteLayout } from '../components/layout/SiteLayout';
import { getAvailableNavigationItems, navigationConfiguration } from '../components/layout/navigation';

const previewNavigation = getAvailableNavigationItems(
  navigationConfiguration.map(({ id }) => id),
);

export function CoreLayoutPreview() {
  return (
    <SiteLayout navigationItems={previewNavigation}>
      <div className="layout-preview-banner" role="note">
        <span className="eyebrow">TEMPORARY PREVIEW / PHASE 3</span>
        <p>Structural layout preview. The labeled anchors below are placeholders, not portfolio content.</p>
      </div>

      {previewNavigation.map(({ id, label }, index) => (
        <section
          className={`layout-preview-slot${id === 'home' ? ' layout-preview-home' : ''}`}
          id={id}
          aria-labelledby={`${id}-preview-title`}
          tabIndex={-1}
          key={id}
        >
          <div className="layout-preview-index">{String(index).padStart(2, '0')} / {id}</div>
          <div className="layout-preview-content">
            {id === 'home' ? (
              <>
                <h1 id={`${id}-preview-title`}>Core layout preview</h1>
                <p>This temporary page shows how navigation, content width, section rhythm, theme control, and footer fit together.</p>
              </>
            ) : (
              <>
                <h2 id={`${id}-preview-title`}>{label} anchor</h2>
                <p>Structural placeholder for the future {label} section. Content is intentionally absent in Phase 3.</p>
              </>
            )}
          </div>
          <span className="layout-preview-tag">LAYOUT SLOT</span>
        </section>
      ))}
    </SiteLayout>
  );
}

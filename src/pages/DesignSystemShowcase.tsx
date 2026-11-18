import { ThemeControl } from '../components/ui/ThemeControl';

const colors = [
  { name: 'Background', token: '--color-background', value: '#F5F5F0 / #151A19' },
  { name: 'Surface', token: '--color-surface', value: '#FFFFFF / #202927' },
  { name: 'Muted surface', token: '--color-surface-muted', value: '#EAECE5 / #29322F' },
  { name: 'Primary', token: '--color-primary', value: '#203D35 / #9DBDAE' },
  { name: 'Accent', token: '--color-accent', value: '#D97843 / #E49A69' },
  { name: 'Text', token: '--color-text', value: 'Body copy' },
  { name: 'Muted text', token: '--color-text-muted', value: 'Secondary copy' },
  { name: 'Border', token: '--color-border', value: 'Structure' },
];

const spacing = [
  { token: '--space-1', label: '04', width: 'var(--space-1)' },
  { token: '--space-2', label: '08', width: 'var(--space-2)' },
  { token: '--space-3', label: '12', width: 'var(--space-3)' },
  { token: '--space-4', label: '16', width: 'var(--space-4)' },
  { token: '--space-5', label: '24', width: 'var(--space-5)' },
  { token: '--space-6', label: '32', width: 'var(--space-6)' },
  { token: '--space-7', label: '48', width: 'var(--space-7)' },
  { token: '--space-8', label: '64', width: 'var(--space-8)' },
];

export function DesignSystemShowcase() {
  return (
    <div className="showcase-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="showcase-header">
        <a className="wordmark" href="#top" aria-label="Design foundations, return to top">
          <span className="wordmark-mark" aria-hidden="true">S</span>
          <span>Systems / Design foundations</span>
        </a>
        <nav aria-label="Showcase sections" className="showcase-nav">
          <a href="#colors">Colors</a>
          <a href="#type">Type</a>
          <a href="#components">Components</a>
        </nav>
        <ThemeControl />
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="showcase-hero" id="top" aria-labelledby="page-title">
          <div>
            <p className="eyebrow">PORTFOLIO / DESIGN SYSTEM / PHASE 2</p>
            <h1 id="page-title">A clear foundation<br />for technical work.</h1>
            <p className="hero-description">A visual reference for color, type, spacing and interface controls. This showcase contains no personal profile, project or employment claims.</p>
            <a className="text-link" href="#components">Explore the foundations <span aria-hidden="true">↘</span></a>
          </div>
          <aside className="principle-note" aria-label="Design principle">
            <span className="eyebrow">DESIGN PRINCIPLE / 01</span>
            <p>Structure first.<br /><em>Clarity in every detail.</em></p>
            <span className="note-rule" aria-hidden="true" />
            <small>Technical editorial · warm neutral · restrained accent</small>
          </aside>
        </section>

        <section className="showcase-section" id="colors" aria-labelledby="colors-title">
          <div className="section-heading">
            <p className="eyebrow">01 / COLOR SYSTEM</p>
            <div><h2 id="colors-title">Grounded, legible, deliberate.</h2><p>Theme-specific brand colors are exact. Supporting text and state colors are tuned for readable contrast.</p></div>
          </div>
          <div className="palette-grid">
            {colors.map((color) => (
              <article className="swatch-card" key={color.token}>
                <div className={`swatch swatch-${color.token.replace('--color-', '')}`} aria-hidden="true" />
                <div className="swatch-copy"><strong>{color.name}</strong><code>{color.token}</code><small>{color.value}</small></div>
              </article>
            ))}
          </div>
          <div className="status-strip" aria-label="Feedback color tokens">
            <span className="status-item"><i className="status-dot success" />Success</span>
            <span className="status-item"><i className="status-dot warning" />Warning</span>
            <span className="status-item"><i className="status-dot error" />Error</span>
            <span className="status-item selection-sample">Text selection</span>
          </div>
        </section>

        <section className="showcase-section" id="type" aria-labelledby="type-title">
          <div className="section-heading">
            <p className="eyebrow">02 / TYPOGRAPHY &amp; RHYTHM</p>
            <div><h2 id="type-title">Editorial voice, technical detail.</h2><p>System fonts keep the initial foundation fast and dependable. Monospace is reserved for metadata and code.</p></div>
          </div>
          <div className="type-layout">
            <div className="type-samples">
              <div className="type-row"><span className="sample-label">Display / serif</span><p className="sample-display">Engineering,<br />made understandable.</p></div>
              <div className="type-row"><span className="sample-label">Heading / sans</span><h3 className="sample-heading">Designed for clear reading.</h3></div>
              <div className="type-row"><span className="sample-label">Body / 16 px</span><p className="sample-body">A reliable interface gives every piece of information a clear place. Content, controls and supporting details follow a consistent rhythm.</p></div>
              <div className="type-row"><span className="sample-label">Metadata / mono</span><code className="sample-mono">SYSTEMS / DOCUMENTATION / 001</code></div>
            </div>
            <aside className="spacing-panel">
              <span className="eyebrow">SPACING SCALE</span>
              <h3>Consistent by design.</h3>
              <ul>{spacing.map((item) => <li key={item.token}><code>{item.token}</code><span className="spacing-bar" style={{ width: item.width }} /><small>{item.label}px</small></li>)}</ul>
            </aside>
          </div>
        </section>

        <section className="showcase-section" id="components" aria-labelledby="components-title">
          <div className="section-heading">
            <p className="eyebrow">03 / INTERFACE ELEMENTS</p>
            <div><h2 id="components-title">Small controls, clear feedback.</h2><p>Native elements preserve expected keyboard behavior. Tab through the examples to inspect focus styling.</p></div>
          </div>
          <div className="component-grid">
            <article className="component-panel">
              <p className="eyebrow">ACTIONS &amp; LINKS</p>
              <div className="action-row"><button className="button button-primary" type="button">Primary action <span aria-hidden="true">↗</span></button><button className="button" type="button">Secondary action</button></div>
              <a className="text-link" href="#type">Text link <span aria-hidden="true">→</span></a>
            </article>
            <article className="component-panel">
              <p className="eyebrow">FORM CONTROLS</p>
              <label className="field-label" htmlFor="sample-input">Text field <span>Optional</span></label>
              <input className="text-input" id="sample-input" type="text" placeholder="Example value" />
              <label className="check-control"><input type="checkbox" defaultChecked /> <span>Selected state</span></label>
            </article>
            <article className="component-panel surface-demo">
              <p className="eyebrow">SURFACE &amp; BORDER</p>
              <div className="mini-card"><span className="mini-card-index">NOTE / 01</span><strong>Quiet structure</strong><p>Surfaces support hierarchy without adding visual noise.</p></div>
            </article>
            <article className="component-panel">
              <p className="eyebrow">FOCUS &amp; STATES</p>
              <p className="component-copy">Focus rings use a high-contrast warm accent and remain visible against both themes.</p>
              <button className="button focus-demo" type="button">Keyboard focus example</button>
            </article>
          </div>
        </section>
      </main>
      <footer className="showcase-footer"><span>DESIGN SYSTEM / FOUNDATIONS</span><span>Prototype showcase · no portfolio claims</span></footer>
    </div>
  );
}

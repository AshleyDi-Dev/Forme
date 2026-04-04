import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Card from '../components/Card'
import Badge from '../components/Badge'
import ProgressBar from '../components/ProgressBar'
import PageHeader from '../components/PageHeader'
import SelectionCard from '../components/SelectionCard'
import Divider from '../components/Divider'
import { useState } from 'react'

function SelectionCardDemo() {
  const [selected, setSelected] = useState(null)
  const options = [
    { id: 'a', label: 'Hourglass', icon: '⧖' },
    { id: 'b', label: 'Rectangle', icon: '▭' },
    { id: 'c', label: 'Pear', icon: '🍐' },
    { id: 'd', label: 'Inverted Triangle', icon: '▽' },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-sm)' }}>
      {options.map(o => (
        <SelectionCard
          key={o.id}
          label={o.label}
          icon={o.icon}
          selected={selected === o.id}
          onSelect={() => setSelected(o.id)}
        />
      ))}
    </div>
  )
}

export default function Tokens() {
  return (
    <div style={{ padding: '40px 24px', maxWidth: '720px', margin: '0 auto' }}>
      <p style={{ fontSize: '12px', letterSpacing: '0.06em', color: 'var(--color-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Design Tokens</p>
      <h1 style={{ fontSize: 'var(--text-heading)', marginBottom: '48px' }}>GlowUp Token Preview</h1>

      {/* ── Colour ── */}
      <Section title="Colour">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
          {[
            { name: 'Background',       value: 'var(--color-bg)',             hex: '#F9F7F5' },
            { name: 'Surface',          value: 'var(--color-surface)',        hex: '#FFFFFF' },
            { name: 'Text Primary',     value: 'var(--color-text-primary)',   hex: '#1A1A1A' },
            { name: 'Text Secondary',   value: 'var(--color-text-secondary)', hex: '#767676' },
            { name: 'Border',           value: 'var(--color-border)',         hex: '#E8E4E0' },
            { name: 'Accent',           value: 'var(--color-accent)',         hex: '#B87F6A' },
            { name: 'Accent Muted',     value: 'var(--color-accent-muted)',   hex: '#F0E6E1' },
            { name: 'Success',          value: 'var(--color-success)',        hex: '#5A8A6A' },
            { name: 'Success Muted',    value: 'var(--color-success-muted)',  hex: '#EAF2EC' },
            { name: 'Error',            value: 'var(--color-error)',          hex: '#C05A5A' },
            { name: 'Error Muted',      value: 'var(--color-error-muted)',    hex: '#F9EDED' },
            { name: 'Warning',          value: 'var(--color-warning)',        hex: '#B87D3E' },
            { name: 'Warning Muted',    value: 'var(--color-warning-muted)',  hex: '#FAF2E6' },
          ].map(({ name, value, hex }) => (
            <div key={name}>
              <div style={{
                height: '56px',
                borderRadius: 'var(--radius-md)',
                background: value,
                border: '1px solid var(--color-border)',
                marginBottom: '6px',
              }} />
              <p style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--font-weight-medium)', marginBottom: '2px' }}>{name}</p>
              <p style={{ fontSize: 'var(--text-label)', color: 'var(--color-text-secondary)' }}>{hex}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Typography ── */}
      <Section title="Typography">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <TypeRow label="Display · 40px · 400" style={{ fontSize: 'var(--text-display)', fontWeight: 'var(--font-weight-regular)', letterSpacing: 'var(--letter-spacing-tight)' }}>Your style, defined.</TypeRow>
          <TypeRow label="Heading · 28px · 500" style={{ fontSize: 'var(--text-heading)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-tight)' }}>Your style, defined.</TypeRow>
          <TypeRow label="Subheading · 20px · 500" style={{ fontSize: 'var(--text-subheading)', fontWeight: 'var(--font-weight-medium)' }}>Body Analysis Results</TypeRow>
          <TypeRow label="Body · 16px · 400" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--line-height-body)' }}>Understanding your proportions helps you dress in a way that feels effortless and intentional.</TypeRow>
          <TypeRow label="Caption · 13px · 400" style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-body)' }}>Last updated 3 days ago</TypeRow>
          <TypeRow label="Label · 12px · 500 · tracked" style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-wide)', textTransform: 'uppercase' }}>Body Type</TypeRow>
        </div>
      </Section>

      {/* ── Spacing ── */}
      <Section title="Spacing">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { name: '--space-xs', px: '4px' },
            { name: '--space-sm', px: '8px' },
            { name: '--space-md', px: '16px' },
            { name: '--space-lg', px: '24px' },
            { name: '--space-xl', px: '40px' },
            { name: '--space-2xl', px: '64px' },
          ].map(({ name, px }) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <p style={{ fontSize: 'var(--text-label)', color: 'var(--color-text-secondary)', width: '120px', flexShrink: 0 }}>{name} · {px}</p>
              <div style={{ height: '12px', width: px, background: 'var(--color-accent)', borderRadius: '2px' }} />
            </div>
          ))}
        </div>
      </Section>

      {/* ── Border radius ── */}
      <Section title="Border Radius">
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {[
            { name: 'sm · 4px',  radius: 'var(--radius-sm)',  label: 'Badge / Input' },
            { name: 'md · 8px',  radius: 'var(--radius-md)',  label: 'Card / Button' },
            { name: 'lg · 12px', radius: 'var(--radius-lg)',  label: 'Modal / Sheet' },
          ].map(({ name, radius, label }) => (
            <div key={name} style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px', height: '80px',
                borderRadius: radius,
                background: 'var(--color-accent-muted)',
                border: '1px solid var(--color-border)',
                marginBottom: '8px',
              }} />
              <p style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--font-weight-medium)' }}>{name}</p>
              <p style={{ fontSize: 'var(--text-label)', color: 'var(--color-text-secondary)' }}>{label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Shadow ── */}
      <Section title="Shadow">
        <div
          style={{
            width: '180px',
            height: '80px',
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>--shadow-card</p>
        </div>
      </Section>

      {/* ── Divider ── */}
      <Section title="Divider">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          <Row label="Plain">
            <div style={{ width: '100%' }}><Divider /></div>
          </Row>
          <Row label="With label">
            <div style={{ width: '100%' }}><Divider label="or" /></div>
          </Row>
          <Row label="Custom label">
            <div style={{ width: '100%' }}><Divider label="continue with" /></div>
          </Row>
        </div>
      </Section>

      {/* ── SelectionCard ── */}
      <Section title="SelectionCard">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <Row label="Interactive — click to select">
            <SelectionCardDemo />
          </Row>
        </div>
      </Section>

      {/* ── PageHeader ── */}
      <Section title="PageHeader">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          <div style={{ borderBottom: '1px solid var(--color-border)' }}>
            <p style={{ fontSize: 'var(--text-label)', color: 'var(--color-text-secondary)', padding: 'var(--space-xs) var(--space-md)', letterSpacing: 'var(--letter-spacing-wide)', textTransform: 'uppercase' }}>Title only</p>
            <PageHeader title="Style Results" />
          </div>
          <div style={{ borderBottom: '1px solid var(--color-border)' }}>
            <p style={{ fontSize: 'var(--text-label)', color: 'var(--color-text-secondary)', padding: 'var(--space-xs) var(--space-md)', letterSpacing: 'var(--letter-spacing-wide)', textTransform: 'uppercase' }}>With subtitle</p>
            <PageHeader title="Body Analysis" subtitle="Step 2 of 5" />
          </div>
          <div style={{ borderBottom: '1px solid var(--color-border)' }}>
            <p style={{ fontSize: 'var(--text-label)', color: 'var(--color-text-secondary)', padding: 'var(--space-xs) var(--space-md)', letterSpacing: 'var(--letter-spacing-wide)', textTransform: 'uppercase' }}>With back button</p>
            <PageHeader title="Hair Quiz" subtitle="Step 1 of 4" back />
          </div>
          <div>
            <p style={{ fontSize: 'var(--text-label)', color: 'var(--color-text-secondary)', padding: 'var(--space-xs) var(--space-md)', letterSpacing: 'var(--letter-spacing-wide)', textTransform: 'uppercase' }}>With back + right action</p>
            <PageHeader
              title="Saved Items"
              back
              rightAction={<Button variant="ghost" style={{ padding: '4px 10px', fontSize: '11px' }}>Edit</Button>}
            />
          </div>
        </div>
      </Section>

      {/* ── ProgressBar ── */}
      <Section title="ProgressBar">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', maxWidth: '480px' }}>
          <ProgressBar value={0} label="Step 0 of 5" />
          <ProgressBar value={40} label="Step 2 of 5" />
          <ProgressBar value={60} label="Step 3 of 5" showPercent />
          <ProgressBar value={100} label="Complete" showPercent />
        </div>
      </Section>

      {/* ── Badge ── */}
      <Section title="Badge">
        <Row label="Quiz modules">
          <Badge variant="body">Body</Badge>
          <Badge variant="face">Face</Badge>
          <Badge variant="hair">Hair</Badge>
          <Badge variant="color">Color</Badge>
          <Badge variant="neutral">Neutral</Badge>
        </Row>
      </Section>

      {/* ── Card ── */}
      <Section title="Card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <Row label="Default">
            <Card style={{ width: '100%' }}>
              <p style={{ fontSize: 'var(--text-body)' }}>Default card with standard padding.</p>
              <p style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-xs)' }}>Supporting detail text sits here.</p>
            </Card>
          </Row>
          <Row label="Clickable">
            <Card clickable style={{ width: '100%' }}>
              <p style={{ fontSize: 'var(--text-body)' }}>Clickable card — hover to see state.</p>
              <p style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-xs)' }}>Renders as a button element.</p>
            </Card>
          </Row>
          <Row label="Padding variants">
            {['none', 'sm', 'md', 'lg', 'xl'].map(p => (
              <Card key={p} padding={p} style={{ flex: 1, minWidth: '80px' }}>
                <p style={{ fontSize: 'var(--text-label)', color: 'var(--color-text-secondary)', textAlign: 'center' }}>{p}</p>
              </Card>
            ))}
          </Row>
        </div>
      </Section>

      {/* ── TextInput ── */}
      <Section title="TextInput">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', maxWidth: '400px' }}>
          <TextInput label="Default" placeholder="e.g. Ashley" />
          <TextInput label="With helper text" placeholder="you@example.com" helperText="We'll never share your email." />
          <TextInput label="Error state" placeholder="Enter your name" error="This field is required." defaultValue="bad input" />
          <TextInput label="Success state" placeholder="Enter your name" success="Looks good!" defaultValue="Ashley" />
          <TextInput label="Disabled" placeholder="Cannot edit" disabled defaultValue="Locked value" />
        </div>
      </Section>

      {/* ── Button ── */}
      <Section title="Button">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          <Row label="Primary">
            <Button variant="primary">Save Results</Button>
            <Button variant="primary" loading>Saving...</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </Row>
          <Row label="Ghost">
            <Button variant="ghost">Back</Button>
            <Button variant="ghost" loading>Loading...</Button>
            <Button variant="ghost" disabled>Disabled</Button>
          </Row>
          <Row label="Destructive">
            <Button variant="destructive">Delete Profile</Button>
            <Button variant="destructive" disabled>Disabled</Button>
          </Row>
          <Row label="Full Width">
            <div style={{ width: '100%' }}>
              <Button variant="primary" fullWidth>Continue</Button>
            </div>
          </Row>
        </div>
      </Section>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '48px' }}>
      <p style={{
        fontSize: 'var(--text-label)',
        fontWeight: 'var(--font-weight-medium)',
        letterSpacing: 'var(--letter-spacing-wide)',
        textTransform: 'uppercase',
        color: 'var(--color-text-secondary)',
        marginBottom: '20px',
        paddingBottom: '12px',
        borderBottom: '1px solid var(--color-border)',
      }}>
        {title}
      </p>
      {children}
    </div>
  )
}

function Row({ label, children }) {
  return (
    <div>
      <p style={{ fontSize: 'var(--text-label)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-sm)', letterSpacing: 'var(--letter-spacing-wide)', textTransform: 'uppercase' }}>{label}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)', alignItems: 'center' }}>{children}</div>
    </div>
  )
}

function TypeRow({ label, style, children }) {
  return (
    <div>
      <p style={{ fontSize: 'var(--text-label)', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>{label}</p>
      <p style={style}>{children}</p>
    </div>
  )
}

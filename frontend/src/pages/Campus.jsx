import Dashboard from './Dashboard';

export default function Campus() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <button onClick={() => (window.location.href = "/ai")}>
  Open AI Tutor 🤖
      </button>
      <Dashboard />
    </div>
  );
}
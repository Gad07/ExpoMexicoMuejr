import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '2rem',
      fontFamily: 'var(--font-body)',
    }}>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '6rem',
        fontWeight: 900,
        color: 'var(--navy)',
        margin: 0,
        lineHeight: 1,
      }}>404</h1>
      <p style={{
        fontSize: '1.25rem',
        color: '#555',
        marginTop: '1rem',
        maxWidth: '400px',
      }}>Lo sentimos, esta página no existe o fue movida.</p>
      <Link href="/" style={{
        marginTop: '2rem',
        padding: '0.85rem 2rem',
        background: 'var(--magenta)',
        color: '#fff',
        borderRadius: '50px',
        fontWeight: 700,
        textDecoration: 'none',
        fontSize: '1rem',
      }}>
        Volver al Inicio
      </Link>
    </div>
  );
}

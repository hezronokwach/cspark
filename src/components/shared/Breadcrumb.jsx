import { Link } from 'react-router-dom';

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-2 text-sm font-display font-semibold" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={item.href || item.label} className="flex items-center gap-2">
          {i > 0 && (
            <span className="text-white/50">/</span>
          )}
          {item.href ? (
            <Link to={item.href} className="text-white/60 hover:text-white transition-colors duration-300">
              {item.label}
            </Link>
          ) : (
            <span className="text-plot">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
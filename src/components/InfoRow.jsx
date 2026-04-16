export default function InfoRow({ icon: Icon, label, value, className = '' }) {
  return (
    <div className={`flex items-center gap-3 py-2 ${className}`}>
      {Icon && <Icon size={18} className="text-luxury-accent flex-shrink-0" />}
      <div className="flex-1 min-w-0">
        <p className="text-caption text-luxury-text-secondary">{label}</p>
        <p className="text-body font-medium text-luxury-text truncate">{value}</p>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: string;
  title: string;
  value: string | number;
  suffix?: string; // Por si quieres añadir "€" o "uds"
}

export const StatCard = ({ icon, title, value, suffix = "" }: StatCardProps) => {
  return (
    <div className="card">
      <div className="card-icon">{icon}</div>
      <h4>{title}</h4>
      <p className="card-value">
        {value}{suffix}
      </p>
    </div>
  );
};
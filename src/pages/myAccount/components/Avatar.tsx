const colors = [
  'bg-warning/20 text-warning-dark border-warning-dark',
  'bg-danger/20 text-danger-dark border-danger-dark',
  'bg-info/20 text-info-dark border-info-dark',
  'bg-success/20 text-success-dark border-success-dark',
  'bg-gray/20 text-dark-gray border-dark-gray',
  'bg-res/20 text-res-dark border-res-dark',
  'bg-hall/20 text-hall-dark border-hall-dark'
]

interface AvatarProps {
  name: string;
  id: number;
}

export const Avatar = ({ name, id }: AvatarProps) => {
  const colorClasses = colors[id % colors.length];

  return (
    <span
      className={`py-6.5 px-8.5 backdrop-grayscale-100 rounded-xl border-3 block shrink-0 text-3xl ${colorClasses}`}
      aria-hidden
    >
      {name[0]}
    </span>
  );
};
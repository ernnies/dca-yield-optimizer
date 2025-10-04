interface ProgressBarProps {
  label: string;
  value: number;
  max: number;
}

export default function ProgressBar({ label, value, max }: ProgressBarProps) {
  const percentage = (value / max) * 100;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-blue-500 h-4 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600">{value} / {max}</p>
    </div>
  );
}
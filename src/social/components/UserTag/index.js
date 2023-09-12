const { useState, useEffect } = require('react');

function UserTag({ text, variant, className }) {
  if (!text) return;

  const [bgColor, setBgColor] = useState('');
  useEffect(() => {
    switch (variant) {
      case 'role':
        setBgColor('bg-[#EFF0E5]');
        return;
      default:
        setBgColor('bg-[#EBF2F1]');
        return;
    }
  }, [variant]);

  return (
    <span
      className={`whitespace-nowrap rounded-full px-2 py-1 text-[12px] uppercase font-mon font-bold text-[#222222] tracking-[1%] ${bgColor} ${className}`}
    >
      {text}
    </span>
  );
}

export default UserTag;

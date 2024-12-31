import { useEffect, useState } from 'react';

interface Star {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
}

export function CelebrationEffects() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 2 + 1
    }));
    setStars(newStars);

    const timeout = setTimeout(() => {
      setStars([]);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Ribbons */}
      <div className="absolute inset-0 animate-ribbons">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-32 bg-gradient-to-b from-[#FFD700] to-transparent"
            style={{
              left: `${i * 20}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `fallDown ${1 + Math.random()}s ease-out forwards`,
              opacity: 0
            }}
          />
        ))}
      </div>

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-twinkle"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `twinkle ${star.duration}s ease-out forwards`
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-full h-full text-[#FFD700]"
          >
            <path
              d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}

      {/* Gift wrapper effect */}
      <div className="absolute inset-x-0 top-0 animate-wrapper">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 animate-wrapper">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
      </div>
      <div className="absolute inset-y-0 left-0 animate-wrapper">
        <div className="w-1 h-full bg-gradient-to-b from-transparent via-[#FFD700] to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 animate-wrapper">
        <div className="w-1 h-full bg-gradient-to-b from-transparent via-[#FFD700] to-transparent" />
      </div>
    </div>
  );
}
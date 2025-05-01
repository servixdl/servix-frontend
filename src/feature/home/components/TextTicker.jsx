import { useEffect, useRef, useState } from "react";

export default function TextTicker({ value = 0, duration = 1500 }) {
  const [current, setCurrent] = useState(0);
  const start = useRef(0);
  const startTime = useRef(null);

  useEffect(() => {
    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = timestamp - startTime.current;

      const percent = Math.min(progress / duration, 1);
      const eased = easeOutCubic(percent);

      const animatedValue = Math.floor(
        start.current + (value - start.current) * eased
      );
      setCurrent(animatedValue);

      if (percent < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-highlight text-9xl">
        {current.toLocaleString("es-CL")}
      </span>
      <span className="text-sm text-muted-foreground">
        Servicios publicados
      </span>
    </div>
  );
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

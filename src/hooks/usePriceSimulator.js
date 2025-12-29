import { useEffect } from 'react';

export const usePriceSimulator = (setData) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev =>
        prev.map(item => {
          const delta = (Math.random() - 0.5) * 1; // small movement
          const newPrice = +(item.price * (1 + delta / 100)).toFixed(2);

          const change =
            +(((newPrice - item.open24h) / item.open24h) * 100).toFixed(2);

          if (newPrice === item.price) return item;

          return {
            ...item,
            price: newPrice,
            change,
          };
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [setData]);
};

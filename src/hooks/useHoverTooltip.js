import { useCallback, useState } from 'react';

const useHoverTooltip = (globalRecords) => {
  const [hoverInfo, setHoverInfo] = useState(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

  const handleHoverInfo = useCallback(
    ({ item, section }) => {
      setHoverInfo({
        globalRecord: globalRecords[item.id] || null,
        item,
        section,
      });
    },
    [globalRecords]
  );

  const clearHoverInfo = useCallback(() => {
    setHoverInfo(null);
  }, []);

  return {
    clearHoverInfo,
    handleHoverInfo,
    hoverInfo,
    hoverPos,
    setHoverPos,
  };
};

export default useHoverTooltip;

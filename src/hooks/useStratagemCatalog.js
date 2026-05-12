import { useMemo } from 'react';

const useStratagemCatalog = ({
  allStratagems,
  selectedIds,
  stratagemSections,
  wikiQuery,
  wikiSection,
}) => {
  const availableStratagems = useMemo(
    () => allStratagems.filter((item) => selectedIds.includes(item.id)),
    [allStratagems, selectedIds]
  );

  const wikiSections = useMemo(
    () => stratagemSections.map((section) => section.name),
    [stratagemSections]
  );

  const wikiResults = useMemo(() => {
    const query = wikiQuery.trim().toLowerCase();
    return allStratagems.filter((item) => {
      if (wikiSection !== 'all' && item.section !== wikiSection) return false;
      if (!query) return true;
      return (
        item.name.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query)
      );
    });
  }, [allStratagems, wikiQuery, wikiSection]);

  return {
    availableStratagems,
    wikiResults,
    wikiSections,
  };
};

export default useStratagemCatalog;

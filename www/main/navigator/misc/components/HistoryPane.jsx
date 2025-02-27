import React from 'react';
import PropTypes from 'prop-types';
import { useStoreState, useStoreActions } from 'easy-peasy';

export const HistoryPane = ({ className }) => {
  const {
    verseHistory,
    activeShabadId,
    initialVerseId,
    versesRead,
    isCeremonyBani,
    isSundarGutkaBani,
    ceremonyId,
    sundarGutkaBaniId,
    homeVerse,
    activeVerseId,
  } = useStoreState(state => state.navigator);
  const {
    setActiveShabadId,
    setInitialVerseId,
    setVersesRead,
    setIsCeremonyBani,
    setIsSundarGutkaBani,
    setCeremonyId,
    setSundarGutkaBaniId,
    setHomeVerse,
    setActiveVerseId,
  } = useStoreActions(state => state.navigator);

  const openShabadFromHistory = element => {
    if (element.continueFrom !== initialVerseId) {
      setInitialVerseId(element.continueFrom);
    }
    if (element.homeVerse !== homeVerse) {
      setHomeVerse(element.homeVerse);
    }
    if (element.versesRead !== versesRead) {
      setVersesRead(element.versesRead);
    }
    if (element.type === 'shabad') {
      if (isSundarGutkaBani) {
        setIsSundarGutkaBani(false);
      }
      if (isCeremonyBani) {
        setIsCeremonyBani(false);
      }
      if (element.shabadId !== activeShabadId) {
        setActiveShabadId(element.shabadId);
      }
      if (element.verseId !== activeVerseId) {
        setActiveVerseId(element.verseId);
      }
    }
    if (element.type === 'ceremony') {
      if (isSundarGutkaBani) {
        setIsSundarGutkaBani(false);
      }
      if (!isCeremonyBani) {
        setIsCeremonyBani(true);
      }
      if (ceremonyId !== element.shabadId) {
        setCeremonyId(element.shabadId);
      }
    }
    if (element.type === 'bani') {
      if (isCeremonyBani) {
        setIsCeremonyBani(false);
      }
      if (!isSundarGutkaBani) {
        setIsSundarGutkaBani(true);
      }

      if (sundarGutkaBaniId !== element.shabadId) {
        setSundarGutkaBaniId(element.shabadId);
      }
    }
  };

  const versesMarkup = [];

  verseHistory.forEach(element => {
    versesMarkup.push(
      <p
        className="history-item gurmukhi"
        key={`history-${element.shabadId}`}
        onClick={() => {
          openShabadFromHistory(element);
        }}
      >
        {element.label}
      </p>,
    );
  });

  return <div className={`history-results ${className}`}>{versesMarkup}</div>;
};

HistoryPane.propTypes = {
  className: PropTypes.string,
};

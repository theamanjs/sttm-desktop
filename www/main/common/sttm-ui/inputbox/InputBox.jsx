import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { searchShabads, loadAng } from '../../../navigator/utils';

const InputBox = ({ placeholder, disabled, className }) => {
  const { currentSearchType, currentSource, searchQuery, shortcuts } = useStoreState(
    state => state.navigator,
  );
  const { setSearchData, setSearchQuery, setShortcuts } = useStoreActions(state => state.navigator);

  const inputRef = useRef(null);
  const handleChange = event => {
    setSearchQuery(event.target.value);
  };

  // keyboard shortcut to focus on search input
  const focusInputbox = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    if (shortcuts.focusInput) {
      focusInputbox();
      setShortcuts({
        ...shortcuts,
        focusInput: false,
      });
    }
  }, [shortcuts]);

  useEffect(() => {
    const searchTypeInt = parseInt(searchQuery, 10);
    const isAng = !!searchTypeInt;
    if (isAng) {
      loadAng(searchTypeInt).then(rows => setSearchData(rows));
    } else {
      searchShabads(searchQuery, currentSearchType, currentSource).then(rows =>
        searchQuery ? setSearchData(rows) : setSearchData([]),
      );
    }
  }, [searchQuery, currentSearchType, currentSource]);

  return (
    <>
      <input
        className={`input-box ${className}`}
        type="search"
        ref={inputRef}
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleChange}
        disabled={disabled}
      />
    </>
  );
};

InputBox.propTypes = {
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default InputBox;

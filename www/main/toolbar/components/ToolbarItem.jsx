import React from 'react';
import PropTypes from 'prop-types';
import { useStoreActions, useStoreState } from 'easy-peasy';

import { ipcRenderer } from 'electron';
import { DEFAULT_OVERLAY } from '../../common/constants';

const ToolbarItem = ({ itemName }) => {
  const { overlayScreen } = useStoreState((state) => state.app);
  const { setOverlayScreen } = useStoreActions((actions) => actions.app);
  const isSelectedOverlay = overlayScreen === itemName;

  return (
    <div
      id={`tool-${itemName}`}
      className="toolbar-item"
      onClick={() => {
        document.body.classList.toggle(`overlay-${itemName}-active`, !isSelectedOverlay);
        if (itemName === 'sso') {
          ipcRenderer.send('open-sso-window');
        }
        if (isSelectedOverlay) {
          return setOverlayScreen(DEFAULT_OVERLAY);
        }

        setOverlayScreen(itemName);
        return null;
      }}
    ></div>
  );
};

ToolbarItem.propTypes = {
  itemName: PropTypes.string.isRequired,
};

export default ToolbarItem;

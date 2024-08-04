import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import * as S from './style'

interface FilterProps {
  open: boolean;
  anchorRef: React.RefObject<HTMLDivElement>;
  options: string[];
  selectedIndex: number | null;
  handleClose: (event: Event) => void;
  handleToggle: () => void;
  handleMenuItemClick: (index: number) => void;
}

export const Filter = ({
  anchorRef,
  open,
  options,
  selectedIndex,
  handleClose,
  handleToggle,
  handleMenuItemClick
}: FilterProps) => {

  return (
    <>
      <S.FilterContent ref={anchorRef}>
        <S.ButtonFilter onClick={handleToggle}>{options[selectedIndex] || 'Filter'}</S.ButtonFilter>
        <S.ButtonText onClick={handleToggle}>
          <S.Icon/>
        </S.ButtonText>
      </S.FilterContent>
      <Popper
        sx={{
          zIndex: 12,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={() => handleMenuItemClick(index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

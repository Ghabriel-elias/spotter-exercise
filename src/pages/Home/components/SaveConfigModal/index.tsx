import React, { useState } from 'react';
import { Modal, Box, Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

interface SaveLoadModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  onLoad: (name: string) => void;
}

export const SaveConfigModal: React.FC<SaveLoadModalProps> = ({ open, onClose, onSave, onLoad }) => {
  const [name, setName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleSave = () => {
    onSave(name);
    setName('');
    onClose();
  };

  const handleLoad = () => {
    onLoad(selectedTemplate);
    setSelectedTemplate('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: '8px', width: 300 }}>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Template Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
          Save
        </Button>
        <FormControl fullWidth margin="normal">
          <InputLabel id="load-template-label">Load Template</InputLabel>
          <Select
            labelId="load-template-label"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            fullWidth
          >
            {Object.keys(localStorage).map((key) => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="secondary" onClick={handleLoad} sx={{ mt: 2 }}>
          Load
        </Button>
      </Box>
    </Modal>
  );
};

import React from 'react';
import { FormControl, Select, MenuItem, Box, Typography } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { useTheme } from '../hooks/useTheme';
import { GiGoldBar } from "react-icons/gi";

export type CurrencyUnit = 'troy-ounce' | 'pawn';

interface CurrencyDropdownProps {
  value: CurrencyUnit;
  onChange: (unit: CurrencyUnit) => void;
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({ value, onChange }) => {
  const { isDark } = useTheme();

  const handleChange = (event: SelectChangeEvent<CurrencyUnit>) => {
    onChange(event.target.value as CurrencyUnit);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, marginRight: 1.5 }}>
        <GiGoldBar 
          style={{ 
            color: '#F5D300', 
            fontSize: '1.75rem' 
          }} 
        />
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#F5D300',
            fontSize: '0.95rem',
            fontWeight: 600,
          }}
        >
          24K
        </Typography>
      </Box>
      <Typography 
        variant="body2" 
        sx={{ 
          color: isDark ? '#cccccc' : '#666666',
          fontSize: '0.875rem',
          fontWeight: 500,
        }}
      >
        Unit:
      </Typography>
      <FormControl 
        size="small" 
        sx={{ 
          minWidth: 140,
          '& .MuiOutlinedInput-root': {
            backgroundColor: isDark ? '#1a1a1a' : '#F5F5F5',
            '& fieldset': {
              borderColor: isDark ? '#333333' : '#CCCCCC',
            },
            '&:hover fieldset': {
              borderColor: isDark ? '#555555' : '#999999',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#F5D300',
            },
          },
          '& .MuiSelect-select': {
            color: isDark ? '#FFFFFF' : '#000000',
            fontSize: '0.875rem',
            fontWeight: 500,
          },
        }}
      >
        <Select
          value={value}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Currency unit' }}
        >
          <MenuItem value="troy-ounce">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '0.875rem' }}>Troy Ounce (USD)</Typography>
            </Box>
          </MenuItem>
          <MenuItem value="pawn">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '0.875rem' }}>1 Pawn (LKR)</Typography>
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default CurrencyDropdown;

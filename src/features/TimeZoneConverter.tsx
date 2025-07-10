import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
    Autocomplete
} from '@mui/material';
import {
    DateTimePicker,
    LocalizationProvider
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
    toZonedTime,
    fromZonedTime
} from 'date-fns-tz';
import { isValid } from 'date-fns';
import timezones from 'timezones-list'
import CustomResponsiveBox from '@/components/CustomResponsiveBox';

const timezoneOptions = timezones.map((tz) => ({
    label: tz.label,
    tzCode: tz.tzCode,
}));

const TimeZoneConverter: React.FC = () => {
    const [inputDate, setInputDate] = useState<Date | null>(new Date());
    const [sourceTimezone, setSourceTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York');
    const [targetTimezone, setTargetTimezone] = useState('America/New_York');
    const [convertedDate, setConvertedDate] = useState<Date | null>(null);
    const [error, setError] = useState('');

    const convertTimezone = () => {
        try {
            if (!inputDate || !isValid(inputDate)) {
                throw new Error('Invalid input date');
            }

            const utcDate = fromZonedTime(inputDate, sourceTimezone);
            const targetZonedDate = toZonedTime(utcDate, targetTimezone);

            setConvertedDate(targetZonedDate);
            setError('');
        } catch (err) {
            console.error(err);
            setError('Conversion failed. Check date or timezones.');
            setConvertedDate(null);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Time Zone Converter
                </Typography>

                {/* Input Picker */}
                <DateTimePicker
                    data-cy="timezone-input"
                    label="Select Date and Time"
                    value={inputDate}
                    onChange={(newValue) => setInputDate(newValue)}
                    format='yyyy-MM-dd hh:mm a'
                    slotProps={{
                        textField: { fullWidth: true, sx: { marginBottom: 2 } }
                    }}
                />

                <Box sx={{ marginBottom: 2 }}>
                    <Autocomplete
                        data-cy="timezone-source"
                        options={timezoneOptions}
                        getOptionLabel={(option) => option.label}
                        value={timezoneOptions.find(tz => tz.tzCode === sourceTimezone) || null}
                        onChange={(_, newValue) => {
                            setSourceTimezone(newValue ? newValue.tzCode : '');
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Source Timezone"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                    <Autocomplete
                        data-cy="timezone-target"
                        options={timezoneOptions}
                        getOptionLabel={(option) => option.label}
                        value={timezoneOptions.find(tz => tz.tzCode === targetTimezone) || null}
                        onChange={(_, newValue) => {
                            setTargetTimezone(newValue ? newValue.tzCode : '');
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Target Timezone"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </Box>

                <CustomResponsiveBox>
                    <Button data-cy="convert-timezone" variant="contained" onClick={convertTimezone}>
                        Convert Timezone
                    </Button>
                </CustomResponsiveBox>

                {/* Error */}
                {error && (
                    <Typography data-cy="convert-timezone-error" color="error" variant="body2" gutterBottom>
                        {error}
                    </Typography>
                )}

                {/* Output Picker */}
                {convertedDate && (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Converted Date and Time:
                        </Typography>
                        <DateTimePicker
                        data-cy="timezone-output"
                            label={`DateTime in ${targetTimezone}`}
                            value={convertedDate}
                            readOnly
                            format='yyyy-MM-dd hh:mm a'
                            slotProps={{
                                textField: { fullWidth: true, sx: { marginBottom: 2 } }
                            }}
                        />
                    </>
                )}
            </Box>
        </LocalizationProvider>
    );
};

export default TimeZoneConverter;
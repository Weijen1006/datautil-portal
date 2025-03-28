import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DataObjectIcon from '@mui/icons-material/DataObject';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import GeneratingTokensIcon from '@mui/icons-material/GeneratingTokens';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import Home from '@/components/features/Home'
import JsonFormatter from '@/components/features/JsonFormatter';
import Base64EncoderDecoder from '@/components/features/Base64EncoderDecoder';
import JwtDecoder from '@/components/features/JwtDecoder';
import LinkIcon from '@mui/icons-material/Link';
import DiffChecker from '@/components/features/DiffChecker';
import UrlEncoderDecoder from '../features/UrlEncoderDecoder';

// Define the type for the tab data
interface TabData {
    label: string;
    icon: string | React.ReactElement;
    children: React.ReactNode;
}

// Array containing the data for the tabs
const tabData: TabData[] = [
    { label: 'Home', icon: <HomeIcon />, children: <Home /> },
    { label: 'JSON', icon: <DataObjectIcon />, children: <JsonFormatter /> },
    { label: 'Base64 Encode/Decode', icon: <EnhancedEncryptionIcon />, children: <Base64EncoderDecoder /> },
    { label: 'JWT Decode', icon: <GeneratingTokensIcon />, children: <JwtDecoder /> },
    { label: 'URL Encode/Decode', icon: <LinkIcon />, children: <UrlEncoderDecoder /> },
    { label: 'DiffChecker', icon: <LibraryAddCheckIcon />, children: <DiffChecker /> },
];

// Function to implement the component
const MainContent: React.FC = () => {
    // State to keep track of the selected tab index
    const [value, setValue] = useState<number>(0);

    // Handler for tab change
    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            {/* Tabs Section */}
            <Box sx={{
                borderBottom: 1,
                borderColor: 'divider',
                position: 'sticky',
                top: 0,
                zIndex: "1000",
                backgroundColor: 'background.paper',
            }}>
                <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="tab functionality">
                    {/* Dynamically render tabs from the tabData array */}
                    {tabData.map((tab, index) => (
                        <Tab icon={tab.icon} iconPosition='start' key={index} label={tab.label} />
                    ))}
                </Tabs>
            </Box>

            {/* Tab Panels */}
            {tabData.map((tab, index) => (
                <CustomTabPanel key={index} value={value} index={index}>
                    {tab.children}
                </CustomTabPanel>
            ))}
        </Box>
    );
};

interface CustomTabPanelProps {
    value: number;
    index: number;
    children: React.ReactNode;
}

const CustomTabPanel: React.FC<CustomTabPanelProps> = ({ value, index, children }) => {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <>{children}</>}
        </div>
    );
};

export default MainContent;
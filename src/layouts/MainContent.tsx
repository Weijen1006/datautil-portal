import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DataObjectIcon from '@mui/icons-material/DataObject';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import GeneratingTokensIcon from '@mui/icons-material/GeneratingTokens';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import LinkIcon from '@mui/icons-material/Link';
import FunctionsIcon from '@mui/icons-material/Functions';
import PasswordIcon from '@mui/icons-material/Password';
import KeyIcon from '@mui/icons-material/Key';
import NumbersIcon from '@mui/icons-material/Numbers';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HtmlIcon from '@mui/icons-material/Html';
import Home from '@/features/Home'
import JsonFormatter from '@/features/JsonFormatter';
import Base64EncoderDecoder from '@/features/Base64EncoderDecoder';
import JwtDecoder from '@/features/JwtDecoder';
import DiffChecker from '@/features/DiffChecker';
import UrlEncoderDecoder from '@/features/UrlEncoderDecoder';
import RegexTool from '@/features/RegexTool';
import SecretGenerator from '@/features/SecretGenerator';
import PkceGenerator from '@/features/PkceGenerator';
import NumberSystemConverter from '@/features/NumberSystemConverter';
import TimestampConverter from '@/features/TimestampConverter';
import HtmlViewer from '@/features/HtmlViewer';

// Define the type for the tab data
interface TabData {
    label: string;
    icon: string | React.ReactElement;
    children: React.ReactNode;
}

// Array containing the data for the tabs
const tabData: TabData[] = [
    { label: 'Home', icon: <HomeIcon />, children: <Home /> },
    { label: 'DiffChecker', icon: <LibraryAddCheckIcon />, children: <DiffChecker /> },
    { label: 'JSON', icon: <DataObjectIcon />, children: <JsonFormatter /> },
    { label: 'Base64', icon: <EnhancedEncryptionIcon />, children: <Base64EncoderDecoder /> },
    { label: 'URL', icon: <LinkIcon />, children: <UrlEncoderDecoder /> },
    { label: 'HTML', icon: <HtmlIcon />, children: <HtmlViewer /> },
    { label: 'JWT', icon: <GeneratingTokensIcon />, children: <JwtDecoder /> },
    { label: 'SecretGen', icon: <PasswordIcon />, children: <SecretGenerator /> },
    { label: 'PKCE', icon: <KeyIcon />, children: <PkceGenerator /> },
    { label: 'Number', icon: <NumbersIcon />, children: <NumberSystemConverter /> },
    { label: 'TimeStamp', icon: <AccessTimeIcon />, children: <TimestampConverter />, },
    { label: 'Regex', icon: <FunctionsIcon />, children: <RegexTool /> },
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
                        <Tab data-cy={tab.label} icon={tab.icon} iconPosition='start' key={index} label={tab.label} />
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
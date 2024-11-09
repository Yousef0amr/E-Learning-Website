import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../utils/appStrings';
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function CourseTabs({ tabs }) {
    const [value, setValue] = React.useState(0);
    const { t } = useTranslation()
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', direction: 'rtl', backgroundColor: 'var(--background-color)', minHeight: '50vh' }}>
            <Box sx={{ borderBottom: 1, color: 'var(--text-color)', borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} textColor="inherit"
                    indicatorColor="secondary" aria-label="basic tabs example" variant="scrollable"
                    scrollButtons
                >
                    <Tab label={t(AppStrings.overview)}   {...a11yProps(0)} />
                    <Tab label={t(AppStrings.course_content)}   {...a11yProps(1)} />
                    <Tab label={t(AppStrings.course_quizzes)}  {...a11yProps(2)} />
                    <Tab label={t(AppStrings.notes)}   {...a11yProps(3)} />
                    <Tab label={t(AppStrings.Q_And_A)} {...a11yProps(4)} />
                </Tabs>
            </Box>
            {
                tabs?.map((tab, index) => (
                    <CustomTabPanel key={index} value={value} index={index}>
                        {tab}
                    </CustomTabPanel>
                ))
            }
        </Box>
    );
}





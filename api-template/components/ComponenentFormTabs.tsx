import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ComponentForm, { components, useActions } from './ComponentForm';
import dynamic from "next/dynamic";
import renderComponents from './util/renderComponents';
import { Button } from '@mui/material';
import ResourceFormDialog from './ResourceFormDialog';

const Code = dynamic(import("./Code"), {
    ssr: false,
});

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface ICFTabs {
    data?: any
    index?: number
}

export default function ComponentFormTabs({ data, index, }: ICFTabs) {
    const [value, setValue] = React.useState(0);

    const _handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [type, setType] = React.useState(data?.type ?? "text");


    const [state, setState] = React.useState(() => {
        if (data)
            return { ...data }
        return components[type]
    })

    const { handleSubmit } = useActions()


    const handleTypeChange = (e) => {
        setState(components[e.target.value]);
        setType(e.target.value);
    };



    const handleChange = (e) => {
        setState((s) => ({
            ...s,
            data: { ...s.data, [e.target.name]: e.target.value },
        }));
    };
    const handleCheck = (e) => {
        setState((s) => ({
            ...s,
            data: { ...s.data, [e.target.name]: e.target.checked },
        }));
    };

    const handleComponentTypeChange = (e, index) => {
        // setState((s) => {
        //   let allComponents = [...s.data.components];
        //   allComponents[index] = components[e.target.value];
        //   return { ...s, data: { ...s.data, components: allComponents } };
        // });
    };

    const handleComponentDataTypeChange = (e, index) => {
        // setState((s) => {
        //   let allComponents = [...s.data.components];
        //   allComponents[index].data = {
        //     ...allComponents[index].data,
        //     [e.target.name]: e.target.value || e.target.checked,
        //   };
        //   return { ...s, data: { ...s.data, components: allComponents } };
        // });
    };

    const deleteChildComponent = (index) => {
        // setState((s) => {
        //   let allComponents = [...s.data.components];
        //   (allComponents[index]?.components ?? []).splice(index, 0);
        //   return { ...s, data: { ...s.data, components: allComponents } };
        // });
    };


    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={_handleChange} aria-label="basic tabs example">
                    <Tab label="Form" {...a11yProps(0)} />
                    <Tab label="JSON" {...a11yProps(1)} />
                    <Tab label="Preview" {...a11yProps(2)} />
                    <Tab label="Resources" {...a11yProps(3)} />

                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ComponentForm handleTypeChange={handleTypeChange} data={{ ...state }} index={index} type={type} handleComponentTypeChange={handleComponentTypeChange} handleComponentDataTypeChange={handleComponentDataTypeChange} deleteChildComponent={deleteChildComponent} handleCheck={handleCheck} handleChange={handleChange} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Code setState={setState} size="small" state={{ ...state }} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                {renderComponents([{ ...state }])}
            </TabPanel>
            <TabPanel value={value} index={3}>
                <div style={{ justifyItems: "space-evenly" }} >
                    <ResourceFormDialog />
                    <p>There are no resources associated with this resource. Resources can be data tables, forms or other data sources including webhooks and external datasources that the component relies on.</p>
                </div>
            </TabPanel>
            <Button
                fullWidth
                sx={{ mt: 3 }}
                disableElevation
                onClick={(e) => handleSubmit({ ...state }, index)}
                variant="contained"
            >
                {index ? "Update" : "Add"}
            </Button>
        </Box>
    );
}

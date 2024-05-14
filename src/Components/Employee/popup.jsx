import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, ConfigProvider, theme } from 'antd';
import { Option } from 'antd/es/mentions';
import axios from 'axios';
import { AlignCenterOutlined } from '@ant-design/icons';

const EditPopupForm = ({ visible, onCancel, onCreate, initialData }) => {
    const [form] = Form.useForm();
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [cityData, setCityData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [countryData, setCountryData] = useState([]);
    // const [country, setCountry] = useState({});
    // const [state, setState] = useState({});
    // const [city, setCity] = useState({});

    const getData = async () => {
        await axios.get('http://localhost:8080/city/getAll', { validateStatus: (status) => { return true } }).then(res => setCityData(res.data)).catch(err => console.log(err));
        await axios.get('http://localhost:8080/city/getAllStates', { validateStatus: (status) => { return true } }).then(res => setStateData(res.data)).catch(err => console.log(err));
        await axios.get('http://localhost:8080/city/getAllCountries', { validateStatus: (status) => { return true } }).then(res => setCountryData(res.data)).catch(err => console.log(err));
    }
    const handleCountryChange = (value) => {
        console.log(value)
        setSelectedCountry(value);
        form.setFieldsValue({ city: { state: { stateName: null } } }, {})
        // form.setFieldValue(['city','state','stateName'],null);
    };
    const handleStateChange = (value) => {
        setSelectedState(value);
        // setState(value);
        // form.setFieldValue({ city: null });
    };
    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        form.setFieldsValue(initialData);
    }, [initialData, form]);

    return (
        <ConfigProvider
            theme={{
                
                components:{
                    Modal:{
                        titleColor:'87e8de'
                    }
                }
            }}>
            <Modal
                open={visible}
                okText="Submit"
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={() => {
                    form
                        .validateFields()
                        .then(values => {
                            console.log(values)
                            onCreate(values);
                        })
                        .catch(error => {
                            console.error('Validation failed:', error);
                        });
                }}
            >
                <h3 className='text-center p-2'>Register Employee</h3>
                <Form form={form}
                    initialValues={initialData}
                    labelCol={{
                        span:6,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    layout="horizontal"
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please input the name of the employee!' },
                        {
                            validator: (_, value) => {
                                if (!value || /^[A-Za-z\s]+$/.test(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Name should only contain letters and spaces');
                            },
                        },
                        ]}
                    >
                        <Input type='text' placeholder='Enter Full Name' />
                    </Form.Item>
                    <Form.Item
                        name="department"
                        label="Department"
                        rules={[{ required: true, message: 'Please input the department of the employee!' },
                        {
                            validator: (_, value) => {
                                if (!value || /^[A-Za-z\s0-9]+$/.test(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('It should only contain letters and spaces');
                            },
                        },
                        ]}
                    >
                        <Input type='text' placeholder='Enter Department' />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Region"

                        rules={[{ required: true, message: 'Please input the address of the employee!' },
                        {
                            validator: (_, value) => {
                                if (!value || /^[A-Za-z0-9\s]+$/.test(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('It should only contain letters and spaces');
                            },
                        },
                        ]}
                    >
                        <Input type='text' placeholder='Enter Your local address' />
                    </Form.Item>
                    <Form.Item
                        name={["city", "state", "country", "countryName"]} label="Country" rules={[{ required: true }]}>
                        <Select onSelect={handleCountryChange} value={selectedCountry}>
                            {
                                countryData?.map((country) => (
                                    <Option key={country.countryId} value={country.countryName}>
                                        {country.countryName}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={["city", "state", "stateName"]} label="State" rules={[{ required: true }]}>
                        <Select onSelect={handleStateChange} disabled={!selectedCountry} value={selectedState}>
                            {selectedCountry &&
                                stateData?.filter((obj) => obj.country.countryName === selectedCountry).map((state) => (
                                    <Option key={state.stateName} value={state.stateName} >
                                        {state.stateName}
                                    </Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name={["city", "cityName"]} label="City" rules={[{ required: true }]}>
                        <Select disabled={!selectedState} value={selectedCity}>
                            {selectedState &&
                                cityData?.filter((obj) => obj.state.stateName === selectedState).map((city) => (
                                    <Option key={city.cityName} value={city.cityName}>
                                        {city.cityName}
                                    </Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="salary"
                        label="Salary"
                        rules={[{ required: true, message: 'Please input the salary of the employee!' }]}
                    >
                        <Input type='number' />
                    </Form.Item>
                </Form>
            </Modal>
        </ConfigProvider>
    );
};
export default EditPopupForm;
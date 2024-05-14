import React, { Children, useEffect, useState } from 'react';
import { Button, Modal, Space, Table, notification, Popconfirm, ConfigProvider, Typography } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import EditPopupForm from './popup';
import AddEmployee from './addEmployee';
// import { useDispatch } from 'react-redux'
// import { assign } from './productSlice'

const Employee = () => {
    const [data, setData] = useState(undefined);
    const [visible, setVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [editData, setEditData] = useState({});
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: `Record ${message} Successfully`,
        });
    };
    useEffect(() => {
        if (!loading) {
            setLoading(true);
            getData();
        }
    }, [data, loading]);
    // declaring columns for antd table
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            onCell: (record) => {
                return {
                    onClick: event => { getDataById(record.id); showModal(); }, // click row
                };
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            onCell: (record) => {
                return {
                    onClick: event => { getDataById(record.id); showModal(); }, // click row
                };
            }
        },
        {
            title: 'Department',
            dataIndex: 'department',
            sorter: (a, b) => a.department.localeCompare(b.department),
            onCell: (record) => {
                return {
                    onClick: event => { getDataById(record.id); showModal(); }, // click row
                };
            }
        },
        {
            title: 'Salary',
            dataIndex: 'salary',
            sorter: (a, b) => a.salary - b.salary,
            onCell: (record) => {
                return {
                    onClick: event => { getDataById(record.id); showModal(); }, // click row
                };
            }
        },
        {
            title: 'Address',
            children: [
                {
                    title: 'Street',
                    dataIndex: 'address',
                    // sorter: (a, b) => a.address.localeCompare(b.address),
                    onCell: (record) => {
                        return {
                            onClick: event => { getDataById(record.id); showModal(); }, // click row
                        };
                    }
                },
                {
                    title: 'City',
                    dataIndex: ['city', 'cityName'],
                    sorter: (a, b) => a.address.localeCompare(b.address),
                    onCell: (record) => {
                        return {
                            onClick: event => { getDataById(record.id); showModal(); }, // click row
                        };
                    }
                },
                {
                    title: 'State',
                    dataIndex: ['city', 'state', 'stateName'],
                    sorter: (a, b) => a.address.localeCompare(b.address),
                    onCell: (record) => {
                        return {
                            onClick: event => { getDataById(record.id); showModal(); }, // click row
                        };
                    }
                },
                {
                    title: 'Country',
                    dataIndex: ['city', 'state', 'country', 'countryName'],
                    sorter: (a, b) => a.address.localeCompare(b.address),
                    onCell: (record) => {
                        return {
                            onClick: event => { getDataById(record.id); showModal(); }, // click row
                        };
                    }
                },
            ],
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button className='btn btn-warning' onClick={() => editEmployee(record)} >Edit</Button>
                    <Popconfirm
                        placement="topLeft"
                        title={"Delete This Record"}
                        description={"Are you sure?"}
                        okText="Yes"
                        cancelText="No"
                        icon={
                            <QuestionCircleOutlined
                                style={{
                                    color: 'red',
                                }}
                            />
                        }
                        onConfirm={() => { deleteEmployee(record.id); }}
                    >
                        <Button type='primary' className='btn btn-danger'>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },

    ];

    const deleteEmployee = (id) => {
        axios.delete(`http://localhost:8080/delete/${id}`, { validateStatus: (status) => { return status; } })
            .then(() => {
                setData(data.filter(emp => emp.id !== id));
                openNotificationWithIcon('success', 'Deleted');
            })
            .catch(error => { console.log(error); });
    }
    const editEmployee = values => {
        console.log(data);
        setEditData(values);
        setEditVisible(true);
    }
    const handleCreate = values => {
        console.log(values);
        axios.post(`http://localhost:8080/employee/add`, values).then((response => console.log(response.status, response.error)));
        console.log('Received values of form: ', values);
        setVisible(false);
        window.location.reload();
        openNotificationWithIcon('success', 'Added');
    };
    const handleEdit = record => {
        axios.put(`http://localhost:8080/employee/edit/${editData.id}`, record, { validateStatus: (status) => { return true } })
            .then(response => {
                console.log(response.status, response.error);
                setEditVisible(false);
                openNotificationWithIcon('success', 'Updated');
                return getData();
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/getAll', { validateStatus: (status) => { return true } });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    const pagination = {
        pageSize: 5,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [empData, setEmpData] = useState({});

    const getDataById = async (id) => {
        try {
            await axios.get(`http://localhost:8080/get/${id}`, { validateStatus: (status) => { return true } })
                .then(res => res.data)
                .then(data => setEmpData(data))
                .catch(error => console.log(error));
            console.log("data : " + empData);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }
    const buttonStyle = {
        position: "fixed",
        bottom: "40px", /* Adjust this value to move the button up or down */
        left: "60px", /* Adjust this value to move the button left or right */
        border: "none",
        cursor: "pointer",
        zIndex: "1000" /* Make sure the button is above other elements */
    }
    return (
        <div>
            <ConfigProvider
                    theme={{
                        components: {
                            Table: {    
                                headerBg:"#eb2f96",
                                colorBgContainer:"#87e8de",
                                fontSize:18
                            },
                        },
                        token:{
                            fontFamilyCode:'Georgia'
                        },
                        Typography: {
                            /* here is your component tokens */
                        },
                    }}
                >
            {contextHolder}
            <Typography.Title level={1} className='text-center m-2 p-1'>EMPLOYEE'S DATA</Typography.Title>
            <div className='m-2 d-flex flex-column justify-content-center align-items-center w-100'>
                    <Table className='m-2 w-75 table-responsive-xxl' columns={columns} dataSource={data}
                        pagination={pagination} // Disable built-in pagination
                   ></Table>                
                <Button type='primary' className='btn btn-dark ' style={buttonStyle} onClick={() => setVisible(true)}>Add Employee</Button>
            </div>
            {/* <AddEmployee showPopUp={visible}/> */}
            <EditPopupForm
                visible={visible}
                onCancel={() => setVisible(false)}
                onCreate={handleCreate} />
            <EditPopupForm
                visible={editVisible}
                onCancel={() => setEditVisible(false)}
                onCreate={handleEdit}
                initialData={editData}
            />
            <Modal title="Profile" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className='row d-flex justify-content-around m-0'>
                    <div className='col'><img className='h-100 w-100' alt="profile pic" src="/profilePic.png" /></div>
                    <div className='col'>
                        <h3>{empData.name} </h3>
                        <h6>Department : {empData.department}</h6>
                        <h6>Address : {empData.address}</h6>
                        <h6>Salary : {empData.salary}</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </div>
            </Modal>
            </ConfigProvider>
        </div>
    )
}

export default Employee
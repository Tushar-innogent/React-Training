import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Popover, Space, Table } from 'antd';
import axios from 'axios';
import EditPopupForm from './editPopup';
import { useNavigate } from 'react-router-dom';
import EmpDetails from './EmpDetails';

const deleteEmployee = (id) => {
    try {
        axios.delete(`http://localhost:8080/delete/${id}`, { validateStatus: (status) => { return true } })
        window.location.reload();
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

const Employee = () => {

    const [data, setData] = useState(undefined);
    const [visible, setVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [editData, setEditData] = useState({});
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    console.log(editData)

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            onCell: (record) => {
                return {
                    onClick: event => { getDataById(record.id); showModal();  }, // click row
                };
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            onCell: (record) => {
                return {
                    onClick: event => { getDataById(record.id); showModal();  }, // click row
                };
            }
        },
        {
            title: 'Department',
            dataIndex: 'department',
            sorter: (a, b) => a.department.localeCompare(b.department),
            onCell: (record) => {
                return {
                    onClick: event => { getDataById(record.id); showModal();  }, // click row
                };
            }
        },
        {
            title: 'Salary',
            dataIndex: 'salary',
            sorter: (a, b) => a.salary - b.salary,
            onCell: (record) => {
                return {
                    onClick: event => { getDataById(record.id); showModal();  }, // click row
                };
            }
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a, b) => a.address.localeCompare(b.address),
            onCell: (record) => {
                return {
                    onClick: event => { getDataById(record.id); showModal();  }, // click row
                };
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (value, record) => (
                <Space size="middle">
                    <Button className='btn btn-warning' onClick={() => editEmployee(record)}>Edit</Button>
                    <Button className='btn btn-danger' onClick={() => deleteEmployee(record.id)}>Delete</Button>
                </Space>
            ),
        },

    ];

    const hide = () => {
        setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    const editEmployee = values => {

        setEditData(values);
        setEditVisible(true);
        // console.log(editData);
        // alert(editData);
    }

    const handleCreate = values => {
        axios.post(`http://localhost:8080/add`, values).then((response => console.log(response.status, response.error)));
        console.log('Received values of form: ', values);
        setVisible(false);
        window.location.reload();
    };

    const handleEdit = record => {
        axios.put(`http://localhost:8080/edit/${editData.id}`, record, { validateStatus: (status) => { return true } })
            .then(response => {
                console.log(response.status, response.error);
                setEditVisible(false);
                return getData();
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

    useEffect(() => {
        if (!loading) {
            setLoading(true);
            getData();
            // console.log(data);
        }
    }, [data, loading]);

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/getAll', { validateStatus: (status) => { return true } });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

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

    return (
        <div>
            <h1 className='text-center m-0 p-2 bg-dark-subtle'>EMPLOYEE'S DATA</h1>
            <div className='m-4 d-flex flex-column justify-content-center align-items-center w-100'>
                <Button type='primary' className='btn btn-dark' onClick={() => setVisible(true)}>Add Employee</Button>
                <Table className='m-4 w-75 table-responsive-xxl' columns={columns} dataSource={data}
                    // onRow={(record, rowIndex) => {
                    //     return {
                    //         onClick: event => { getDataById(record.id); showModal();  }, // click row
                    //     };
                    // }}
                ></Table>
            </div>
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
        </div>
    )
}

export default Employee
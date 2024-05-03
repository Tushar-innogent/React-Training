import React, { useEffect, useState } from 'react';
import { Button, Space, Table } from 'antd';
import axios from 'axios';
import PopupForm from './popup';
import EditPopupForm from './editPopup';

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
    console.log(editData)

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Department',
            dataIndex: 'department',
            sorter: (a, b) => a.department.localeCompare(b.department),
        },
        {
            title: 'Salary',
            dataIndex: 'salary',
            sorter: (a, b) => a.salary - b.salary,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a, b) => a.address.localeCompare(b.address),
        },
        {
            title: 'Action',
            key: 'action',
            render: (value, record) => (
                <Space size="middle">
                    <Button onClick={() => editEmployee(record)}>Edit</Button>
                    <Button onClick={() => deleteEmployee(record.id)}>Delete</Button>
                </Space>
            ),
        },
    ];

    const editEmployee = values => {

        setEditData(values);
        setEditVisible(true);
        console.log(editData);
        // alert(editData);
    }
    
    const handleCreate = values => {
        axios.post(`http://localhost:8080/add`, values).then((response => console.log(response.status, response.error)));
        console.log('Received values of form: ', values);
        setVisible(false);
        window.location.reload();
    };
    
    const handleEdit = record =>{
        axios.put(`http://localhost:8080/edit/${editData.id}`, record, { validateStatus: (status) => { return true } }).then((response => console.log(response.status, response.error)));
        getData();
    };

    useEffect(() => {
        getData();
        console.log(data);
    }, [data]);

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/getAll', { validateStatus: (status) => { return true } });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    return (
        <div>
            <h1 className='text-center'>EMPLOYEES</h1>
            <Table columns={columns} dataSource={data} ></Table>
            <Button type='primary m-2' onClick={() => setVisible(true)}>Add Employee</Button>
            <PopupForm
                visible={visible}
                onCancel={() => setVisible(false)}
                onCreate={handleCreate}
            />
            <EditPopupForm
                visible={editVisible}
                onCancel={() => setEditVisible(false)}
                onCreate={handleEdit}
                initialData={editData}
            />
         
        </div>
    )
}

export default Employee
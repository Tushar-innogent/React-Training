import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

const EditPopupForm = ({ visible, onCancel, onCreate, initialData }) => {
    const [form] = Form.useForm();
    console.log(initialData)
    const setValue = () => {
        form.setFieldsValue(initialData);
    }
    useEffect(()=>{
        setValue()
        return;
    },[setValue])

    return (
        <Modal
            open={visible}
            title="Provide Employee Details"
            okText="Edit"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        onCreate(values);
                    })
                    .catch(error => {
                        console.error('Validation failed:', error);
                    });
            }}
        >
            <Form form={form} layout="vertical" initialValues={initialData}>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please input the name of the employee!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="department"
                    label="Department"
                    rules={[{ required: true, message: 'Please input the department of the employee!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Address"
                    rules={[{ required: true, message: 'Please input the address of the employee!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="salary"
                    label="Salary"
                    rules={[{ required: true, message: 'Please input the salary of the employee!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default EditPopupForm;
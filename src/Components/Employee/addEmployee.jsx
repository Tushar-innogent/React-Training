import { notification } from 'antd';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EditPopupForm from './popup';

const AddEmployee = (showPopUp) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(showPopUp);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: `Record ${message} Successfully`,
    });
  };
  const handleCreate = values => {
    axios.post(`http://localhost:8080/add`, values).then((response => console.log(response.status, response.error)));
    console.log('Received values of form: ', values);
    setVisible(false);
    openNotificationWithIcon('success', 'Added');
  };
  return (
    <div>
      {contextHolder}
      <EditPopupForm
        visible={visible}
        onCancel={() => setVisible(false)}
        onCreate={handleCreate} />
    </div>
  )
}

export default AddEmployee
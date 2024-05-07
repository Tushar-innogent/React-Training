import { Card, ConfigProvider, theme } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const EmpDetails = () => {
   

    

    return (
        <ConfigProvider
            theme={
                {
                    algorithm: theme.darkAlgorithm,
                    components: { Table: {} }
                }
            }
        >
            <div className='d-flex justify-content-center align-items-around mt-2'>
                
                
            </div>
        </ConfigProvider>
    )
}

export default EmpDetails
import styles from "./MembrosCard.module.css";
import React from 'react';

import { Select, Space } from 'antd';
import { DeleteFilled } from "@ant-design/icons";

export default function MembrosCard({ nome, email, action, onDelete }) {
return (
    <div className={styles.memberContainer}>
        <div className={styles.nameEmail}>
            <h3 style={{ padding: "10px 40px"}}>
                {nome}
            </h3>
            <h5 style={{ padding: "10px 40px"}}>
                {email}
            </h5>
        </div>
        <div className={styles.actionAndDelete}>
            <Select
                placeholder={action}
                variant="bordeless"
                options={[
                    { value: 'leitor', label: <span>Leitor</span> },
                    { value: 'editor', label: <span>Editor</span> }
                ]} 
            />
            <DeleteFilled 
                // onClick={}
                style={{
                    color: "red",
                    fontSize: "20px",
                    cursor: "pointer"
                }}
            />
        </div>
    
    </div>
);
}
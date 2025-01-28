  'use client';

  import styles from "./page.module.css";
  import Header from "../../../components/Header/header";
  import Project from "../../../components/Project/project";

  import { useRouter } from "next/navigation";

  import { UserAddOutlined, LockOutlined, LockFilled, CodeFilled, ArrowLeftOutlined} from "@ant-design/icons";

  import React, { useState } from 'react';

  import dayjs from "dayjs";

  import {
    Modal,
    Form,
    Input,
    Button, 
    DatePicker
  } from "antd";

  import { FolderAddFilled, WarningFilled } from "@ant-design/icons";

  export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleSubmit = (values) => {
      console.log("Received values of form: ", values);
      router.push("/");
    };

    const showModal = (project) => {
      setProjectToDelete(project);
      setIsModalOpen(true);
    };

    const handleOk = () => {
      console.log(`Deleting project: ${projectToDelete}`);
      setIsModalOpen(false);
      setProjectToDelete(null);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
      setProjectToDelete(null);
    };

    const showAddModal = () => {
      setIsAddModalOpen(true);
    };

    const AddModalhandleOk = () => {
      console.log(`Creating project: ${projectToDelete}`);
      setIsAddModalOpen(false);
    };

    const AddModalhandleCancel = () => {
      setIsAddModalOpen(false);
    };

    function MouseOver(event) {
      event.target.style.opacity = "0.8";
    }

    function MouseOut(event) {
      event.target.style.opacity = "1";
    }

    const disablePastDates = (current) => {
      return current && current.isBefore(dayjs(), "day");
    };

    return (
      <div className={styles.backgroundContainer}>
        <Header />
        <div className={styles.dashboardMenu}>
          <div
            className={styles.dashBoardMenuItem}
            onMouseOver={MouseOver}
            onMouseOut={MouseOut}
            onClick={() => showAddModal()}
          >
            <FolderAddFilled />
            <div>
              <a style={{ paddingLeft: "10px" }}>Novo Projeto</a>
            </div>
          </div>
        </div>
        <div className={styles.projectsContainer}>
          {[...Array(9)].map((_, index) => (
            <Project
              key={index}
              projectName={`Project ${index + 1}`}

              onDelete={() => showModal(`Project ${index + 1}`)}
            />
          ))}
        </div>

        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          closeIcon = {null}
          footer = {null}
          style={{
            alignContent: "center", 
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ArrowLeftOutlined onClick={handleCancel}
            style={{
              position: "absolute", 
              color: "#677BFF", 
              fontSize: "40px", 
              padding: "20px 25px", 
              top: "0", 
              left: "0"}} 
            onMouseOver={MouseOver}
            onMouseOut={MouseOut}
          />
          <WarningFilled style={{color: "red", fontSize: "50px", padding: "40px 20px"}}/>
          <h2>
            Deseja excluir o {" "}
            <strong>{projectToDelete}</strong>?
          </h2>
          <p style={{
            width: "100%", 
            display: "flex",
            justifyContent: "center", 
            alignItems: "center"
            }}>
            <a style={{width: "80%", cursor: "auto", color: "rgba(0,0,0,0.61)"}}>Todas as tarefas serão excluidas e os dados do projeto perdidos</a>
          </p>
          <button className={styles.modalButton} onClick={handleOk}>
            <p style={{color: "white", marginTop: "20px"}}>Excluir</p>
          </button>
        </Modal>

        <Modal
          open={isAddModalOpen}
          onOk={AddModalhandleOk}
          onCancel={AddModalhandleCancel}
          closeIcon ={null}
          footer = {null}
          style={{
            alignContent: "center", 
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ArrowLeftOutlined onClick={AddModalhandleCancel}
            style={{
              position: "absolute", 
              color: "#677BFF", 
              fontSize: "40px", 
              padding: "20px 25px", 
              top: "0", 
              left: "0"}} 
            onMouseOver={MouseOver}
            onMouseOut={MouseOut}
          />
          <h1 className={styles.ItemtitleModal}>Criar Projeto</h1>
          <hr className={styles.hr}/>
          <div className={styles.formDiv}>
            <Form onFinish={handleSubmit}>
              <Form.Item
                name="nickname"
                label = "Nome"
                rules={[
                  { required: true, message: "Por favor, insira o nome do projeto", whitespace: true },
                ]}
              >
                <Input 
                  style={{padding: "10px"}}
                  placeholder="Nome do projeto"
                />
              </Form.Item>
              <Form.Item
                name="date"
                label = "Data de Entrega"
              >
                <DatePicker  
                  disabledDate={disablePastDates} 
                  format='DD-MM-YYYY' 
                  style={{padding: "10px", width: "100%"}}
                />
              </Form.Item>

              <Form.Item
                name="description"
                label=  "Descrição"
              >
                <Input 
                  style={{height: "100px"}}
                  placeholder="Descrição do projeto"
                />
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  onClick={AddModalhandleOk}
                  style={{marginTop: "20px", padding: "32px 55px", backgroundColor: "#677BFF"}} >
                    Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    );
  }

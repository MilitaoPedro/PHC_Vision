    'use client';

    import styles from "./page.module.css";
    import Header from "../../../components/Header/header";
    import Tarefa from "../../../components/Tarefa/tarefa";
    import MembrosCard from "@/components/MembrosCard/MembrosCard";

    import { useRouter } from "next/navigation";

    import React, { useState } from 'react';

    import dayjs from "dayjs";

    import {
        Modal,
        Form,
        Input,
        Button, 
        DatePicker,
        Select
    } from "antd";

    import { 
        WarningFilled, 
        PlusCircleFilled,
        ArrowLeftOutlined, 
        SettingFilled, 
        UsergroupAddOutlined 
    } from "@ant-design/icons";

    const NomeProjeto = "Projeto 1";

    export default function Dashboard() {
        const router = useRouter();

        const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
        const [TaskToDelete, setTaskToDelete] = useState(null);

        const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

        const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);

        const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

        const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);

        function MouseOver(event) {
            event.target.style.opacity = "0.8";
        }
        
        function MouseOut(event) {
            event.target.style.opacity = "1";
        }

        function handleClick(){
            router.push("/pages/Dashboard");
        }

        function showDeleteTaskModal(task){
            setTaskToDelete(task);
            setIsDeleteTaskModalOpen(true);
        }

        const handleRemove = () => {
            console.log(`Deleting project: ${TaskToDelete}`);
            setIsDeleteTaskModalOpen(false);
            setTaskToDelete(null);
        };
        
        const handleRemoveCancel = () => {
            setIsDeleteTaskModalOpen(false);
            setTaskToDelete(null);
        };

        function showAddMemberTaskModal(task){
            setIsAddMemberModalOpen(true);
        }
        
        /*
        const handleAddMember = () => {
            console.log(`Deleting project: ${TaskToDelete}`);
            setIsDeleteTaskModalOpen(false);
            setTaskToDelete(null);
        };
        */
        
        const handleAddMemberCancel = () => {
            setIsAddMemberModalOpen(false);
        };

        function showEditProjectModal(task){
            setIsEditProjectModalOpen(true);
        }

        /*
        const handleEdit = () => {
            console.log(`Deleting project: ${TaskToDelete}`);
            setIsDeleteTaskModalOpen(false);
            setTaskToDelete(null);
        };
        */
        
        const handleEditCancel = () => {
            setIsEditProjectModalOpen(false);
        };

        function showAddTaskModal(){
            setIsAddTaskModalOpen(true);
        }

        const handleAddTaskCancel = () => {
            setIsAddTaskModalOpen(false);
        };

        function showEditTaskModal(){
            setIsEditTaskModalOpen(true);
        }

        const handleEditTaskCancel = () => {
            setIsEditTaskModalOpen(false);
        };

        const disablePastDates = (current) => {
            return current && current.isBefore(dayjs(), "day");
        };

        return (
            <div className={styles.backgroundContainer}>
                <Header />
                <div className={styles.tarefasContainer}>
                    <div className={styles.tarefasContainerHeader}>
                        <div className={styles.tarefasHeaderItems}>
                            <ArrowLeftOutlined onClick={handleClick}
                                style={{
                                    color: "#F8F8F8", 
                                    fontSize: "40px", 
                                    padding: "0px 25px 20px 25px",
                                    cursor: "pointer" 
                                }} 
                            />
                            <h1 style={{color: "#F8F8F8", fontWeight: "bolder"}}>
                                {NomeProjeto}
                            </h1>
                        </div>
                        <div className={styles.tarefasHeaderItems}>
                            <SettingFilled onClick={() => showEditProjectModal()}
                                style={{
                                    color: "#F8F8F8", 
                                    fontSize: "40px", 
                                    padding: "0px 25px 20px 25px",
                                    cursor: "pointer" 
                                }}
                            />
                            <UsergroupAddOutlined onClick={() => showAddMemberTaskModal()}
                                style={{
                                    color: "#F8F8F8", 
                                    fontSize: "40px", 
                                    padding: "0px 25px 20px 25px",
                                    cursor: "pointer" 
                                }}
                            />
                        </div>
                    </div>
                    <hr className={styles.hr}/>
                    <div className={styles.tarefasBoxContainer}>
                        <div className={styles.tarefasBox}>
                            <div className={styles.tarefasBoxHeader}>
                                <h1 style={{color: "#677BFF", paddingTop: "15px"}}>To
                                    <a style={{color: "black"}}>do</a>
                                </h1>
                                <PlusCircleFilled 
                                    onClick={showAddTaskModal}
                                    style={{
                                        color: "#677BFF", 
                                        fontSize: "25px",
                                        cursor: "pointer"
                                    }}
                                />
                            </div>
                            <div className={styles.tarefasItemsContainer}>
                                {[...Array(9)].map((_, index) => (
                                    <Tarefa
                                        key={index}
                                        taskName={`Task ${index + 1}`}
                                        description={`Description ${index + 1}`}
                                        priority={`High`}
                                        date={`26/07/2002`}
                                        onClickDiv={() => showEditTaskModal()}
                                        onDelete={() => showDeleteTaskModal(`Task ${index + 1}`)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className={styles.tarefasBox}>
                            <div className={styles.tarefasBoxHeader}>
                                <h1 style={{color: "#677BFF", paddingTop: "15px"}}>Do
                                    <a style={{color: "black"}}>ing</a>
                                </h1>
                                <PlusCircleFilled 
                                    onClick={showAddTaskModal}
                                    style={{
                                        color: "#677BFF", 
                                        fontSize: "25px",
                                        cursor: "pointer"
                                    }}
                                />
                            </div>
                            <div className={styles.tarefasItemsContainer}>
                                {[...Array(9)].map((_, index) => (
                                    <Tarefa
                                        key={index}
                                        taskName={`Task ${index + 1}`}
                                        description={`Description ${index + 1}`}
                                        priority={`High`}
                                        date={`26/07/2002`}
                                        onClickDiv={() => showEditTaskModal()}
                                        onDelete={() => showDeleteTaskModal(`Task ${index + 1}`)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className={styles.tarefasBox}>
                            <div className={styles.tarefasBoxHeader}>
                                <h1 style={{color: "#677BFF", paddingTop: "15px"}}>Do
                                    <a style={{color: "black"}}>ne</a>
                                </h1>
                                <PlusCircleFilled 
                                    onClick={showAddTaskModal}
                                    style={{
                                        color: "#677BFF", 
                                        fontSize: "25px",
                                        cursor: "pointer"
                                    }}
                                />
                            </div>
                            <div className={styles.tarefasItemsContainer}>
                                {[...Array(9)].map((_, index) => (
                                    <Tarefa
                                        key={index}
                                        taskName={`Task ${index + 1}`}
                                        description={`Description ${index + 1}`}
                                        priority={`High`}
                                        date={`26/07/2002`}
                                        onClickDiv={() => showEditTaskModal()}
                                        onDelete={() => showDeleteTaskModal(`Task ${index + 1}`)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>






                {/* Modais */}






                <Modal
                    open={isDeleteTaskModalOpen}
                    onCancel={handleRemoveCancel}
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
                    <ArrowLeftOutlined onClick={handleRemoveCancel}
                        style={{
                            position: "absolute", 
                            color: "#677BFF", 
                            fontSize: "40px", 
                            padding: "20px 25px", 
                            top: "0", 
                            left: "0"}} 
                    />
                    <WarningFilled style={{color: "red", fontSize: "50px", padding: "40px 20px"}}/>
                    <h2>
                        Deseja excluir a {" "}
                        <strong>{TaskToDelete}</strong>?
                    </h2>
                    <p style={{ 
                            width: "100%", 
                            display: "flex",
                            justifyContent: "center", 
                            alignItems: "center"
                        }}>
                        <a style={{width: "80%", cursor: "auto", color: "rgba(0,0,0,0.61)"}}>Todas as tarefas serão excluidas e os dados do projeto perdidos</a>
                    </p>
                    <button className={styles.modalButton} onClick={handleRemove}>
                        <p style={{color: "white", marginTop: "20px"}}>Excluir</p>
                    </button>
                </Modal>

                <Modal
                    open={isEditProjectModalOpen}
                    onCancel={handleEditCancel}
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
                    <ArrowLeftOutlined onClick={handleEditCancel}
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
                    <h1 className={styles.ItemtitleModal}>Editar Projeto</h1>
                    <hr className={styles.modalHr}/>
                    <div className={styles.formDiv}>
                        <Form >
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
                                    style={{marginTop: "20px", padding: "32px 55px", backgroundColor: "#677BFF"}} >
                                    Salvar Mudanças
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>

                <Modal
                    open={isAddMemberModalOpen}
                    onCancel={handleAddMemberCancel}
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
                    <ArrowLeftOutlined onClick={handleAddMemberCancel}
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
                    <h1 className={styles.ItemtitleModal}>Gerenciar Membros</h1>
                    <hr className={styles.modalHr}/>
                    <div className={styles.formDiv}>
                        <h2>
                            E-mail
                        </h2>
                        <div className={styles.formEmailContainer}>
                            <Form style={styles.formEmail}>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        { type: "email", message: "Esse e-mail não é válido" },
                                        { required: true, message: "Por favor, insira seu e-mail" },
                                    ]}
                                    >
                                    <Input 
                                        style={{padding: "10px 10px"}}
                                        placeholder="Insira seu melhor email"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button 
                                        type="primary" 
                                        htmlType="submit"
                                        style={{padding: "25px 100px", backgroundColor: "#677BFF"}} >
                                        Adicionar
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                        <h2>
                            Membros
                        </h2>
                        <div className={styles.membrosDiv}>
                            <MembrosCard 
                                nome={`Pedro`}
                                email={`pedrommm43@gmail.com`}
                                action={`Editor`}
                            />
                            <MembrosCard 
                                nome={`Pedro`}
                                email={`pedrommm43@gmail.com`}
                                action={`Leitor`}
                            />
                            <MembrosCard 
                                nome={`Pedro`}
                                email={`pedrommm43@gmail.com`}
                                action={`Leitor`}
                            />
                            <MembrosCard 
                                nome={`Pedro`}
                                email={`pedrommm43@gmail.com`}
                                action={`Editor`}
                            />
                            <MembrosCard 
                                nome={`Pedro`}
                                email={`pedrommm43@gmail.com`}
                                action={`Leitor`}
                            />
                            <MembrosCard 
                                nome={`Pedro`}
                                email={`pedrommm43@gmail.com`}
                                action={`Editor`}
                            />
                        </div>
                    </div>
                </Modal>

                <Modal
                    open={isAddTaskModalOpen}
                    onCancel={handleAddTaskCancel}
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
                    <ArrowLeftOutlined onClick={handleAddTaskCancel}
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
                    <h1 className={styles.ItemtitleModal}>Criar Tarefa</h1>
                    <hr className={styles.modalHr}/>
                    <div className={styles.formDiv}>
                      <Form>
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
                          name="description"
                          label=  "Descrição"
                        >
                          <Input 
                            style={{height: "100px"}}
                            placeholder="Descrição do projeto"
                          />
                        </Form.Item>

                        <Form.Item
                          name="action"
                          label = "Prioridade"
                          rules={[
                            { required: true, message: "Por favor, escolha a prioridade desejada", whitespace: true }
                          ]}
                        >
                            <Select
                                placeholder="Leitor"
                                style={{textAlign: "left"}}
                                options={[
                                    { value: 'leitor', label: <span>Leitor</span> },
                                    { value: 'editor', label: <span>Editor</span> }
                                ]} 
                            />
                        </Form.Item>
          
                        <Form.Item>
                          <Button 
                            type="primary" 
                            htmlType="submit"
                            style={{marginTop: "20px", padding: "32px 55px", backgroundColor: "#677BFF"}} >
                              Register
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
                  </Modal>

                  <Modal
                    open={isEditTaskModalOpen}
                    onCancel={handleEditTaskCancel}
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
                    <ArrowLeftOutlined onClick={handleEditTaskCancel}
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
                    <h1 className={styles.ItemtitleModal}>Editar Tarefa</h1>
                    <hr className={styles.modalHr}/>
                    <div className={styles.formDiv}>
                      <Form>
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
                          name="description"
                          label=  "Descrição"
                        >
                          <Input 
                            style={{height: "100px"}}
                            placeholder="Descrição do projeto"
                          />
                        </Form.Item>

                        <Form.Item
                          name="action"
                          label = "Prioridade"
                          rules={[
                            { required: true, message: "Por favor, escolha a prioridade desejada", whitespace: true }
                          ]}
                        >
                            <Select
                                placeholder="Baixa"
                                style={{textAlign: "left"}}
                                options={[
                                    { value: 'Baixa', label: <span>Baixa</span> },
                                    { value: 'Média', label: <span>Média</span> },
                                    { value: 'Alta', label: <span>Alta</span> }
                                ]} 
                            />
                        </Form.Item>
          
                        <Form.Item>
                          <Button 
                            type="primary" 
                            htmlType="submit"
                            style={{marginTop: "20px", padding: "32px 55px", backgroundColor: "#677BFF"}} >
                              Register
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
                  </Modal>
            </div>
        ) ;
    }
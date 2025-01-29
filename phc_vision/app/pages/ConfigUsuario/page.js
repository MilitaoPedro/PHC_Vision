'use client'

import styles from "./page.module.css";
import '@ant-design/v5-patch-for-react-19';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UserOutlined, CodeFilled, ArrowLeftOutlined } from "@ant-design/icons";

import {
    Modal,
    Form,
    Input,
    Button,
    Select
} from "antd";

import Header from "/components/Header/header";

export default function ConfigUsuario() {
    const router = useRouter();
    const [form] = Form.useForm();

    const [isModalVisible, setIsModalVisible] = useState(false);

    function showChangePassModal() {
        setIsModalVisible(true);
    }

    function handleChangePassCancel() {
        setIsModalVisible(false);
    }

    function MouseOver(event) {
        event.target.style.opacity = "0.8";
    }

    function MouseOut(event) {
        event.target.style.opacity = "1";
    }

    const handleSubmit = (values) => {
        console.log("Received values of form: ", values);
        router.push("/pages/Dashboard");
    };
    return (
        <div className={styles.backgroundContainer}>
            <Header />
            <div className={styles.forms}>
                <div className={styles.formsContainer}>
                    <Form
                        form={form}
                        name="normal_login"
                        className="login-form"
                        onFinish={handleSubmit}
                    >
                        <h1 style={{ marginBottom: "20px" }}>Informações da Conta</h1>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: "Por favor, insira um nome de usuário" }]}
                        >
                            <Input
                                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.7)", padding: "10px" }} />}
                                placeholder="Nome de usuário"
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                { type: "email", message: "Esse e-mail não é válido" },
                                { required: true, message: "Por favor, insira seu e-mail" },
                            ]}
                        >
                            <Input
                                prefix={<CodeFilled style={{ color: "rgba(0,0,0,.7)", padding: "10px" }} />}
                                placeholder="Insira seu melhor email"
                            />
                        </Form.Item>
                        <Form.Item style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                style={{ padding: "25px 35px", backgroundColor: "#677BFF" }}
                            >
                                Salvar Mudanças
                            </Button>
                        </Form.Item>
                    </Form>
                    <hr></hr>
                    <Button
                        onClick={() => showChangePassModal()}
                        style={{ padding: "25px 35px", backgroundColor: "#677BFF", color: "#F8F8F8" }}
                    >
                        Mudar Senha
                    </Button>
                </div>
                <div className={styles.formsImageContainer} />
            </div>

            {/* Modal */}

            <Modal
                open={isModalVisible}
                onCancel={handleChangePassCancel}
                closeIcon={null}
                footer={null}
                style={{
                    alignContent: "center",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ArrowLeftOutlined onClick={handleChangePassCancel}
                    style={{
                        position: "absolute",
                        color: "#677BFF",
                        fontSize: "40px",
                        padding: "20px 25px",
                        top: "0",
                        left: "0"
                    }}
                    onMouseOver={MouseOver}
                    onMouseOut={MouseOut}
                />
                <h1 className={styles.ItemtitleModal}>Alterar Senha</h1>
                <hr className={styles.modalHr} />
                <div className={styles.formDiv}>
                    <Form>
                        <Form.Item
                            name="oldPass"
                            label="Senha antiga"
                            rules={[
                                { required: true, message: "Por favor, insira a senha antiga", whitespace: true },
                            ]}
                        >
                            <Input
                                style={{ padding: "10px" }}
                                placeholder="atumalaca"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label = "Nova Senha"
                            rules={[{ required: true, message: "Por favor, insira a nova senha" }]}
                            hasFeedback
                        >
                            <Input.Password
                                placeholder="Insira a senha desejada"
                            />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label = "Confirme a nova Senha"
                            dependencies={["password"]}
                            hasFeedback
                            rules={[
                                { required: true, message: "Por favor, confirme sua nova senha" },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("password") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error("As senhas não são iguais!")
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                
                                placeholder="Confirme a senha"
                            />
                        </Form.Item>

                        <Form.Item style={{ display: "flex", justifyContent: "center" }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ marginTop: "20px", width: "250px", padding: "32px 55px", backgroundColor: "#677BFF" }} >
                                Confirmar
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>

        </div>
    )
}

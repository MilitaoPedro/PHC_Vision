"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const NormalLoginForm = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Received values of form: ", values);
    router.push("/pages/Dashboard");
  };

  return (
    <Form
      form={form}
      name="normal_login"
      className="login-form"
      onFinish={handleSubmit}
    >
      <h1 style={{marginBottom: "20px"}}>Login</h1>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Por favor, insira um nome de usuário" }]}
      >
        <Input 
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.7)", padding: "10px"}} />}
          placeholder="Nome de usuário"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Por favor, insira sua senha" }]}
      >
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.7)", padding: "10px" }} />}
          type="password"
          placeholder="Senha"
        />
      </Form.Item>
      <Form.Item style={{width: "100%",  
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"}}>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          style={{padding: "25px 35px", backgroundColor: "#677BFF"}}
        >
          Login
        </Button>
        <p style={{marginTop: "20px"}}> Não possui um conta? <a href= "/pages/SignUp" style = {{color: "#AE00D9"}}>Criar conta</a></p> 
      </Form.Item>
    </Form>
  );
};

export default NormalLoginForm;

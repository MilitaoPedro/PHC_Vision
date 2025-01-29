"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../Auth/auth";

const NormalLoginForm = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { login } = useAuth();  

  const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          senha: password
        }),
      });

      if (!response.ok) {
        throw new Error('Usuário ou senha inválidos');
      }

      const data = await response.json();
      console.log("Login successful: ", data);
      message.success('Login efetuado com sucesso!');

      if(email == "pedrommr04@tyiu.com" && password == "1234"){
        router.push("/pages/Admin");
      } else {
        router.push("/pages/Dashboard")
      }

      

      // Use the login function from context to set the user and token
      login(data.user, data.token);  // Assuming the server response contains user data and token

      
      
    } catch (error) {
      message.error(error.message);
    }
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
        name="email"
        rules={[{ required: true, message: "Por favor, insira seu email" }]}
      >
        <Input 
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.7)", padding: "10px"}} />}
          placeholder="Email"
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

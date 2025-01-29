  "use client";

  import React from "react";
  import { useRouter } from "next/navigation";
  import {
    Form,
    Input,
    Button
  } from "antd";
  import { 
    UserAddOutlined, 
    LockOutlined, 
    LockFilled, 
    CodeFilled } from "@ant-design/icons";

  export default function RegistrationForm() {
    const router = useRouter();

    const handleSubmit = async (values) => {
      try {
        const response = await fetch("http://localhost:3001/cadastroUsuario", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: values.nickname,
            email: values.email,
            senha: values.password,
          }),
        });
    
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Server error: ${response.status} - ${errorText}`);
          throw new Error('Erro ao se comunicar com o servidor.');
        }
    
        const user = await response.json();
        router.push("/"); // Ajuste conforme a rota real em vigor
      } catch (error) {
        console.error("Error:", error);
      }
    };

    return (
      <Form onFinish={handleSubmit}>
          <h1 style={{marginBottom: "20px"}}>Sign Up</h1>
          <Form.Item
            name="nickname"
            rules={[
              { required: true, message: "Por favor, insira um nome de usuário", whitespace: true },
            ]}
        >
          <Input 
            prefix={<UserAddOutlined style={{ color: "rgba(0,0,0,.7)", padding: "10px"}} />}
            placeholder="Insira seu nome de usuário"
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
            prefix={<CodeFilled style={{ color: "rgba(0,0,0,.7)", padding: "10px"}} />}
            placeholder="Insira seu melhor email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Por favor, insira uma senha!" }]}
          hasFeedback
        >
          <Input.Password 
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.7)", padding: "10px"}} />}
            placeholder="Insira a senha desejada"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Por favor, confirme sua senha!" },
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
            prefix={<LockFilled style={{ color: "rgba(0,0,0,.7)", padding: "10px"}} />}
            placeholder="Confirme a senha"
          />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit"
            style={{padding: "25px 35px", backgroundColor: "#677BFF"}} >
              Register
          </Button>
          <p style={{marginTop: "20px"}}> Já possui uma conta? <a href= "/" style = {{color: "#AE00D9"}}>Login</a></p>
        </Form.Item>
      </Form>
    );
  }

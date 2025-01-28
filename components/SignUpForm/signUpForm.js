  "use client";

  import { useRouter } from "next/navigation";

  import React, { useState } from "react";
  import {
    Form,
    Input,
    Button
  } from "antd";

  import { UserAddOutlined, LockOutlined, LockFilled, CodeFilled} from "@ant-design/icons";

  export default function RegistrationForm() {
    const router = useRouter();
    const [confirmDirty, setConfirmDirty] = useState(false);
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);

    const handleSubmit = (values) => {
      console.log("Received values of form: ", values);
      router.push("/");
    };

    const handleWebsiteChange = (value) => {
      setAutoCompleteResult(
        value ? [".com", ".org", ".net"].map((domain) => `${value}${domain}`) : []
      );
    };

    const websiteOptions = autoCompleteResult.map((website) => ({
      label: website,
      value: website,
    }));

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

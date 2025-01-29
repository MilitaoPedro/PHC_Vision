'use client';

import styles from "./page.module.css";
import HeaderLogout from "../../../components/HeaderLogout/headerLogout";
import {
  Modal,
  Form,
  Input,
  Button,
  message,
  Spin,
  Empty,
  Tooltip,
  notification
} from "antd";

import { 
  EditOutlined, 
  DeleteOutlined, 
  UserOutlined,
  MailOutlined,
  IdcardOutlined,
  ExclamationCircleOutlined,
  ProjectOutlined,
  CheckCircleOutlined,
  ReloadOutlined,
  LockOutlined
} from "@ant-design/icons";

import React, { useState, useEffect, useCallback } from 'react';

export default function AllUser() {
  // Estados para gerenciamento de dados
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Estados para controle de modais
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();

  // Função otimizada para buscar usuários
  const fetchUsuarios = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:3001/usuarios', {
        headers: {
          'Cache-Control': 'no-cache'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Falha ao carregar os usuários.');
      }

      const data = await response.json();
      
      // Ordenação dos usuários por nome
      const usuariosOrdenados = data.sort((a, b) => 
        a.nome.localeCompare(b.nome, 'pt-BR')
      );
      
      setUsuarios(usuariosOrdenados);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setError('Não foi possível carregar a lista de usuários. Tente novamente.');
      notification.error({
        message: 'Erro ao carregar usuários',
        description: error.message,
        duration: 4.5
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Efeito para carregar usuários iniciais
  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  // Função para deletar usuário com confirmações adicionais
  const handleDelete = async () => {
    if (!currentUser) return;

    try {
      setSubmitting(true);
      
      // Verificação adicional para usuários com projetos
      if (currentUser.projetosLiderados?.length > 0) {
        notification.warning({
          message: 'Não é possível excluir',
          description: 'Este usuário é líder de projetos ativos.',
          duration: 4.5
        });
        return;
      }

      const response = await fetch(`http://localhost:3001/usuarios/deletar/${currentUser.id_usuario}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        
        if (response.status === 400) {
            throw new Error(errorData?.message || 'Não é possível excluir este usuário no momento');
        }
        if (response.status === 404) {
            throw new Error('Usuário não encontrado ou já foi removido');
        }
        throw new Error(errorData?.message || 'Erro ao excluir usuário');
    }

    const result = await response.json();

    setUsuarios(prevUsers => 
        prevUsers.filter(user => user.id_usuario !== currentUser.id_usuario)
    );
      
      notification.success({
        message: 'Usuário excluído com sucesso',
        description: (
            <div>
                <p>O usuário foi removido do sistema.</p>
                {result.details && (
                    <ul style={{ marginTop: '8px', marginBottom: 0 }}>
                        <li>Tarefas desvinculadas: {result.details.tarefasReassociadas}</li>
                        <li>Projetos removidos: {result.details.projetosDesvinculados}</li>
                    </ul>
                )}
            </div>
        ),
        icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
        duration: 5
    });
      
      setIsDeleteModalOpen(false);
      setCurrentUser(null);
    } catch (error) {
        console.error('Erro na deleção:', {
            userId: currentUser.id_usuario,
            error: error.message
        });

        notification.error({
            message: 'Erro ao excluir usuário',
            description: error.message,
            duration: 4.5,
            btn: (
                <Button 
                    type="primary" 
                    size="small" 
                    onClick={() => handleDelete()}
                    icon={<ReloadOutlined />}
                >
                    Tentar novamente
                </Button>
            )
        });
    } finally {
        setSubmitting(false);
    }
  };

  // Função para atualizar usuário com validações
  const handleEdit = async (values) => {
    try {
      setSubmitting(true);

      const response = await fetch(`http://localhost:3001/usuarios/${currentUser.id_usuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Erro ao atualizar usuário');
      }

      const { usuario: updatedUser } = await response.json();

      setUsuarios(prevUsers =>
        prevUsers.map(user =>
          user.id_usuario === currentUser.id_usuario
            ? { ...user, ...updatedUser }
            : user
        ).sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
      );

      notification.success({
        message: 'Usuário atualizado',
        description: 'As informações foram atualizadas com sucesso.',
        icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />
      });

      setIsEditModalOpen(false);
      setCurrentUser(null);
      form.resetFields();
    } catch (error) {
      console.error('Erro na atualização:', error);
      notification.error({
        message: 'Erro ao atualizar',
        description: error.message,
        duration: 4.5
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Handlers dos modais com validações adicionais
  const showEditModal = (user) => {
    setCurrentUser(user);
    form.setFieldsValue(user);
    setIsEditModalOpen(true);
  };

  const showDeleteModal = (user) => {
    // Verificação prévia de projetos liderados
    if (user.projetosLiderados?.length > 0) {
      notification.warning({
        message: 'Ação não permitida',
        description: 'Não é possível excluir um usuário que é líder de projetos.',
        duration: 4.5
      });
      return;
    }
    
    setCurrentUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setCurrentUser(null);
    form.resetFields();
  };

  return (
    <div className={styles.backgroundContainer}>
      <HeaderLogout />
      <div className={styles.contentContainer}>
        <h1 className={styles.pageTitle}>Gerenciamento de Usuários</h1>
        <hr className={styles.hr} />
        {loading ? (
          <div className={styles.loadingContainer}>
            <Spin size="large" tip="Carregando usuários..." />
          </div>
        ) : error ? (
          <div className={styles.errorContainer}>
            <ExclamationCircleOutlined className={styles.errorIcon} />
            <p className={styles.errorMessage}>{error}</p>
            <Button 
              type="primary" 
              onClick={fetchUsuarios}
              icon={<ReloadOutlined />}
            >
              Tentar novamente
            </Button>
          </div>
        ) : usuarios.length === 0 ? (
          <Empty 
            description="Nenhum usuário encontrado"
            image={Empty.PRESENTED_IMAGE_SIMPLE} 
          />
        ) : (
          <div className={styles.usersGrid}>
            {usuarios.map(user => (
              <div key={user.id_usuario} className={styles.userCard}>
                <div className={styles.userInfo}>
                  <p>
                    <UserOutlined className={styles.icon} />
                    <strong>Nome:</strong> {user.nome}
                  </p>
                  <p>
                    <MailOutlined className={styles.icon} />
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <LockOutlined className={styles.icon} />
                    <strong>Senha:</strong> {user.senha}
                  </p>
                  <Tooltip title="ID do usuário">
                    <p>
                      <IdcardOutlined className={styles.icon} />
                      <strong>ID:</strong> 
                      <span className={styles.userId}>{user.id_usuario}</span>
                    </p>
                  </Tooltip>
                  {user.projetosLiderados?.length > 0 && (
                    <p className={styles.projectInfo}>
                      <ProjectOutlined className={styles.icon} />
                      <strong>Projetos Liderados:</strong> {user.projetosLiderados.length}
                    </p>
                  )}
                </div>
                <div className={styles.actionButtons}>
                  <Tooltip title="Editar usuário">
                    <Button
                      style={{color: "#677bff"}}
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => showEditModal(user)}
                      className={styles.editButton}
                    />
                  </Tooltip>
                  <Tooltip title={
                    user.projetosLiderados?.length > 0 
                      ? "Não é possível excluir um líder de projeto" 
                      : "Excluir usuário"
                  }>
                    <Button
                      type="text"
                      style={{color: "red"}}
                      icon={<DeleteOutlined />}
                      onClick={() => showDeleteModal(user)}
                      className={styles.deleteButton}
                      disabled={user.projetosLiderados?.length > 0}
                    />
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal de Edição */}
        <Modal
          title="Editar Usuário"
          open={isEditModalOpen}
          onCancel={handleCancel}
          footer={null}
          maskClosable={false}
        >
          <Form
            form={form}
            onFinish={handleEdit}
            layout="vertical"
          >
            <Form.Item
              name="nome"
              label="Nome"
              rules={[
                { required: true, message: 'Por favor, insira o nome' },
                { min: 2, message: 'O nome deve ter pelo menos 2 caracteres' },
                { max: 100, message: 'O nome deve ter no máximo 100 caracteres' }
              ]}
            >
              <Input 
                prefix={<UserOutlined />}
                placeholder="Nome do usuário" 
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Por favor, insira o email' },
                { type: 'email', message: 'Email inválido' },
                { max: 100, message: 'O email deve ter no máximo 100 caracteres' }
              ]}
            >
              <Input 
                prefix={<MailOutlined />}
                placeholder="email@exemplo.com" 
              />
            </Form.Item>
            <Form.Item
              name="senha"
              label="Senha"
              rules={[
                { required: true, message: 'Por favor, insira a nova senha' },
                { type: 'password', message: 'Senha invílida' }
              ]}
            >
              <Input 
                prefix={<LockOutlined />}
                placeholder="1234" 
              />
            </Form.Item>
            <Form.Item className={styles.modalButtons}>
              <Button onClick={handleCancel}>
                Cancelar
              </Button>
              <Button 
                type="primary" 
                htmlType="submit"
                loading={submitting}
              >
                Salvar
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal de Confirmação de Deleção */}
        <Modal
          title={
            <span>
              <ExclamationCircleOutlined style={{ color: '#ff4d4f', marginRight: 8 }} />
              Confirmar Exclusão
            </span>
          }
          open={isDeleteModalOpen}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancelar
            </Button>,
            <Button 
              key="delete" 
              type="primary" 
              danger 
              onClick={handleDelete}
              loading={submitting}
            >
              Excluir
            </Button>
          ]}
          maskClosable={false}
        >
          <p>Tem certeza que deseja excluir o usuário <strong>{currentUser?.nome}</strong>?</p>
          <p>Esta ação não poderá ser desfeita e todas as associações deste usuário serão removidas.</p>
        </Modal>
      </div>
    </div>
  );
}
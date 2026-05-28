import { useEffect, useState } from "react";
import { LockOutlined } from "@ant-design/icons";
import {
  CreateCustomerForm,
  GetCustomerForms,
  UpdateCustomerForm,
  DeleteCustomerForm,
  GetCustomerFormSettings,
} from "../services/api";

import {
  Table,
  Modal,
  Form,
  Input,
  Button,
  Select,
  Space,
  message,
  Popconfirm,
  Card,
  Spin,
} from "antd";

const CustomerForms = () => {
  const [data, setData] = useState([]);

  const [settings, setSettings] = useState(null);

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [form] = Form.useForm();

  // =========================================
  // GET FORMS
  // =========================================
  const fetchForms = async () => {
    try {
      setLoading(true);

      const res = await GetCustomerForms();

      setData(res.data.data || []);
    } catch (error) {
      console.log(error);

      message.error("Failed to fetch forms");
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // GET SETTINGS
  // =========================================
  const fetchSettings = async () => {
    try {
      const res = await GetCustomerFormSettings();

      setSettings(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================================
  // USE EFFECT
  // =========================================
  useEffect(() => {
    fetchForms();

    fetchSettings();
  }, []);

  // =========================================
  // SUBMIT
  // =========================================
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editingId) {
        await UpdateCustomerForm(editingId, values);

        message.success("Form updated successfully");
      } else {
        await CreateCustomerForm(values);

        message.success("Form created successfully");
      }

      setOpen(false);

      form.resetFields();

      setEditingId(null);

      fetchForms();
    } catch (error) {
      console.log(error);

      message.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  // =========================================
  // EDIT
  // =========================================
  const handleEdit = (record) => {
    setEditingId(record._id);

    form.setFieldsValue(record);

    setOpen(true);
  };

  // =========================================
  // DELETE
  // =========================================
  const handleDelete = async (id) => {
    try {
      await DeleteCustomerForm(id);

      message.success("Form deleted successfully");

      fetchForms();
    } catch (error) {
      console.log(error);

      message.error("Delete failed");
    }
  };

  // =========================================
  // LOADING
  // =========================================
  if (!settings) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Spin size="large" />
      </div>
    );
  }

  // =========================================
  // TABLE COLUMNS
  // =========================================
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },

    {
      title: "Email",
      dataIndex: "email",
    },

    {
      title: "Phone",
      dataIndex: "phone",
    },

    {
      title: "Company",
      dataIndex: "company",
    },

    {
      title: "Status",
      dataIndex: "status",
    },

    {
      title: "Actions",

      render: (_, record) => {
        return (
          <Space>
            {/* VIEW */}
            <Button
              icon={!settings?.view_active ? <LockOutlined /> : null}
              className={`${
                !settings?.view_active ? "cursor-not-allowed opacity-70" : ""
              }`}
              onClick={() => {
                if (!settings?.view_active) return;

                Modal.info({
                  title: "Customer Form Details",

                  content: (
                    <div className="space-y-2 mt-4">
                      <p>
                        <strong>Name:</strong> {record.name}
                      </p>

                      <p>
                        <strong>Email:</strong> {record.email}
                      </p>

                      <p>
                        <strong>Phone:</strong> {record.phone}
                      </p>

                      <p>
                        <strong>Company:</strong> {record.company}
                      </p>

                      <p>
                        <strong>Status:</strong> {record.status}
                      </p>
                    </div>
                  ),
                });
              }}
            >
              View
            </Button>

            {/* EDIT */}
            <Button
              type="primary"
              icon={!settings?.edit_active ? <LockOutlined /> : null}
              className={`${
                !settings?.edit_active ? "cursor-not-allowed opacity-70" : ""
              }`}
              onClick={() => {
                if (!settings?.edit_active) return;

                handleEdit(record);
              }}
            >
              Edit
            </Button>

            <Button
              danger
              icon={!settings?.delete_active ? <LockOutlined /> : null}
              className={`${
                !settings?.delete_active ? "cursor-not-allowed opacity-70" : ""
              }`}
              onClick={() => {
                if (!settings?.delete_active) return;

                Modal.confirm({
                  title: "Are you sure to delete this form?",
                  okText: "Yes",
                  cancelText: "No",
                  onOk: () => handleDelete(record._id),
                });
              }}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="p-5">
      <Card>
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-semibold">Customer Forms</h1>

          {/* CREATE */}
          {(settings?.create_active ||
            localStorage.getItem("role") === "user") && (
            <Button
              type="primary"
              onClick={() => {
                form.resetFields();

                setEditingId(null);

                setOpen(true);
              }}
            >
              Add Form
            </Button>
          )}
        </div>

        <Table
          columns={columns}
          dataSource={data}
          rowKey="_id"
          loading={loading}
        />
      </Card>

      {/* MODAL */}
      <Modal
        open={open}
        title={editingId ? "Edit Form" : "Create Form"}
        onCancel={() => {
          setOpen(false);

          form.resetFields();
        }}
        onOk={handleSubmit}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Name is required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Email is required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Phone is required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Company"
            name="company"
            rules={[
              {
                required: true,
                message: "Company is required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Status" name="status" initialValue="new">
            <Select
              options={[
                {
                  label: "New",
                  value: "new",
                },

                {
                  label: "Progress",
                  value: "progress",
                },

                {
                  label: "Closed",
                  value: "closed",
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomerForms;

import React, { useEffect, useState } from 'react';
import { type Profile } from '../../types';
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Upload,
  type UploadFile,
  type UploadProps,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import styles from './EditProfileForm.module.css';
import { type RcFile } from 'antd/es/upload';

interface EditProfileFormProps {
  profile: Profile;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ profile }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (profile.image_url) {
      setFileList([
        {
          uid: '-1',
          name: `Profile Picture - ${profile.first_name} ${profile.last_name}`,
          url: profile.image_url,
        },
      ]);
    }
  }, [profile]);

  const getBase64 = async (file: RcFile): Promise<string> => {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(newFileList);
  };

  const handlePreview = async (file: UploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url ?? (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name);
  };

  const handleCancel = (): void => {
    setPreviewOpen(false);
  };

  return (
    <Row gutter={48}>
      <Col
        xs={{
          span: 24,
          order: 2,
        }}
        md={{
          span: 16,
          order: 1,
        }}
      >
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<string>
            label="First Name"
            name="first_name"
            initialValue={profile.first_name}
            rules={[{ required: true, message: 'First name cannot be empty!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<string>
            label="Last Name"
            name="last_name"
            initialValue={profile.last_name}
            rules={[{ required: true, message: 'Last name cannot be empty!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<string>
            label="Primary Email"
            name="primary_email"
            initialValue={profile.primary_email}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item<string>
            label="Contact Email"
            name="contact_email"
            initialValue={profile.contact_email}
            rules={[
              { required: true, message: 'Contact email cannot be empty!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col
        style={{ textAlign: 'center' }}
        xs={{
          span: 24,
          order: 1,
        }}
        md={{
          span: 8,
          order: 2,
          pull: 1,
        }}
      >
        <Upload
          fileList={fileList}
          onChange={handleChange}
          onPreview={handlePreview}
          multiple={false}
          maxCount={1}
          listType="picture-circle"
          isImageUrl={() => true}
          className={styles.uploadWrapper}
        >
          {fileList.length === 0
            ? (console.log(fileList),
              (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              ))
            : null}
        </Upload>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={() => {
            handleCancel();
          }}
        >
          <img
            alt={previewTitle}
            style={{ width: '100%' }}
            src={previewImage}
          />
        </Modal>
        <Title level={4} style={{ marginTop: '1rem' }}>
          {profile.first_name} {profile.last_name}
        </Title>
      </Col>
    </Row>
  );
};

export default EditProfileForm;

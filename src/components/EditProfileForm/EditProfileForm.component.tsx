import React, { type FormEventHandler, useEffect, useState } from 'react';
import { type Profile } from '../../types';
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Skeleton,
  Upload,
  type UploadFile,
  type UploadProps,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import styles from './EditProfileForm.module.css';
import { type RcFile } from 'antd/es/upload';
import { getBase64 } from '../../util/imageConversion.util';

interface EditProfileFormProps {
  isLoading: boolean;
  profile: Profile;
  onSubmit: (formValues: {
    first_name: string;
    last_name: string;
    contact_email: string;
    linkedin_url: string;
    image_url?: string;
  }) => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  isLoading,
  profile,
  onSubmit,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [formValues, setFormValues] = useState<{
    first_name: string;
    last_name: string;
    contact_email: string;
    linkedin_url: string;
    image_url?: string;
  }>();

  useEffect(() => {
    if (!isLoading) {
      setFormValues({
        first_name: profile.first_name,
        last_name: profile.last_name,
        contact_email: profile.contact_email,
        linkedin_url: profile.linkedin_url,
        image_url: profile.image_url,
      });

      if (profile.image_url != null && profile.image_url !== '') {
        setFileList([
          {
            uid: profile.uuid,
            name: `ProfilePicture_${profile.first_name}${profile.last_name}`,
            url: profile.image_url,
          },
        ]);
      }
    }
  }, [profile, isLoading]);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handlePreview = async (file: UploadFile): Promise<void> => {
    if (file.url == null && file.preview == null) {
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
        {isLoading ? (
          <>
            <Skeleton
              paragraph={{
                rows: 0,
              }}
              active
            />
            <Skeleton.Input
              active
              block
              size="small"
              style={{ marginTop: '-0.75rem', marginBottom: '1rem' }}
            />
            <Skeleton
              paragraph={{
                rows: 0,
              }}
              active
            />
            <Skeleton.Input
              active
              block
              size="small"
              style={{ marginTop: '-0.75rem', marginBottom: '1rem' }}
            />
            <Skeleton
              paragraph={{
                rows: 0,
              }}
              active
            />
            <Skeleton.Input
              active
              block
              size="small"
              style={{ marginTop: '-0.75rem', marginBottom: '1rem' }}
            />
            <Skeleton
              paragraph={{
                rows: 0,
              }}
              active
            />
            <Skeleton.Input
              active
              block
              size="small"
              style={{ marginTop: '-0.75rem', marginBottom: '1rem' }}
            />
            <Skeleton
              paragraph={{
                rows: 0,
              }}
              active
            />
            <Skeleton.Input
              active
              block
              size="small"
              style={{ marginTop: '-0.75rem', marginBottom: '1rem' }}
            />

            <Skeleton.Button
              active
              style={{
                marginTop: '1rem',
              }}
            />
          </>
        ) : (
          <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            // onFinish={handleSubmit}
            autoComplete="off"
          >
            <Form.Item<string>
              label="First Name"
              name="first_name"
              initialValue={profile.first_name}
              rules={[
                { required: true, message: 'First name cannot be empty!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<string>
              label="Last Name"
              name="last_name"
              initialValue={profile.last_name}
              rules={[
                { required: true, message: 'Last name cannot be empty!' },
              ]}
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

            <Form.Item<string>
              label="LinkedIn URL"
              name="linkedin_url"
              initialValue={profile.linkedin_url}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        )}
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
        {isLoading ? (
          <>
            <Skeleton.Avatar active size={100} style={{ display: 'block' }} />
            <br />
            <Skeleton.Input
              style={{ display: 'block', marginTop: '1rem' }}
              size="small"
              active
            />
          </>
        ) : (
          <>
            <Upload
              fileList={fileList}
              onChange={handleChange}
              onPreview={(file) => {
                void handlePreview(file);
              }}
              multiple={false}
              maxCount={1}
              listType="picture-circle"
              isImageUrl={() => true}
              className={styles.uploadWrapper}
            >
              {fileList.length === 0 ? (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              ) : null}
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
          </>
        )}
      </Col>
    </Row>
  );
};

export default EditProfileForm;

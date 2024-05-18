import React, { useContext, useEffect, useState } from 'react';
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
import { UserContext, type UserContextType } from '../../contexts/UserContext';

const EditProfileForm: React.FC = () => {
  const { user, isUserLoading } = useContext(UserContext) as UserContextType;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [formValues, setFormValues] = useState<{
    first_name: string;
    last_name: string;
    contact_email: string;
    image_url?: string;
  }>();

  useEffect(() => {
    if (!isUserLoading) {
      user != null &&
        setFormValues({
          first_name: user.first_name,
          last_name: user.last_name,
          contact_email: user.contact_email,
          image_url: user.image_url,
        });

      if (user?.image_url != null && user.image_url !== '') {
        setFileList([
          {
            uid: user.uuid,
            name: `ProfilePicture_${user.first_name}${user.last_name}`,
            url: user.image_url,
          },
        ]);
      }
    }
  }, [user, isUserLoading]);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onSubmit = (d: any) => {
    console.log(d);
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
        {isUserLoading ? (
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
            onFinish={() => {
              onSubmit(
                formValues as {
                  first_name: string;
                  last_name: string;
                  contact_email: string;
                  image_url?: string;
                }
              );
            }}
            autoComplete="off"
          >
            <Form.Item<string>
              label="First Name"
              name="first_name"
              initialValue={user?.first_name}
              rules={[
                { required: true, message: 'First name cannot be empty!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<string>
              label="Last Name"
              name="last_name"
              initialValue={user?.last_name}
              rules={[
                { required: true, message: 'Last name cannot be empty!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<string>
              label="Primary Email"
              name="primary_email"
              initialValue={user?.primary_email}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item<string>
              label="Contact Email"
              name="contact_email"
              initialValue={user?.contact_email}
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
        {isUserLoading ? (
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
              {user?.first_name} {user?.last_name}
            </Title>
          </>
        )}
      </Col>
    </Row>
  );
};

export default EditProfileForm;

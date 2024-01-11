import { Button, message, Typography, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import React, { useState } from 'react';
import { useRevalidator } from 'react-router-dom';

import { axios } from '@/libs/axios';

export const AvatarUpload: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const revalidator = useRevalidator();

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    newFileList.forEach((file) => {
      file.status = 'done';
      file.error = false;
    });

    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('avatar', file.originFileObj as RcFile);
    });

    setUploading(true);

    axios
      .post('https://gw.promag.minhtrandev.com/personal/api/PersonalData/avatar', formData)
      .then((res) => {
        console.log(res);
        setFileList([]);
      })
      .finally(() => {
        setUploading(false);
        revalidator.revalidate();
      });
  };

  return (
    <>
      <Typography.Title level={5}>Upload your new avatar</Typography.Title>
      <ImgCrop rotationSlider>
        <Upload
          listType="picture-card"
          fileList={fileList}
          maxCount={1}
          onChange={onChange}
          onPreview={onPreview}
          onRemove={(file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
          }}
          beforeUpload={(file) => {
            const isPNG = file.type === 'image/png';
            if (!isPNG) {
              message.error(`${file.name} is not a png file`);

              return isPNG || Upload.LIST_IGNORE;
            }

            setFileList([...fileList, file]);

            return false;
          }}
        >
          {fileList.length < 1 ? '+ New' : '+ Change'}
        </Upload>
      </ImgCrop>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Upload'}
      </Button>
    </>
  );
};

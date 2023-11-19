import { Button, Modal } from 'antd';
import { ReactNode } from 'react';

type Props = {
  isModalOpen: boolean;
  buttonTitle: ReactNode;
  buttonClassName?: string;
  modalTitle: string;
  modalClassName?: string;
  children?: ReactNode;
  handleOpen?: () => void;
  handleOk?: () => void;
  handleCancel?: () => void;
  footer?: boolean;
};

export const ButtonModal = (props: Props) => {
  const {
    isModalOpen,
    buttonTitle,
    buttonClassName,
    modalTitle,
    modalClassName,
    children,
    handleOpen,
    handleOk,
    handleCancel,
    footer,
    ...ButtonProps
  } = props;

  return (
    <>
      <Button
        onClick={() => {
          handleOpen && handleOpen();
        }}
        className={buttonClassName}
        {...ButtonProps}
      >
        {buttonTitle}
      </Button>
      <Modal
        title={modalTitle}
        className={modalClassName}
        open={isModalOpen}
        onOk={() => {
          handleOk && handleOk();
        }}
        onCancel={() => {
          handleCancel && handleCancel();
        }}
        footer={footer}
      >
        {children}
      </Modal>
    </>
  );
};

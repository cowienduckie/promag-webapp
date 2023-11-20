import { Button, Modal } from 'antd';
import { ReactNode } from 'react';

interface Props {
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
  disabled?: boolean;
}

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
    disabled,
    ...ButtonProps
  } = props;

  return (
    <>
      <Button
        onClick={() => {
          handleOpen && handleOpen();
        }}
        className={buttonClassName}
        disabled={disabled ?? false}
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

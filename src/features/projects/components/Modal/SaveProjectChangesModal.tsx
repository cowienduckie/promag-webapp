import { Button } from 'antd';
import clsx from 'clsx';
import { useContext } from 'react';

import { ButtonModal } from '@/components/ButtonModal';
import { useDisclosure } from '@/hooks/useDisclosure';

import { ProjectContext } from '../../contexts/project-context';

export const SaveProjectChangesModal = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const projectState = useContext(ProjectContext);

  const onSaveChanges = async () => {
    await projectState.saveProjectChanges(projectState.project);
    close();
  };

  return (
    <ButtonModal
      isModalOpen={isOpen}
      buttonTitle="Save Changes"
      modalTitle="Save changes"
      buttonClassName=""
      handleOpen={open}
      handleCancel={close}
      footer={false}
      disabled={!projectState.isProjectChanged}
    >
      <p className={clsx('mb-10 mt-7')}>Are you sure you want to save changes?</p>

      <div className={clsx('flex flex-row justify-center')}>
        <Button className="mr-2 w-1/5" type="default" onClick={close}>
          Cancel
        </Button>
        <Button className={clsx('ml-2 w-1/5')} type="primary" onClick={onSaveChanges}>
          Save
        </Button>
      </div>
    </ButtonModal>
  );
};

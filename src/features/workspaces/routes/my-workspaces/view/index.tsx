import { TeamOutlined } from '@ant-design/icons';
import { App as AntdApp, Button, Card, Tabs } from 'antd';
import clsx from 'clsx';
import { NavLink, useLoaderData, useRevalidator } from 'react-router-dom';

import { CardDeck } from '@/components/CardDeck';
import { acceptWorkspaceInvitation } from '@/features/workspaces/apis';
import { AddWorkspaceModal } from '@/features/workspaces/components/Modal/AddWorkspaceModal';
import { IWorkspace } from '@/features/workspaces/types/IWorkspace';

import { LoaderData } from '../interfaces';

export const MyWorkspacePage = () => {
  const { myWorkspaces } = useLoaderData() as LoaderData;
  const revalidator = useRevalidator();
  const { notification } = AntdApp.useApp();

  const createCardDeck = (workspaces: IWorkspace[]) => {
    return (
      <CardDeck
        className={clsx('h-full bg-gray-100 p-10')}
        cards={workspaces.map((workspace) => (
          <NavLink key={workspace.id} to={`/app/workspaces/detail/${workspace.id}`}>
            <Card
              title={
                <p className="truncate text-xl">
                  <TeamOutlined className={clsx('mr-2 align-baseline')} />
                  {workspace.name}
                </p>
              }
              className="bg-base-100 border shadow-sm"
            >
              <p className="mb-2 text-base">
                <strong>Owner: </strong>
                {workspace.members.find((member) => member.id === workspace.ownerId)?.email}
              </p>
              <p className="mb-2 text-base">
                <strong>Members: </strong>
                {workspace.members.length}
              </p>
            </Card>
          </NavLink>
        ))}
        colNum={3}
        hGutter={24}
      />
    );
  };

  const EmptyDeck = () => {
    return (
      <div className={clsx('h-full bg-white p-10 text-center')}>
        <p className={clsx('mb-5 text-2xl font-bold')}>No Workspaces</p>
        <p className={clsx('text-base')}>You don't have any workspaces in this section yet.</p>
      </div>
    );
  };

  const tabItems = [
    {
      label: `Owned Workspaces (${myWorkspaces.ownedWorkspaces.length})`,
      key: 'owned-workspaces',
      children:
        myWorkspaces.ownedWorkspaces.length > 0 ? (
          createCardDeck(myWorkspaces.ownedWorkspaces)
        ) : (
          <EmptyDeck />
        )
    },
    {
      label: `Joined Workspaces (${myWorkspaces.memberWorkspaces.length})`,
      key: 'joined-workspaces',
      children:
        myWorkspaces.memberWorkspaces.length > 0 ? (
          createCardDeck(myWorkspaces.memberWorkspaces)
        ) : (
          <EmptyDeck />
        )
    },
    {
      label: `Invitations (${myWorkspaces.pendingWorkspaces.length})`,
      key: 'invitations',
      children:
        myWorkspaces.pendingWorkspaces.length > 0 ? (
          <CardDeck
            className={clsx('h-full bg-gray-100 p-10')}
            cards={myWorkspaces.pendingWorkspaces.map((workspace) => (
              <Card
                title={
                  <p className="truncate text-xl">
                    <TeamOutlined className={clsx('mr-2 align-baseline')} />
                    {workspace.name}
                  </p>
                }
                className="bg-base-100 border shadow-sm"
              >
                <p className="mb-2 text-base">
                  <strong>Owner: </strong>
                  {workspace.members.find((member) => member.id === workspace.ownerId)?.email}
                </p>
                <p className="mb-2 text-base">
                  <strong>Members: </strong>
                  {workspace.members.length}
                </p>
                <Button
                  className="m-auto"
                  type="primary"
                  onClick={() => {
                    acceptWorkspaceInvitation(workspace.id)
                      .then((res) => {
                        if (res) {
                          notification.success({
                            message: 'Invitation Accepted!',
                            description:
                              'You have successfully accepted the invitation to join this workspace.',
                            placement: 'topRight',
                            duration: 3
                          });
                        }
                      })
                      .finally(() => {
                        revalidator.revalidate();
                      });
                  }}
                >
                  Accept
                </Button>
              </Card>
            ))}
            colNum={3}
            hGutter={24}
          />
        ) : (
          <EmptyDeck />
        )
    }
  ];

  return (
    <div className={clsx('flex h-full flex-col p-5')}>
      <div className={clsx('my-5 flex flex-row justify-between px-2')}>
        <h1 className={clsx('text-2xl font-bold')}>Your Workspaces</h1>
        <AddWorkspaceModal
          onRefreshList={() => {
            revalidator.revalidate();
          }}
        />
      </div>
      <Tabs
        className={clsx('my-3 h-full')}
        defaultActiveKey="owned-workspaces"
        type="card"
        size="large"
        items={tabItems}
      />
    </div>
  );
};

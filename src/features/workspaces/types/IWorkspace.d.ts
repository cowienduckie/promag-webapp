import { IProfile } from '@/features/profile/types';

export interface IWorkspace {
  id: string;
  name: string;
  ownerId: string;
  members: IProfile[];
  invitations: IProfile[];
}

export interface IMyWorkspaces {
  ownedWorkspaces: IWorkspace[];
  memberWorkspaces: IWorkspace[];
  pendingWorkspaces: IWorkspace[];
}

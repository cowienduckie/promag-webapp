export interface IProfile {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  photoPath?: string;
  email: string;
  userStatus: string;
  createdOn: Date;
  lastModifiedOn?: Date;
  address: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
}

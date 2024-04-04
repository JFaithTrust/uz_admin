class BaseObject {
  id: string;
  title: string;
  gender: string;
  salary: number;
  workingTime: string;
  workingSchedule: string;
  deadline: Date;
  telegramLink: string;
  instagramLink: string;
  tgUserName: string;
  categoryId: string;
  districtId: string;
  createDate: Date;
}

export class Job extends BaseObject {
  phoneNumber: string;
  benefit: string;
  requirement: string;
  minAge: number;
  maxAge: number;
  latitude?: number;
  longitude?: number;
}

export class Worker extends BaseObject {
  createdBy: string;
  createdDate: Date;
  birthDate: Date;
  fullName: string;
  username: string;
  phoneNumber: string;
  location: string;
}

export interface Experience {
  id: string;
  companyName: string;
  position: string;
  startDate: Date;
  endDate: Date;
  description: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
}

export interface District {
  id: string;
  name: string;
}

export interface Region {
  id: string;
  name: string;
}

export class FAQ {
  id: string;
  question: string;
  answer: string;
  createDate: Date;
}
export interface Feedback {
  id: string;
  message: string;
  fullName: string;
  dueDate: Date;
}

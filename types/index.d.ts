class BaseObject {
  id: string;
  title: string;
  salary: number;
  gender: number;
  workingTime: string;
  workingSchedule: string;
  deadline: Date;
  telegramLink: string;
  instagramLink: string;
  tgUserName: string;
  phoneNumber: string;
  categoryId: string;
  districtId: string;
}

export class Job extends BaseObject {
  benefit: string;
  requirement: string;
  minAge: number;
  maxAge: number;
  latitude?: number;
  longitude?: number;
}

export class Worker extends BaseObject {
  createdBy: string;
  fullName: string;
  userName: string;
  regionName: string;
  districtName: string;
  categoryName: string;
  birthDate: Date;
  // location: string;
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
  regionId: string;
}

export interface Region {
  id: string;
  name: string;
}

export class FAQ {
  id: string;
  question: string;
  answer: string;
  createDate?: Date;
}
export interface Feedback {
  id: string;
  message: string;
  fullName: string;
  dueDate: Date;
}

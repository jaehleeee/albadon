export interface Store {
  createdDatetime: string;
  updatedDatetime: string;
  storeId: number;
  storeName: string;
  storeAddress: string;
  storePhoneNumber: string;
}

export interface Employee {
  contractId: number;
  wage: number;
  nightWage: number;
  holidayWage: number;
  startDate: string;
  endDate: string;
  employeeId: number;
  employeeName: string;
  role: string;
  employeePhoneNumber: string;
  employeeSex: string;
  employeeBirthday: string;
}

export interface ContractSummary {
  contractId: number;
  wage: number;
  nightWage: number;
  holidayWage: number;
  startDate: string;
  endDate: string;
  employeeId: number;
  employeeName: string;
  role: string;
  employeePhoneNumber: string;
  employeeSex: string;
  employeeBirthday: string;
}

export interface ContractDetail {
  createdDatetime: string;
  updatedDatetime: string;
  contractId: number;
  store: Store;
  employee: {
    createdDatetime: string;
    updatedDatetime: string;
    employeeId: number;
    employeeName: string;
    role: string;
    employeePhoneNumber: string;
    employeeSex: string;
    employeeBirthday: string;
  };
  wage: number;
  nightWage: number;
  holidayWage: number;
  startDate: string;
  endDate: string;
}

export interface ContractSchedule {
  createdDatetime: string;
  updatedDatetime: string;
  contractDetailId: number;
  weekday: number;
  startTime: string; //HH:mm:dd
  endTime: string;
}

export interface WorkDetail {
  monthWork: WorkDetailItem[];
  prevMonthLastWeekWork: WorkDetailItem[];
}

export interface WorkDetailItem {
  createdDatetime?: string;
  endTime?: string; //hh:mm:ss
  pauseInfo?: {
    duration: string; //hhmm
  };
  pauseMinutes?: number;
  startTime?: string; //hh:mm:ss
  weekday: number;
  weekNumber: number;
  workDate: string; //YYYY-MM-DD
  workId?: number;
}

export interface Boss {
  createdDatetime: string;
  updatedDatetime: string;
  bossId: number;
  bossName: string;
  bossPhoneNumber: string;
  bossSex: string;
  bossBirthday: string;
  storeList: Store[];
}

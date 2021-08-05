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

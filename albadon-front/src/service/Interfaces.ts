export interface EmployeeUpsertRequest {
  contractDetailCondList: {
    endTime: string;
    startTime: string;
    weekday: number;
  }[];
  employeeBirthday?: string;
  employeeName: string;
  employeePhoneNumber: string;
  employeeSex?: string;
  endDate?: string;
  holidayWage: number;
  nightWage: number;
  role: string;
  startDate: string;
  storeId: number;
  wage: number;
}

export interface WorkListGetRequest {
  contractId: number;
  month: number;
  year: number;
}

export interface StoreInsertRequest {
  bossId: number;
  storeAddress: string;
  storeName: string;
  storePhoneNumber: string;
}

export interface ContractDetailRequest {
  contractId: number;
  endTime: string;
  startTime: string;
  weekday: number;
}

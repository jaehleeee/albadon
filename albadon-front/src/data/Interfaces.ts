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

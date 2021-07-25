export interface EmployeeCreateRequest {
  //   contractDetailCondList: [
  //     {
  //       endTime: {
  //         hour: number;
  //         minute: number;
  //         nano: number;
  //         second: number;
  //       };
  //       startTime: {
  //         hour: number;
  //         minute: number;
  //         nano: number;
  //         second: number;
  //       };
  //       weekday: number;
  //     }
  //   ];
  employeeBirthday: string;
  employeeName: string;
  employeePhoneNumber: string;
  employeeSex: string;
  endDate: string;
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

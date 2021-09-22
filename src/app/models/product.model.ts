export class Department {
  Code: string;
  Name: string;
  CreateDate: Date;
  Description: string;
  constructor(Code: string, Name: string, CreateDate: Date, Description: string) {
    this.Code = Code;
    this.Name = Name;
    this.CreateDate = CreateDate;
    this.Description = Description;
  }
};

export class JobTitle {
  Code: string;
  Name: string;
  Description: string;
  constructor(Code: string, Name: string, Description: string) {
    this.Code = Code;
    this.Name = Name;
    this.Description = Description;
  }
};

export class Employee {
  Code: string;
  Name: string;
  Titles: EmployeeTitle[];
  Description: string;
  constructor(Code: string, Name: string,Titles: EmployeeTitle[] , Description: string) {
    this.Code = Code;
    this.Name = Name;
    this.Titles = Titles;
    this.Description = Description;
  }
};

export class EmployeeTitle {
  DepartmentCode: string;
  JobTitleCode: string;
  constructor(DepartmentCode: string, JobTitleCode: string) {
    this.DepartmentCode = DepartmentCode;
    this.JobTitleCode = JobTitleCode;
  }
};


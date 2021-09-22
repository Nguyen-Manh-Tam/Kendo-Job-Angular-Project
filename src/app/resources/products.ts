import { Department } from "../models/product.model";
import { JobTitle } from "../models/product.model";
import { Employee } from "../models/product.model";
import { EmployeeTitle } from "../models/product.model";

export const departments = [
    new Department('1', 'Phòng kinh tế', new Date(2019, 5, 22), 'aaaaaaaaaaaaaaaa'),
    new Department('2', 'Phòng kế hoạch', new Date(2019, 7, 23), 'bbbbbbbbbbbb'),
];

// departments.find((depart) => depart.Name === '1').Name

export const jobTitles = [
    new JobTitle('11', 'Giám đốc', 'ccccccccccc'),
    new JobTitle('22', 'Trưởng phòng', 'dddddddđ'),
];

export const employees = [
    new Employee('113', 'Lê Văn B',[new EmployeeTitle('1', '11'), new EmployeeTitle('2', '22')] , 'vvvvvvvvvvvvvvvvvvvv'),
    new Employee('225', 'Nguyễn Văn A',[new EmployeeTitle('2', '22')], 'dddddddddd'),
];
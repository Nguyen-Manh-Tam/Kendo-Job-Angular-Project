import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { tap, map } from 'rxjs/operators';
import { departments, employees, jobTitles } from '../resources/products';

const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';

@Injectable()
export class InfoEditService extends BehaviorSubject<any[]> {
    constructor(private http: HttpClient) {
        super([]);
    }

    private data: any[] = [];

    public read() {
        if (this.data.length) {
            return super.next(this.data);
        }

        this.fetch()
            .pipe(
                tap(data => {
                    this.data = data;
                })
            )
            .subscribe(data => {
                super.next(data);
            });
    }

    public save(data: any, isNew?: boolean) {
        const action = isNew ? CREATE_ACTION : UPDATE_ACTION;

        this.reset();

        this.fetch(action, data)
            .subscribe(() => this.read(), () => this.read());
    }

    public remove(data: any) {
        this.reset();

        this.fetch(REMOVE_ACTION, data)
            .subscribe(() => this.read(), () => this.read());
    }

    public resetItem(dataItem: any) {
        if (!dataItem) { return; }

        // find orignal data item
        const originalDataItem = this.data.find(item => item.Code === dataItem.Code);

        // revert changes
        Object.assign(originalDataItem, dataItem);

        super.next(this.data);
    }

    private reset() {
        this.data = [];
    }

    private fetch(action: string = '', data?: any): Observable<any[]> {
        // return this.http
        //     .jsonp(`https://demos.telerik.com/kendo-ui/service/Products/${action}?${this.serializeModels(data)}`, 'callback')
        //     .pipe(map(res => <any[]>res));
        return new Observable<any[]>((observable) => {
            const updatedEmployees = [];
            for (const employee of employees) {
                let titles = '';
                let i = 0;
                for (const title of employee.Titles) {
                    const foundJob = jobTitles.find((jobTitle) => title.JobTitleCode === jobTitle.Code);
                    if (foundJob) {
                        titles += foundJob.Name;
                        if (i < employee.Titles.length - 1) {
                            titles += ', ';
                        }
                    }
                    ++i;
                }
                let updatedEmployee = {
                    Code: employee.Code, 
                    Name: employee.Name,
                    Titles: employee.Titles,
                    MsgTitles: titles,
                    Description: employee.Description
                };
                
                updatedEmployees.push(updatedEmployee)
            }
            observable.next(updatedEmployees);
        })
    }

    private serializeModels(data?: any): string {
        return data ? `&models=${JSON.stringify([data])}` : '';
    }
}
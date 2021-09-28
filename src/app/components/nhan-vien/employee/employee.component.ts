import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { process } from '@progress/kendo-data-query';
import { Observable } from "rxjs";
import { GridDataResult, SelectableSettings, SelectionEvent } from "@progress/kendo-angular-grid";
import { State } from "@progress/kendo-data-query";
import { Employee } from "./../../../models/product.model";
import { EmployeeTitle } from "./../../../models/product.model";
import { EmployeeEditService } from "../../../services/employee-edit.service";
import { SharedService } from 'src/app/services/shared-service';
import { employees } from 'src/app/resources/products';

@Component({
	selector: 'app-employee-component',
	templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {
	@Output() newItemEvent = new EventEmitter();
	public view: Observable<GridDataResult>;
	public gridState: State = {
		sort: [],
		skip: 0,
		take: 10,
	};

	Code: string;
	Name: string;
	Titles: EmployeeTitle[];
	MsgTitles: string;
	Description: string;
	public opened = null;

	public editDataItem: Employee;
	public isNew: boolean;
	private editService: EmployeeEditService;
	public gridData: any = employees;
	public mySelection: number[] = [];
	private selectionCode: string;
	public selectedRows: Array<string>;
	public selectedStock: Employee;
	public checkboxOnly = false;

	constructor(
		@Inject(EmployeeEditService) editServiceFactory: any,
		private _sharedService: SharedService,
		private route: ActivatedRoute
	) {
		this.editService = editServiceFactory();

		delete this.selectionCode;
		this.route.queryParams.subscribe(params => {
			const code = params['code'];
			if (code) {
				this.selectionCode = code;
			}
		});
		if (this.gridData && this.gridData.length) {
			if (this.selectionCode) {
				for (let i = 0, n = this.gridData.length; i < n; ++i) {
					const item = this.gridData[i];
					if (this.selectionCode === item.Code) {
						this.selectedStock = this.gridData[i];
					}
				}
				this.selectedRows = [this.selectionCode];
			} else {
				this.selectedStock = this.gridData[0];
				this.selectedRows = [this.gridData[0].Code];
			}
		}
	}

	public ngOnInit(): void {
		this.addNewItem(this.selectedStock, this.selectedRows);
	}

	public onStateChange(state: State) {
		this.gridState = state;

		this.editService.read();
	}

	public addHandler() {
		this.editDataItem = new Employee(this.Code, this.Name, this.Titles, this.Description);
		this.isNew = true;
	}

	public editHandler({ dataItem }) {
		this.editDataItem = dataItem;
		this.isNew = false;
	}

	public cancelHandler() {
		this.editDataItem = undefined;
	}

	public saveHandler(employee: Employee) {
		this.editService.save(employee, this.isNew);

		this.editDataItem = undefined;
	}

	public removeHandler({ dataItem }) {
		this.editService.remove(dataItem);
	}

	onButtonClick(dataItem, rowIndex, selectedRows) {
		const emitData = { dataItem, rowIndex, selectedRows };
		this._sharedService.emitChange(emitData);
	}

	addNewItem(dataItem, selectedRows) {
		const emitData = { dataItem, selectedRows };
		this.newItemEvent.emit(emitData);
	}

	public handleSelectionChange(event: SelectionEvent): void {
		if (!(event.selectedRows && event.selectedRows.length)) {
			this.selectedRows = [this.selectedStock.Code];
			return;
		}
		this.selectedStock = event.selectedRows[0].dataItem;
	}
}
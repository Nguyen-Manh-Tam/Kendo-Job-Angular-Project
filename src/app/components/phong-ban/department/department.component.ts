import { Component, Inject, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { process } from '@progress/kendo-data-query';
import { Observable } from "rxjs";
import { GridDataResult, SelectableSettings, SelectionEvent } from "@progress/kendo-angular-grid";
import { State } from "@progress/kendo-data-query";
import { Department } from "./../../../models/product.model";
import { map } from "rxjs/operators";
import { DepartmentEditService } from 'src/app/services/department-edit.service';
import { departments } from 'src/app/resources/products';
import { SharedService } from 'src/app/services/shared-service';


@Component({
	selector: 'app-department-component',
	templateUrl: './department.component.html'
})
export class DepartmentComponent implements OnInit {
	// @Output('onClick') onClick = new EventEmitter();
	@Output() newItemEvent = new EventEmitter();
	public view: Observable<GridDataResult>;
	public gridState: State = {
		sort: [],
		skip: 0,
		take: 10,
	};


	Code: string;
	Name: string;
	CreateDate: Date;
	Description: string;
	public editDataItem: Department;
	public isNew: boolean;
	private editService: DepartmentEditService;
	public gridData: any = departments;
	public selectedRows: Array<string>;
	public selectedStock: Department;


	public checkboxOnly = false;
	public selectableSettings: SelectableSettings;
	public mySelection: string[] = [];

	constructor(@Inject(DepartmentEditService) editServiceFactory: any,

		private _sharedService: SharedService
	) {
		this.editService = editServiceFactory();
		if (this.gridData && this.gridData.length) {
			this.selectedStock = this.gridData[0];
			this.selectedRows = [this.gridData[0].Code];
		}
	}



	public ngOnInit(): void {
		this.view = this.editService.pipe(
			map((data) => process(data, this.gridState))
		);

		this.editService.read();
		this.view.subscribe(res => {
			this.gridData = res;
		});
		this.addNewItem(this.selectedStock, this.selectedRows);
	}

	public onStateChange(state: State) {
		this.gridState = state;

		this.editService.read();
	}

	public addHandler() {
		this.editDataItem = new Department(this.Code, this.Name, this.CreateDate, this.Description);
		this.isNew = true;
	}

	public editHandler({ dataItem }) {
		this.editDataItem = dataItem;
		this.isNew = false;
	}


	public cancelHandler() {
		this.editDataItem = undefined;
	}

	public saveHandler(department: Department) {
		this.editService.save(department, this.isNew);

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


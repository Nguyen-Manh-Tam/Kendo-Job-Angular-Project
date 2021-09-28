import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { process } from '@progress/kendo-data-query';
import { Observable } from "rxjs";
import { GridDataResult, SelectableSettings, SelectionEvent } from "@progress/kendo-angular-grid";
import { State } from "@progress/kendo-data-query";
import { JobTitle } from "../../../models/product.model";

import { map } from "rxjs/operators";
import { JobTitleEditService } from 'src/app/services/jobtitle-edit.service';
import { jobTitles } from 'src/app/resources/products';
import { SharedService } from 'src/app/services/shared-service';

@Component({
	selector: 'app-jobtitle-component',
	templateUrl: './jobtitle.component.html'
})
export class JobTitleComponent implements OnInit {
	@Output() newItemEvent = new EventEmitter();
	public view: Observable<GridDataResult>;
	public gridState: State = {
		sort: [],
		skip: 0,
		take: 10,
	};

	Code: string;
	Name: string;
	Description: string;

	public opened = null;
	public editDataItem: JobTitle;
	public isNew: boolean;
	private editService: JobTitleEditService;
	public gridData: any = jobTitles;
	public selectedRows: Array<string>;
	public selectedStock: JobTitle;
	public checkboxOnly = false;
	public selectableSettings: SelectableSettings;

	constructor(@Inject(JobTitleEditService) editServiceFactory: any,
		private _sharedService: SharedService
	) {
		this.editService = editServiceFactory();
		this.editService = editServiceFactory();
		if (this.gridData && this.gridData.length) {
			this.selectedStock = this.gridData[0];
			this.selectedRows = [this.gridData[0].Code];
			// console.log(this.selectedRows, "tttttttttt");

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
		this.editDataItem = new JobTitle(this.Code, this.Name, this.Description);
		this.isNew = true;
	}

	public editHandler({ dataItem }) {
		this.editDataItem = dataItem;
		this.isNew = false;
	}

	public cancelHandler() {
		this.editDataItem = undefined;
	}

	public saveHandler(jobTitle: JobTitle) {
		this.editService.save(jobTitle, this.isNew);

		this.editDataItem = undefined;
	}

	public removeHandler({ dataItem }) {
		this.editService.remove(dataItem);
	}

	public showModal(rowIndex) {
		this.opened = rowIndex;
	}

	public close() {
		this.opened = undefined;
	}

	onButtonClick1(dataItem, rowIndex, selectedRows) {
		const emitData1 = { dataItem, rowIndex, selectedRows };
		this._sharedService.emitChange(emitData1);
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

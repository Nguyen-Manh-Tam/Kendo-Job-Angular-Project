import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { process } from '@progress/kendo-data-query';
import { Observable } from "rxjs";
import { GridDataResult } from "@progress/kendo-angular-grid";
import { State } from "@progress/kendo-data-query";
import { JobTitle } from "../../models/product.model";

import { map } from "rxjs/operators";
import { DashboardEditService } from 'src/app/services/dashboard-edit.service';
import { jobTitles } from 'src/app/resources/products';
import { SharedService } from 'src/app/services/shared-service';

@Component({
	selector: 'app-dashboard-component',
	templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
	@Output() public toggle = new EventEmitter();
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
	private editService: DashboardEditService;
	public gridData: any = jobTitles;

	constructor(@Inject(DashboardEditService) editServiceFactory: any,
		private _sharedService: SharedService
	) {
		this.editService = editServiceFactory();
	}



	public ngOnInit(): void {
		this.view = this.editService.pipe(
			map((data) => process(data, this.gridState))
		);

		this.editService.read();
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

	onClick(dataItem, rowIndex) {
		const emitData = { dataItem, rowIndex, type: 'chuc danh' };
		this._sharedService.emitChange(emitData);
	}

}
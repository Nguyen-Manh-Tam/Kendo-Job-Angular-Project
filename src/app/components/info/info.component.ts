import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { process } from '@progress/kendo-data-query';
import { Observable } from "rxjs";
import { GridDataResult, RowArgs, SelectableSettings } from "@progress/kendo-angular-grid";
import { State } from "@progress/kendo-data-query";
import { Employee } from "../../models/product.model";
import { EmployeeTitle } from "../../models/product.model";
import { InfoEditService } from "../../services/info-edit.service";
import { map } from "rxjs/operators";
import { SharedService } from 'src/app/services/shared-service';

@Component({
	selector: 'app-info-component',
	templateUrl: './info.component.html',
})
export class InfoComponent implements OnInit {
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
	private editService: InfoEditService;
	public mySelection: number[] = [];
	private selectionCode: string;

	constructor(
		@Inject(InfoEditService) editServiceFactory: any,
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
	}

	public ngOnInit(): void {
		this.view = this.editService.pipe(
			map(
				(data) => {
					const result = process(data, this.gridState);

					this.mySelection = [];
					if (this.selectionCode) {
						for (let i = 0, n = result.data.length; i < n; ++i) {
							const item = result.data[i];
							if (item.Code === this.selectionCode) {

								this.mySelection.push(i);

								const emitData = { dataItem: item, i, type: 'nhan vien' };
								this._sharedService.emitChange(emitData);
								break;
							}
						}
					}

					return result;
				}
			)
		);

		this.editService.read();
	}

	public selectableSettings: SelectableSettings = {
		enabled: true,
		checkboxOnly: true
	};

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

	onClick(dataItem, rowIndex) {
		const emitData = { dataItem, rowIndex, type: 'nhan vien' };
		this._sharedService.emitChange(emitData);
	}
}
import { Component, Inject, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { process } from '@progress/kendo-data-query';
import { Observable } from "rxjs";
import { GridDataResult, PageChangeEvent, SelectableSettings } from "@progress/kendo-angular-grid";
import { State } from "@progress/kendo-data-query";
import { Department } from "../../models/product.model";
import { map } from "rxjs/operators";
import { TeamEditService } from 'src/app/services/team-edit.service';
import { departments } from 'src/app/resources/products';
import { DrawerItem } from '@progress/kendo-angular-layout';
import { SharedService } from 'src/app/services/shared-service';


@Component({
	selector: 'app-team-component',
	templateUrl: './team.component.html'
})
export class TeamComponent implements OnInit {
	@Output() public toggle = new EventEmitter();
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
	private editService: TeamEditService;
	public opened = null;
	public gridData: any = departments;
	public expanded = false;

	public checkboxOnly = false;
	public selectableSettings: SelectableSettings;
	public mySelection: string[] = [];

	constructor(@Inject(TeamEditService) editServiceFactory: any,

		private _sharedService: SharedService
	) {
		this.editService = editServiceFactory();
	}



	public ngOnInit(): void {
		this.view = this.editService.pipe(
			map((data) => process(data, this.gridState))
		);

		this.editService.read();
		this.view.subscribe(res => {
			this.gridData = res;
		});
		
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


	onClick(dataItem, rowIndex) {
		const emitData = { dataItem, rowIndex, type: 'phong ban' };
		this._sharedService.emitChange(emitData);	
	}

}
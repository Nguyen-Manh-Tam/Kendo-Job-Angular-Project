import { Component, Input, OnInit } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { employees } from 'src/app/resources/products';
import { SharedService } from 'src/app/services/shared-service';
import { map } from "rxjs/operators";
import { process, State } from '@progress/kendo-data-query';
import { DepartmentEditService } from 'src/app/services/department-edit.service';

@Component({
	selector: 'app-drawer-phong-ban',
	templateUrl: './drawer-phong-ban.component.html',
	styleUrls: ['./drawer-phong-ban.component.scss']
})
export class DrawerPhongBanComponent implements OnInit {
	@Input() item: any;
	public dataPhongBan: Array<any> = [];
	public dataEmployees: any = employees;
	private editService: DepartmentEditService;
	public view: Observable<GridDataResult>;


	constructor(
		private _sharedService: SharedService,
	) {
		this._sharedService.changeEmitted$.subscribe(
			(emitData) => {
				const dataItems = emitData.dataItem;
				const selectedRows = emitData.selectedRows;
				this.dataPhongBan = []; // làm rỗng dataPhongBan trước khi push dữ liệu vào 
				this.dataPhongBan.push(dataItems);
			}
		)
	}

	public ngOnInit(): void {
		let emitData = this.item;
		const dataItems = emitData.dataItem;
		this.dataPhongBan = []; // làm rỗng dataPhongBan trước khi push dữ liệu vào 
		this.dataPhongBan.push(dataItems);
	}
}

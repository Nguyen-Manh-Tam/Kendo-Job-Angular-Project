import { Component, Input, OnInit } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { employees } from 'src/app/resources/products';
import { SharedService } from 'src/app/services/shared-service';

@Component({
	selector: 'app-drawer-chuc-danh',
	templateUrl: './drawer-chuc-danh.component.html',
	styleUrls: ['./drawer-chuc-danh.component.scss']
})
export class DrawerChucDanhComponent implements OnInit {
	@Input() item: any
	public dataChucDanh: Array<any> = [];
	public dataEmployees: any = employees;
	public view: Observable<GridDataResult>;

	constructor(
		private _sharedService: SharedService,
	) {
		this._sharedService.changeEmitted$.subscribe(
			(emitData) => {
				const dataItems = emitData.dataItem;
				const selectedRows = emitData.selectedRows;
				this.dataChucDanh = []; // làm rỗng dataPhongBan trước khi push dữ liệu vào 
				this.dataChucDanh.push(dataItems);
			}
		)
	}

	ngOnInit(): void {
		let emitData = this.item;
		const dataItemss = emitData.dataItem;
		this.dataChucDanh = []; // làm rỗng dataPhongBan trước khi push dữ liệu vào 
		this.dataChucDanh.push(dataItemss);
	}

}

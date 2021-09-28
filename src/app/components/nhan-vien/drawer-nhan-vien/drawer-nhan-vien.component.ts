import { Component, Input, OnInit } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { employees } from 'src/app/resources/products';
import { SharedService } from 'src/app/services/shared-service';

@Component({
	selector: 'app-drawer-nhan-vien',
	templateUrl: './drawer-nhan-vien.component.html',
	styleUrls: ['./drawer-nhan-vien.component.scss']
})
export class DrawerNhanVienComponent implements OnInit {
	@Input() item: any
	public dataNhanVien: Array<any> = [];
	public dataEmployees: any = employees;
	public view: Observable<GridDataResult>;

	constructor(
		private _sharedService: SharedService,
	) {
		this._sharedService.changeEmitted$.subscribe(
			(emitData) => {
				const dataItems = emitData.dataItem;
				const selectedRows = emitData.selectedRows;
				this.dataNhanVien = []; // làm rỗng dataPhongBan trước khi push dữ liệu vào 
				this.dataNhanVien.push(dataItems);				
			}
		)
	}

	public ngOnInit(): void {
		let emitData = this.item;
		const dataItems = emitData.dataItem;
		this.dataNhanVien = []; // làm rỗng dataPhongBan trước khi push dữ liệu vào 
		this.dataNhanVien.push(dataItems);
	}

}

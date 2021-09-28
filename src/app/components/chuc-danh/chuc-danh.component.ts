import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared-service';

@Component({
	selector: 'app-chuc-danh',
	templateUrl: './chuc-danh.component.html',
	styleUrls: ['./chuc-danh.component.scss']
})
export class ChucDanhComponent implements OnInit {
	public dataRow: Array<any> = [];
	public dataChucDanh: Array<any> = [];

	constructor(
		private _sharedService: SharedService
	) {
		// this._sharedService.changeEmitted$.subscribe(
		// 	(emitData) => {
		// 		const dataItems = emitData.dataItem;
		// 		const rowIndexs = emitData.rowIndex;
		// 		this.dataChucDanh = []; // làm rỗng dataChucDanh trước khi push dữ liệu vào 
		// 		this.dataChucDanh.push(dataItems, rowIndexs);
		// 	}
		// )
	}

	ngOnInit(): void {

	}

	addItem(newItem: any) {
		this.dataRow = newItem;
	}
}

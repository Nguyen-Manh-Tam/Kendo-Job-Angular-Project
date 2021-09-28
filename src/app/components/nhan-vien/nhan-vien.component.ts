import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared-service';

@Component({
	selector: 'app-nhan-vien',
	templateUrl: './nhan-vien.component.html',
	styleUrls: ['./nhan-vien.component.scss']
})
export class NhanVienComponent implements OnInit {
	public dataNhanVien: Array<any> = [];
	public dataRow: Array<any> = [];

	constructor(
		private _sharedService: SharedService
	) {
		this._sharedService.changeEmitted$.subscribe(
			(emitData) => {
				const dataItems = emitData.dataItem;
				const rowIndexs = emitData.rowIndex;
				this.dataNhanVien = []; // làm rỗng dataPhongBan trước khi push dữ liệu vào 
				this.dataNhanVien.push(dataItems, rowIndexs);
			}
		)
	}

	ngOnInit(): void {
	}

	addItem(newItem: any) {
		this.dataRow = newItem;
	}
}

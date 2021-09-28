import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared-service';

@Component({
	selector: 'app-phong-ban',
	templateUrl: './phong-ban.component.html',
	styleUrls: ['./phong-ban.component.scss']
})
export class PhongBanComponent implements OnInit {
	public dataPhongBan: Array<any> = [];
	public dataRow: Array<any> = [];

	constructor(
		private _sharedService: SharedService
	) {
		// this._sharedService.changeEmitted$.subscribe(
		// 	(emitData) => {
		// 		const dataItems = emitData.dataItem;
		// 		const rowIndexs = emitData.rowIndex;
		// 		this.dataPhongBan = []; // làm rỗng dataPhongBan trước khi push dữ liệu vào 
		// 		this.dataPhongBan.push(dataItems, rowIndexs);
		// 	}
		// )
	}

	ngOnInit(): void {
	}

	addItem(newItem: any) {
		this.dataRow = newItem;
	}
}

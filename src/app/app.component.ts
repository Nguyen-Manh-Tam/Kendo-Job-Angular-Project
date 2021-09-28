import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { MessageService } from '@progress/kendo-angular-l10n';
import { DrawerComponent, DrawerItem, DrawerMode, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { CustomMessagesService } from './services/custom-messages.service';
import { SharedService } from './services/shared-service';
import { employees } from "./resources/products";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
    @ViewChild('drawer1') drawer1: DrawerComponent;
    @ViewChild('drawer2') drawer2: DrawerComponent;
    @ViewChild('drawer3') drawer3: DrawerComponent;

    public selected = 'Team';
    public items: Array<any>;
    public customMsgService: CustomMessagesService;
    public mode: DrawerMode = 'push';
    public mini = true;
    public dataPhongBan: Array<any> = [];
    public dataChucDanh: Array<any> = [];
    public dataNhanVien: Array<any> = [];
    public dataNhanVienHienTai: Array<any> = [];
    public rowIndexs: any;
    public opened = null;
    public dataEmployees: any = employees;

    constructor(private router: Router, public msgService: MessageService,
        //
        private _sharedService: SharedService
    ) {
        this.customMsgService = this.msgService as CustomMessagesService;
        //
        // this._sharedService.changeEmitted$.subscribe(
        //     (emitData) => {
        //         const type = emitData.type;
        //         if (type === 'phong ban') {
        //             this.drawer1.toggle();
        //             const dataItems = emitData.dataItem;
        //             this.rowIndexs = emitData.rowIndex;
        //             this.dataPhongBan = []; // làm rỗng dataPhongBan trước khi push dữ liệu vào 
        //             this.dataPhongBan.push(dataItems);
        //             console.log(this.dataPhongBan, "gggggggkkk");
                // } else if (type === 'nhan vien') {
                //     this.drawer3.toggle();
                //     const dataItems = emitData.dataItem;
                //     const rowIndexss = emitData.rowIndex;
                //     this.dataNhanVien = [];
                //     this.dataNhanVien.push(dataItems);
                // }
                //  else {
                //     this.drawer2.toggle();
                //     const dataItems = emitData.dataItem;
                //     const rowIndexss = emitData.rowIndex;
                //     this.dataNhanVien = [];
                //     this.dataNhanVien.push(dataItems);
                // }
        //     },
        // );

    }

    ngOnInit() {
        // Update Drawer selected state when change router path
        this.router.events.subscribe((route: NavigationStart) => {
            if (route instanceof NavigationStart) {
                this.items = this.drawerItems().map((item) => {
                    if (item.path && item.path === route.url) {
                        item.selected = true;
                        return item;
                    } else {
                        item.selected = false;
                        return item;
                    }
                });
            }
        });

        this.setDrawerConfig();

        this.customMsgService.localeChange.subscribe(() => {
            this.items = this.drawerItems();
        });

        window.addEventListener('resize', () => {
            this.setDrawerConfig();
        });
    }

    ngOnDestroy() {
        window.removeEventListener('resize', () => { });
    }

    public setDrawerConfig() {
        const pageWidth = window.innerWidth;
        if (pageWidth <= 770) {
            this.mode = 'overlay';
            this.mini = false;
        } else {
            this.mode = 'push';
            this.mini = true;
        }
    }

    public drawerItems() {
        return [
            { text: this.customMsgService.translate('team'), icon: 'k-i-grid', path: '/', selected: true },
            { text: this.customMsgService.translate('dashboard'), icon: 'k-i-chart-line-markers', path: '/dashboard', selected: false },
            { text: this.customMsgService.translate('info'), icon: 'k-i-information', path: '/info', selected: false }
        ];
    }

    public toggleDrawer(drawer: DrawerComponent): void {
        drawer.toggle();
    }

    public onSelect(ev: DrawerSelectEvent): void {
        this.router.navigate([ev.item.path]);
        this.selected = ev.item.text;
    }
}

import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	HttpClient,
	HttpClientModule,
	HttpClientJsonpModule,
} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { JobTitleComponent } from './components/chuc-danh/jobtitle/jobtitle.component';
import { HeaderComponent } from './header/header.component';
import { CustomMessagesService } from './services/custom-messages.service';

import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { LabelModule } from '@progress/kendo-angular-label';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { EditorModule } from '@progress/kendo-angular-editor';
import { FileSelectModule, UploadModule } from '@progress/kendo-angular-upload';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { MessageService } from '@progress/kendo-angular-l10n';

const drawerRoutes = [
	{ path: '', component: PhongBanComponent },
	{ path: 'dashboard', component: ChucDanhComponent },
	{ path: 'info', component: NhanVienComponent },
];

import 'hammerjs';

import '@progress/kendo-angular-intl/locales/en/all';
import '@progress/kendo-angular-intl/locales/es/all';
import '@progress/kendo-angular-intl/locales/fr/all';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { JobTitleEditFormComponent } from './components/chuc-danh/jobtitle/jobtitle-edit-form.component';
import { DepartmentEditService } from './services/department-edit.service';
import { EmployeeEditService } from './services/employee-edit.service';
import { JobTitleEditService } from './services/jobtitle-edit.service';
import { SharedService } from './services/shared-service';
import { DrawerPhongBanComponent } from './components/phong-ban/drawer-phong-ban/drawer-phong-ban.component';
import { PhongBanComponent } from './components/phong-ban/phong-ban.component';
import { DepartmentComponent } from './components/phong-ban/department/department.component';
import { DepartmentEditFormComponent } from './components/phong-ban/department/Department-edit-form.component';
import { ChucDanhComponent } from './components/chuc-danh/chuc-danh.component';
import { DrawerChucDanhComponent } from './components/chuc-danh/drawer-chuc-danh/drawer-chuc-danh.component';
import { NhanVienComponent } from './components/nhan-vien/nhan-vien.component';
import { DrawerNhanVienComponent } from './components/nhan-vien/drawer-nhan-vien/drawer-nhan-vien.component';
import { EmployeeComponent } from './components/nhan-vien/employee/employee.component';
import { EmployeeEditFormComponent } from './components/nhan-vien/employee/employee-edit-form.component';
import { CommonModule } from '@angular/common';


@NgModule({
	declarations: [
		AppComponent,
		JobTitleComponent,
		HeaderComponent,
		EmployeeComponent,
		DepartmentComponent,
		EmployeeEditFormComponent,
		DepartmentEditFormComponent,
		JobTitleEditFormComponent,
		DrawerPhongBanComponent,
		PhongBanComponent,
		ChucDanhComponent,
		DrawerChucDanhComponent,
  		NhanVienComponent,
  		DrawerNhanVienComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		GridModule,
		PDFModule,
		ExcelModule,
		LabelModule,
		LayoutModule,
		SchedulerModule,
		ButtonsModule,
		EditorModule,
		FileSelectModule,
		HttpClientModule,
		ChartsModule,
		IntlModule,
		DateInputsModule,
		InputsModule,
		DropDownsModule,
		RouterModule.forRoot(drawerRoutes),
		NotificationModule,
		HttpClientJsonpModule,
		DialogsModule,
		CommonModule,
		UploadModule
	],
	providers: [
		{ provide: MessageService, useClass: CustomMessagesService },
		{ provide: LOCALE_ID, useValue: 'en-US' },
		{
			deps: [HttpClient],
			provide: DepartmentEditService,
			useFactory: (jsonp: HttpClient) => () => new DepartmentEditService(jsonp),
		},
		{
			deps: [HttpClient],
			provide: JobTitleEditService,
			useFactory: (jsonp: HttpClient) => () => new JobTitleEditService(jsonp),
		},
		{
			deps: [HttpClient],
			provide: EmployeeEditService,
			useFactory: (jsonp: HttpClient) => () => new EmployeeEditService(jsonp),
		},
		SharedService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

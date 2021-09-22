import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { JobTitle } from "../../models/product.model";

@Component({
  selector: "kendo-grid-dashboard-info-edit-form",
  styles: [
    `
      input[type="text"] {
        width: 100%;
      }
      .k-inline-checkbox {
        display: inline-flex;
      }
    `,
  ],
  template: `
    <kendo-dialog
      *ngIf="active"
      [width]="300"
      [height]="450"
      (close)="closeForm()"
    >
      <kendo-dialog-titlebar>
        {{ isNew ? "Thêm mới nhân viên" : "Chỉnh sửa nhân viên" }}
      </kendo-dialog-titlebar>

      <form novalidate class="k-form" [formGroup]="editForm">
        <kendo-formfield>
          <kendo-label [for]="Name" text="Tên chức danh"></kendo-label>
          <input
            formControlName="Name"
            kendoTextBox
            #Name
            required
          />

          <!-- <kendo-formhint>Nhập tên nhân viên</kendo-formhint> -->
          <kendo-formerror>Lỗi: Tên nhân viên là bắt buộc</kendo-formerror>
        </kendo-formfield>

        <kendo-formfield>
          <kendo-label [for]="Description" text="Mô tả"></kendo-label>
          <input
            formControlName="Description"
            kendoTextBox
            #Description
            required
          />

          <!-- <kendo-formhint>Type unit price</kendo-formhint>
          <kendo-formerror>Error: Unit price is required</kendo-formerror> -->
        </kendo-formfield>

        <kendo-formfield>
          <kendo-label [for]="Code" text="Mã chức danh"></kendo-label>
          <input
            formControlName="Code"
            kendoTextBox
            #Code
            required
          />

          <!-- <kendo-formhint>Nhập đơn vị</kendo-formhint> -->
          <!-- <kendo-formerror
            >
              Lỗi: Các đơn vị phải từ 0 đến 999</kendo-formerror
          > -->
        </kendo-formfield>

        <!-- <kendo-formfield>
          <div class="col-xs-12 col-sm-6 example-col"> -->
            <!-- <input
              formControlName="Titles"
              kendoCheckBox
              #Titles
              type="checkbox"
            /> -->
            <!-- <kendo-label
              [for]="Titles"
              class="k-checkbox-label"
              text="Chức danh nhân viên"
            >
            </kendo-label>
            <kendo-dropdownlist 
            [data]="" 
            #Titles  
            formControlName="Titles">
        </kendo-dropdownlist>
          </div>
        </kendo-formfield> -->
      </form>

      <kendo-dialog-actions>
        <button class="k-button" (click)="onCancel($event)">Trở về</button>
        <button
          class="k-button k-primary"
          [disabled]="!editForm.valid"
          (click)="onSave($event)"
        >
          Lưu
        </button>
      </kendo-dialog-actions>
    </kendo-dialog>
  `,
})
export class DashboardEditFormComponent {
  public active = false;
  public editForm: FormGroup = new FormGroup({
    Code: new FormControl("", Validators.required),
    Name: new FormControl("", Validators.required),
    Description: new FormControl(),
  });

  @Input() public isNew = false;

  @Input() public set model(jobTitle: JobTitle) {
    this.editForm.reset(jobTitle);

    this.active = jobTitle !== undefined;
  }

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<JobTitle> = new EventEmitter();

  public onSave(e): void {
    e.preventDefault();
    this.save.emit(this.editForm.value);
    this.active = false;
  }

  public onCancel(e): void {
    e.preventDefault();
    this.closeForm();
  }

  closeForm(): void {
    this.active = false;
    this.cancel.emit();
  }
}
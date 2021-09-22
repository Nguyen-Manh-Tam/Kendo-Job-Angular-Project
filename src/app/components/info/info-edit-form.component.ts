import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Validators, FormGroup, FormControl, FormArray, FormBuilder } from "@angular/forms";
import { Employee } from "../../models/product.model";

@Component({
	selector: "kendo-grid-info-edit-form",
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
          <kendo-label [for]="Name" text="Tên nhân viên"></kendo-label>
          <input
            formControlName="Name"
            kendoTextBox
            #Name
            required
          />

          <!-- <kendo-formhint>Nhập tên nhân viên</kendo-formhint>
          <kendo-formerror>Lỗi: Tên nhân viên là bắt buộc</kendo-formerror> -->
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
          <div class="col-xs-12 col-sm-6 example-col">
            <kendo-label
              class="k-checkbox-label"
              text="Chức danh nhân viên"
            >
            </kendo-label>
			<div class="table table-bordered" formArrayName="Titles">
      <tr>
	<button type="button" (click)="addQuantity()" class="btn btn-primary">Add More</button>
      <div *ngFor="let quantity of quantities().controls; let i=index" [formGroupName]="i">
            Quantity :
            <input type="text" formControlName="DepartmentCode" class="form-control">

            Price:
            <input type="text" formControlName="JobTitleCode" class="form-control">


            <button (click)="removeQuantity(i)" class="btn btn-danger">Remove</button>

</div>
</div>
          </div>
        </kendo-formfield>
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
export class InfoEditFormComponent {
	public active = false;
	public editForm: FormGroup = new FormGroup({
		Code: new FormControl("", Validators.required),
		Name: new FormControl("", Validators.required),
		Titles: new FormControl(),
		Description: new FormControl(),
	});

	constructor(private fb: FormBuilder) {

		this.editForm = this.fb.group({
			Titles: this.fb.array([]),
		});
	}

	@Input() public isNew = false;

	@Input() public set model(employee: Employee) {
		this.editForm.reset(employee);

		this.active = employee !== undefined;
	}

	@Output() cancel: EventEmitter<any> = new EventEmitter();
	@Output() save: EventEmitter<Employee> = new EventEmitter();

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

	quantities(): FormArray {
		return this.editForm.get("Titles") as FormArray
	}

	newQuantity(): FormGroup {
		return this.fb.group({
			DepartmentCode: '',
			JobTitleCode: '',
		})
	}

	addQuantity() {
		this.quantities().push(this.newQuantity());
	}

	removeQuantity(i: number) {
		this.quantities().removeAt(i);
	}
}
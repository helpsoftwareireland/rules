import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { FieldService } from '../_services/field-service.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
interface Rule {
  value: number;
  name: string;
}
@Component({
  selector: 'app-add-rule',
  templateUrl: './add-rule.component.html',
  styleUrls: ['./add-rule.component.css']
})
export class AddRuleComponent implements OnInit {
  rules: Rule[] = [
    { value: 1, name: 'Process' },
    { value: 2, name: 'SQL' }
  ];
  messages: any[] = [
    { value: 1, message: 'Add a new rule' },
    { value: 2, message: 'Create New Rule' }
  ];
  actions: any[] = [
    { value: 1, name: 'Protect' },
    { value: 2, name: 'Allow' },
    { value: 3, name: 'Detect' }
  ];
  selectedMessage: string;
  rulesForm = this.formBuilder.group({
    rule: [null, Validators.required]
  });
  addForm = this.formBuilder.group({
    name: [null, Validators.required],
    action: [null, Validators.required],
    log: [null],
    severity: [null, Validators.required]
  });
  staticFields = ['name', 'action', 'logMessage', 'severity'];
  dynamicFormGroup: FormGroup;
  isStep1 = true;
  isStep2 = false;
  selectedFields: any;
  fieldsList: any[];
  isVendorOptions = false;

  constructor(private formBuilder: FormBuilder, private fieldsData: FieldService,
              public dialogRef: MatDialogRef<AddRuleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.selectedMessage = this.getMessage(1);
  }
  getMessage(step: number) {
    return this.messages.find(m => m.value === step).message;
  }
  get rule() {
    return this.rulesForm.get('rule');
  }
  onSelectEvent() {
    this.isStep2 = !this.isStep2;
    this.isStep1 = !this.isStep1;
    this.fieldsData.get().subscribe((fields: any) => {
      fields.rules.forEach(obj => {
        if (Object.keys(obj).toString() === this.rule.value.name.toLowerCase()) {
          this.selectedFields = obj[this.rule.value.name.toLowerCase()];
        }
      });
      this.selectedMessage = `${this.getMessage(2)}:${this.rule.value.name}`;
      this.initNewRuleForm();
    });
  }
  initNewRuleForm() {
    const group = {};
    this.fieldsList = [];
    this.selectedFields.forEach(template => {
      const labelKey = Object.keys(template).toString();
      const isStaticKey = this.staticFields.find(s => s === labelKey);
      if (!isStaticKey) {
        if (template[labelKey].type.toLowerCase() !== 'checkbox_group') {
          group[labelKey] = new FormControl('', template[labelKey].required ? Validators.required : null);
        } else {
          group[labelKey] = new FormControl(false, template[labelKey].required ? Validators.required : Validators.nullValidator);
        }
        this.fieldsList.push({
          type: template[labelKey].type.toLowerCase(),
          label: labelKey,
          required: template[labelKey].required,
          options: template[labelKey].type.toLowerCase() !== 'checkbox_group' ?
            template[labelKey].options : this.parseOptions(template[labelKey].options)
        });
      }
    });
    this.dynamicFormGroup = new FormGroup(group);
    this.addForm.removeControl('dynamic');
    this.addForm.addControl('dynamic', this.dynamicFormGroup);
  }
  parseOptions(options): any[] {
    const listOptions = [];
    Object.keys(options[0]).forEach(element => {
      listOptions.push({ label: element.toString(), checked: options[0][element].checked });
    });
    return listOptions;
  }
  onSelectionChange(control: string) {
    if (control === 'vendor') {
      const selectedVendor = this.addForm.get('dynamic.vendor').value;
      if (selectedVendor.toLowerCase().indexOf('mysql') > -1) {
        this.isVendorOptions = true;
      } else {
        this.isVendorOptions = false;
      }
    }
  }
  onReset() {
    this.isStep2 = !this.isStep2;
    this.isStep1 = !this.isStep1;
    this.selectedMessage = `${this.getMessage(1)}`;
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  onSave() {
    // TODO: parse the form value and create a proper structured JSON
    // for demopurpose I just return the values entered by the user
    this.dialogRef.close(this.addForm.value);
  }
}

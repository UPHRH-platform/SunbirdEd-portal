import { Component } from '@angular/core';
import { UserService } from '@sunbird/core';
import { ServerResponse } from '@sunbird/shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService, ToasterService } from '@sunbird/shared';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {
  public users = [];
  public config: ConfigService;
  public availableRoles: ConfigService;
  selectAllChecked = false;
  isModalOpen = false;
  userForm: FormGroup;
  selectedUser: any;
  isEdit = false;

  constructor(
    public userService: UserService,
    private fb: FormBuilder,
    config: ConfigService,
    private toasterService: ToasterService
  ) {
    this.userService = userService;
    this.config = config;
    this.availableRoles = this.config.rolesConfig.userManagementRoles;
  }

  ngOnInit(): void {
    this.loadUserList();
    this.initForm();
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.isEdit = false;
    setTimeout(()=>this.loadUserList(),1000);
    this.initForm();
  }

  loadUserList(): void {
    const requestParams = {
      filters: {
        'roles.role': this.availableRoles
      },
      fields: ['id', 'firstName', 'lastName', 'roles', 'status', 'email', 'phone'],
      limit: 1000,
      sort_by: { createdDate: 'desc' }
    };
    this.userService.getListOfUsers(requestParams).subscribe(
      (data: any[]) => {
        this.users = data.map(data => ({
          ...data,
          roles: data?.roles.map((role: any) => role.role).join(',')
        }));
      },
      (error: any) => {
        console.log('failed to search users');
      }
    );
  }

  toggleSelectAll(): void {
    this.users.forEach(user => (user.selected = this.selectAllChecked));
  }

  saveUser(): void {
    if (this.userForm.valid) {
      const request = { ...this.userForm.value, status: parseInt(this.userForm.value.status) };
      if (!this.isEdit) {
        this.userService.createUserByAdmin(request).subscribe(
          (data: ServerResponse) => {
            if (data.responseCode === 'OK') {
              this.toasterService.info(data.params.status);
            }
          },
          (error: any) => {
            console.log('failed to save the user', error);
            this.toasterService.warning(error.error?.params.errmsg);
          }
        );
      }
    }
   this.closeModal();
  }

  editUser(user: any): void {
    this.isEdit = true;
    this.selectedUser = { ...user };

    this.userForm.patchValue({
      firstName: this.selectedUser.firstName,
      lastName: this.selectedUser.lastName,
      email: this.selectedUser.email,
      phone: this.selectedUser.phone,
      roles: this.selectedUser.roles,
      status: this.selectedUser.status.toString()
    });

    this.openModal();
  }

  toggleStatus(prevStatus: any, userId: any) {
    const request = {
      userId
    };
    if (prevStatus === 1) {
      this.userService.blockUser(request).subscribe(
        (data: ServerResponse) => {
          if (data.responseCode === 'OK') {
            this.toasterService.info(data.params.status);
          }
        },
        (error: any) => {
          this.toasterService.warning(error.error?.params.errmsg);
        }
      );
    } else {
      this.userService.unblockUser(request).subscribe(
        (data: ServerResponse) => {
          if (data.responseCode === 'OK') {
            this.toasterService.info(data.params.status);
          }
        },
        (error: any) => {
          this.toasterService.warning(error.error?.params.errmsg);
        }
      );
      }
    this.closeModal();
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      roles: [[], Validators.required],
      status: ['1', Validators.required]
    });
  }
}

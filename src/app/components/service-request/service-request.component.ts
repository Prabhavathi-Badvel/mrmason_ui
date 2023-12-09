import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceRequest } from 'src/app/interfaces/service.modal';
import { ApiserviceService } from 'src/app/services/apiservice/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css'],
})
export class ServiceRequestComponent implements OnInit{

  isLoggedIn = false;
  location = '';
  choosenLocation = '';
  assets:any[] = [];
  assetId: string = '';
  appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';
  selectedIndex = -1;
  assetIds: any[] = [];

  submitForm = new FormGroup({
    servicetype: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    servicedate: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    user_id: new FormControl(''),
    assetid: new FormControl('', Validators.required),
    checkAgree: new FormControl(false, Validators.requiredTrue),
  });


  constructor(
    private apiService: ApiserviceService,
    private toast: ToastService,
    private authService: AuthService,
    private router: Router,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const location = localStorage.getItem('PINCODE_NO');
    this.submitForm.patchValue({
      location: location,
    });

    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.submitForm.get('assetid')?.valueChanges.subscribe((value) => {

      if(value) {
      this.selectedIndex = this.getIndexOfAssetId(value);
      }
      console.log('Selected Index:', this.selectedIndex);
    });


    const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';
    const userId =  localStorage.getItem('USER_ID') ?? "";

    this.apiService.getAssetData(appKey,userId).subscribe((response) => {
      console.log("test11111");
      console.log(response);
      if (response.code === 1 && response.status) {
        console.log("***1")
        this.assets = response.data;
        console.log(this.assets);
        // this.assetIds = response;
        this.assetIds = this.assets.map(obj => obj?.asset_id);
        this.ref.detectChanges();
        console.log(this.assetIds);
        // console.log(valuesAtIndex);
      }
    })

  }

  private getIndexOfAssetId(assetId: string): number {
    return this.assetIds.indexOf(assetId);
  }



  options: any = {
    componentRestrictions: { country: 'IN' },
  };

  public handleAddressChange(place: google.maps.places.PlaceResult) {
    console.log(place.formatted_address);
    this.choosenLocation = place.formatted_address ?? '';
  }

  onSubmitRequestForm() {
    const userId = localStorage.getItem('USER_ID') ?? '';
    const appKey = 'a0a7822c9b485c9a84ebcc2bae8c9ff4S';
    const data: ServiceRequest = {
      service_name: this.submitForm.value.servicetype ?? '',
      service_date: this.submitForm.value.servicedate ?? '',
      description: this.submitForm.value.description ?? '',
      // location: this.choosenLocation,
      location: this.submitForm.value.location ?? '',
      user_id: userId,
      asset_id: this.submitForm.value.assetid ?? ''
    };
    this.apiService.sendSubmitRequestData(data, appKey).subscribe((res) => {
      console.log(res);
      if (res['status']) {
        this.toast.show('Service Request submited Successfully');
        this.submitForm.reset();
      } else {
        this.toast.show('Service Request failed!');
      }
    });
  }
}

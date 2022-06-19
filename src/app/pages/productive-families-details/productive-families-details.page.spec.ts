import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductiveFamiliesDetailsPage } from './productive-families-details.page';

describe('ProductiveFamiliesDetailsPage', () => {
  let component: ProductiveFamiliesDetailsPage;
  let fixture: ComponentFixture<ProductiveFamiliesDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductiveFamiliesDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductiveFamiliesDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

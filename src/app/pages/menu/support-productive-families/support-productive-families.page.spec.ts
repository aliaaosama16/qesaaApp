import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SupportProductiveFamiliesPage } from './support-productive-families.page';

describe('SupportProductiveFamiliesPage', () => {
  let component: SupportProductiveFamiliesPage;
  let fixture: ComponentFixture<SupportProductiveFamiliesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportProductiveFamiliesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SupportProductiveFamiliesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

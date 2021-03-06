import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Invariant } from 'src/app/shared/model/back/invariant/invariant.model';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { SystemService } from 'src/app/core/services/api/system.service';
import { CrossreferenceService, ICrossReference } from 'src/app/core/services/utils/crossreference.service';
import { InvariantsService } from 'src/app/core/services/api/invariants.service';

@Component({
  selector: 'app-execution-settings-tab',
  templateUrl: './execution-settings-tab.component.html',
  styleUrls: ['./execution-settings-tab.component.scss']
})
export class ExecutionSettingsTabComponent implements OnInit {

  /** settings form group */
  @Input('settings') settings: FormGroup;

  /** selected countries for the test case */
  @Input('countries') selectedCountries: Array<Invariant>;

  /** system of the test case */
  @Input('system') system: string;

  /** boolean to handle the display of the version activation section */
  public showVersionActivation: boolean;

  /** boolean to handle the display of the version activation section */
  public showConditionActivation: boolean;

  /** boolean to handle the display of the version activation section */
  public showRobotConstraints: boolean;

  /** list of available countries to select */
  public countries: Array<Invariant>;

  // available sprints and revs list
  private builds: Array<any>; // TODO: add type
  private minors: Array<any>; // TODO: add type

  /** conditions list (private invariant) */
  public conditionOperators: Array<Invariant>;

  /** cross references array to display the correct input fields according to the selected condition */
  private crossReference_ConditionValue: Array<ICrossReference> = this.crossReferenceService.crossReference_ConditionValue;

  constructor(
    private testCaseService: TestcaseService,
    private systemService: SystemService,
    private invariantsService: InvariantsService,
    private crossReferenceService: CrossreferenceService
  ) { }

  ngOnInit() {
    /** subscribe to the invariants and build revision lists */
    this.systemService.observableSprints.subscribe(rep => { this.builds = rep; });
    this.systemService.observableRevs.subscribe(rep => this.minors = rep);
    this.invariantsService.observableConditionOperList.subscribe(rep => this.conditionOperators = rep);
    this.invariantsService.observableCountriesList.subscribe(rep => this.countries = rep);
    // set the default display of "advanced" sections
    this.showVersionActivation = false;
    this.showConditionActivation = false;
    this.showRobotConstraints = false;
  }

  /** call the same method in test case service */
  isCountryDefinedForTestCase(country: string): boolean {
    return this.testCaseService.isCountryDefinedForTestCase(this.selectedCountries, country);
  }

  /** select or unselect a country when its clicked */
  toggleCountry(country: Invariant): void {
    if (this.isCountryDefinedForTestCase(country.value) === true) {
      const index = this.selectedCountries.findIndex(invariant => invariant.value === country.value);
      this.selectedCountries.splice(index, 1);
    } else {
      this.selectedCountries.push(country);
    }
  }

  /** return true if sprints and revs are defined (false instead) */
  sprintsAndRevAreDefined(): boolean {
    return this.builds.length > 0 && this.minors.length > 0;
  }

  /** return true if a condition oper has a cross reference */
  hasConditionCrossReference(condition: string): boolean {
    return this.crossReferenceService.hasCrossReference(condition, this.crossReferenceService.crossReference_ConditionValue);
  }

  /** return the actual cross reference value */
  findConditionCrossReference(condition: string): ICrossReference {
    return this.crossReferenceService.findCrossReference(condition, this.crossReferenceService.crossReference_ConditionValue);
  }

}

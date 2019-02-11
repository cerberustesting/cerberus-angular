import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ITestCase } from 'src/app/model/testcase.model';
import { TestService } from 'src/app/services/crud/test.service';
import { InvariantsService } from 'src/app/services/crud/invariants.service';
import { SystemService } from 'src/app/services/crud/system.service';
import { AlertService } from 'src/app/services/utils/alert.service';

@Component({
  selector: 'app-testcasescript',
  templateUrl: './testcasescript.component.html',
  styleUrls: ['./testcasescript.component.scss']
})
export class TestcasescriptComponent implements OnInit, OnDestroy {

  selectedTest: string;
  selectedTestCase: string;
  testcase: ITestCase;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private TestService: TestService,
    private InvariantService: InvariantsService,
    private SystemService: SystemService
  ) { }

  ngOnDestroy() {
    this.testcase = null;
    this.TestService.observableTestCase.next(this.testcase);
    this.selectedTest = null;
    this.selectedTestCase = null;
  }

  ngOnInit() {
    this.selectedTest = null;
    this.selectedTestCase = null;
    // parse query strings from URL
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['test']) {
        this.selectedTest = params['test'];
        if (params['testcase']) {
          this.selectedTestCase = params['testcase'];
        }
      }
    });
    this.TestService.getTestsList();
    this.TestService.getProjectsList();
    this.SystemService.getApplicationList();
    this.TestService.observableTestCase.subscribe(response => {
      if (response) {
        this.testcase = response;
        this.SystemService.getLabelsFromSystem(this.testcase.info.system);
        this.SystemService.getRevFromSystem(this.testcase.info.system);
        this.SystemService.getSprintsFromSystem(this.testcase.info.system);
        this.SystemService.getApplication(this.testcase.info.application);
      }
    });
    // public invariants
    this.InvariantService.getCountriesList();
    this.InvariantService.getTcStatus();
    this.InvariantService.getOriginsList();
    this.InvariantService.getPriorities();
    this.InvariantService.getGroupList();
    this.InvariantService.getOriginsList();
    // private invariants : loaded once (exluded from any refresh)
    this.InvariantService.getStepConditionOperList();
    this.InvariantService.getStepLoopList();
    this.InvariantService.getActionList();
    this.InvariantService.getControlsList();
  }

  receiveTest($event) {
    this.selectedTest = $event;
    this.testcase = null;
    if (this.selectedTest) {
      if (this.selectedTestCase) {
        this.router.navigate([], { queryParams: { test: this.selectedTest, testcase: this.selectedTestCase } });
      } else {
        this.router.navigate([], { queryParams: { test: this.selectedTest } });
      }
    }
  }

  receiveTestCase($event) {
    this.selectedTestCase = $event;
    this.router.navigate([], { queryParams: { test: this.selectedTest, testcase: this.selectedTestCase } });
  }

  debug() {
    console.log(this.testcase);
  }

}
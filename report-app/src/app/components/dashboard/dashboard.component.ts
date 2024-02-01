import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  data: any[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.completeData();
  }

  completeData() {
    this.dashboardService.getData().subscribe(data => {
      this.data = data;
      console.log(this.data)
    });
  };
}
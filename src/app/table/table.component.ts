import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../services/http.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { Observable, Subscription } from 'rxjs';
import { Route } from '../model/route-model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [MatTableModule, MatSortModule, MatSort, MatCardModule],
  providers: [HttpService],
})
export class TableComponent implements OnInit, OnDestroy {
  public readonly list$ = new Observable<Route[]>();
  public displayedColumns: string[] = ['address', 'gateway', 'interface'];
  public dataSource: MatTableDataSource<Route> = new MatTableDataSource<Route>(
    []
  );
  private subscription: Subscription = new Subscription();
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private readonly httpService: HttpService) {
    this.list$ = this.httpService.getList();
  }

  public ngOnInit(): void {
    this.subscription = this.list$.subscribe((data) => {
      this.dataSource = new MatTableDataSource<Route>(data);
      this.dataSource.sort = this.sort;
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

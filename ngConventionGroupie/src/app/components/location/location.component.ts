import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { Location } from 'src/app/models/location';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  locations: Location[] = [];
  selected: Location | null = null;
  newLocation: Location = new Location();
  editLocation: Location | null = null;

  constructor(private locationService: LocationService, private route: ActivatedRoute,
    private router: Router) {


  }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        let convIdString = params.get('convId')
        if (convIdString) {
          let conventionId = parseInt(convIdString);
          if (!isNaN(conventionId)) {
            this.loadLocationsForConventions(conventionId);
          }
        }
      }
    })

  }

  loadLocationsForConventions(conventionId: number) {
    this.locationService.indexForConvention(conventionId).subscribe({
      next: (locationList) => {
        this.locations = locationList;
      },
      error: (theError) => {
        console.log('Error' + theError);
      }
    })
  }

  addLocation(newLocation: Location) {
    const conventionId = this.getConventionIdFromParams();
    if (conventionId) {
      this.locations.push(newLocation);
      this.locationService.create(conventionId, newLocation).subscribe({
        next: (location) => {
          this.selected = location;
        },
        error: (error) => {
          console.error('Error' + error);
        },
      });
    }
  }

  getConventionIdFromParams(): number | null {
    const convIdString = this.route.snapshot.paramMap.get('convId');
    if (convIdString) {
      const conventionId = parseInt(convIdString);
      if (!isNaN(conventionId)) {
        return conventionId;
      }
    }
    return null;
  }

  deleteLocation(id: number) {
    this.locationService.destory(id).subscribe({
      next: () => {

      },
      error: (error) => {
        console.error('Error' + error);
      },
    });
  }

}

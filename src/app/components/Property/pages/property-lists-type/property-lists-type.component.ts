import { ListingTypeHeadingPipe } from '../../../../core/pipe/listing-type-heading.pipe';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-property-lists-type',
  standalone: true,
  imports: [CommonModule,ListingTypeHeadingPipe,RouterLink],
  templateUrl: './property-lists-type.component.html',
  styleUrl: './property-lists-type.component.scss'
})
export class PropertyListTypeComponent {
  constructor(private route: ActivatedRoute, private propertyService: PropertyService) {}
  properties: any[] = [];
  listingType: string="";

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.listingType = params.get('listingType')||'';
      this.loadProperties();
    });
  }
  loadProperties(): void {
    this.propertyService.getPropertiesBasedonListType(this.listingType).subscribe({
      next: (properties: any[]) => { 
        console.log(JSON.stringify(properties));
             
        this.properties = properties;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}

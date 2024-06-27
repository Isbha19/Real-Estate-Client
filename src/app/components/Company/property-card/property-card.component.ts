import { Component, Input } from '@angular/core';
import { PropertyCard } from '../../../core/model/property/propertyCard';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss'
})
export class PropertyCardComponent {
@Input() property:PropertyCard = {
  title: '',
  propertyType: '',
  listingType: '',
  location: '',
  size: 0,
  bathroom: 0,
  bedroom: 0,
  price: 0
};
ngOnInit(): void {
console.log(this.property);

}
}

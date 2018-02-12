import { NgModule } from '@angular/core';
import { ListingComponent } from './listing/listing';
import { IonicModule } from "ionic-angular";
import { ListingPage } from "../pages/listing/listing";
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
	declarations: [ListingComponent],
	imports: [IonicModule, PipesModule],
	exports: [ListingComponent]
})
export class ComponentsModule {}

import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { PricePipe } from './price/price';
import { DescriptionPipe } from './description/description';
@NgModule({
	declarations: [ThumbnailPipe,
    PricePipe,
    DescriptionPipe],
	imports: [],
	exports: [ThumbnailPipe,
    PricePipe,
    DescriptionPipe]
})
export class PipesModule {}

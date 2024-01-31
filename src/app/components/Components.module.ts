import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { HeaderComponent } from "./header/header.component";
import { EmpCardComponent } from "./emp-card/emp-card.component";

@NgModule({
    imports: [IonicModule.forRoot()],
    declarations:[HeaderComponent,EmpCardComponent],
    exports:[HeaderComponent,EmpCardComponent],
})

export class ComponentsModule{

}
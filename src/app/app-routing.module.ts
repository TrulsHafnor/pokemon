import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { GuitarCataloguePage } from "./pages/guitar-catalogue/guitar-catalogue.page";
import { LoginPage } from "./pages/login/login.page";
import { ProfilePage } from "./pages/profile/profile.page";

const routes: Routes = [
    {
        path:"",
        pathMatch:"full",
        redirectTo:"/login"
    },
    {
        path: "login",
        component: LoginPage
    },
    {
        path: "pokemons",
        component: GuitarCataloguePage,
        canActivate: [ AuthGuard]
    },
    {
        path: "profile",
        component: ProfilePage,
        canActivate: [ AuthGuard]
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{

}
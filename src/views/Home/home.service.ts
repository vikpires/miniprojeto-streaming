/* eslint-disable */
import { HomeRest } from "@/service/rest/home.rest";
import { Subject, Observable, take } from "rxjs";

export class HomeService{
    constructor(
        private _allMedia = new HomeRest()
){}

    private allMedia$: Subject<any> = new Subject<any>();
    allMedia: Observable<any> = this.allMedia$.asObservable();

    getAllMedia(page: number = 1): void{
        this._allMedia.getAllMedia(page).pipe(take(1)).subscribe({
            next: (response) => {
                this.allMedia$.next(response)
            }
        })
    }
}
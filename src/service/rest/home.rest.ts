import { Observable } from "rxjs";
import api from "../rxjs";

export class HomeRest {

    getAllMedia(page: number = 1): Observable<any> {
        const url = `/trending/all/day?page=${page}`;
        return api.get(url);
    }
}

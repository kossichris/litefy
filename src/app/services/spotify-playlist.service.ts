/// <reference path="../../../node_modules/@types/spotify-api/index.d.ts" />

import { ServiceBase } from "./service.base";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EventEmitter } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class SpotifyPlaylistService {
    dataByEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private service: ServiceBase) {}

    getPlaylist(id: string): Observable<SpotifyApi.SinglePlaylistResponse> {
        return this.service.Get(`https://api.spotify.com/v1/playlists/${id}`);
    }

    sendDataToModal(isOpen: boolean) {
        this.dataByEvent.emit(isOpen);
    }
}

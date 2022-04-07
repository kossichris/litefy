/// <reference path="../../../../node_modules/@types/spotify-api/index.d.ts" />

import { ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { ModalComponent } from "src/app/components/modal/modal.component";
import { User } from "src/app/models/user";
import { SpotifyUserService } from "src/app/services/spotify-user.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-library",
    templateUrl: "./library.component.html",
    styleUrls: ["./library.component.css"],
})
export class LibraryComponent implements OnInit {
    constructor(
        private serviceUsuario: SpotifyUserService,
        private usuario: UserService
    ) {}

    userPlaylists: SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified>;
    userAlbums: SpotifyApi.PagingObject<SpotifyApi.SavedAlbumObject>;
    userTracks: SpotifyApi.PagingObject<SpotifyApi.SavedTrackObject>;

    usuarioLogado: User;

    ngOnInit() {
        this.getLoggedUser();
        this.getUserLibrary();
    }

    getLoggedUser() {
        this.usuario.getUser().subscribe((item) => {
            this.usuarioLogado = item;
        });
    }

    getUserLibrary() {
        const requests = [];

        requests.push(
            this.serviceUsuario.getUserPlaylists(),
            this.serviceUsuario.getUserAlbums(),
            this.serviceUsuario.getUserTracks()
        );

        forkJoin(requests).subscribe((items: any[]) => {
            this.userPlaylists = items[0].items;
            this.userAlbums = items[1].items;
            this.userTracks = items[2].items;
        });
    }

    addUserPlaylist(event) {
        console.log(event);
    }
}

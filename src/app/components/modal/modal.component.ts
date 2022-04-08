import { Input } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { Output } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Playlist } from "src/app/models/library";
import { SpotifyPlaylistService } from "src/app/services/spotify-playlist.service";

@Component({
    selector: "app-modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.css"],
})
export class ModalComponent implements OnInit {
    playlist: Playlist = {
        name: "",
        description: "My new playlist",
        public: true,
    };

    isOpen: Boolean = false;
    @Input() modalBtnTitle: String = "";
    @Output() handleClick = new EventEmitter();

    constructor(private spotifyPlaylistService: SpotifyPlaylistService) {}

    ngOnInit(): void {
        this.spotifyPlaylistService.dataByEvent.subscribe((isOpen) => {
            if (!isOpen) {
                this.isOpen = isOpen;
            }
        });
    }

    open() {
        this.isOpen = !this.isOpen;
    }

    passNewPlaylistDataToLibrary() {
        this.handleClick.emit(this.playlist);
    }
}

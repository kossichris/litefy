import { Input } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { Output } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Playlist } from "src/app/models/library";

@Component({
    selector: "app-modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.css"],
})
export class ModalComponent implements OnInit {
    playlist: Playlist = {
        title: "",
        description: "",
    };

    isOpen: Boolean = false;
    @Input() modalBtnTitle: String = "";
    @Output() handleClick = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}

    open() {
        this.isOpen = !this.isOpen;
    }

    passNewPlaylistDataToLibrary() {
        this.handleClick.emit(this.playlist);
    }
}

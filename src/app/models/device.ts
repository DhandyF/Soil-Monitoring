import { Time } from "@angular/common";

export interface Device {
    id?: number;
    moisture?: number;
    temperature?: number;
    kalium?: number;
    created_at?: Time;
}
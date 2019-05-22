import { Time } from "@angular/common";

export class Device {
    id: number;
    record: {
        temperature: number;
        moisture: number;
        last_retrieve: Date;
    }[]
}
module Models.Location {
    export interface LocationModel {
        longitude: number;
        latitude: number;
        timestamp: number;
        userName?: string;
    }
}

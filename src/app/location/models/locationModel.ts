module Models.Location {
    export interface LocationModel {
        Longitude: number;
        Latitude: number;
        Timestamp: number;
        UserName?: string;
    }
}

module Models {
    export interface Meeting {
        userId: string;
        longitude: number;
        latitude: number;
        name: string;
        time: string;
        date: Date;
    }
}

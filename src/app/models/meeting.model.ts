module Models {
    export interface Meeting {
        id: string;
        longitude: number;
        latitude: number;
        name: string;
        description: string;
        time: string;
        date: Date;
        hostId: string;
        participants: Models.User[];
    }
}

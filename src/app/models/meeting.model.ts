module Models {
    export interface Meeting {
        longitude: number;
        latitude: number;
        name: string;
        description: string;
        time: string;
        date: Date;
        host: Models.User;
        participants: Models.User[];
    }
}

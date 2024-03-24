


export interface MovieReview {
    ReviewId: number;
    imdbID: string;
    Content: string;
    Rating: number;
    ReviewDate: Date;
    UserName: string;
    UpVotes: number;
    ImgUrl?: string;
}
import axios, { AxiosError, AxiosResponse } from "axios";

import { toast } from "react-toastify";
import { MovieReview } from "../models/MovieReview";
import { router } from "../routing/Routes";
import { Movie } from "../models/Movie";
import { LoginForm } from "../models/login";
import { RegisterForm } from "../models/Register";
import { Profile } from "../models/Profile";
import { ReviewUpdate } from "../models/ReviewUpdate";

axios.defaults.baseURL = 'https://movieapi-production.up.railway.app/';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

axios.interceptors.response.use(
    async (response) => {
        delay(500);
        return response;
    },
    (error: AxiosError) => {
        console.error("Error object:", error); 
        
        if (error.response) {
            console.error("Server Error:", error.response.data);
            const response = error.response as AxiosResponse;
    
            let errorMessage = response.data.message || "An unexpected error occurred.";
    
            switch (response.status) {
                case 400:
                    errorMessage = response.data.error || "An unexpected error occurred.";
                    toast.error(errorMessage);
                    break;
                
                    case 401:
                        
                        if (error.response.headers['Token-Expired'] === 'true') {
                            // Here, implement the logic to refresh the token
                            // For example, call a function to refresh the token and retry the request
                            console.log("Token expired. Refreshing token...");
    
                            // Optionally, you can retry the request after refreshing the token
                            // const newToken = await refreshToken();
                            // if (newToken) {
                            //     axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                            //     return axios(error.config); // Retry the original request
                            // }
                        } else {
                            errorMessage = response.data.error || "You're not authorized to access this resource or perform this operation.";
                            toast.error(errorMessage);
                        }
                        break;
    
                case 403:
                    errorMessage = response.data.error || "Forbidden. You don’t have permission to perform this operation.";
                    toast.warn(errorMessage);
                    break;
    
                case 404:
                    errorMessage = response.data.error || "Resource not found.";
                    toast.error(errorMessage);
                    router.navigate('not-found'); 
                    break;
    
                default:
                    toast.error(errorMessage);
            }
        } else {
            console.error("Error Message:", error.message); 
            toast.error("An error occurred.");
        }
        
        return Promise.reject(error);
    }
);


const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string , headers?:any) => axios.get(url, { headers }).then(responseBody),
    post: (url: string , body?: {},headers?:any) => axios.post(url, body, { headers }).then(responseBody),
    put: (url: string , body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
};

const MovieReviewService = {
    getReviews: (imdbID: string) => requests.get(`/MovieReview/getReviews/${imdbID}`),
    createReview: (review: MovieReview) => requests.post(`/MovieReview/createReview`, review),
    updateReview: (review: ReviewUpdate) => requests.put(`/MovieReview/updateReview`, review),
    deleteReview: (reviewId: number) => requests.delete(`/MovieReview/deleteReview/${reviewId}`),
    upvoteReview: (reviewId: number) => requests.post(`/MovieReview/upvoteReview/${reviewId}`),
};
const AuthService = {
    login: (loginDetails: LoginForm) => requests.post('/account/login', loginDetails),
    register: (registerDetails: RegisterForm) => requests.post('/account/register', registerDetails),
    getUser: () => requests.get('/account/getUser'),
    updateProfile: (profileDetails: Profile) => requests.put('/account/updateProfile', profileDetails),
};
  
  const MovieService = {
    addWatchedMovie: (movie: Movie) => requests.post('/account/addWatchedMovie', movie),
    listWatchedMovies: () => requests.get('/account/List'),
    deleteWatchedMovie: (movieId: string) => requests.delete(`/account/Delete/${movieId}`),
  }
  const ImageService = {
    uploadImage: (imageFormData: FormData) => requests.post('/image/upload', imageFormData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
};

const agent = {
    MovieReviewService,
    AuthService,
    MovieService,
    ImageService
}
 export default agent;


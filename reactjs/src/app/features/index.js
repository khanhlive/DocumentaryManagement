import Loadable from "react-loadable";
import { Loading } from "../../common/navigation";

const BookDocumentaryAway = Loadable({
    loader: () => import("./books/BookDocumentAway"),
    loading: Loading
});

const BookDocumentaryArrived = Loadable({
    loader: () => import("./books/BookDocumentArrived"),
    loading: Loading
});

const SearchDocumentaryAway = Loadable({
    loader: () => import("./search/SearchDocumentAway"),
    loading: Loading
});

const SearchDocumentaryArrived = Loadable({
    loader: () => import("./search/SearchDocumentArrived"),
    loading: Loading
});
export const routes = [
    {
        path: "/so-van-ban/so-van-ban-di",
        exact: true,
        component: BookDocumentaryAway,
        name: "so-van-ban-di"
    },
    {
        path: "/so-van-ban/so-van-ban-den",
        exact: true,
        component: BookDocumentaryArrived,
        name: "so-van-ban-den"
    },
    {
        path: "/tim-kiem/van-ban-di",
        exact: true,
        component: SearchDocumentaryAway,
        name: "tim-kiem-van-ban-di"
    },
    {
        path: "/tim-kiem/van-ban-den",
        exact: true,
        component: SearchDocumentaryArrived,
        name: "tim-kiem-van-ban-den"
    },
];
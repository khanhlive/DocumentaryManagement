import Loadable from "react-loadable";
import { Loading } from "../../common/navigation";

const BookDocumentaryAway = Loadable({
    loader: () => import("./books/BookDocumentAway"),
    loading: Loading
});

const BookDocumentaryArrived = Loadable({
    loader: () => import("./books/BookDucumentArrived"),
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
];
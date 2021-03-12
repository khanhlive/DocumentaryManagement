import Loadable from "react-loadable";
import { Loading } from "../../common/navigation";
import { PermissionNames } from '../../lib/PermissionName';

const BookDocumentaryAway = Loadable({
    loader: () => import("./books/BookDocumentAway"),
    loading: Loading
});

const BookDocumentaryInternal = Loadable({
    loader: () => import("./books/BookDocumentInternal"),
    loading: Loading
});

const BookDocumentaryArrived = Loadable({
    loader: () => import("./books/BookDocumentArrived"),
    loading: Loading
});

const BookEDocumentary = Loadable({
    loader: () => import("./books/BookEDocument"),
    loading: Loading
});

const SearchDocumentaryAway = Loadable({
    loader: () => import("./search/SearchDocumentAway"),
    loading: Loading
});

const SearchDocumentaryInternal = Loadable({
    loader: () => import("./search/SearchDocumentInternal"),
    loading: Loading
});

const SearchDocumentaryArrived = Loadable({
    loader: () => import("./search/SearchDocumentArrived"),
    loading: Loading
});

const SearchEDocumentary = Loadable({
    loader: () => import("./search/SearchEDocument"),
    loading: Loading
});

const ConfigSystem = Loadable({
    loader: () => import("./systems/Config/ConfigSystem"),
    loading: Loading
});
const Profile = Loadable({
    loader: () => import("./systems/Profile/ProfileComponent"),
    loading: Loading
});
const UserComponent = Loadable({
    loader: () => import("./systems/User/UserComponent"),
    loading: Loading
});

const RoleComponent = Loadable({
    loader: () => import("./systems/Role/RoleComponent"),
    loading: Loading
});
export const routes = [
    {
        path: "/so-van-ban/so-van-ban-di",
        exact: true,
        component: BookDocumentaryAway,
        name: "so-van-ban-di",
        permission: PermissionNames.Pages_BookDocumentAway
    },
    {
        path: "/so-van-ban/so-van-ban-noi-bo",
        exact: true,
        component: BookDocumentaryInternal,
        name: "so-van-ban-noi-bo",
        permission: PermissionNames.Pages_BookDocumentInternal
    },
    {
        path: "/so-van-ban/so-van-ban-den",
        exact: true,
        component: BookDocumentaryArrived,
        name: "so-van-ban-den",
        permission: PermissionNames.Pages_BookDocumentArrived
    },
    {
        path: "/so-van-ban/so-van-ban-dien-tu",
        exact: true,
        component: BookEDocumentary,
        name: "so-van-ban-dien-tu",
        permission: PermissionNames.Pages_BookEDocument
    },
    {
        path: "/tim-kiem/van-ban-di",
        exact: true,
        component: SearchDocumentaryAway,
        name: "tim-kiem-van-ban-di",
        permission: PermissionNames.Pages_SearchDocumentAway
    },
    {
        path: "/tim-kiem/van-ban-noi-bo",
        exact: true,
        component: SearchDocumentaryInternal,
        name: "tim-kiem-van-ban-noi-bo",
        permission: PermissionNames.Pages_SearchDocumentInternal
    },
    {
        path: "/tim-kiem/van-ban-den",
        exact: true,
        component: SearchDocumentaryArrived,
        name: "tim-kiem-van-ban-den",
        permission: PermissionNames.Pages_SearchDocumentArrived
    },
    {
        path: "/tim-kiem/van-ban-dien-tu",
        exact: true,
        component: SearchEDocumentary,
        name: "tim-kiem-van-ban-dien-tu",
        permission: PermissionNames.Pages_SearchEDocument
    },
    {
        path: "/cau-hinh/thong-tin-nguoi-ky-duyet",
        exact: true,
        component: ConfigSystem,
        name: "cau-hinh-thong-tin-nguoi-ky-duyet",
        permission: PermissionNames.Pages_Config
    },
    {
        path: "/he-thong/quan-ly-tai-khoan",
        exact: true,
        component: UserComponent,
        name: "quan-ly-tai-khoan",
        permission: PermissionNames.Pages_Users
    },
    {
        path: "/he-thong/thong-tin-ca-nhan",
        exact: true,
        component: Profile,
        name: "thong-tin-ca-nhan",
        permission: PermissionNames.Pages_Profile
    },
    {
        path: "/he-thong/quyen",
        exact: true,
        component: RoleComponent,
        name: "quyen",
        permission: PermissionNames.Pages_Roles
    },
];
import Loadable from "react-loadable";
import { Loading } from "../../common/navigation";
import { PermissionNames } from '../../lib/PermissionName';

const TinhThanh = Loadable({
    loader: () => import("./components/TinhThanh/TinhThanh"),
    loading: Loading
});
const QuanHuyen = Loadable({
    loader: () => import("./components/QuanHuyen/QuanHuyen"),
    loading: Loading
});
const XaPhuong = Loadable({
    loader: () => import("./components/XaPhuong/XaPhuong"),
    loading: Loading
});
const DocumentType = Loadable({
    loader: () => import("./components/DocumentType/DocumentTypeComponent"),
    loading: Loading
});
const AgencyIssued = Loadable({
    loader: () => import("./components/AgencyIssued/AgencyIssuedComponent"),
    loading: Loading
});
const DocumentaryPersonal = Loadable({
    loader: () => import("./components/DocumentaryPersonal/DocumentaryPersonalComponent"),
    loading: Loading
});

const DocumentaryAway = Loadable({
    loader: () => import("./components/DocumentaryAway/DocumentaryAwayComponent"),
    loading: Loading
});

const DocumentaryArrived = Loadable({
    loader: () => import("./components/DocumentaryArrived/DocumentaryArrivedComponent"),
    loading: Loading
});

const Department = Loadable({
    loader: () => import("./components/Department/DepartmentComponent"),
    loading: Loading
});
export const routes = [
    {
        path: "/danh-muc/tinh-thanh",
        exact: true,
        component: TinhThanh,
        name: "tinh-thanh",
        permission: PermissionNames.Pages_Province
    },
    {
        path: "/danh-muc/quan-huyen",
        exact: true,
        component: QuanHuyen,
        name: "quan-huyen"
    },
    {
        path: "/danh-muc/xa-phuong",
        exact: true,
        component: XaPhuong,
        name: "xa-phuong"
    },
    {
        path: "/danh-muc/loai-van-ban",
        exact: true,
        component: DocumentType,
        name: "loai-van-ban",
        permission: PermissionNames.Pages_DocumentType
    },
    {
        path: "/danh-muc/co-quan-ban-hanh",
        exact: true,
        component: AgencyIssued,
        name: "co-quan-ban-hanh",
        permission: PermissionNames.Pages_AgencyIssued
    },
    {
        path: "/quan-ly-van-ban/van-ban-ca-nhan",
        exact: true,
        component: DocumentaryPersonal,
        name: "van-ban-ca-nhan",
        permission: PermissionNames.Pages_DocumentPersonal
    },
    {
        path: "/quan-ly-van-ban/van-ban-di",
        exact: true,
        component: DocumentaryAway,
        name: "van-ban-di",
        permission: PermissionNames.Pages_DocumentAway
    },
    {
        path: "/quan-ly-van-ban/van-ban-den",
        exact: true,
        component: DocumentaryArrived,
        name: "van-ban-den",
        permission: PermissionNames.Pages_DocumentArrived
    },
    {
        path: "/danh-muc/phong-ban",
        exact: true,
        component: Department,
        name: "danh-muc-phong-ban",
        permission: PermissionNames.Pages_Department
    },
];
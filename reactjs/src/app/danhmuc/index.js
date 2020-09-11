import Loadable from "react-loadable";
import { Loading } from "../../common/navigation";


const PhongBan = Loadable({
    loader: () => import("./components/PhongBan/PhongBan"),
    loading: Loading
});

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
export const routes = [
    {
        path: "/danh-muc/phong-ban",
        exact: true,
        component: PhongBan,
        name: "phong-ban"
    },
    {
        path: "/danh-muc/tinh-thanh",
        exact: true,
        component: TinhThanh,
        name: "tinh-thanh"
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
        name: "loai-van-ban"
    },
    {
        path: "/danh-muc/co-quan-ban-hanh",
        exact: true,
        component: AgencyIssued,
        name: "co-quan-ban-hanh"
    },
    {
        path: "/danh-muc/van-ban-ca-nhan",
        exact: true,
        component: DocumentaryPersonal,
        name: "van-ban-ca-nhan"
    },
];
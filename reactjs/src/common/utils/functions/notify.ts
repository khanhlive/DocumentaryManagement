import { smallBox } from "./message";

export default function notify(
  title: string,
  content: string,
  type: "success" | "error" | "warning" | "info",
  icon?: string
) {
  let data = {
    title: title ? title : "Thông báo",
    content: content,
    color: "",
    timeout: 2000,
    icon: icon ? icon : "fa fa-bell",
  };
  switch (type) {
    case "success":
      data.color = "#739E73";
      break;
    case "error":
      data.color = "#C46A69";
      break;
    case "warning":
      data.color = "#C79121";
      break;
    case "info":
      data.color = "#5384AF";
      break;

    default:
      data.color = "#5384AF";
      break;
  }
  smallBox(data);
}

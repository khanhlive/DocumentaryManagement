import AppConsts from "./appconst";
import { PermissionNames } from "./PermissionName";

declare var abp: any;

export function L(key: string, sourceName?: string): string {
  let localizationSourceName =
    AppConsts.localization.defaultLocalizationSourceName;
  return abp.localization.localize(
    key,
    sourceName ? sourceName : localizationSourceName
  );
}

export function isGranted(permissionName: string): boolean {
  return abp.auth.isGranted(permissionName);
}

export function getPermissionType(): number {
  let isDocumentManager = isGranted(PermissionNames.Permission_DocumentManager);
  if (isDocumentManager) {
    return 2;
  } else {
    let isApprove = isGranted(PermissionNames.Permission_Approved);
    if (isApprove) {
      return 3;
    } else {
      return 4;
    }
  }
}

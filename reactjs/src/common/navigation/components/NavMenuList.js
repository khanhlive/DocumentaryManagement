import React from 'react'
import { isGranted } from '../../../lib/abpUtility';

import NavMenuItem from './NavMenuItem';

//import AsideChat from "../../chat/components/AsideChat";

export default function SmartMenuList(props) {

  const { items, ...p } = props;

  return (
    <ul {...p}>
      {items.map((item) => {
        let _check = true;
        if (item && item.items && item.items.length > 0) {
          let route = item.items.filter(p => {
            const checkPermission = p.permission && !isGranted(p.permission);
            return !checkPermission;
          });
          _check = route.length > 0;
        }
        return _check ? <NavMenuItem item={item} key={item.id} /> : null
      })}
      {/* <AsideChat></AsideChat> */}
    </ul>
  )
}

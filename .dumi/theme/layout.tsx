// .dumi/theme/layout.tsx(本地主题) 或 src/layout.tsx(主题包)
import React from 'react';
import type { IRouteComponentProps } from '@umijs/types';
import Layout from 'dumi-theme-default/src/layout';
import { usePrefersColor } from 'dumi/theme';
import { loadDarkStyle, unloadDarkStyle } from './_utils';

export default ({ children, ...props }: IRouteComponentProps) => {
  const [theme] = usePrefersColor();

  React.useEffect(() => {
    if (theme !== "dark") {
      unloadDarkStyle()
    } else {
      loadDarkStyle()
    }
  }, [theme]);

  return (
    <Layout {...props}>
      {children}
    </Layout>
  )
};
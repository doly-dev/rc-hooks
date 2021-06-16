import * as React from 'react';
import PreView, { IPreviewerProps } from 'dumi-theme-default/src/builtins/Previewer';
import { usePrefersColor } from 'dumi/theme';

export default ({ children, background, ...rest }: IPreviewerProps) => {
  const [theme] = usePrefersColor();

  const previewProps = React.useMemo(() => {
    const ret = { ...rest };
    if (theme !== "dark") {
      ret.background = background;
    }
    return ret;
  }, [background, rest, theme]);

  return (
    <PreView {...previewProps}>
      <div
        style={{
          minHeight: rest.height || 'auto',
        }}
      >
        {children}
      </div>
    </PreView>
  )
}